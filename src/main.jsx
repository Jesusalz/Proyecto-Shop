import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Importa el store y el persistor
import App from './App';
import './index.css'; // Importa los estilos globales
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Configura Day.js en español
import relativeTime from 'dayjs/plugin/relativeTime'; // Plugin para tiempos relativos
import localizedFormat from 'dayjs/plugin/localizedFormat'; // Plugin para formatos localizados

// Configura Day.js
dayjs.locale('es'); // Establece el idioma en español
dayjs.extend(relativeTime); // Extiende Day.js con el plugin de tiempos relativos
dayjs.extend(localizedFormat); // Extiende Day.js con el plugin de formatos localizados

// Crea la raíz de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Desactiva los logs en producción
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}