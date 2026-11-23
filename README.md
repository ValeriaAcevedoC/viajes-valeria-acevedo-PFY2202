# Rumbo Sur | Agencia de viajes

Proyecto de la Sumativa 5 de Desarrollo Frontend II (PFY2202).

Rumbo Sur permite explorar destinos de Chile, conocer sus actividades y consultar
vuelos y hoteles con fechas, precios en pesos chilenos y disponibilidad.

[Ver la aplicación publicada en GitHub Pages](https://valeriaacevedoc.github.io/viajes-valeria-acevedo-PFY2202/)

## Tecnologías

- React y Vite para la interfaz.
- React Router para navegar entre Inicio, Destinos y el detalle de cada destino.
- Mock Service Worker (MSW) para simular las API REST y GraphQL.

## Ejecutar el proyecto

Usa Node.js 24. Abre la carpeta que contiene `package.json` y ejecuta:

```bash
npm ci
npm run dev
```

Abre la dirección que Vite muestra junto a `Local:`.

## Probar la aplicación

1. Entra a **Destinos**. El catálogo obtiene el nombre, el país y las actividades
   de cada destino mediante `GET /api/destinos`.
2. En la tarjeta de **Santiago**, selecciona **Ver vuelos y hoteles**. La consulta
   GraphQL `OpcionesDestino` muestra el vuelo Concepción → Santiago y el Hotel
   Barrio Parque, con fechas, precios y disponibilidad.
3. Regresa al catálogo antes de 60 segundos para comprobar que se reutiliza la
   última respuesta correcta. **Actualizar destinos** limpia la caché y realiza
   una nueva consulta.

## Probar el reintento

Con el catálogo visible, escribe este comando en la consola del navegador:

```js
sessionStorage.setItem('fallarDestinosUnaVez', 'true')
```

Pulsa **Actualizar destinos**. MSW simulará un error del servidor y los destinos
seguirán visibles. Luego pulsa **Reintentar** para volver a cargar el catálogo.

## Compilar y revisar la versión de producción

Desde la carpeta que contiene `package.json`, ejecuta:

```bash
npm run build
npm run preview
```

Abre la dirección que Vite muestra junto a `Local:`.

## Evidencias

- [Vista de escritorio](Evidencias/escritorio.png)
- [Vista móvil](Evidencias/modoCelular.png)
- [Prueba en Opera](Evidencias/Navegador_opera.png)
- [Segunda captura de la prueba en Opera](Evidencias/otroNavegador_opera.png)