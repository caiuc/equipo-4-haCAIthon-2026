# RIU · Frontend

Prueba de concepto de la app **RIU (Earthbound Delivery)** en React + Vite.
Toda la información es **ficticia**: no hay backend, cobros ni cámara real.

## Puesta en marcha

```bash
cd app
npm install
npm run dev      # http://localhost:5173
npm run build    # compila a dist/
npm run lint
```

## Decisiones de producto

- **Idioma:** español (Chile). Números y fechas con `Intl` en `es-CL`.
- **Moneda de gamificación:** los "Green Points" del prototipo se llaman **Flora**.
- **Precios:** pesos chilenos (`$8.900`), formateados en [`src/lib/format.ts`](src/lib/format.ts).
- **Eco-Partner:** insignia para comercios con **más de 30%** de ventas con envase
  sustentable (`ECO_PARTNER_THRESHOLD`). Esos comercios encabezan el feed y la búsqueda.

## Sistema de diseño

Los tokens de [`DESIGN.md`](../DESIGN.md) están en `@theme` dentro de
[`src/index.css`](src/index.css): paleta Material 3 completa, escalas tipográficas
(Plus Jakarta Sans + Inter), grilla de 8px, radios "hyper-rounded" y sombras
ambientales tintadas en verde bosque. No hay colores sueltos fuera de esos tokens.

Utilidades propias:

| Utilidad    | Para qué sirve                                                        |
| ----------- | --------------------------------------------------------------------- |
| `page`      | Columna centrada de 1200px con margen de seguridad de 20px            |
| `page-rail` | Carrusel a sangre alineado con `page` en su primer ítem               |
| `pebble`    | Fondo orgánico irregular para los iconos de impacto                   |

## Rutas

| Ruta                    | Pantalla                                          |
| ----------------------- | ------------------------------------------------- |
| `/`                     | Feed sustentable (pantalla 1 del prototipo)       |
| `/explorar`             | Búsqueda, filtros y orden por sustentabilidad     |
| `/restaurante/:slug`    | Detalle del comercio (pantalla 2)                 |
| `/devoluciones`         | Hub de devoluciones y recompensas (pantalla 3)    |
| `/ranking`              | Ranking social de CO₂ (pantalla 4)                |
| `/perfil`               | Perfil, insignias y favoritos                     |
| `/checkout`             | Confirmación de pedido                            |
| `/pedido-confirmado`    | Celebración post-pedido                           |

Además hay tres capas globales: carrito lateral, escáner QR simulado y avisos flotantes.

## Estado

Un único `AppProvider` ([`src/store/AppStore.tsx`](src/store/AppStore.tsx)) con
`useReducer`. Es el que da vida a la demo: agregar al carrito recalcula el descuento
por envase retornable, confirmar un pedido acredita Flora y genera un envase nuevo,
y escanear su QR lo devuelve sumando Flora y CO₂ evitado.

El estado vive en memoria: al recargar la página vuelve a los datos iniciales de
[`src/data/mock.ts`](src/data/mock.ts).

## Responsividad

La navegación cambia en `lg` (1024px): bajo ese ancho manda la barra inferior tipo
app móvil; sobre él, la barra superior de escritorio. Las grillas de contenido
siguen usando `md`. Verificado sin desbordamiento horizontal en 360, 390, 768,
1024 y 1440px.

## Accesibilidad

Roles y `aria-label` en controles interactivos, foco visible con anillo verde hoja,
y toda la animación se desactiva con `prefers-reduced-motion`.
