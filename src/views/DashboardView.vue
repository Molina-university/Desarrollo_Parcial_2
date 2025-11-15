<template>
  <div class="dashboard-layout">
    <!-- Navbar superior. -->
    <NavbarComponent :usuario-nombre="usuarioNombre" />

    <!-- Contenedor principal. -->
    <div class="main-container">
      <!-- Sidebar lateral -->
      <SidebarComponent />

      <!-- Contenido principal. -->
      <main class="content">
        <div class="container-fluid py-4">
          <!-- Aquí se cargan las vistas hijas. -->
          <router-view />
        </div>

        <!-- Footer. -->
        <FooterComponent />
      </main>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  },
  data() {
    return {
      usuarioNombre: 'Usuario'
    }
  },
  mounted() {
    // Verificar si hay usuario logueado.
    const usuario = localStorage.getItem('usuario')

    if (!usuario) {
      // Si no hay usuario, redirigir al login.
      this.$router.push('/login')
    } else {
      // Cargar nombre del usuario.
      const usuarioObj = JSON.parse(usuario)
      this.usuarioNombre = usuarioObj.nombre
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
  padding-top: 56px; /* Altura del navbar. */
}

.content {
  flex: 1;
  margin-left: 250px; /* Ancho del sidebar. */
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 56px);
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
}
</style>