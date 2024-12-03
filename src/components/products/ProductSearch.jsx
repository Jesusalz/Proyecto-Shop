import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services";
import { Input } from "@/components/common";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ProductSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Efecto para obtener sugerencias
  useEffect(() => {
    const fetchSuggestions = async () => {
      setError(null);
      if (debouncedSearch.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { products } = await productService.searchProducts(debouncedSearch, { limit: 5 });
        setSuggestions(products.length ? products : []);
        if (!products.length) setError("No se encontraron productos.");
      } catch (error) {
        console.error("Error searching products:", error);
        setError("Hubo un problema con la búsqueda. Inténtalo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  // Método para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim().length < 2) {
      setError("El término de búsqueda debe tener al menos 2 caracteres.");
      return;
    }

    try {
      setIsLoading(true);
      const searchResults = await productService.searchProducts(searchTerm);
      navigate("/search", {
        state: {
          results: searchResults.products,
          query: searchTerm,
          total: searchResults.total,
        },
      });
      setSuggestions([]);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setError("Hubo un problema con la búsqueda.");
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        {/* Input de búsqueda */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setError(null);
            }}
            className="pl-10"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  navigate(`/products/${product.id}`);
                  setSearchTerm("");
                  setSuggestions([]);
                }}
              >
                {product.title} {/* Usando 'title' en lugar de 'name' */}
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