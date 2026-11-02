# Diseño

## Tecnología

- Frontend: TypeScript, React y Vite.
- Estilos: CSS propio, sin framework de utilidades en tiempo de ejecución.
- Contenido editorial y catálogo: datos tipados dentro de la aplicación para que cada bloque mantenga una estructura uniforme.

## Dirección visual

Adaptación del diseño de Google Stitch incluido por el usuario: editorial neo-brutalista inspirado en Bauhaus, con papel marfil (`#f5f0e8`), tinta negra (`#1a1a1a`), amarillo (`#ffcc00`), rojo (`#e63b2e`) y azul (`#0055ff`). Space Grotesk se usa para titulares y etiquetas; Inter, para lectura continua. Las tarjetas usan bordes negros y sombras sólidas desplazadas, sin sombras suaves ni degradados.

Las imágenes del HTML de Stitch se conservan como URL remotas de Google. La portada y el archivo se presentan junto al hero; debajo aparecen reviews, noticias, merchandising, suscripción y pie de página.

## Estructura e interacción

- `src/App.tsx`: datos tipados, composición de secciones y estados de navegación, búsqueda, cesta y formulario.
- `src/styles.css`: tokens visuales, componentes y breakpoints para móvil, tableta y escritorio.
- Navegación móvil desplegable, búsqueda de artículos, cesta local y confirmación local del formulario.

El checkout y el alta de suscripción quedan como interacciones de prototipo de frontend; no se conectan a una pasarela ni a un servicio externo.
