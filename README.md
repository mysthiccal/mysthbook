# Mysthigram / Mysthbook

Feed de aprendizaje con artículos de Wikipedia, en dos modos: Mysthigram (estilo Instagram) y Mysthbook (estilo Facebook).

## Archivos

Todos van en la misma carpeta (la raíz del repositorio o una subcarpeta):

- `index.html`: la app completa.
- `sw.js`: service worker (instalación y uso sin conexión).
- `manifest.json`: nombre, colores e íconos de la app.
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`: íconos.
- `apple-touch-icon.png`: ícono para la pantalla de inicio del iPhone.

## Subir a GitHub Pages

1. Sube todos los archivos al repositorio, reemplazando los anteriores.
2. En el repositorio: **Settings → Pages → Branch: main / root → Save** (si aún no estaba activado).
3. Espera uno o dos minutos y abre la dirección de GitHub Pages en Safari.

## Instalar o actualizar en el iPhone

- **Primera vez:** en Safari, botón Compartir → **Agregar a inicio**.
- **Actualizar:** abre la app, ciérrala por completo y ábrela otra vez. El número de versión en `sw.js` hace que el iPhone descargue la versión nueva.
- **Ícono nuevo:** iOS guarda el ícono de cuando instalaste la app. Para ver el nuevo, quita la app de la pantalla de inicio y vuelve a agregarla desde Safari. Tus datos no se pierden si usas la misma dirección.

## Antes de cambios grandes

Haz un respaldo desde tu perfil (**Preferencias → Respaldo → Exportar**) y guárdalo en Archivos o iCloud Drive. Tus datos viven solo en el iPhone y están ligados a la dirección de GitHub Pages: si la dirección cambia, empezarías de cero, pero puedes restaurarlos con el respaldo.
