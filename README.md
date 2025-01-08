# Music Recommendation

Este **Proyecto de Desarrollo Full Stack** es una aplicación web que permite a los usuarios descubrir y gestionar canciones. Los usuarios pueden agregar canciones, votar por ellas y ver una canción aleatoria. La plataforma incluye un sistema de votación, validaciones de formulario para asegurar datos correctos, y un diseño intuitivo que mejora la experiencia del usuario.


## Herramientas Utilizadas
- **SweetAlert2:** Biblioteca para mostrar alertas personalizables con diseño moderno en la interfaz.
- **GoogleFonts (Raleway):** Fuente utilizada para mejorar la estética y legibilidad del texto en la aplicación.
- **Cors:** Middleware de Node.js que permite manejar políticas de origen cruzado para que el servidor acepte peticiones desde distintos dominios.
- **Express:** Framework minimalista para construir el servidor backend en Node.js.
- **Mongoose:** ODM (Object Data Modeling) para manejar la interacción con la base de datos MongoDB.
- **HTML/CSS/JS:** Tecnologías estándar para construir la interfaz del usuario y añadir interactividad.
- **Node.js:** Entorno de ejecución de JavaScript utilizado para desarrollar el backend del proyecto.
- **MongoDB:** Base de datos NoSQL utilizada para almacenar y gestionar los datos de las canciones.

## Requisitos Previos 
Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:
- [**Node.js:**] (https://nodejs.org/es/download)
- [**MongoDB Community Server:**] (https://www.mongodb.com/try/download/community) Si usas IPv4, asegúrate de que MongoDB esté configurado para escuchar en **127.0.0.1:27017**. Si tu PC utiliza IPv6, fuerza la base de datos a ejecutarse en **127.0.0.1:27017**, ya que MongoDB, por defecto, está configurado para aceptar conexiones IPv4, si no haces esto, corres el riesgo de que la aplicación no se conecte con MongoDB.
- **Un Navegador:** (Chrome, Edge, Vivaldi, etc)

## Instrucciones de Ejecución
### 1. Clonar el Repositorio
```bash
git clone https://github.com/SebastianIdk/Music-Recomendations.git
```
### 2. Instalar las dependencias
Dirígete a la siguiente ruta para proceder con la instalación.
```bash
cd .\Music-Recomendations\server\
```
Una vez te encuentres ahí, ejecuta el siguiente comando para instalar las dependencias ya declaradas en el `package.json`.
```bash
npm install
```
### 3. Iniciar la Base de Datos
Como se menciono en los requisitos previos, asegurate de que MongoDB se esta ejecutando en `127.0.0.1:27017`.
### 4. Iniciar la Aplicación
```bash
npm run dev
```
Ejecutando el comando se mostrara un mensaje en la consola "Servidor Iniciado", lo cual nos indica que la aplicación ya esta corriendo.
### 5. Abrir la Aplicación
Esto se puede realizar abriendo los archivos desde la carpeta **client**, especificamente los archivos **.html**. También si tienes un plugin para abrir el cliente de forma estática lo puedes hacer, pero recomiendo abrir `client/index.html` con tu navegador.
### 6. Funcionalidades y gitignore
- El proyecto es capaz de agregar canciones en la base de datos de MongoDB y también puede eliminar las canciones no deseadas.
- Se puede listar las canciones agregadas, y se puede escuchar las mismas dentro de la misma página.
- Puedes votar por las canciones disponibles, se incluyo un contador de votos para saber que canción es la mejor.
- El proyecto incluye un archivo `.gitignore` para **no subir** la carpeta `node_modules/` al repositorio, de esa forma evitando cualquier inconveniente en GitHub.
