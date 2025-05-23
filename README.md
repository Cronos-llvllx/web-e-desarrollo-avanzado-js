# web-e-desarrollo-avanzado-js / Hecho por Hector Gomez
1. Proyecto Event Loop y Asincronicidad (Simulador de Cafetería)
index.html: Estructura la interfaz de usuario con un botón para agregar pedidos y un contenedor para mostrarlos.

script.js: Contiene la lógica JavaScript para simular la recepción y procesamiento asíncrono de pedidos, actualizando su estado en la interfaz.

2. Proyecto Callbacks y JSON (Gestión de Biblioteca)
gestionBiblioteca.js: Archivo único de JavaScript que simula una base de datos de libros en formato JSON, e implementa funciones (usando callbacks) para consultar, agregar y actualizar la disponibilidad de los libros, simulando operaciones asíncronas de lectura/escritura.

3. Proyecto Fetch y Axios (Consumo de API Rick & Morty)
index.html: Define la página web con botones para disparar solicitudes con Fetch y Axios, y un área para mostrar los personajes obtenidos de la API.

script.js: Implementa las funciones para realizar llamadas a la API de Rick & Morty utilizando tanto fetch como axios, y la lógica para mostrar los datos (nombre e imagen de personajes) en la interfaz.

4. Proyecto Promesas y Async/Await (Sistema de Reservas Restaurante)
sistemaReservas.js: Archivo JavaScript que simula un sistema de reservas. Utiliza promesas y async/await para verificar disponibilidad de mesas, simular el envío de confirmaciones por correo y manejar errores en el proceso.

5. Proyecto de Manejo de Formularios (Registro de Eventos)
index.html: Contiene la estructura del formulario de registro con campos para nombre, correo, teléfono, intereses (checkboxes), horario (radio buttons), fecha y subida de archivo.

style.css: Archivo CSS dedicado para los estilos visuales del formulario, haciéndolo más presentable.

script.js: Implementa la lógica de JavaScript para la validación de los campos del formulario (incluyendo validaciones adicionales como formato de teléfono, fecha no pasada, y selección de al menos un interés/horario) antes de un envío simulado.

6. Proyecto de Validación de Formularios con Zod
index.html: Estructura un formulario de registro simple (nombre, correo, contraseña) y los elementos para mostrar mensajes de error y éxito.

script.js: Define un esquema de validación con la biblioteca Zod para los campos del formulario. Implementa la validación tanto en tiempo real (al escribir) como al momento de enviar el formulario, mostrando mensajes de error claros.

7. Proyecto de Intro a Node.js y npm (Explorador Planetario)
package.json: Archivo de configuración del proyecto Node.js, define metadatos, dependencias (como chalk) y scripts (como npm start).

planetas.js: Módulo de Node.js que encapsula la lógica para manejar una lista de planetas (obtener, agregar, contar por tipo, total).

app.js: Archivo principal de la aplicación Node.js que utiliza el módulo planetas.js y la librería chalk para mostrar información estilizada sobre los planetas en la consola, incluyendo funcionalidades adicionales como agregar planetas y mostrar estadísticas.

8. Proyecto de Intro a Vite (Adivina el Número)
index.html: Define la estructura de la página del juego "Adivina el Número", incluyendo el campo de entrada, botones y áreas para mensajes y retroalimentación.

style.css: Contiene los estilos CSS para la interfaz del juego, haciéndola visualmente atractiva.

game.js: Módulo de JavaScript (ES Module) que contiene toda la lógica del juego: iniciar una nueva partida, generar el número secreto, procesar los intentos del jugador, y llevar el control de los intentos restantes y anteriores.

main.js: Punto de entrada de la aplicación Vite. Importa el módulo game.js, maneja los eventos del DOM (clics en botones, entrada de texto) y actualiza la interfaz de usuario con la información del juego.
