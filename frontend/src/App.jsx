import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/api/libros';

export default function App() {
  const [libros, setLibros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [error, setError] = useState('');

  const cargarLibros = async () => {
    const res = await fetch(API);
    setLibros(await res.json());
  };

  useEffect(() => {
    cargarLibros().catch(() => setError('No se pudo conectar con la API'));
  }, []);

  const crearLibro = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, autor }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }
    setTitulo('');
    setAutor('');
    cargarLibros();
  };

  const eliminarLibro = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    cargarLibros();
  };

  return (
    <div className="container">
      <h1>📚 Biblioteca</h1>

      <form onSubmit={crearLibro}>
        <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
        <button type="submit" className="btn-agregar">Agregar</button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="lista">
        {libros.map((libro) => (
          <div className="libro" key={libro.id}>
            <h3>{libro.titulo}</h3>
            <p>{libro.autor}</p>
            <button className="btn-eliminar" onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
          </div>
        ))}
        {libros.length === 0 && <p>No hay libros todavía.</p>}
      </div>
    </div>
  );
}
