# Rumbo Sur | Agencia de viajes

Proyecto de la Sumativa 5 de Desarrollo Frontend II (PFY2202).

Rumbo Sur permite explorar destinos de Chile, conocer sus actividades y
consultar vuelos y hoteles con fechas, precios en pesos chilenos y disponibilidad.

## Tecnologías

- React y Vite para la interfaz.
- React Router para navegar entre el inicio, el catálogo y el detalle de un destino.
- Mock Service Worker (MSW) para simular la API REST y la API GraphQL.

## Ejecutar el proyecto

```bash
npm ci
npm run dev
```

Abre la dirección completa que Vite muestra junto a `Local:`.

## Probar la aplicación

1. Entra a **Destinos**. El catálogo se obtiene mediante `GET /api/destinos`.
2. En la tarjeta de Santiago, selecciona **Ver vuelos y hoteles**. La consulta
   GraphQL `OpcionesDestino` muestra el vuelo Concepción → Santiago y el Hotel
   Barrio Parque.
3. Vuelve al catálogo antes de 60 segundos. La app puede reutilizar la última
   respuesta correcta. **Actualizar destinos** fuerza una nueva consulta.

## Probar el reintento

Con el catálogo visible, ejecuta en la consola del navegador:

```js
sessionStorage.setItem('fallarDestinosUnaVez', 'true')
```

Pulsa **Actualizar destinos**. MSW simulará un error del servidor y la lista
seguirá visible. Pulsa **Reintentar** para volver a consultar el catálogo.

## Compilar y revisar la versión de producción

```bash
npm run build
npm run preview
```