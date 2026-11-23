# Rumbo Sur | Agencia de viajes

Proyecto de la Sumativa 5 de Desarrollo Frontend II (PFY2202).

Rumbo Sur permite explorar destinos de Chile, conocer sus actividades y
consultar vuelos y hoteles con fechas, precios en pesos chilenos y disponibilidad.

[Ver la aplicación publicada](https://valeriaacevedoc.github.io/viajes-valeria-acevedo-PFY2202/)

## Tecnologías

- React y Vite para la interfaz.
- React Router para navegar entre Inicio, Destinos y el detalle de cada destino.
- Mock Service Worker (MSW) para simular la API REST y la API GraphQL.

## Ejecutar el proyecto

Usa Node.js 24, la versión configurada para el despliegue.

Si clonaste el repositorio, entra a la carpeta de la aplicación desde la raíz:

```bash
cd viajes-valeria-acevedo-PFY2202
```

Si descargaste el ZIP, abre directamente la carpeta que contiene `package.json`.

Instala las dependencias e inicia la aplicación:

```bash
npm ci
npm run dev
```

Abre la dirección completa que Vite muestra junto a `Local:`.

## Probar la aplicación

1. Entra a **Destinos**. El catálogo se obtiene mediante `GET /api/destinos`
   y muestra el país y las actividades de cada destino.
2. En la tarjeta de **Santiago**, selecciona **Ver vuelos y hoteles**. La consulta
   GraphQL `OpcionesDestino` muestra el vuelo Concepción → Santiago y el Hotel
   Barrio Parque, con fechas, precios y disponibilidad.
3. Vuelve al catálogo antes de 60 segundos para comprobar que la app reutiliza
   la última respuesta correcta. **Actualizar destinos** limpia la caché y
   solicita datos nuevos.

## Probar el reintento

Con el catálogo visible, escribe en la consola del navegador:

```js
sessionStorage.setItem('fallarDestinosUnaVez', 'true')
```

Pulsa **Actualizar destinos**. MSW simulará un error del servidor y la lista
seguirá visible. Pulsa **Reintentar** para volver a consultar el catálogo.

## Compilar y revisar la versión de producción

Desde la carpeta que contiene `package.json`, ejecuta:

```bash
npm run build
npm run preview
```

Abre la dirección completa que Vite muestra junto a `Local:`.