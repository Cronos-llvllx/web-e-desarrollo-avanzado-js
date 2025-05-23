document.addEventListener('DOMContentLoaded', () => {
    
    const agregarPedidoBtn = document.getElementById('agregarPedidoBtn');
    const pedidosContainer = document.getElementById('pedidos-container');

    // Array para almacenar los pedidos
    let pedidos = [];
    // Contador para generar IDs únicos para los pedidos
    let proximoIdPedido = 1;

    // Nombres de cafés para simular variedad en los pedidos
    const nombresDeCafe = [
        "Espresso", "Latte", "Cappuccino", "Americano", "Mocha",
        "Macchiato", "Flat White", "Affogato", "Cold Brew", "Frappé"
    ];

    /**
     * Genera un ID único para cada pedido.
     * @returns {number} El ID único generado.
     */
    function generarIdUnico() {
        return proximoIdPedido++;
    }

    /**
     * Selecciona un nombre de café aleatorio de la lista.
     * @returns {string} Un nombre de café.
     */
    function obtenerNombreDeCafeAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * nombresDeCafe.length);
        return nombresDeCafe[indiceAleatorio];
    }

    /**
     * Actualiza la visualización de los pedidos en la interfaz de usuario.
     * Limpia el contenedor y vuelve a dibujar todos los pedidos.
     */
    function actualizarVistaPedidos() {
        // Limpiar el contenedor de pedidos actual
        pedidosContainer.innerHTML = '';

        if (pedidos.length === 0) {
            pedidosContainer.innerHTML = `
                <div class="text-center text-gray-500 p-4">
                    No hay pedidos pendientes. ¡Agrega uno nuevo!
                </div>
            `;
            return;
        }

        // Crear y agregar cada pedido al contenedor
        pedidos.forEach(pedido => {
            const pedidoDiv = document.createElement('div');
            pedidoDiv.classList.add('pedido-card', 'p-4', 'rounded-md', 'shadow', 'mb-3'); // mb-3 para espacio entre cards

            let bgColor, borderColor, textColor, statusTextClass;

            if (pedido.estado === 'En Proceso') {
                bgColor = 'bg-yellow-100';
                borderColor = 'border-yellow-500';
                textColor = 'text-yellow-700';
                statusTextClass = 'font-bold text-yellow-800';
            } else if (pedido.estado === 'Completado') {
                bgColor = 'bg-green-100';
                borderColor = 'border-green-500';
                textColor = 'text-green-700';
                statusTextClass = 'font-bold text-green-800';
            } else { // Por si acaso hay otros estados, o estado inicial
                bgColor = 'bg-gray-100';
                borderColor = 'border-gray-500';
                textColor = 'text-gray-700';
                statusTextClass = 'font-bold text-gray-800';
            }

            pedidoDiv.classList.add(bgColor, `border-l-4`, borderColor, textColor);

            pedidoDiv.innerHTML = `
                <p class="font-semibold text-lg">Pedido #${pedido.id} - ${pedido.nombre}</p>
                <p>Estado: <span class="${statusTextClass}">${pedido.estado}</span></p>
            `;
            pedidosContainer.appendChild(pedidoDiv);
        });
    }

    /**
     * Simula el tiempo de preparación de un pedido.
     * @param {object} pedido - El objeto del pedido que se está preparando.
     * @returns {Promise<string>} Una promesa que se resuelve cuando el pedido está listo.
     */
    function simularPreparacion(pedido) {
        // Tiempo de preparación aleatorio entre 2 y 7 segundos (2000ms - 7000ms)
        const tiempoDePreparacion = Math.random() * (7000 - 2000) + 2000;
        console.log(`Pedido #${pedido.id} (${pedido.nombre}) comenzará preparación. Duración: ${Math.round(tiempoDePreparacion / 1000)}s`);

        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Pedido #${pedido.id} (${pedido.nombre}) completado.`);
                resolve(`El pedido #${pedido.id} (${pedido.nombre}) está listo.`);
            }, tiempoDePreparacion);
        });
    }

    /**
     * Procesa un pedido: lo marca como 'En Proceso', simula su preparación y luego lo marca como 'Completado'.
     * Utiliza async/await para manejar la asincronía.
     * @param {object} pedido - El objeto del pedido a procesar.
     */
    async function procesarPedido(pedido) {
        // Marcar el pedido como 'En Proceso' y actualizar la vista
        pedido.estado = 'En Proceso';
        console.log(`Pedido #${pedido.id} (${pedido.nombre}) cambió a: En Proceso`);
        actualizarVistaPedidos();

        // Esperar a que la simulación de preparación termine
        try {
            const mensaje = await simularPreparacion(pedido);
            console.log(mensaje); // Mensaje de la promesa resuelta

            // Marcar el pedido como 'Completado' y actualizar la vista
            pedido.estado = 'Completado';
            console.log(`Pedido #${pedido.id} (${pedido.nombre}) cambió a: Completado`);
            actualizarVistaPedidos();
        } catch (error) {
            console.error(`Error al procesar el pedido #${pedido.id}:`, error);
            // Opcionalmente, manejar el error en la UI, marcando el pedido como 'Error'
            pedido.estado = 'Error en preparación';
            actualizarVistaPedidos();
        }
    }

    /**
     * Maneja la recepción de un nuevo pedido.
     * Crea un nuevo objeto de pedido, lo añade al array de pedidos y comienza su procesamiento.
     */
    function recibirNuevoPedido() {
        const nuevoPedido = {
            id: generarIdUnico(),
            nombre: obtenerNombreDeCafeAleatorio(),
            estado: 'Pendiente' // Estado inicial antes de procesar
        };

        console.log(`Recibido nuevo pedido: #${nuevoPedido.id} - ${nuevoPedido.nombre}`);
        pedidos.push(nuevoPedido);
        // Iniciar el procesamiento asincrónico del pedido
        procesarPedido(nuevoPedido);
        // Actualizar la vista inmediatamente para mostrar el nuevo pedido (aunque su estado cambiará pronto a 'En Proceso')
        // La primera actualización de 'En Proceso' se hará dentro de procesarPedido.
        // Si se quiere mostrar como 'Pendiente' brevemente:
        // actualizarVistaPedidos();
    }

    // Asignar el manejador de eventos al botón 'Agregar Pedido'
    if (agregarPedidoBtn) {
        agregarPedidoBtn.addEventListener('click', recibirNuevoPedido);
    } else {
        console.error("El botón 'agregarPedidoBtn' no fue encontrado en el DOM.");
    }

    // Actualizar la vista inicialmente (mostrará el mensaje de "No hay pedidos")
    actualizarVistaPedidos();
});