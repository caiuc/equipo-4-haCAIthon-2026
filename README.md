# RIU · Delivery Sustentable

<p align="center">
  <b>Una app de delivery donde el envase no se regala: se presta.<br/>
  Elegir envase retornable te sale más barato, devolverlo te da recompensas,<br/>
  y al local le conviene ofrecerlo.</b>
</p>

<p align="center">
  <a href="https://tinyurl.com/Hacaithon" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Logo_CAi.png" height="24" alt="Logo CAi UC" align="center" /></a>
  <img src="https://img.shields.io/badge/HaCAiThon_2026-Sustentabilidad-116c4a?style=for-the-badge" alt="HaCAiThon Badge" align="center" />
  <img src="https://img.shields.io/badge/License-MIT-012d1d?style=for-the-badge" alt="MIT License" align="center" />
</p>

---

## 🚀 Ver la demo

```bash
cd app
npm install
npm run dev      # http://localhost:5173
```

La demo es **navegable y funcional**, no una maqueta: agregar platos recalcula el
descuento, confirmar un pedido acredita Flora y genera un envase, y escanear su QR lo
devuelve sumando recompensa y CO₂ evitado.

**Recorrido sugerido:** Inicio → Green Bowl → activar envase retornable → pagar →
Devoluciones → escanear QR → Ranking.

---

## 🌱 El problema

Pedir comida por app es uno de los gestos más cotidianos de la vida urbana, y también uno
de los más desechables. El problema tiene **tres capas que se refuerzan entre sí**:

1. **El envase es invisible para quien decide.** El usuario elige por sabor, precio y
   tiempo de entrega; la basura que va a generar no aparece en ninguna parte de la
   pantalla al momento de comprar.
2. **Elegir bien cuesta más.** Cuando existe alternativa sustentable, suele ser más cara o
   menos cómoda. La conducta responsable se castiga en vez de premiarse.
3. **Al comercio no le sirve cambiar.** Migrar a envases reutilizables implica costo y
   logística sin retorno comercial visible: nadie elige un local *porque* usa envase
   retornable, porque el usuario nunca se entera.

El resultado es un círculo donde todos los actores prefieren, racionalmente, la opción más
contaminante. Atacar solo la capa 1 —mostrar la huella y confiar en la buena voluntad— no
mueve la aguja.

---

## ♻️ La solución

RIU interviene las tres capas a la vez, con cuatro piezas que se encadenan.

### 1. Envase retornable con descuento inmediato

Al pedir, el usuario elige entre envase compostable estándar o retornable. La segunda
opción **descuenta pesos del total en ese mismo instante**. Elegir bien deja de ser un
sacrificio moral y pasa a ser la decisión conveniente. *(Capa 2.)*

### 2. Red de devolución de tres vías

Devolver tiene que ser más fácil que botar:

- 🎓 **Puntos inteligentes en campus** — con capacidad y horario en tiempo real.
- 🏪 **Devolución en tienda** — en cualquier local participante.
- 🛵 **Entrega al repartidor** — en el siguiente pedido, en la puerta de la casa.

Cada envase lleva un **código QR único**: escanearlo acredita la recompensa al instante y
cierra la trazabilidad del ciclo.

### 3. Competencia social de CO₂

Cada plato muestra su huella y cada devolución suma al contador personal. Ese número
alimenta un ranking entre amigos, con insignias por hitos de envases devueltos. *(Capa 1.)*

> **Sin rachas diarias.** Se evaluaron y se descartaron: premian abrir la app, no devolver
> envases. El ranking mide lo único que importa —CO₂ evitado y envases devueltos— para que
> la métrica visible sea la que genera impacto real.

### 4. Meta del 30% para comercios

Los locales que superan el **30% de sus ventas con envase sustentable** obtienen la
insignia **Eco-Partner**, prioridad en el feed y mejor posición en la búsqueda. La
sustentabilidad se traduce en visibilidad comercial. *(Capa 3.)*

### El circuito cerrado

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

Ninguna pieza es nueva por separado. Lo distintivo es que **cada vuelta hace la siguiente
más fácil**, sin depender de que nadie mantenga alta la motivación.

---

## ✨ Qué incluye la app

**Ocho pantallas** navegables:

| Pantalla | Qué hace |
| :--- | :--- |
| **Inicio** | Impacto personal, categorías y Eco-Partners destacados |
| **Explorar** | Búsqueda y filtros, ordenados por sustentabilidad |
| **Comercio** | Huella de CO₂ por plato, selector de envase y meta del 30% |
| **Devoluciones** | Envases activos, escáner QR, mapa de puntos y canjes |
| **Ranking** | CO₂ entre amigos, insignias y ranking de comercios |
| **Perfil** | Estadísticas, insignias y favoritos |
| **Checkout** | Descuento sustentable desglosado y pago con Flora |
| **Confirmación** | Celebración con Flora y CO₂ ganados |

Más tres capas globales: **carrito lateral**, **escáner QR simulado** y **notificaciones
flotantes**.

**Moneda de la app: Flora.** Se gana devolviendo envases e invitando amigos; se canjea por
descuentos, café gratis o plantar un árbol nativo. También sirve como medio de pago
parcial (1 Flora = $10 CLP).

**Comercios de la demo:** 6 locales sustentables ficticios (Green Bowl, Café Ciclo, Raíz
Verde, Pura Pizza, Cosecha Local, Mar Adentro) y 6 cadenas reales adheridas al programa
(**Little Caesars**, Starbucks, Emporio La Rosa, Juan Maestro, Subway, Doggis).

> ⚠️ **Todos los datos son ficticios.** Las marcas reales se usan solo como referencia
> visual para que la demo se sienta familiar; sus menús, precios y **especialmente sus
> porcentajes de ventas sustentables son inventados** y no representan datos reales de
> esas empresas. No hay backend, cobros ni acceso a la cámara.

---

## 🛠️ Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · React Router

El sistema de diseño completo (paleta, tipografías, grilla, sombras) sale de los tokens de
[`DESIGN.md`](./DESIGN.md), cargados en `@theme`. Responsivo verificado sin desbordamiento
horizontal en 360, 390, 768, 1024 y 1440 px, con navegación inferior en móvil y barra
superior en escritorio.

---

## 📁 Estructura del repositorio

```
.
├── README.md                    Este documento
├── RESUMEN.md                   Resumen completo: problema, contenido y todas las features
├── ARCHITECTURE.md              Arquitectura, esquemas de datos y reglas para agentes IA
├── DESIGN.md                    Sistema de diseño: tokens, paleta, tipografía, espaciado
├── ROADMAP.md                   Hoja de ruta en 6 fases hacia producción
├── LICENSE                      Licencia MIT
│
├── docs/
│   ├── FILE_INDEX.md            Mapa completo de archivos
│   ├── SCREENS_OVERVIEW.md      Desglose de las 4 pantallas del prototipo original
│   └── DESIGN_SYSTEM_GUIDE.md   Cómo consumir los tokens de DESIGN.md en código
│
├── templates/                   Prototipos originales de Google Stitch (congelados)
│
└── app/                         ★ Aplicación web
    ├── README.md                Documentación técnica del frontend
    └── src/
        ├── data/mock.ts         Todos los datos ficticios
        ├── store/AppStore.tsx   Estado global (carrito, Flora, envases)
        ├── components/          UI, layout, carrito, escáner y avisos
        └── pages/               Las 8 pantallas
```

📖 **Para el detalle completo de todas las funcionalidades, ver
[`RESUMEN.md`](./RESUMEN.md).**

---

## 🧭 Qué sigue

- **Backend y trazabilidad real** de cada envase por QR, con estados de ciclo de vida.
- **Motor de CO₂** validado con factores de emisión reconocidos, en vez de los
  coeficientes ilustrativos de la demo.
- **Piloto en un campus** con locales aliados, para medir la tasa real de devolución — el
  número que decide si el modelo funciona.
- **Portal para comercios** con analítica de su avance hacia la meta del 30%.

Detalle por fases en [`ROADMAP.md`](./ROADMAP.md).

---

## 🤖 Guía para agentes de IA

- **Código protegido:** no editar `templates/*/code.html`. Son la referencia de diseño
  original y están congelados a propósito.
- **Tokens de diseño:** usar siempre [`DESIGN.md`](./DESIGN.md) y
  [`docs/DESIGN_SYSTEM_GUIDE.md`](./docs/DESIGN_SYSTEM_GUIDE.md).
- **Arquitectura:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) tiene los esquemas de datos y la
  jerarquía de componentes.
- **Ubicar archivos:** [`docs/FILE_INDEX.md`](./docs/FILE_INDEX.md).

---

## 🏆 HaCAiThon 2026 · Resumen de Bases Oficiales

### Centro de Alumnos de Ingeniería UC · Primera Edición

#### 1. Qué Es
Hackathon presencial de 8 horas (12:00 a 20:00 hrs) para estudiantes de Ingeniería, LICC y LICD, trabajando en equipos multidisciplinarios en soluciones a seis desafíos sociales usando programación e IA.

#### 2. Requisitos y Equipos
- Equipos de 4 personas. Máximo 1 estudiante de posgrado por equipo (los otros 3 de pregrado).
- Todo el código debe ser escrito durante el evento (12:40 a 17:10 hrs). Se autoriza y recomienda el uso de asistentes de IA (Claude Code, Gemini, Copilot).

#### 3. Fecha, Lugar e Itinerario
- **Fecha:** Viernes 14 de agosto, 12:00 a 20:00 hrs.
- **Lugar:** Campus San Joaquín, Sala de Estudio, Primer Piso.
- **Itinerario:**
  - `12:00` - Registro y acreditación.
  - `12:15` - Bienvenida y reglas.
  - `12:40` - Bloque de desarrollo.
  - `17:10` - Feria de proyectos y votación.
  - `18:50` - Deliberación del jurado.
  - `19:00` - Premiación y cierre.

#### 4. Entregables y Licencia
- Repositorio público en GitHub con todo el proyecto.
- Licencia Open Source OSI (MIT) con archivo `LICENSE` en la raíz.

#### 5. Criterios de Evaluación
- Innovación y Creatividad (15%)
- Impacto y Relevancia Social (25%)
- Viabilidad Técnica (25%)
- Ejecución y Funcionamiento (20%)
- Comunicación (15%)

---

## 📄 Licencia

Este proyecto está bajo la [Licencia MIT](./LICENSE).
