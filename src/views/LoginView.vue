<template>
  <div class="login-container">
    <div class="login-card">
      <div class="text-center mb-4">
        <h1 class="display-4">📚</h1>
        <h2>Librería Online</h2>
        <p class="text-muted">Inicia sesión para continuar</p>
      </div>

      <!-- Alerta de error. -->
      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>❌ Error:</strong> {{ error }}
        <button type="button" class="btn-close" @click="error = ''"></button>
      </div>

      <!-- Formulario de login. -->
      <form @submit.prevent="iniciarSesion">
        <div class="mb-3">
          <label for="username" class="form-label">Usuario</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
            placeholder="Ingresa tu usuario"
            required
            :disabled="loading"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <div class="password-input-group">
            <input
              :type="mostrarPassword ? 'text' : 'password'"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Ingresa tu contraseña"
              required
              :disabled="loading"
            />
            <button
              type="button"
              class="btn-toggle-password"
              @click="mostrarPassword = !mostrarPassword"
              tabindex="-1"
            >
              {{ mostrarPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading">
            <span class="spinner-border spinner-border-sm me-2"></span>
            Iniciando sesión...
          </span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>

      <!-- Información de usuarios de prueba. -->
      <div class="mt-4 p-3 bg-light rounded">
        <small class="text-muted">
          <strong>👤 Usuarios de prueba:</strong><br />
          • admin / admin123<br />
          • usuario / user123
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import usuarios from '@/data/usuarios.json'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      mostrarPassword: false,
      error: '',
      loading: false
    }
  },
  methods: {
    iniciarSesion() {
      this.error = ''
      this.loading = true

      setTimeout(() => {
        const usuario = usuarios.find(
          (u) => u.username === this.username && u.password === this.password
        )

        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify(usuario))
          this.$router.push('/dashboard')
        } else {
          this.error = 'Usuario o contraseña incorrectos'
        }

        this.loading = false
      }, 800)
    }
  },
  mounted() {
    const usuario = localStorage.getItem('usuario')
    if (usuario) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 100%;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card h2 {
  color: #333;
  font-weight: bold;
}

.password-input-group {
  position: relative;
}

.password-input-group input {
  padding-right: 45px;
}

.btn-toggle-password {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px 10px;
  transition: opacity 0.3s;
}

.btn-toggle-password:hover {
  opacity: 0.7;
}

.btn-primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-light);
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>