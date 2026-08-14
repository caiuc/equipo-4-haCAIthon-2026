# RIU · Resumen completo del proyecto

> Equipo 4 · HaCAiThon 2026 · Centro de Alumnos de Ingeniería UC
> Desafío: **Sustentabilidad** · Licencia MIT

Documento único de referencia: qué contiene el repositorio, qué problema resuelve el
producto y el detalle de **todas** las funcionalidades implementadas en la web.

---

## Índice

1. [Qué es RIU](#1-qué-es-riu)
2. [La problemática](#2-la-problemática)
3. [Cómo la resuelve](#3-cómo-la-resuelve)
4. [Contenido del repositorio](#4-contenido-del-repositorio)
5. [Stack y arquitectura del frontend](#5-stack-y-arquitectura-del-frontend)
6. [Sistema de diseño](#6-sistema-de-diseño)
7. [Reglas de negocio](#7-reglas-de-negocio)
8. [Funcionalidades por pantalla](#8-funcionalidades-por-pantalla)
9. [Funcionalidades transversales](#9-funcionalidades-transversales)
10. [Datos ficticios de la demo](#10-datos-ficticios-de-la-demo)
11. [Verificación realizada](#11-verificación-realizada)
12. [Limitaciones conocidas](#12-limitaciones-conocidas)
13. [Cómo ejecutarlo](#13-cómo-ejecutarlo)

---

## 1. Qué es RIU

RIU (*Earthbound Delivery*) es una **app de delivery de comida centrada en envases
retornables**. Su premisa es que el envase no se regala: se presta. El usuario lo recibe
con su pedido, lo usa y lo devuelve; por hacerlo obtiene un descuento inmediato y una
moneda interna llamada **Flora**.

Lo entregado en este repositorio es el **frontend completo como prueba de concepto**:
una web navegable de punta a punta, con estado real e interacciones funcionales, pero sin
backend, sin cobros y con datos íntegramente ficticios.

---

## 2. La problemática

Pedir comida por app es hoy uno de los gestos más cotidianos de la vida urbana, y también
uno de los más desechables: cada pedido llega envuelto en plástico, aluminio y cartón
plastificado que dura minutos en la mesa y siglos en el ambiente.

El problema tiene **tres capas que se refuerzan entre sí**:

| # | Capa | Descripción |
| :-- | :--- | :--- |
| 1 | **El envase es invisible para quien decide** | El usuario elige por sabor, precio y tiempo de entrega. La basura que va a generar no aparece en ninguna parte de la pantalla al momento de comprar. |
| 2 | **Elegir bien cuesta más** | Cuando existe alternativa sustentable, suele ser más cara o menos cómoda. La conducta responsable se castiga en vez de premiarse. |
| 3 | **Al comercio no le sirve cambiar** | Migrar a envases reutilizables implica costo y logística sin retorno comercial visible: nadie elige un local *porque* usa envase retornable, porque el usuario nunca se entera. |

El resultado es un círculo donde todos los actores prefieren, racionalmente, la opción más
contaminante. Cualquier solución que dependa solo de la buena voluntad del consumidor
ataca la capa 1 e ignora las otras dos.

---

## 3. Cómo la resuelve

RIU interviene las tres capas a la vez mediante **cuatro pilares**:

### 3.1 Envase retornable con descuento inmediato

Al momento de pedir, el usuario elige entre envase compostable estándar o retornable. La
segunda opción **descuenta pesos del total en ese mismo instante**, no como promesa
futura. Elegir bien deja de ser un sacrificio moral y pasa a ser la decisión
económicamente conveniente. *(Ataca la capa 2.)*

### 3.2 Red de devolución de tres vías

Devolver tiene que ser más fácil que botar. Hay tres caminos y el usuario usa el que le
quede de paso:

- **Puntos inteligentes en campus** — contenedores en bibliotecas y hubs universitarios,
  con capacidad y horario visibles.
- **Devolución en tienda** — en cualquier local participante.
- **Entrega al repartidor** — en el siguiente pedido, en la puerta de la casa; cero
  desvío.

Cada envase lleva un **código QR único**: escanearlo acredita la recompensa al instante y
cierra la trazabilidad del ciclo.

### 3.3 Competencia social de CO₂

Cada plato muestra su huella de carbono y cada devolución suma al contador personal de CO₂
evitado. Ese número alimenta un ranking entre amigos, con insignias por hitos de envases
devueltos. La sustentabilidad deja de ser un deber silencioso y se vuelve algo que se
compara y se comenta. *(Ataca la capa 1 y sostiene el hábito.)*

> **Sin rachas diarias.** Se evaluaron y se descartaron: premian abrir la app, no devolver
> envases. El ranking mide lo único que importa —CO₂ evitado y envases devueltos— para que
> la métrica visible sea la que genera impacto real.

### 3.4 Meta del 30% para comercios

Los locales que superan el **30% de sus ventas con envase sustentable** obtienen la
insignia **Eco-Partner**, prioridad en el feed y mejor posición en la búsqueda. La
sustentabilidad se traduce en visibilidad comercial. *(Ataca la capa 3.)*

### El circuito cerrado

Lo distintivo no es ninguna pieza por separado, sino cómo se encadenan:

```
   ①  El descuento atrae al usuario a elegir retornable
        ↓
   ②  La recompensa en Flora lo hace devolver el envase
        ↓
   ③  La devolución genera datos de trazabilidad
        ↓
   ④  Los datos premian al local con visibilidad
        ↓
   ⑤  El local pone más envases en circulación
        ↓
       (vuelve a ①)
```

Cada vuelta hace la siguiente más fácil, sin depender de que nadie mantenga alta la
motivación.

---

## 4. Contenido del repositorio

```
.
├── README.md                    Guía principal + bases oficiales del HaCAiThon 2026
├── ARCHITECTURE.md              Arquitectura, esquemas de datos y reglas para agentes IA
├── DESIGN.md                    Sistema de diseño: tokens, paleta, tipografía, espaciado
├── ROADMAP.md                   Hoja de ruta en 6 fases hacia producción
├── PITCH.md                     Presentación para el jurado + guion de 3 minutos
├── RESUMEN.md                   Este documento
├── LICENSE                      Licencia MIT
│
├── docs/
│   ├── FILE_INDEX.md            Mapa completo de archivos del repositorio
│   ├── SCREENS_OVERVIEW.md      Desglose funcional de las 4 pantallas del prototipo
│   └── DESIGN_SYSTEM_GUIDE.md   Cómo consumir los tokens de DESIGN.md en código
│
├── templates/                   Prototipos originales de Google Stitch (no se editan)
│   ├── index.html               Navegador para previsualizar las 4 pantallas
│   ├── home_sustainable_feed/   Pantalla 1 · code.html + screen.png
│   ├── restaurant_green_bowl/   Pantalla 2 · code.html + screen.png
│   ├── rewards_returns/         Pantalla 3 · code.html + screen.png
│   ├── impact_leaderboard/      Pantalla 4 · code.html + screen.png
│   └── global_overview/         overview.png
│
└── app/                         ★ Aplicación web (React + Vite)
    ├── README.md                Documentación técnica del frontend
    ├── index.html               Shell HTML, fuentes e iconos
    └── src/
        ├── main.tsx             Punto de entrada + BrowserRouter
        ├── App.tsx              Rutas, shell y transiciones de página
        ├── index.css            Tokens de diseño y utilidades
        ├── types.ts             Modelos de dominio en TypeScript
        ├── data/mock.ts         Todos los datos ficticios
        ├── lib/format.ts        Formato CLP/CO₂/Flora y umbral Eco-Partner
        ├── store/AppStore.tsx   Estado global (carrito, Flora, envases)
        ├── components/
        │   ├── ui/              Icon · SmartImage · CountUp · Reveal · Bits
        │   ├── layout/          TopAppBar · BottomNav · FloraBadge · navItems
        │   ├── MerchantCard.tsx
        │   ├── CartDrawer.tsx
        │   ├── ScannerModal.tsx
        │   └── ToastStack.tsx
        └── pages/               Home · Explore · RestaurantDetail · Returns
                                 Leaderboard · Profile · Checkout · OrderConfirmed
```

---

## 5. Stack y arquitectura del frontend

| Capa | Tecnología |
| :--- | :--- |
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS v4 (tokens vía `@theme`) |
| Animación | Motion (`motion/react`) |
| Ruteo | React Router 7 |
| Iconos | Material Symbols Outlined (fuente web) |
| Tipografía | Plus Jakarta Sans (display/cuerpo) + Inter (etiquetas) |

### Rutas

| Ruta | Pantalla |
| :--- | :--- |
| `/` | Feed sustentable de inicio |
| `/explorar` | Búsqueda, filtros y orden |
| `/restaurante/:slug` | Detalle del comercio |
| `/devoluciones` | Hub de devoluciones y recompensas |
| `/ranking` | Ranking social de CO₂ |
| `/perfil` | Perfil, insignias y favoritos |
| `/checkout` | Confirmación de pedido |
| `/pedido-confirmado` | Celebración post-pedido |
| `*` | Redirige al inicio |

### Estado global

Un único `AppProvider` con `useReducer` en [`app/src/store/AppStore.tsx`](app/src/store/AppStore.tsx).
Es lo que hace que la demo sea funcional y no una maqueta. Acciones disponibles:

`add` · `setQty` · `clearCart` · `setPackaging` · `toggleFavorite` · `placeOrder` ·
`returnContainer` · `redeem`

Valores derivados calculados en cada render: cantidad de ítems, subtotal, costo de envío,
descuento sustentable, total, CO₂ del pedido y Flora a ganar.

> El estado vive **en memoria**: al recargar la página se vuelve a los datos iniciales.

---

## 6. Sistema de diseño

Todos los tokens de [`DESIGN.md`](DESIGN.md) están cargados en `@theme` dentro de
[`app/src/index.css`](app/src/index.css). No hay colores sueltos fuera de esos tokens.

**Paleta** — roles Material 3 completos: verde bosque `#012d1d` (primario), verde hoja
`#116c4a` (secundario), menta `#a1f4c8`, crema tibia `#f9faf2` (fondo, más cálido que el
blanco puro), más un acento dorado para la gamificación.

**Tipografía** — escalas exactas: `display-lg` 40/48 · `headline-lg` 24/32 ·
`headline-mobile` 20/28 · `title-md` 18/24 · `body-lg` 16/24 · `body-md` 14/20 ·
`label-sm` 12/16.

**Espaciado** — grilla base de 8px, márgenes de seguridad de 20px, gutter de 16px, y
apilado `stack-sm` 4px / `stack-md` 12px / `stack-lg` 24px.

**Formas** — lenguaje "hyper-rounded": tarjetas de 12–24px, botones tipo píldora, buscador
completamente redondeado.

**Elevación** — sombras ambientales tintadas en verde bosque, no grises.

**Utilidades propias**

| Utilidad | Función |
| :--- | :--- |
| `page` | Columna centrada de 1200px con margen de seguridad de 20px |
| `page-rail` | Carrusel a sangre completa, alineado con `page` en su primer ítem |
| `pebble` | Fondo orgánico irregular para iconos de impacto |
| `no-scrollbar` | Oculta la barra de scroll en carruseles |

---

## 7. Reglas de negocio

### Umbral Eco-Partner

Un comercio obtiene la insignia con **más de 30%** de ventas con envase sustentable
(`ECO_PARTNER_THRESHOLD = 0.3`). Esto afecta tres cosas: aparece la insignia, el comercio
entra en "Recomendados para ti" del inicio, y sube en el orden por defecto de la búsqueda.

### Descuento y recompensa por envase

Cada comercio define su propio descuento y su recompensa en Flora por unidad:

| Comercio | Descuento | Flora / unidad |
| :--- | ---: | ---: |
| Green Bowl | $1.500 | 50 |
| Raíz Verde | $1.500 | 50 |
| Pura Pizza | $1.200 | 40 |
| Cosecha Local | $900 | 30 |
| Café Ciclo | $700 | 25 |
| Mar Adentro | — | — |

El descuento se aplica solo si el comercio ofrece envase retornable **y** el usuario lo
tiene seleccionado.

### Cálculo de CO₂ evitado

```
CO₂ del pedido = (Σ huella_plato × cantidad) × 0,25
               + (0,3 × n° de ítems, si usa envase retornable)

Devolver un envase = +0,3 kg de CO₂ evitado
```

> Los coeficientes son **estimaciones ilustrativas para la demo**, no un modelo validado.

### Moneda Flora

Reemplaza a los "Green Points" del prototipo original. Se gana al pedir con envase
retornable, al devolverlo y por invitar amigos; se gasta canjeando recompensas.
También puede usarse como medio de pago parcial, a razón de **1 Flora = $10 CLP**.

### Niveles

El usuario avanza por niveles temáticos (*Bosque Nativo* → *Guardián del Bosque*), con una
barra de progreso basada en la Flora que le falta.

### Moneda y formato

Precios en **pesos chilenos** sin decimales (`$8.900`), kilos de CO₂ con un decimal y coma
(`22,4`), todo mediante `Intl` en configuración regional `es-CL`.

---

## 8. Funcionalidades por pantalla

### 8.1 Inicio — feed sustentable

- Hero con titular "Buena comida. Mejor planeta.", hoja animada e ilustración vectorial
  original (bolsa de papel, hojas y planeta) con movimiento flotante continuo.
- Buscador que lleva a Explorar al recibir el foco, más botón de filtros.
- Cuatro categorías con icono: restaurantes sustentables, cero residuos, opciones
  vegetales, local y orgánico. Cada una navega con el filtro ya aplicado.
- **Tarjeta de impacto personal**: kg de CO₂ evitados con contador animado, equivalencia
  en kilómetros sin auto, y tres indicadores (envases devueltos, Flora, envases activos).
- **Carrusel de recomendados**: solo comercios Eco-Partner, con desplazamiento por
  arrastre y ajuste de scroll alineado al margen de la página.
- Banner de devoluciones que muestra cuántos envases tiene el usuario y lleva al hub.
- **Impacto de la comunidad**: tres estadísticas con contador animado (CO₂ ahorrado,
  residuos evitados, árboles plantados) más una barra de progreso hacia la meta comunitaria
  de envases en circulación.

### 8.2 Explorar — búsqueda y filtros

- Búsqueda de texto que cruza nombre del local, categoría, descripción **y nombres de
  platos**, con botón para limpiar.
- Filtros por categoría (sincronizados con la URL vía `?categoria=`) y conmutador
  "Solo Eco-Partner".
- Cuatro criterios de orden: más sustentables (por defecto), más rápidos, mejor evaluados,
  más cerca.
- Barra de filtros pegajosa al hacer scroll, con desenfoque de fondo.
- Contador de resultados y estado vacío ilustrado.
- Grilla responsiva de 1 / 2 / 3 columnas con entrada escalonada que se reanima al cambiar
  cualquier filtro.

### 8.3 Detalle del comercio

- Encabezado móvil pegajoso con volver y favorito.
- Imagen de portada con insignia Eco-Partner y su porcentaje real de ventas sustentables.
- Calificación con número de reseñas, descripción y chips de metadatos (tipo de envase,
  tiempo de entrega, costo de envío, distancia).
- **Barra de meta del 30%** con mensaje contextual: confirma el logro si la cumple, o
  indica cuánto le falta si no.
- Píldoras de categorías del menú con contenido intercambiable y animación de transición.
- **Platos** con descripción, precio, imagen, **etiqueta de huella de CO₂ por plato**,
  distintivo "Eco-Elección" o "Menor huella" cuando corresponde, botón de agregar e
  indicador de cantidad en el carrito.
- **Selector de preferencia de envase**: retornable (con su ahorro y Flora) frente a
  compostable estándar, con casillas ampliadas a 24px y marca de verificación animada.
  Muestra el aviso "elección cero residuos" al activar el retornable.
- Resumen de pedido pegajoso en escritorio, con desglose de subtotal, envío, descuento
  sustentable y total, más la Flora a ganar.
- Barra flotante de carrito en móvil con cantidad y total.
- Si el comercio no participa del programa, lo indica explícitamente en vez de ofrecer la
  opción.

### 8.4 Devoluciones — hub de recompensas

- **Tarjeta de saldo de Flora** con contador animado y barra de progreso hacia el
  siguiente nivel.
- **Envases en tu poder**: cantidad actual, total histórico devuelto, y la lista de cada
  envase con su tipo, comercio, código QR, días restantes y recompensa asociada.
- Botón de escaneo QR, deshabilitado cuando no hay envases pendientes.
- Explicación del proceso en tres pasos (ubicar, escanear, ganar).
- **Mapa ilustrado** con trama de calles, marcadores flotantes y anillos de pulso, más una
  tarjeta superpuesta del punto más cercano.
- **Lista de puntos de devolución** diferenciados por tipo (campus, tienda, repartidor),
  con dirección, horario, distancia y **barra de capacidad disponible** de los
  contenedores.
- **Catálogo de recompensas** con estados según saldo: canjeable o bloqueado. El canje
  descuenta Flora y registra el movimiento.
- **Historial de movimientos de Flora**, con ingresos en verde y egresos en rojo, que se
  actualiza en vivo con cada acción.

### 8.5 Ranking — competencia social de CO₂

- Cabecera con copa animada y anillo de pulso.
- **Resumen del mes** en tres indicadores compactos: CO₂ evitado, envases devueltos y
  posición actual.
- Conmutador Amigos / Global con píldora que se desplaza entre opciones.
- **Tarjeta de posición actual**: puesto, envases devueltos, CO₂ acumulado con contador
  animado, y la distancia exacta en kg para superar a quien va adelante, con barra de
  progreso.
- **Tabla de posiciones** ordenada dinámicamente por CO₂, con medallas para los tres
  primeros, resalte de la fila propia, envases devueltos por persona, insignias de logro
  y botones de "Animar" a otros o
  "Celebrar" el propio avance, que emiten una notificación.
- **Ranking de comercios más circulares**, con barra de porcentaje de ventas retornables,
  total de envases devueltos y verificación visual para quienes superan el 30%.
- **Grilla de insignias**, diferenciando las obtenidas de las bloqueadas.

### 8.6 Perfil

- Cabecera con avatar, nombre, usuario y nivel actual, sobre fondo verde profundo.
- Barra de progreso entre el nivel actual y el siguiente.
- Cuatro tarjetas de estadísticas con contador animado: Flora acumulada, CO₂ evitado,
  envases devueltos e insignias obtenidas.
- Tarjeta de envases en circulación con la Flora que se ganaría al devolverlos y acceso
  directo al hub.
- Lista de insignias con su fecha de obtención o la condición para desbloquearlas.
- Grilla de comercios favoritos.
- Lista de configuración (direcciones, recordatorios, medios de pago, invitar amigos,
  ayuda).

### 8.7 Checkout

- Dirección de entrega con tiempo estimado y distintivo de reparto en bicicleta eléctrica.
- Conmutador de envase retornable que recalcula el total en vivo.
- **Dos medios de pago**: tarjeta, o pagar parcialmente con Flora mostrando cuánto cubre.
- Resumen del pedido con desglose completo y descuento sustentable animado al aparecer.
- Aviso del CO₂ que evita el pedido y la Flora que otorga.
- **Vista de procesamiento** durante la confirmación, y advertencia explícita de que no se
  realiza ningún cobro real.

### 8.8 Pedido confirmado

- Confeti de hojas generado aleatoriamente en cada visita.
- Marca de verificación con animación de resorte y anillo de pulso.
- Dos contadores animados: Flora ganada y kg de CO₂ evitados.
- Recordatorio del plazo de devolución del envase y accesos al ranking o al inicio.

---

## 9. Funcionalidades transversales

### Carrito lateral

Panel deslizante disponible desde cualquier pantalla. Permite ajustar cantidades (el botón
cambia a papelera al llegar a uno), muestra la huella de CO₂ de cada línea, incluye el
conmutador de envase retornable y el desglose completo con el descuento apareciendo de
forma animada. **Un pedido pertenece a un solo comercio**: agregar de otro local reinicia
el carrito.

### Escáner QR simulado

Modal con visor, esquinas de encuadre y línea de escaneo animada, en tres fases: selección
del envase → escaneo → verificación exitosa. Al confirmar acredita la Flora, elimina el
envase de la lista, suma CO₂ y registra el movimiento. **No accede a la cámara real.**

### Notificaciones flotantes

Sistema de avisos con icono, título, detalle y delta de Flora. Se apilan con animación,
se descartan al tocarlas o solas a los 3,2 segundos, y están limitadas a **dos
simultáneas** para no tapar el contenido.

### Contador de Flora animado

En la barra superior. Al cambiar el saldo, late brevemente y muestra el delta (`+50`,
`−300`) flotando hacia arriba con un anillo de pulso, en verde si suma y en rojo si resta.

### Navegación

Barra inferior de cinco pestañas en móvil (Inicio, Explorar, Devolver, Ranking, Perfil)
con píldora activa que se desplaza entre ellas y contador de envases pendientes sobre el
icono de Devolver. En escritorio, barra superior con marca, navegación, saldo de Flora,
carrito con contador y avatar.

### Animación

Transiciones de página, revelado escalonado al hacer scroll, contadores que animan al
entrar en pantalla, elevación de tarjetas al pasar el cursor y micro-respuestas al pulsar.
Todo con una curva orgánica común y **desactivado por completo** con
`prefers-reduced-motion`.

### Imágenes resilientes

Componente propio con carga progresiva: muestra un degradado animado mientras baja la foto
y **cae a un marcador orgánico si la URL remota falla**, de modo que la demo nunca se ve
rota sin conexión.

### Accesibilidad

Roles y etiquetas ARIA en controles interactivos, `aria-pressed` en conmutadores, foco
visible con anillo verde hoja, textos alternativos en imágenes y jerarquía semántica de
encabezados.

---

## 10. Datos ficticios de la demo

Todo el contenido vive en [`app/src/data/mock.ts`](app/src/data/mock.ts).

| Conjunto | Cantidad | Detalle |
| :--- | ---: | :--- |
| Comercios | 12 | 6 locales ficticios + 6 cadenas reales. 9 son Eco-Partner; 3 quedan bajo la meta a propósito |
| Platos | 31 | Todos con precio en CLP y huella de CO₂ |
| Categorías | 4 | Sustentables, cero residuos, vegetales, local |
| Envases activos | 2 | Bowl mediano y vaso térmico, con QR y vencimiento |
| Puntos de devolución | 4 | 2 en campus, 1 en tienda (Little Caesars), 1 vía repartidor |
| Recompensas | 5 | Desde café gratis (300) hasta plantar un árbol nativo (1.200) |
| Ranking de amigos | 6 | Con envases devueltos e insignias |
| Ranking global | 5 | — |
| Ranking de comercios | 9 | Por porcentaje de ventas retornables |
| Insignias | 6 | 4 obtenidas, 2 bloqueadas |
| Movimientos de Flora | 5 | Historial inicial |

### Comercios de la demo

**Locales sustentables (ficticios)** — encarnan el ideal del programa:
Green Bowl (94%) · Café Ciclo (88%) · Raíz Verde (78%) · Pura Pizza (61%) ·
Cosecha Local (42%) · Mar Adentro (24%).

**Cadenas reales adheridas** — muestran cómo se ve el programa con marcas que la gente ya
reconoce: **Little Caesars** (34%) · Starbucks (47%) · Emporio La Rosa (55%) ·
Juan Maestro (31%) · Subway (19%) · Doggis (12%).

Los tres comercios bajo el 30% (Mar Adentro, Doggis y Subway) están así a propósito: sin
un caso que *no* cumple la meta, la insignia Eco-Partner no significaría nada y la barra
de progreso no tendría nada que mostrar.

> ⚠️ **Sobre las marcas reales:** se usan solo como referencia visual para que la demo se
> sienta familiar. Sus menús, precios y **especialmente sus porcentajes de ventas
> sustentables son inventados**, y no representan datos reales de esas empresas. La app lo
> declara en la ficha de cada marca real y en el pie del perfil.

**Usuario de la demo:** Camila Rojas — 750 Flora, 22,4 kg de CO₂ evitados, 2 envases en
su poder y 38 devueltos, nivel *Bosque Nativo*.

**Contexto local:** direcciones, comercios y puntos de devolución están ambientados en
Santiago y en el Campus San Joaquín UC.

**Imágenes:** fotografías de Unsplash mediante URLs públicas verificadas.

> ⚠️ Comercios, personas, precios, métricas de impacto y códigos QR son **inventados**
> para ilustrar el concepto. No hay backend, cobros reales ni acceso a la cámara.

---

## 11. Verificación realizada

La app se manejó con un navegador real (Chrome vía protocolo de depuración) para medir el
layout en lugar de confiar en la inspección visual:

- **Sin desbordamiento horizontal** en 7 rutas × 5 anchos (360, 390, 768, 1024 y 1440px).
- **Flujo de compra completo** validado de punta a punta: agregar → checkout → pagar →
  confirmación, con acreditación correcta de Flora y generación del envase.
- **Compilación y linter limpios**, sin errores de TypeScript.
- **29 URLs de imágenes** verificadas con respuesta HTTP 200.

Cuatro defectos reales detectados y corregidos en el proceso: el checkout redirigía a
Explorar en vez de la confirmación; las tarjetas de recompensa desbordaban y deformaban el
modal del escáner; la barra de escritorio no cabía exactamente en 768px; y el ajuste de
scroll del carrusel se comía el margen de seguridad.

---

## 12. Limitaciones conocidas

Explícitas, por tratarse de una prueba de concepto:

- **Sin backend ni persistencia** — el estado se reinicia al recargar la página.
- **Sin autenticación** — se asume una sesión iniciada con un usuario fijo.
- **Escáner QR simulado** — reproduce el flujo, no accede a la cámara.
- **Mapa ilustrado, no cartográfico** — no hay geolocalización real.
- **Coeficientes de CO₂ ilustrativos** — no provienen de un modelo validado.
- **Sin seguimiento de pedido en curso** — el ciclo termina en la confirmación.

Los siguientes pasos hacia producción están detallados en [`ROADMAP.md`](ROADMAP.md).

---

## 13. Cómo ejecutarlo

```bash
cd app
npm install
npm run dev      # http://localhost:5173
```

Otros comandos:

```bash
npm run build    # compila a dist/
npm run preview  # sirve la compilación de producción
npm run lint
```

Para ver los prototipos originales de Google Stitch:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000/templates/index.html
```

---

## Documentos relacionados

| Documento | Para qué sirve |
| :--- | :--- |
| [`PITCH.md`](PITCH.md) | Presentación para el jurado y guion de demo de 3 minutos |
| [`app/README.md`](app/README.md) | Documentación técnica del frontend |
| [`DESIGN.md`](DESIGN.md) | Tokens y lineamientos del sistema de diseño |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Esquemas de datos y jerarquía de componentes |
| [`ROADMAP.md`](ROADMAP.md) | Plan de implementación en 6 fases |
| [`docs/SCREENS_OVERVIEW.md`](docs/SCREENS_OVERVIEW.md) | Desglose de las 4 pantallas del prototipo original |
