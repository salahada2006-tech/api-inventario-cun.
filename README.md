# API REST - Análisis e Inventario de Productos

Este proyecto expone una API REST desarrollada con **Node.js** y **Express** para gestionar e iterar sobre un listado de productos de inventario.

## 📌 Endpoints disponibles

* `GET /api/productos` - Obtener la lista completa de productos.
* `GET /api/productos?categoria=Tecnología` - Filtrar productos únicamente de la categoría Tecnología.
* `GET /api/productos?minPrecio=100000` - Filtrar productos con precio mayor a $100.000.
* `GET /api/productos/metricas` - Obtener el valor total del inventario, el producto con mayor stock y el conteo agrupado por categoría.
* `GET /api/productos/:id` - Buscar un producto específico por su ID.
* `POST /api/productos` - Agregar un nuevo producto al inventario.

## 🧪 Respuesta de Ejemplo (Métricas)

```json
{
  "status": "success",
  "data": {
    "valorTotalInventario": 41250000,
    "productoMayorStock": {
      "id": 2,
      "nombre": "Mouse Logitech",
      "precio": 120000,
      "stock": 25,
      "categoria": "Tecnología"
    },
    "agrupadoPorCategoria": {
      "Tecnología": 4,
      "Muebles": 2,
      "Audio": 2
    }
  }
}
