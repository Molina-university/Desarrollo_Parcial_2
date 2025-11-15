import axios from 'axios'

// API de Google Books
const API_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = 'AIzaSyBXm_WLSr-L4sCGB5QLJx0f3xJq6Xc0GFw' // Key pública de ejemplo

// Simulación de almacenamiento local para los libros
let librosLocales = []
let nextId = 100

export default {
  // Obtener todos los libros
  async getAllProducts() {
    try {
      // Si ya tenemos libros locales, devolverlos
      if (librosLocales.length > 0) {
        return librosLocales
      }

      // Buscar libros en español sobre varios temas
      const temas = ['ficción', 'historia', 'ciencia', 'arte']
      const promesas = temas.map(tema =>
        axios.get(`${API_URL}?q=${tema}&langRestrict=es&maxResults=5&key=${API_KEY}`)
      )

      const resultados = await Promise.all(promesas)
      
      librosLocales = resultados.flatMap(response =>
        response.data.items.map((item) => ({
          id: nextId++,
          title: item.volumeInfo.title || 'Sin título',
          price: (Math.random() * (50 - 10) + 10).toFixed(2),
          category: item.volumeInfo.categories?.[0] || 'General',
          description: item.volumeInfo.description || 'Sin descripción disponible',
          image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/200x300?text=Sin+Imagen',
          rating: {
            rate: item.volumeInfo.averageRating || (Math.random() * (5 - 3) + 3).toFixed(1),
            count: item.volumeInfo.ratingsCount || Math.floor(Math.random() * 200)
          },
          author: item.volumeInfo.authors?.[0] || 'Autor desconocido',
          publisher: item.volumeInfo.publisher || 'Editorial desconocida',
          isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A'
        }))
      )

      return librosLocales
    } catch (error) {
      console.error('Error al obtener libros:', error)
      // Devolver libros de ejemplo si falla la API
      return this.getLibrosEjemplo()
    }
  },

  // Libros de ejemplo por si falla la API
  getLibrosEjemplo() {
    return [
      {
        id: 1,
        title: 'Cien años de soledad',
        price: '25.99',
        category: 'Ficción',
        description: 'La obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/91TvVQS7loL.jpg',
        rating: { rate: 4.8, count: 1250 },
        author: 'Gabriel García Márquez',
        publisher: 'Editorial Sudamericana',
        isbn: '978-0307474728'
      },
      {
        id: 2,
        title: 'Don Quijote de la Mancha',
        price: '19.99',
        category: 'Clásicos',
        description: 'La obra cumbre de Miguel de Cervantes sobre las aventuras del ingenioso hidalgo.',
        image: 'http://3.bp.blogspot.com/-9qnowouOH7A/UbD8EiJifgI/AAAAAAAACFk/mLfuFCvp5qM/s1600/don-quijote-de-la-mancha-cervantes-edic-anaconda_MLA-F-139991622_1763.jpg',
        rating: { rate: 4.7, count: 890 },
        author: 'Miguel de Cervantes',
        publisher: 'Real Academia Española',
        isbn: '978-8420412146'
      },
      {
        id: 3,
      title: "1984",
      price: "29.99",  
      category: "Distopía / Clásico",
      description: "Novela distópica de George Orwell sobre vigilancia masiva, manipulación del lenguaje y totalitarismo.",
      image: "https://m.media-amazon.com/images/I/81Q+XX12+yL._SL1500_.jpg",
      rating: { rate: 4.8, count: 61 },
      author: "George Orwell",
      publisher: "Secker & Warburg",  
      isbn: "0452284236" 
      },
      {
      id: 4,
      title: "Cien años de soledad",
      price: "29.99",
      category: "Clásicos / Realismo mágico",
      description: "La epopeya de la familia Buendía en el mítico pueblo de Macondo, una mezcla de historia, mitos y realismo mágico.",
      image: "https://imagessl4.casadellibro.com/a/l/t0/64/9788439731764.jpg",
      rating: { rate: 4.9, count: 215 },
      author: "Gabriel García Márquez",
      publisher: "Random House", 
      isbn: "9788439728368" 
      },
      {
      id: 5,
      title: "El principito",
      price: "15.99",
      category: "Infantil / Filosófico",
      description: "Un pequeño príncipe viaja desde su asteroide a la Tierra, encontrando personajes que le enseñan sobre la vida, la amistad y la esencia de las cosas.",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1676417220i/119063266.jpg",
      rating: { rate: 4.8, count: 51 },
      author: "Antoine de Saint-Exupéry",
      publisher: "Difusora Larousse", 
      isbn: "9786072133426" 
      },
      {
      id: 6,
      title: "Orgullo y prejuicio",
      price: "10.99",
      category: "Clásico romántico",
      description: "Novela de Jane Austen sobre las convenciones sociales, el amor y los prejuicios, centrada en Elizabeth Bennet y el señor Darcy.",
      image: "https://m.media-amazon.com/images/I/51o5dnjk07L._SX331_BO1,204,203,200_.jpg",
      rating: { rate: 5.0, count: 4 },
      author: "Jane Austen",
      publisher: "Austral",  
      isbn: "9788467045642" 
      },
      {
      id: 7,
      title: "Crimen y castigo",
      price: "23.99",
      category: "Clásico / Psicológico",
      description: "La intensa historia de Raskólnikov, un joven estudiante que comete un crimen con la creencia de que puede justificarlo moralmente, pero se enfrenta a la culpa.",
      image: "https://assets-global.website-files.com/6034d7d1f3e0f52c50b2adee/6254541d8ae4df16d4e69bc8_6034d7d1f3e0f54529b2b1a1_Crimen-y-castigo-fiodor-dostoyevski-editorial-alma.jpeg",
      rating: { rate: 4.8, count: 32 },
      author: "Fiódor Dostoyevski",
      publisher: "Penguin Clásicos", 
      isbn: "9788491050063" 
      },
      {
      id: 8,
      title: "Sapiens: De animales a dioses",
      price: "25.99",
      category: "No ficción / Historia",
      description: "Un fascinante recorrido por la historia de la humanidad, desde la aparición del Homo sapiens hasta nuestras sociedades modernas.",
      image: "https://cdnb.artstation.com/p/assets/images/images/060/840/091/large/munachiso-nweke-edited-text-final-sapiens.jpg?1679427786",
      rating: { rate: 4.8, count: 722 },
      author: "Yuval Noah Harari",
      publisher: "Cornerstone / Penguin",  
      isbn: "9781529913934"
      },
      {
      id: 9,
      title: "El diario de Ana Frank",
      price: "32.99",
      category: "Testimonio / Historia",
      description: "Las memorias íntimas de Ana Frank, una niña judía escondida durante la Segunda Guerra Mundial, que reflejan sus miedos, esperanza y humanidad.",
      image: "https://m.media-amazon.com/images/I/51Bz60iDotL._SX331_BO1,204,203,200_.jpg",
      rating: { rate: 4.8, count: 389 },
      author: "Ana Frank",
      publisher: "Mundo del Libro / Edición latinoamericana", 
      isbn: "9789584860569"  
      },
      {
      id: 10,
      title: "Fahrenheit 451",
      price: "15.99",
      category: "Distopía / Ciencia ficción",
      description: "Novela de Ray Bradbury sobre una sociedad en que los libros están prohibidos y los ‘bomberos’ queman cualquier libro que encuentran.",
      image: "https://www.estudioenescarlata.com/media/img/portadas/_visd_0001JPG01JGV.jpg",
      rating: { rate: 4.6, count: 37 },
      author: "Ray Bradbury",
      publisher: "Simon & Schuster / Edición común",
      isbn: "9781451673319" 
      },
      {
      id: 11,
      title: "La sombra del viento",
      price: "18.99",
      category: "Novela de misterio / Literaria",
      description: "En la Barcelona posguerra, Daniel Sempere descubre un libro maldito que lo lleva a desentrañar secretos, intrigas y amores ocultos entre las páginas.",
      image: "https://imagessl7.casadellibro.com/a/l/t0/07/9788408093107.jpg",
      rating: { rate: 4.8, count: 128 },
      author: "Carlos Ruiz Zafón",
      publisher: "Planeta / Booket", 
      isbn: "9788408092643" 
      },
      {
      id: 12,
      title: "El poder del ahora",
      price: "12.99",
      category: "Autoayuda / Espiritualidad",
      description: "Guía de Eckhart Tolle para vivir en el presente, liberar la mente del pasado y el futuro, y encontrar paz interior.",
      image: "https://http2.mlstatic.com/el-poder-del-ahora-eckhart-tolle-grijalbo-D_NQ_NP_3542-MLM4453425417_062013-F.jpg",
      rating: { rate: 4.8, count: 366 },
      author: "Eckhart Tolle",
      publisher: "Penguin Libros",
      isbn: "9789588618791"
      }

    ]
  },

  // Obtener un libro por ID
  async getProductById(id) {
    const libros = await this.getAllProducts()
    return libros.find(libro => libro.id === id)
  },

  // Crear un libro nuevo
  async createProduct(product) {
    const nuevoLibro = {
      ...product,
      id: nextId++,
      rating: { rate: 0, count: 0 }
    }
    librosLocales.push(nuevoLibro)
    return nuevoLibro
  },

  // Actualizar un libro
  async updateProduct(id, product) {
    const index = librosLocales.findIndex(libro => libro.id === id)
    if (index !== -1) {
      librosLocales[index] = { ...librosLocales[index], ...product }
      return librosLocales[index]
    }
    throw new Error('Libro no encontrado')
  },

  // Eliminar un libro
  async deleteProduct(id) {
    const index = librosLocales.findIndex(libro => libro.id === id)
    if (index !== -1) {
      librosLocales.splice(index, 1)
      return { success: true, id }
    }
    throw new Error('Libro no encontrado')
  }
}