# 📚 Librería Online - Sistema de Gestión

Sistema web modular para la gestión de una librería online, desarrollado con **Vue.js 3** y **Bootstrap 5.3**.

---

## 🎯 Descripción del Proyecto

Aplicación web que permite gestionar el catálogo de libros de una librería, administrar clientes y visualizar valoraciones. Incluye autenticación de usuarios, consumo de API externa y diseño responsive.

**Características principales:**
- 📖 Gestión completa de libros (CRUD)
- 👥 Registro y administración de clientes
- ⭐ Sistema de valoraciones
- 🔐 Autenticación de usuarios
- 🌙 Modo oscuro
- 📱 Diseño responsive

---

## 🚀 Tecnologías Utilizadas

- **Vue.js 3** - Framework JavaScript
- **Vue Router 4** - Enrutamiento
- **Bootstrap 5.3** - Framework CSS
- **Axios** - Peticiones HTTP
- **Google Books API** - API externa de libros

---

    ## 📁 Estructura del Proyecto
    ```
    src/
    ├── components/          # Componentes reutilizables
    │   ├── NavbarComponent.vue
    │   ├── SidebarComponent.vue
    │   ├── FooterComponent.vue
    │   └── ProductCardComponent.vue
    ├── views/              # Vistas principales
    │   ├── LoginView.vue
    │   ├── DashboardView.vue
    │   ├── HomeView.vue
    │   ├── ProductView.vue
    │   ├── ClientesView.vue
    │   └── ValoracionesView.vue
    ├── services/           # Servicios de API
    │   └── productService.js
    ├── data/               # Datos locales
    │   └── usuarios.json
    ├── assets/styles/      # Estilos personalizados
    │   ├── variables.css
    │   └── home.css
    └── router/             # Configuración de rutas
        └── index.js
    ```
    ---

## 🧩 Modularización

### Componentes Reutilizables

**ProductCardComponent.vue** - Tarjeta de libro que recibe datos por props y emite eventos:
```vue
<ProductCardComponent 
  :producto="libro"
  @ver-detalle="verDetalle"
  @editar="editarProducto"
  @eliminar="eliminarProducto"
/>
```

**NavbarComponent.vue** - Barra superior con nombre de usuario y modo oscuro:
```vue
<NavbarComponent :usuario-nombre="usuarioNombre" />
```

### Consumo de API Externa

Servicio centralizado para gestionar libros:
```javascript
// Obtener todos los libros
const libros = await productService.getAllProducts()

// Crear un libro
await productService.createProduct(nuevoLibro)

// Actualizar un libro
await productService.updateProduct(id, libroActualizado)

// Eliminar un libro
await productService.deleteProduct(id)
```

---

## 🔄 Rutas (Vue Router)
```
/                          → Redirige a /login
/login                     → Inicio de sesión
/dashboard                 → Dashboard principal
/dashboard/productos       → Gestión de libros
/dashboard/clientes        → Gestión de clientes
/dashboard/valoraciones    → Sistema de valoraciones
```

**Protección de rutas:** Las rutas del dashboard requieren autenticación mediante guard de navegación.

---

## 🎨 Paleta de Colores

Tema colonial cálido inspirado en librerías clásicas:
```css
--color-primary: #5A0F19    /* Borgoña oscuro */
--color-secondary: #8A3119   /* Terracota */
--color-accent: #945737      /* Marrón cálido */
--color-light: #EBDACC       /* Beige claro */
```

---

## 💻 Instalación y Uso

### Prerrequisitos
- Node.js (v16+)
- npm

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU-USUARIO/libreria-online.git
cd libreria-online
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run serve
```

4. **Abrir en el navegador**
```
http://localhost:8080
```

5. **Iniciar sesión**
- Usuario: `admin` / Contraseña: `admin123`
- Usuario: `usuario` / Contraseña: `user123`

---

## 🔐 Nota de Seguridad

⚠️ **Este sistema simplemente es algo que hicimos con fines academicos y no pretendemos ampliarlo o llevarlo a una aplicacion real con datos sensibles reales.**

---

## 👥 Equipo de Desarrollo

- **[Jhoan molina 192490]** - [https://github.com/Molina-university]
- **[Paula echavez 192487]** - [https://github.com/paula8787]

---

## 🤝 Trabajo Colaborativo

### Commits principales:
- Subiendo del local (ya que Jhoan M tenia todo el proyecto guardado en el computador y no lo habia pusheado al repositorio correspondiente)
- Arreglos menores (Arreglos de cosas que quitamos o añadimos a la logica del programa )
- libros (cargamos el catalogo de libros completo)
- Actualizacion final (Terminamos todos los arreglos y confiamos que todo esta correcto ya)

### Ramas utilizadas:
- `main` - Rama principal