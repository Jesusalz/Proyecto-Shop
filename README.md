# Tienda Shop

## Descripción
Tienda Shop es una aplicación de comercio electrónico desarrollada en **React** utilizando **Vite**, que permite a los usuarios navegar, buscar y comprar productos en línea. La aplicación cuenta con una interfaz moderna y amigable, optimizada con **Tailwind CSS** para proporcionar un diseño responsivo y atractivo.

![Captura de Pantalla 1](/imagen1.png)

## Características Implementadas

1. **Navegación**:
   - Un **Navbar** que incluye un logo, un buscador de productos y botones para iniciar sesión, mostrar el nombre del usuario y cerrar sesión.
   - Enlaces de navegación para acceder a las diferentes secciones de la tienda.
   - **Referencia**: [React Router - Declarative Routing for React.js](https://reactrouter.com/en/main) 🔗

2. **Autenticación de Usuarios**:
   - Un formulario de inicio de sesión que permite a los usuarios autenticarse en la aplicación.
   - Implementación de **Redux** para gestionar el estado de autenticación y almacenar el token de usuario.
   - **Referencia**: [Redux - A Predictable State Container for JS Apps](https://redux.js.org/introduction/getting-started) 🔗
   - **Referencia**: [Redux Toolkit - The official, recommended way to write Redux logic](https://redux-toolkit.js.org/introduction/getting-started) 🔗

3. **Búsqueda de Productos**:
   - Funcionalidad para buscar productos a través de un buscador en el Navbar. Los resultados se muestran en una nueva página.
   - **Referencia**: [Building a Search Filter with React](https://www.freecodecamp.org/news/how-to-create-a-simple-search-filter-in-react/) 🔍

4. **Listado de Productos**:
   - Una página que muestra un listado de productos disponibles, cargados desde una API externa.
   - Integración de **Redux** para gestionar la carga de productos y categorías.
   - **Referencia**: [Fetching Data in React - useEffect and Axios](https://reactjs.org/docs/faq-ajax.html) 📦

5. **Categorías de Productos**:
   - Posibilidad de filtrar productos por categorías. Al hacer clic en una categoría, se muestran solo los productos correspondientes.
   - **Referencia**: [Conditional Rendering in React](https://reactjs.org/docs/conditional-rendering.html) ⚙️

6. **Responsive Design**:
   - Utilización de **Tailwind CSS** para garantizar que la aplicación sea responsiva y se vea bien en diferentes dispositivos.
   - **Referencia**: [Tailwind CSS Documentation](https://tailwindcss.com/docs) 📐

7. **Manejo de Errores**:
   - Mensajes de error informativos en caso de fallas en la carga de productos o en el proceso de inicio de sesión.
   - **Referencia**: [Error Handling in React](https://reactjs.org/docs/error-boundaries.html) 🚨

8. **Componente de Logout**:
   - Opción para cerrar sesión, eliminando el usuario y el token del estado de **Redux**.
   - **Referencia**: [Managing State with Redux](https://redux.js.org/tutorials/overview) 🔄

9. **Favoritos**:
   - Funcionalidad para permitir que los usuarios marquen productos como favoritos.
   - Almacenamiento de los productos favoritos en el estado global mediante **Redux**.
   - **Referencia**: [Managing State with Redux](https://redux.js.org/tutorials/overview) 🔄

10. **Perfil de Usuario**:
    - Sección donde los usuarios pueden ver y editar su información personal.
    - Integración con **Redux** para gestionar el estado del perfil del usuario.
    - **Referencia**: [React Forms - Controlled Components](https://reactjs.org/docs/forms.html) 📝

## Características Faltantes
- **Mejoras en la Interfaz de Usuario**: Continuar optimizando y refinando el diseño de la aplicación para mejorar la experiencia del usuario. 🎨

## Tecnologías Utilizadas
- **React** ![React Logo](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) 📖
  - [React Documentation](https://reactjs.org/docs/getting-started.html)
- **Redux** ![Redux Logo](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white) 📘
  - [Redux Documentation](https://redux.js.org/introduction/getting-started)
- **Tailwind CSS** ![Tailwind CSS Logo](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) 🎨
  - [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Vite** ![Vite Logo](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ⚡
  - [Vite Documentation](https://vitejs.dev/)
- **Axios** ![Axios Logo](https://img.shields.io/badge/-Axios-5A29E5?logo=axios&logoColor=white) 🌐
  - [Axios Documentation](https://axios-http.com/)
- **React Router** ![React Router Logo](https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router&logoColor=white) 🔗
  - [React Router Documentation](https://reactrouter.com/en/main)

