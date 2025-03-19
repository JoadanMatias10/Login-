import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoCard from "../../../components/CARD/ProductosCard"; // Asegúrate de que la ruta sea correcta

// Definir la interfaz para el tipo "Producto"
interface Producto {
  _id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  // Agrega otras propiedades según la respuesta de tu API
}

const AllProducts = () => {
  
  const [productos, setProductos] = useState<Producto[]>([]); // Estado tipado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado tipado

  const fetchProductos = async () => {
    try {
      const response = await axios.get("https://server-seven-iota-59.vercel.app/productos");
      setProductos(response.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Guardar el mensaje de error
      } else {
        setError("Ocurrió un error desconocido"); // Manejar otros tipos de errores
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) {
    return <div className="loading-message">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="all-products-container">
      <h1>Lista de Productos</h1>
      <div className="productos-grid">
        {productos.map((producto) => (
          <ProductoCard key={producto._id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;