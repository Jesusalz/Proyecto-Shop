# Tienda Shop

## Descripción
Tienda Shop es una aplicación de comercio electrónico desarrollada en React utilizando Vite, que permite a los usuarios navegar, buscar y comprar productos en línea. La aplicación cuenta con una interfaz moderna y amigable, optimizada con Tailwind CSS para proporcionar un diseño responsivo y atractivo.


![Captura de Pantalla 1](/ima1.png)


## Características Implementadas

1. **Navegación**:
   - Un **Navbar** que incluye un logo, un buscador de productos y botones para iniciar sesión, mostrar el nombre del usuario y cerrar sesión.
   - Enlaces de navegación para acceder a las diferentes secciones de la tienda.
   - **Referencia**: [React Router - Declarative Routing for React.js](https://reactrouter.com/en/main) 🔗

2. **Autenticación de Usuarios**:
   - Un formulario de inicio de sesión que permite a los usuarios autenticarse en la aplicación.
   - Implementación de Redux para gestionar el estado de autenticación y almacenar el token de usuario.
   - **Referencia**: [Redux - A Predictable State Container for JS Apps](https://redux.js.org/introduction/getting-started) 🔗
   - **Referencia**: [Redux Toolkit - The official, recommended way to write Redux logic](https://redux-toolkit.js.org/introduction/getting-started) 🔗

3. **Búsqueda de Productos**:
   - Funcionalidad para buscar productos a través de un buscador en el Navbar. Los resultados se muestran en una nueva página.
   - **Referencia**: [Building a Search Filter with React](https://www.freecodecamp.org/news/how-to-create-a-simple-search-filter-in-react/) 🔍

4. **Listado de Productos**:
   - Una página que muestra un listado de productos disponibles, cargados desde una API externa.
   - Integración de Redux para gestionar la carga de productos y categorías.
   - **Referencia**: [Fetching Data in React - useEffect and Axios](https://reactjs.org/docs/faq-ajax.html) 📦

5. **Categorías de Productos**:
   - Posibilidad de filtrar productos por categorías. Al hacer clic en una categoría, se muestran solo los productos correspondientes.
   - **Referencia**: [Conditional Rendering in React](https://reactjs.org/docs/conditional-rendering.html) ⚙️

6. **Responsive Design**:
   - Utilización de Tailwind CSS para garantizar que la aplicación sea responsiva y se vea bien en diferentes dispositivos.
   - **Referencia**: [Tailwind CSS Documentation](https://tailwindcss.com/docs) 📐

7. **Manejo de Errores**:
   - Mensajes de error informativos en caso de fallas en la carga de productos o en el proceso de inicio de sesión.
   - **Referencia**: [Error Handling in React](https://reactjs.org/docs/error-boundaries.html) 🚨

8. **Componente de Logout**:
   - Opción para cerrar sesión, eliminando el usuario y el token del estado de Redux.
   - **Referencia**: [Managing State with Redux](https://redux.js.org/tutorials/overview) 🔄

## Características Faltantes
- **Agregar Productos a Favoritos**: Implementar funcionalidad para que los usuarios puedan marcar productos como favoritos. ⭐
- **Perfil de Usuario**: Crear una sección donde los usuarios puedan ver y editar su información personal. 👤
- **Mejoras en la Interfaz de Usuario**: Continuar optimizando y refinando el diseño de la aplicación para mejorar la experiencia del usuario. 🎨

## Tecnologías Utilizadas
- **React**: Para construir la interfaz de usuario. [React Documentation](https://reactjs.org/docs/getting-started.html) 📖
- **Redux**: Para gestionar el estado de la aplicación. [Redux Documentation](https://redux.js.org/introduction/getting-started) 📘
- **Tailwind CSS**: Para estilos y diseño responsivo. [Tailwind CSS](https://tailwindcss.com/) 🎨
