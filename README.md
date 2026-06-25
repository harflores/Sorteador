# Sorteador de Premios — Iglesia Palabra y Poder

Aplicación web para realizar sorteos de premios en eventos de la **Iglesia Palabra y Poder**. Permite sortear números al azar con una experiencia visual atractiva que incluye cuenta regresiva, efecto de confeti y control de números no válidos.

## Características

- **Rango dinámico:** el usuario define la cantidad de números disponibles (1 a N).
- **Cuenta regresiva 3-2-1** con animación antes de revelar el ganador.
- **Efecto de confeti** al mostrar el número ganador.
- **Sin repeticiones:** los números ya sorteados se excluyen automáticamente de los siguientes sorteos.
- **Marcar como no válido:** clic sobre cualquier número del historial para tacharlo en rojo (toggle).
- **Historial visual:** todos los números sorteados se muestran como badges en la parte inferior.
- **Reinicio:** botón para limpiar el historial y comenzar de nuevo.
- **Responsive:** compatible con escritorio y dispositivos móviles.

## Estructura del proyecto

```
Sorteador/
├── css/
│   └── styles.css      # Estilos, animaciones y media queries
├── img/
│   └── image.png       # Logo de la iglesia
├── js/
│   └── app.js          # Lógica del sorteo, confeti y validación
├── index.html          # Página principal
└── README.md
```

## Tecnologías

- **HTML5** — estructura semántica.
- **CSS3** — variables CSS, animaciones `@keyframes`, flexbox, diseño responsive.
- **JavaScript vanilla** — sin dependencias ni frameworks externos.
- **Google Fonts** — tipografía Montserrat.
- **Canvas API** — efecto de confeti generado por código.

## Cómo usar

1. Abrir `index.html` en cualquier navegador moderno.
2. Ingresar la cantidad de números a sortear (ejemplo: `100` genera los números del 1 al 100).
3. Presionar **Iniciar Sorteo**.
4. Esperar la cuenta regresiva 3… 2… 1… y ver el número ganador con efecto de confeti.
5. Repetir para sortear más números; los ya sorteados no volverán a salir.
6. Hacer clic en un número del historial para marcarlo como **no válido** (se muestra en rojo tachado).
7. Presionar **Reiniciar Sorteo** para limpiar todo y empezar de nuevo.

## Paleta de colores

| Color            | Código    | Uso                          |
|------------------|-----------|------------------------------|
| Amber/Gold       | `#F5A800` | Color primario, botones      |
| Amber oscuro     | `#C58800` | Hover, bordes, acentos       |
| Amber claro      | `#FFD054` | Detalles y degradados        |
| Blanco           | `#FFFFFF` | Texto sobre fondo oscuro     |
| Off-white cálido | `#FFF8E7` | Fondo general de la página   |
| Rojo (no válido) | `#D32F2F` | Números marcados como no válidos |

## Autor

Desarrollado con ❤️ por **Harold Flores**.
