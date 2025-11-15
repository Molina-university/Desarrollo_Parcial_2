<template>
  <div class="sidebar" :class="{ 'sidebar-hidden': !isOpen }">
    <!-- Botón toggle para móvil. -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      {{ isOpen ? '◀' : '▶' }}
    </button>
    
    <div class="sidebar-header p-3">
      <h5>📖 Menú</h5>
    </div>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link" active-class="active" exact>
          <i>🏠</i> Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/productos" class="nav-link" active-class="active">
          <i>📚</i> Libros
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/clientes" class="nav-link" active-class="active">
          <i>👥</i> Clientes
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/valoraciones" class="nav-link" active-class="active">
          <i>⭐</i> Valoraciones
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      isOpen: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    }
  },
  mounted() {
    // Cerrar automáticamente en pantallas pequeñas.
    if (window.innerWidth < 768) {
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 56px;
  z-index: 100;
  background-color: var(--color-dark);
  transition: transform 0.3s ease;
}

.sidebar-hidden {
  transform: translateX(-250px);
}

.sidebar-toggle {
  position: absolute;
  right: -30px;
  top: 70px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 10px 8px;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  z-index: 101;
}

.sidebar-toggle:hover {
  background-color: var(--color-primary-light);
}

.sidebar-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-light);
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  padding: 12px 20px;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background-color: var(--color-primary);
  color: white;
}

.nav-link i {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-250px);
  }
  
  .sidebar.sidebar-hidden {
    transform: translateX(-250px);
  }
  
  .sidebar:not(.sidebar-hidden) {
    transform: translateX(0);
  }
}
</style>