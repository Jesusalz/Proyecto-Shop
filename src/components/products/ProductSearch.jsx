import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services";
import { Input } from "@/components/common";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ProductSearch = () => {
  // Utilizo el hook de navegación para manejar redirecciones
  const navigate = useNavigate();

  // Gestiono el estado de la búsqueda
  // Controlo el término de búsqueda, sugerencias, carga y posibles errores
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utilizo un hook personalizado para debounce
  // Me ayuda a limitar las solicitudes de búsqueda mientras el usuario escribe
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Efecto para obtener sugerencias de búsqueda
  // Se activa cuando el término de búsqueda cambia
  useEffect(() => {
    const fetchSuggestions = async () => {
      // Reinicio el estado de error
      setError(null);

      // Verifico si el término de búsqueda es lo suficientemente largo
      if (debouncedSearch.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      // Inicio el estado de carga
      setIsLoading(true);
      try {
        // Busco sugerencias utilizando el servicio de productos
        const { products } = await productService.searchProducts(debouncedSearch, { limit: 5 });
        
        // Actualizo las sugerencias
        setSuggestions(products.length ? products : []);
        
        // Manejo el caso de sin resultados
        if (!products.length) setError("No se encontraron productos.");
      } catch (error) {
        // Registro y manejo de errores
        console.error("Error searching products:", error);
        setError("Hubo un problema con la búsqueda. Inténtalo más tarde.");
      } finally {
        // Finalizo el estado de carga
        setIsLoading(false);
      }
    };

    // Ejecuto la búsqueda de sugerencias
    fetchSuggestions();
  }, [debouncedSearch]);

  // Método para manejar la búsqueda completa
  const handleSearch = async (e) => {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();

    // Valido la longitud mínima del término de búsqueda
    if (searchTerm.trim().length < 2) {
      setError("El término de búsqueda debe tener al menos 2 caracteres.");
      return;
    }

    try {
      // Inicio el estado de carga
      setIsLoading(true);

      // Realizo la búsqueda de productos
      const searchResults = await productService.searchProducts(searchTerm);

      // Navego a la página de resultados con los datos de búsqueda
      navigate("/search", {
        state: {
          results: searchResults.products,
          query: searchTerm,
          total: searchResults.total,
        },
      });

      // Limpio las sugerencias
      setSuggestions([]);
    } catch (error) {
      // Manejo de errores
      console.error("Error en la búsqueda:", error);
      setError("Hubo un problema con la búsqueda.");
    } finally {
      // Finalizo el estado de carga
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          {/* Input de búsqueda */}
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => {
              // Actualizo el término de búsqueda
              setSearchTerm(e.target.value);
              // Limpio cualquier error previo
              setError(null);
            }}
            className="pl-10"
          />
          {/* Ícono de búsqueda */}
          <MagnifyingGlassIcon 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          />
        </div>
      </form>

      {/* Manejo de errores */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Indicador de carga */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Lista de sugerencias */}
      {!isLoading && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul className="py-1">
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // Navego al detalle del producto
                  navigate(`/products/${product.id}`);
                  // Limpio el término de búsqueda y sugerencias
                  setSearchTerm("");
                  setSuggestions([]);
                }}
              >
                {product.title} {/* Muestro el título del producto */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;

//Visita mi GitHub: https://github.com/Jesusalz