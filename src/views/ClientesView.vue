<template>
  <div class="clientes-view">
    <!-- Breadcrumbs -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/dashboard">🏠 Inicio</router-link></li>
        <li class="breadcrumb-item active">👥 Clientes</li>
      </ol>
    </nav>

    <h2 class="mb-4">👥 Gestión de Clientes</h2>

    <!-- Verificar si el usuario es cliente -->
    <div v-if="!esCliente" class="alert alert-info">
      <h5>ℹ️ No estás registrado como cliente</h5>
      <p>Completa el formulario para registrarte en nuestra librería</p>
    </div>

    <div v-else class="alert alert-success">
      <h5>✅ ¡Ya eres cliente!</h5>
      <p>Bienvenido de nuevo, {{ clienteActual.nombre }}</p>
    </div>

    <!-- Formulario de registro -->
    <div class="card mb-4" v-if="!esCliente">
      <div class="card-header bg-primary-custom text-white">
        <h5>📝 Registro de Cliente</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="registrarCliente">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nombre completo *</label>
              <input
                type="text"
                class="form-control"
                v-model="formulario.nombre"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Email *</label>
              <input
                type="email"
                class="form-control"
                v-model="formulario.email"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Teléfono *</label>
              <input
                type="tel"
                class="form-control"
                v-model="formulario.telefono"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Dirección</label>
              <input
                type="text"
                class="form-control"
                v-model="formulario.direccion"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Registrarme como Cliente
          </button>
        </form>
      </div>
    </div>

    <!-- Buscador y tabla de clientes -->
    <div class="card">
      <div class="card-header bg-secondary-custom text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">📋 Clientes Registrados ({{ clientesFiltrados.length }})</h5>
        <div class="search-box">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="🔍 Buscar por nombre..."
            v-model="busqueda"
          />
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha de Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientesFiltrados" :key="cliente.id">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion || 'N/A' }}</td>
                <td>{{ cliente.fechaRegistro }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-warning me-1"
                    @click="editarCliente(cliente)"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="confirmarEliminar(cliente)"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Toast de notificaciones -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref="toastElement"
        class="toast align-items-center text-white border-0"
        :class="toastClass"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div class="modal fade" id="modalEditar" tabindex="-1" ref="modalEditar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Cliente</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="actualizarCliente">
              <div class="mb-3">
                <label class="form-label">Nombre completo</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="clienteEditando.nombre"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="clienteEditando.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Teléfono</label>
                <input
                  type="tel"
                  class="form-control"
                  v-model="clienteEditando.telefono"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Dirección</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="clienteEditando.direccion"
                />
              </div>
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div class="modal fade" id="modalConfirmar" tabindex="-1" ref="modalConfirmar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">⚠️ Confirmar Eliminación</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="clienteAEliminar">
            <p>¿Estás seguro de que deseas eliminar este cliente?</p>
            <div class="alert alert-warning">
              <strong>{{ clienteAEliminar.nombre }}</strong><br>
              <small>Email: {{ clienteAEliminar.email }}</small>
            </div>
            <p class="text-muted small">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="eliminarCliente">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal, Toast } from 'bootstrap'

export default {
  name: 'ClientesView',
  data() {
    return {
      esCliente: false,
      clienteActual: null,
      clientes: [],
      busqueda: '',
      formulario: {
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
      },
      clienteEditando: {},
      clienteAEliminar: null,
      toastMessage: '',
      toastClass: 'bg-success'
    }
  },
  computed: {
    clientesFiltrados() {
      if (!this.busqueda) return this.clientes
      
      return this.clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
    }
  },
  mounted() {
    this.cargarClientes()
    this.verificarCliente()
  },
  methods: {
    cargarClientes() {
      const clientesGuardados = localStorage.getItem('clientes')
      if (clientesGuardados) {
        this.clientes = JSON.parse(clientesGuardados)
      } else {
        this.clientes = [
          {
            id: 1,
            nombre: 'Juan Pérez',
            email: 'juan@email.com',
            telefono: '555-0001',
            direccion: 'Calle Principal 123',
            fechaRegistro: '2024-01-15'
          },
          {
            id: 2,
            nombre: 'María García',
            email: 'maria@email.com',
            telefono: '555-0002',
            direccion: 'Av. Libertad 456',
            fechaRegistro: '2024-02-20'
          }
        ]
        localStorage.setItem('clientes', JSON.stringify(this.clientes))
      }
    },
    verificarCliente() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      this.clienteActual = this.clientes.find(c => c.email === usuario.username + '@libreria.com')
      this.esCliente = !!this.clienteActual
    },
    registrarCliente() {
      const nuevoCliente = {
        id: this.clientes.length + 1,
        ...this.formulario,
        fechaRegistro: new Date().toLocaleDateString('es-ES')
      }
      
      this.clientes.push(nuevoCliente)
      localStorage.setItem('clientes', JSON.stringify(this.clientes))
      
      this.clienteActual = nuevoCliente
      this.esCliente = true
      
      this.mostrarToast('✅ ¡Registro exitoso! Ahora eres cliente de nuestra librería', 'bg-success')
      
      this.formulario = {
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
      }
    },
    editarCliente(cliente) {
      this.clienteEditando = { ...cliente }
      const modal = new Modal(this.$refs.modalEditar)
      modal.show()
    },
    actualizarCliente() {
      const index = this.clientes.findIndex(c => c.id === this.clienteEditando.id)
      if (index !== -1) {
        this.clientes[index] = this.clienteEditando
        localStorage.setItem('clientes', JSON.stringify(this.clientes))
        this.mostrarToast('✅ Cliente actualizado correctamente', 'bg-success')
        const modal = Modal.getInstance(this.$refs.modalEditar)
        modal.hide()
      }
    },
    confirmarEliminar(cliente) {
      this.clienteAEliminar = cliente
      const modal = new Modal(this.$refs.modalConfirmar)
      modal.show()
    },
    eliminarCliente() {
      const index = this.clientes.findIndex(c => c.id === this.clienteAEliminar.id)
      if (index !== -1) {
        this.clientes.splice(index, 1)
        localStorage.setItem('clientes', JSON.stringify(this.clientes))
        this.mostrarToast('✅ Cliente eliminado correctamente', 'bg-success')
        const modal = Modal.getInstance(this.$refs.modalConfirmar)
        modal.hide()
      }
    },
    mostrarToast(mensaje, clase) {
      this.toastMessage = mensaje
      this.toastClass = clase
      const toast = new Toast(this.$refs.toastElement)
      toast.show()
    }
  }
}
</script>

<style scoped>
.clientes-view {
  padding: 20px;
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 1rem;
}

.search-box {
  width: 250px;
}

.table {
  background: white;
}

.table thead {
  background-color: var(--color-light);
  color: var(--color-primary);
}
</style>