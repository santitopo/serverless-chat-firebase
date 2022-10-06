# Serverless Chat

## Descirpción

El sistema cuenta con las siguientes funcionalidades implementadas:

- Registro de usuario con mail, Google y Facebook.
- Inicio de sesión con mail, Google y Facebook.
- Enviar solicitud de amistad, tanto a usuarios registrados como no registrados. Estos ultimos reciben una invitacion por correo electronico a unirse a la aplicacion.
- Manejo de solicitudes de amistad. Los usuarios pueden rechazar y aceptar las solicitudes.
- Conversaciones con amigos. Se listan los usuarios que son amigos del usuario loggeado, y cuando se selecciona uno, se muestra el chat entre ambos.
- Ver ultimo mensaje en la lista de amigos.
- Notificaciones dentro de la app al recibir mensajes.

## Estructura de carpetas y archivos

- extensions y requests: carpetas que contienen las credenciales para hacer uso del envio de mails para invitaciones al sistema
- src: carpeta en la que se encuentra la mayor cantidad del contenido de la aplicación:
  - pages: carpeta con las paginas de la aplicación
  - components: carepta con los componentes de la aplicacion
- tests: caperta contenedora de los test de la aplicacion

## Ejecución del proyecto

Primero navegar hacia la carpeta raiz del proyecto.
Una vez en la raiz, se deben ejecutar los siguientes comandos para correr la aplicacion:

1.  `npm ci`
2.  `npm start`

## Ejecución de pruebas

1. `cd tests`
2. `firebase emulators:start`

En otra consola, en la carpeta tests:

1. `npm ci`
2. `npm test`

## Link publico
https://chat-serverless-89e6b.web.app
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
