# Biblioteca — API REST + Frontend

- `backend/`: Node.js + Express. Datos en memoria, CORS habilitado, docs Swagger en `/api-docs`.
- `frontend/`: React (Vite).

## Ejecutar

```bash
cd backend && npm install && npm start      # http://localhost:3000  (docs: /api-docs)
cd frontend && npm install && npm run dev   # http://localhost:5173
```

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | /api/libros | 200 lista de libros |
| POST | /api/libros | 201 libro creado · 400 si falta título o autor |
| DELETE | /api/libros/{id} | 204 eliminado · 404 si no existe |
