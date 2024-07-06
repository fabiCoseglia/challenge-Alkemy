# App de Películas: Un Proyecto React con Integración de The Movies DB

## Resumen

Esta aplicación React utiliza la API de The Movies DB para ofrecer una experiencia completa de gestión de películas. Incluye inicio de sesión, listas de películas, vistas detalladas, funcionalidad de búsqueda, gestión de favoritos y una barra de navegación persistente.

## Datos a tener en cuenta:
- **Autenticación**: debes iniciar sesion con los datos: **challenge@alkemy.org** contraseña: **react**



## Características Principales

- **Autenticación**: Inicio de sesión seguro utilizando el punto final de Alkemy para obtener un token de acceso.
- **Listado de Películas**: Obtiene y muestra las últimas películas en cartelera con información detallada.
- **Detalle de la Película**: Proporciona una descripción general completa de cada película seleccionada, incluyendo detalles ampliados y calificaciones.
- **Búsqueda de Películas**: Permite a los usuarios encontrar películas por palabras clave, mostrando resultados relevantes.
- **Gestión de Favoritos**: Permite a los usuarios agregar, eliminar y gestionar una colección de películas favoritas.
- **Favoritos Persistentes**: Asegura que las películas favoritas, incluyendo las categorizadas como "FAMILIA", persistan en las diferentes sesiones.
- **Barra de Navegación**: Muestra el número de películas favoritas y la calificación general de las películas favoritas.

## Tecnologías

- **Frontal**: React, React Router DOM, Bootstrap (biblioteca CSS)
- **Backend**: API de The Movies DB
- **Almacenamiento Local**: Para persistir los datos del usuario (token, favoritos)