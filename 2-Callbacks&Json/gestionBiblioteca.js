// objeto JSON (simulado como un array de objetos en JavaScript)
let biblioteca = [
    { titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", genero: "Realismo Mágico", disponible: true, id: 1 },
    { titulo: "El Señor de los Anillos", autor: "J.R.R. Tolkien", genero: "Fantasía Épica", disponible: false, id: 2 },
    { titulo: "1984", autor: "George Orwell", genero: "Distopía", disponible: true, id: 3 },
    { titulo: "Un Mundo Feliz", autor: "Aldous Huxley", genero: "Ciencia Ficción", disponible: true, id: 4 }
];

let proximoIdLibro = 5; // Para asignar IDs únicos a nuevos libros

/**
 * Esta función toma un callback que se ejecutará después de un retraso simulado.
 * El callback recibe dos argumentos: error y datos.
 * @param {function} callback - Función a ejecutar después de la lectura. Recibe (error, datos).
 */
function simularLecturaDatos(callback) {
    console.log("📚 Iniciando lectura de datos de la biblioteca...");
    const tiempoDeLectura = 1000; // Simular 1 segundo de retraso

    setTimeout(() => {
        // Simulamos una lectura exitosa. En un caso real, aquí podría haber un error.
        // Devolvemos una copia profunda para evitar modificaciones directas del original fuera de las funciones de escritura.
        const datosLeidos = JSON.parse(JSON.stringify(biblioteca));
        console.log("✅ Datos leídos exitosamente.");
        callback(null, datosLeidos); // null para el error, y los datos leídos
    }, tiempoDeLectura);
}

/**
 * Esta función toma los nuevos datos y un callback que se ejecutará después de un retraso simulado.
 * El callback recibe un argumento: error.
 * @param {Array<Object>} nuevosDatos - El array completo de libros para "escribir".
 * @param {function} callback - Función a ejecutar después de la escritura. Recibe (error).
 */
function simularEscrituraDatos(nuevosDatos, callback) {
    console.log("💾 Iniciando escritura de datos en la biblioteca...");
    const tiempoDeEscritura = 1500; // Simular 1.5 segundos de retraso

    setTimeout(() => {
        // Actualizamos la "base de datos" en memoria.
        biblioteca = JSON.parse(JSON.stringify(nuevosDatos)); // Guardar una copia profunda
        console.log("✅ Datos escritos exitosamente.");
        callback(null); // null para el error, indicando éxito
    }, tiempoDeEscritura);
}

/**
 * 3.1. Función para consultar el inventario de libros.
 */
function consultarLibros() {
    console.log("\n--- Consultando Inventario de Libros ---");
    simularLecturaDatos((error, libros) => {
        if (error) {
            console.error("Error al leer los libros:", error);
            return;
        }
        if (libros.length === 0) {
            console.log("La biblioteca está vacía.");
        } else {
            console.log("Libros en la biblioteca:");
            libros.forEach(libro => {
                console.log(
                    `  ID: ${libro.id}, Título: "${libro.titulo}", Autor: ${libro.autor}, Género: ${libro.genero}, Disponible: ${libro.disponible ? 'Sí' : 'No (Prestado)'}`
                );
            });
        }
    });
}

/**
 * 3.2. Función para agregar un nuevo libro al inventario.
 * @param {Object} libroAAgregar - Objeto con { titulo, autor, genero }. La disponibilidad se asume true por defecto.
 * @param {function} callbackFinal - Callback a ejecutar tras intentar agregar el libro. Recibe (error, mensajeExito).
 */
function agregarLibro(libroAAgregar, callbackFinal) {
    console.log(`\n--- Agregando Nuevo Libro: "${libroAAgregar.titulo}" ---`);

    if (!libroAAgregar.titulo || !libroAAgregar.autor || !libroAAgregar.genero) {
        const errorMsg = "Error: El libro debe tener título, autor y género.";
        console.error(errorMsg);
        if (callbackFinal) callbackFinal(new Error(errorMsg), null);
        return;
    }

    simularLecturaDatos((errorLectura, librosActuales) => {
        if (errorLectura) {
            console.error("Error al leer datos antes de agregar:", errorLectura);
            if (callbackFinal) callbackFinal(errorLectura, null);
            return;
        }

        const nuevoLibro = {
            ...libroAAgregar,
            id: proximoIdLibro++,
            disponible: true // Los libros nuevos se agregan como disponibles
        };

        librosActuales.push(nuevoLibro);

        simularEscrituraDatos(librosActuales, (errorEscritura) => {
            if (errorEscritura) {
                console.error("Error al escribir datos después de agregar:", errorEscritura);
                if (callbackFinal) callbackFinal(errorEscritura, null);
                return;
            }
            const mensajeExito = `Libro "${nuevoLibro.titulo}" agregado exitosamente con ID: ${nuevoLibro.id}.`;
            console.log(mensajeExito);
            if (callbackFinal) callbackFinal(null, mensajeExito);
        });
    });
}

/**
 * 3. Función para actualizar la disponibilidad de un libro.
 * @param {number} idLibro - El ID del libro a actualizar.
 * @param {boolean} nuevaDisponibilidad - true si está disponible, false si está prestado.
 * @param {function} callbackFinal - Callback a ejecutar tras intentar actualizar. Recibe (error, mensajeExito).
 */
function actualizarDisponibilidadLibro(idLibro, nuevaDisponibilidad, callbackFinal) {
    console.log(`\n--- Actualizando Disponibilidad del Libro ID: ${idLibro} a ${nuevaDisponibilidad ? 'Disponible' : 'Prestado'} ---`);

    if (typeof idLibro !== 'number' || typeof nuevaDisponibilidad !== 'boolean') {
        const errorMsg = "Error: Se requiere un ID de libro numérico y un estado de disponibilidad booleano.";
        console.error(errorMsg);
        if (callbackFinal) callbackFinal(new Error(errorMsg), null);
        return;
    }

    simularLecturaDatos((errorLectura, librosActuales) => {
        if (errorLectura) {
            console.error("Error al leer datos antes de actualizar:", errorLectura);
            if (callbackFinal) callbackFinal(errorLectura, null);
            return;
        }

        const indiceLibro = librosActuales.findIndex(libro => libro.id === idLibro);

        if (indiceLibro === -1) {
            const errorMsg = `Error: No se encontró el libro con ID ${idLibro}.`;
            console.error(errorMsg);
            if (callbackFinal) callbackFinal(new Error(errorMsg), null);
            return;
        }

        librosActuales[indiceLibro].disponible = nuevaDisponibilidad;

        simularEscrituraDatos(librosActuales, (errorEscritura) => {
            if (errorEscritura) {
                console.error("Error al escribir datos después de actualizar:", errorEscritura);
                if (callbackFinal) callbackFinal(errorEscritura, null);
                return;
            }
            const mensajeExito = `Disponibilidad del libro "${librosActuales[indiceLibro].titulo}" (ID: ${idLibro}) actualizada a: ${nuevaDisponibilidad ? 'Disponible' : 'Prestado'}.`;
            console.log(mensajeExito);
            if (callbackFinal) callbackFinal(null, mensajeExito);
        });
    });
}
// 1. Consultar libros al inicio
consultarLibros(); // Esta operación es asíncrona
setTimeout(() => {
    // 2. Agregar un nuevo libro
    agregarLibro(
        { titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Novela Clásica" },
        (error, mensaje) => {
            if (error) console.error("Fallo al agregar:", error.message);
            // else console.log(mensaje); // El mensaje ya se loguea dentro de agregarLibro

            // 3. Actualizar la disponibilidad de un libro (ej. prestar "1984" con ID 3)
            // Esta llamada se hace DESPUÉS de que el intento de agregar libro haya terminado.
            setTimeout(() => {
                actualizarDisponibilidadLibro(3, false, (errorAct, mensajeAct) => {
                    if (errorAct) console.error("Fallo al actualizar:", errorAct.message);
                    // else console.log(mensajeAct);

                    // 4. Consultar libros nuevamente para ver los cambios
                    // Esta llamada se hace DESPUÉS de que el intento de actualizar haya terminado.
                    setTimeout(() => {
                        consultarLibros();
                    }, 2000); // Esperar a que la actualización termine
                });
            }, 2000); // Esperar a que la adición termine
        }
    );
}, 2000); // Esperar a que la consulta inicial termine (aprox.)