# GitLab Swimlanes Chrome Extension

Una extensión de Chrome para modificar la vista de GitLab, mostrando un tablero personalizado (swimlanes) que agrupa las tarjetas por hitos.

## Descripción

La extensión "GitLab Swimlanes" inyecta un script en las páginas de GitLab (en particular, en instalaciones locales de gitlab) y añade una interfaz que reorganiza la información en forma de tablero.
El código fuente está escrito en inglés (nombres de variables, comentarios y lógica), mientras que el contenido visible para el usuario (textos, mensajes) está en castellano.
Además, se implementan técnicas para detectar cambios en el DOM (por ejemplo, con un MutationObserver) y se aplican estilos con alta especificidad para sobrescribir los estilos nativos de GitLab.

## Estructura del Proyecto

```bash
mi-plugin-gitlab/
├── manifest.json   # Configuración de la extensión y permisos
├── content.js      # Lógica de inyección y manipulación del DOM
└── styles.css      # Estilos personalizados para el tablero
```

## Cómo Probar la Extensión en Modo Desarrollador

### Descargar o clonar el repositorio:

```bash
git clone <URL-del-repositorio>
cd swimlanes
```

### Abrir Chrome y acceder a la página de extensiones:

Escribe en la barra de direcciones:

```url
chrome://extensions
```

### Activar el Modo Desarrollador:

En la esquina superior derecha de la página, activa el toggle "Modo desarrollador" (Developer mode).

### Cargar la extensión sin empaquetar:

Haz clic en el botón "Cargar sin empaquetar" o "Load unpacked" y selecciona la carpeta mi-plugin-gitlab del proyecto.

### Verificar la carga de la extensión:

- Accede a una página tu instalación local de GitLab.
- Abre las herramientas de desarrollador (F12) y revisa la consola para ver mensajes como:
  - Gitlab Swimlanes extension init.
  - Gitlab Swimlanes extension loaded.
- Inspecciona el DOM para confirmar que se ha añadido el contenedor con la clase swimlanes y otros elementos de la interfaz.

### Recargar la extensión y la página:

- Cada vez que realices cambios en el código, vuelve a chrome://extensions y haz clic en "Recargar" en la tarjeta de la extensión.
- Recarga la página de GitLab para ver los cambios reflejados.

## Consideraciones Adicionales

- **Contenido Dinámico:**
  Si GitLab carga contenido de forma dinámica (por ejemplo, a través de llamadas a una API GraphQL), se recomienda usar un `MutationObserver` para detectar la adición de nuevos nodos y manipularlos según sea necesario.

- **Especificidad de Estilos:**
  Para asegurarse de que los estilos de la extensión tengan prioridad sobre los de GitLab, se pueden usar selectores con mayor especificidad o encapsular la interfaz dentro de un contenedor con un identificador único.

- **Depuración:**
  Utiliza la consola de Chrome y la pestaña "Sources" para verificar la carga de content.js y styles.css, y revisa la pestaña "Network" para confirmar que los recursos se descargan correctamente.

## Contribuciones

Si deseas contribuir al proyecto, por favor crea un fork del repositorio, realiza tus cambios y envía un pull request. Todas las mejoras y sugerencias son bienvenidas.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
