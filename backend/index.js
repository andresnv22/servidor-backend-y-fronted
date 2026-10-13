const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());

let libros = [
  { id: 1, titulo: 'la peste negra', autor: 'benedictow' },
  { id: 2, titulo: 'el principe', autor: 'nicolo machiavelli' },
];
let nextId = 3;

app.get('/api/libros', (req, res) => {
  res.status(200).json(libros);
});

app.post('/api/libros', (req, res) => {
  const { titulo, autor } = req.body || {};
  if (!titulo || !autor) {
    return res.status(400).json({ error: 'El título y el autor son obligatorios' });
  }
  const libro = { id: nextId++, titulo, autor };
  libros.push(libro);
  res.status(201).json(libro);
});

app.delete('/api/libros/:id', (req, res) => {
  const id = Number(req.params.id);
  const existe = libros.some((l) => l.id === id);
  if (!existe) return res.status(404).json({ error: 'Libro no encontrado' });
  libros = libros.filter((l) => l.id !== id);
  res.status(204).send();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}  |  Docs en http://localhost:${PORT}/api-docs`);
});
