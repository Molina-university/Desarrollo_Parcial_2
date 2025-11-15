<template>
  <div class="valoraciones-view">
    <h2 class="mb-4">⭐ Sistema de Valoraciones</h2>

    <!-- Formulario para calificar. -->
    <div class="card mb-4">
      <div class="card-header bg-primary-custom text-white">
        <h5>📝 Deja tu Valoración</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="agregarValoracion">
          <div class="mb-3">
            <label class="form-label">Tu nombre</label>
            <input
              type="text"
              class="form-control"
              v-model="nuevaValoracion.nombre"
              required
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Calificación</label>
            <div class="rating-stars">
              <span
                v-for="star in 5"
                :key="star"
                @click="nuevaValoracion.rating = star"
                :class="{ active: star <= nuevaValoracion.rating }"
                class="star"
              >
                {{ star <= nuevaValoracion.rating ? '⭐' : '☆' }}
              </span>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Comentario</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="nuevaValoracion.comentario"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            Enviar Valoración
          </button>
        </form>
      </div>
    </div>

    <!-- Promedio de valoraciones. -->
    <div class="card mb-4">
      <div class="card-body text-center">
        <h3 class="mb-2">Valoración Promedio</h3>
        <div class="rating-large">
          <span class="rating-number">{{ promedioRating }}</span>
          <span class="rating-stars-large">⭐⭐⭐⭐⭐</span>
        </div>
        <p class="text-muted">Basado en {{ valoraciones.length }} valoraciones</p>
      </div>
    </div>

    <!-- Lista de valoraciones. -->
    <h4 class="mb-3">💬 Todas las Valoraciones</h4>
    <div class="row">
      <div v-for="valoracion in valoraciones" :key="valoracion.id" class="col-md-6 mb-3">
        <div class="card valoracion-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="mb-0">{{ valoracion.nombre }}</h5>
              <span class="badge bg-warning">
                {{ valoracion.rating }} ⭐
              </span>
            </div>
            <p class="text-muted small mb-2">{{ valoracion.fecha }}</p>
            <p class="mb-0">{{ valoracion.comentario }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ValoracionesView',
  data() {
    return {
      valoraciones: [],
      nuevaValoracion: {
        nombre: '',
        rating: 5,
        comentario: ''
      }
    }
  },
  computed: {
    promedioRating() {
      if (this.valoraciones.length === 0) return '5.0'
      const suma = this.valoraciones.reduce((acc, val) => acc + val.rating, 0)
      return (suma / this.valoraciones.length).toFixed(1)
    }
  },
  mounted() {
    this.cargarValoraciones()
    // Pre-llenar el nombre si hay usuario.
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (usuario) {
      this.nuevaValoracion.nombre = usuario.nombre
    }
  },
  methods: {
    cargarValoraciones() {
      const guardadas = localStorage.getItem('valoraciones')
      if (guardadas) {
        this.valoraciones = JSON.parse(guardadas)
      } else {
        // Valoraciones de ejemplo.
        this.valoraciones = [
          {
            id: 1,
            nombre: 'Carlos Ruiz',
            rating: 5,
            comentario: 'Excelente servicio y gran variedad de libros. ¡Muy recomendado!',
            fecha: '2024-03-01'
          },
          {
            id: 2,
            nombre: 'Ana López',
            rating: 4,
            comentario: 'Buenos precios y atención rápida. Me encantó la experiencia.',
            fecha: '2024-03-05'
          }
        ]
      }
    },
    agregarValoracion() {
      const valoracion = {
        id: Date.now(),
        ...this.nuevaValoracion,
        fecha: new Date().toLocaleDateString('es-ES')
      }
      
      this.valoraciones.unshift(valoracion)
      localStorage.setItem('valoraciones', JSON.stringify(this.valoraciones))
      
      alert('✅ ¡Gracias por tu valoración!')
      
      // Limpiar formulario.
      this.nuevaValoracion = {
        nombre: this.nuevaValoracion.nombre,
        rating: 5,
        comentario: ''
      }
    }
  }
}
</script>

<style scoped>
.valoraciones-view {
  padding: 20px;
}

.rating-stars {
  display: flex;
  gap: 10px;
  font-size: 2rem;
}

.star {
  cursor: pointer;
  transition: transform 0.2s;
}

.star:hover,
.star.active {
  transform: scale(1.2);
}

.rating-large {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.rating-number {
  font-size: 4rem;
  font-weight: bold;
  color: var(--color-primary);
}

.rating-stars-large {
  font-size: 2rem;
}

.valoracion-card {
  height: 100%;
  transition: transform 0.3s;
}

.valoracion-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}
</style>