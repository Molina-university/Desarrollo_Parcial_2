<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        📚 Librería Online
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <!-- Botón de modo oscuro. -->
          <li class="nav-item me-3">
            <button
              class="btn btn-sm btn-outline-light dark-mode-toggle"
              @click="toggleDarkMode"
              :title="darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              {{ darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro' }}
            </button>
          </li>
          
          <!-- Nombre del usuario. -->
          <li class="nav-item me-3">
            <span class="nav-link text-white">
              👤 {{ usuarioNombre }}
            </span>
          </li>
          
          <!-- Botón cerrar sesión. -->
          <li class="nav-item">
            <button class="btn btn-outline-light btn-sm" @click="cerrarSesion">
              🚪 Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  props: {
    usuarioNombre: {
      type: String,
      default: 'Usuario'
    }
  },
  data() {
    return {
      darkMode: false
    }
  },
  mounted() {
    // Cargar preferencia de modo oscuro desde localStorage.
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === 'true') {
      this.darkMode = true
      document.body.classList.add('dark-mode')
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      
      if (this.darkMode) {
        document.body.classList.add('dark-mode')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.body.classList.remove('dark-mode')
        localStorage.setItem('darkMode', 'false')
      }
    },
    cerrarSesion() {
      localStorage.removeItem('usuario')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar {
  background-color: var(--color-primary) !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark-mode-toggle {
  transition: all 0.3s ease;
}

.dark-mode-toggle:hover {
  transform: scale(1.05);
}

@media (max-width: 991px) {
  .navbar-nav {
    padding-top: 1rem;
  }
  
  .nav-item {
    margin-bottom: 0.5rem;
  }
}
</style>