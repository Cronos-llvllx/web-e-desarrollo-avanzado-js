// Variable global que simula las mesas disponibles en el restaurante
let mesasDisponibles = 10; // Puedes cambiar este valor para probar

/**
 * Comprueba si el número de mesas solicitadas es menor o igual a las mesas disponibles.
 * @param {number} mesasSolicitadas - El número de mesas que el cliente desea reservar.
 * @returns {Promise<string>} Una promesa que se resuelve si hay disponibilidad
 * o se rechaza si no hay suficientes mesas.
 */
function verificarDisponibilidad(mesasSolicitadas) {
    console.log(`\n🔎 Verificando disponibilidad para ${mesasSolicitadas} mesa(s)...`);
    return new Promise((resolve, reject) => {
        // Simular un pequeño retraso, como si fuera una consulta a una base de datos
        setTimeout(() => {
            if (mesasSolicitadas <= 0) {
                reject(new Error("El número de mesas solicitadas debe ser mayor que cero."));
            } else if (mesasSolicitadas <= mesasDisponibles) {
                // Si hay mesas, reducimos el contador de mesas disponibles
                // mesasDisponibles -= mesasSolicitadas; // Esto se haría si la reserva se confirma
                resolve(`¡Buenas noticias! Hay ${mesasSolicitadas} mesa(s) disponible(s).`);
            } else {
                reject(new Error(`Lo sentimos, no hay suficientes mesas disponibles. Solicitadas: ${mesasSolicitadas}, Disponibles: ${mesasDisponibles}.`));
            }
        }, 1000); // Simula 1 segundo de espera
    });
}

/**
 * Simula el envío de un correo electrónico de confirmación.
 * Utiliza Math.random() para decidir si el correo se envía exitosamente o si ocurre un error.
 * @param {string} nombreCliente - El nombre del cliente para personalizar el correo.
 * @returns {Promise<string>} Una promesa que se resuelve si el correo se envió
 * o se rechaza si hubo un fallo en el envío.
 */
function enviarConfirmacionReserva(nombreCliente) {
    console.log(`\n📧 Intentando enviar correo de confirmación a ${nombreCliente}...`);
    return new Promise((resolve, reject) => {
        // Simular un pequeño retraso, como si fuera un servicio de envío de correos
        setTimeout(() => {
            const exitoEnvio = Math.random() > 0.3; // 70% de probabilidad de éxito

            if (exitoEnvio) {
                resolve(`Correo de confirmación enviado exitosamente a ${nombreCliente}.`);
            } else {
                reject(new Error(`Error al enviar el correo de confirmación a ${nombreCliente}. Por favor, intente contactar al restaurante.`));
            }
        }, 1500); // Simula 1.5 segundos de espera
    });
}

/**
 * Función principal que orquesta el proceso de reserva.
 * @param {string} nombreCliente - Nombre del cliente que realiza la reserva.
 * @param {number} mesasSolicitadas - Número de mesas que desea reservar.
 */
async function hacerReserva(nombreCliente, mesasSolicitadas) {
    console.log(`\n--- Iniciando proceso de reserva para ${nombreCliente} (${mesasSolicitadas} mesa(s)) ---`);
    try {
        // Paso 1: Verificar disponibilidad usando await
        const mensajeDisponibilidad = await verificarDisponibilidad(mesasSolicitadas);
        console.log(`✅ ${mensajeDisponibilidad}`);

        // Si la disponibilidad fue exitosa, procedemos a confirmar y "reservar" las mesas
        console.log(`⏳ Confirmando reserva y actualizando mesas disponibles...`);
        mesasDisponibles -= mesasSolicitadas; // Actualizamos las mesas disponibles globalmente
        console.log(`ℹ️ Mesas disponibles restantes: ${mesasDisponibles}`);


        // Paso 2: Enviar confirmación por correo usando await
        const mensajeConfirmacion = await enviarConfirmacionReserva(nombreCliente);
        console.log(`✅ ${mensajeConfirmacion}`);

        console.log(`\n🎉 ¡Reserva para ${nombreCliente} completada exitosamente por ${mesasSolicitadas} mesa(s)! 🎉`);

    } catch (error) {
        // Manejo de errores de cualquiera de las promesas (verificarDisponibilidad o enviarConfirmacionReserva)
        console.error(`❌ Error en el proceso de reserva para ${nombreCliente}: ${error.message}`);
    } finally {
        console.log(`--- Proceso de reserva para ${nombreCliente} finalizado ---`);
    }
}

// Probar la solución

async function ejecutarPruebas() {
    console.log("--- Iniciando Pruebas del Sistema de Reservas ---");
    console.log(`Mesas disponibles inicialmente: ${mesasDisponibles}`);

    // Prueba 1: Reserva exitosa
    await hacerReserva("Ana López", 2);
    // Esperamos un poco para que las salidas de consola no se mezclen tanto
    await new Promise(resolve => setTimeout(resolve, 500));


    // Prueba 2: Intento de reservar más mesas de las disponibles
    await hacerReserva("Carlos Ruiz", 15);
    await new Promise(resolve => setTimeout(resolve, 500));


    // Prueba 3: Reserva exitosa que consume casi todas las mesas
    await hacerReserva("Laura Méndez", 7); // Si la prueba 1 fue exitosa, quedan 10-2 = 8 mesas. Esta debería ser exitosa.
    await new Promise(resolve => setTimeout(resolve, 500));

    // Prueba 4: Intento de reservar cuando quedan muy pocas mesas o ninguna (depende de la simulación de error en correo)
    // Si la prueba 3 fue exitosa, quedan 8-7 = 1 mesa.
    await hacerReserva("Pedro Gómez", 2); // Debería fallar por disponibilidad
    await new Promise(resolve => setTimeout(resolve, 500));

    // Prueba 5: Reserva de 0 mesas (debería fallar por validación)
    await hacerReserva("Cliente Fantasma", 0);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Prueba 6: Simular un fallo en el envío del correo (esto es aleatorio)
    // Para forzar un fallo en el correo, tendrías que modificar temporalmente la probabilidad en `enviarConfirmacionReserva`
    // o ejecutar varias veces hasta que ocurra.
    // Aquí, simplemente hacemos una reserva válida y observamos si el correo falla o no.
    console.log("\nIntentando una reserva donde el correo podría fallar (probabilidad ~30%)...");
    await hacerReserva("Sofía Vargas", 1); // Si queda 1 mesa, esto debería pasar la disponibilidad.

    console.log("\n--- Pruebas del Sistema de Reservas Finalizadas ---");
    console.log(`Mesas disponibles al final de las pruebas: ${mesasDisponibles}`);
}
ejecutarPruebas();