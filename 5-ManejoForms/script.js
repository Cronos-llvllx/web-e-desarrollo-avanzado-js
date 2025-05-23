document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('event-form');
    const successMessageContainer = document.getElementById('success-message');

    // Referencias a campos y sus errores
    const nombreInput = document.getElementById('nombre');
    const nombreError = document.getElementById('nombre-error');

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    const telefonoInput = document.getElementById('telefono');
    const telefonoError = document.getElementById('telefono-error');

    const interesesCheckboxes = document.querySelectorAll('input[name="intereses[]"]');
    const interesesError = document.getElementById('intereses-error');

    const horarioRadios = document.querySelectorAll('input[name="horario"]');
    const horarioError = document.getElementById('horario-error');

    const fechaEventoInput = document.getElementById('fecha-evento');
    const fechaEventoError = document.getElementById('fecha-evento-error');

    const archivoInput = document.getElementById('archivo'); // Opcional
    const archivoError = document.getElementById('archivo-error');


    // --- FUNCIONES DE VALIDACIÓN ESPECÍFICAS ---

    function validarNombre() {
        const nombreValue = nombreInput.value.trim();
        if (nombreValue === '') {
            mostrarError(nombreInput, nombreError, 'El nombre completo es obligatorio.');
            return false;
        } else if (nombreValue.length < 3) {
            mostrarError(nombreInput, nombreError, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }
        limpiarError(nombreInput, nombreError);
        return true;
    }

    function validarEmail() {
        const emailValue = emailInput.value.trim();
        // Expresión regular simple para validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            mostrarError(emailInput, emailError, 'El correo electrónico es obligatorio.');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            mostrarError(emailInput, emailError, 'Por favor, introduce un correo electrónico válido.');
            return false;
        }
        limpiarError(emailInput, emailError);
        return true;
    }

    function validarTelefono() {
        const telefonoValue = telefonoInput.value.trim();
        const telefonoRegex = /^\d{10}$/; // Exactamente 10 dígitos numéricos
        if (telefonoValue === '') {
            mostrarError(telefonoInput, telefonoError, 'El teléfono es obligatorio.');
            return false;
        } else if (!telefonoRegex.test(telefonoValue)) {
            mostrarError(telefonoInput, telefonoError, 'El teléfono debe contener 10 dígitos numéricos.');
            return false;
        }
        limpiarError(telefonoInput, telefonoError);
        return true;
    }

    function validarIntereses() {
        const algunoSeleccionado = Array.from(interesesCheckboxes).some(checkbox => checkbox.checked);
        if (!algunoSeleccionado) {
            // No usamos mostrarError en el input directamente, sino en el contenedor de error del fieldset
            interesesError.textContent = 'Debes seleccionar al menos un interés.';
            // Podríamos añadir una clase de error al fieldset si quisiéramos
            return false;
        }
        interesesError.textContent = '';
        return true;
    }

    function validarHorario() {
        const algunoSeleccionado = Array.from(horarioRadios).some(radio => radio.checked);
        if (!algunoSeleccionado) {
            horarioError.textContent = 'Debes seleccionar un horario preferido.';
            return false;
        }
        horarioError.textContent = '';
        return true;
    }

    function validarFechaEvento() {
        const fechaEventoValue = fechaEventoInput.value;
        if (fechaEventoValue === '') {
            mostrarError(fechaEventoInput, fechaEventoError, 'La fecha del evento es obligatoria.');
            return false;
        }
        const fechaSeleccionada = new Date(fechaEventoValue + "T00:00:00"); // Asegurar que se compara con inicio del día
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Poner la hora a 00:00:00 para comparar solo fechas

        if (fechaSeleccionada < hoy) {
            mostrarError(fechaEventoInput, fechaEventoError, 'La fecha del evento no puede ser anterior a hoy.');
            return false;
        }
        limpiarError(fechaEventoInput, fechaEventoError);
        return true;
    }

    // Validación para archivo (opcional, pero si se sube, podría tener restricciones)
    // Por ahora, solo un ejemplo básico si se quisiera validar tipo o tamaño.
    function validarArchivo() {
        if (archivoInput.files.length > 0) {
            const file = archivoInput.files[0];
            const maxSizeMB = 5; // Ejemplo: máximo 5MB
            if (file.size > maxSizeMB * 1024 * 1024) {
                mostrarError(null, archivoError, `El archivo no debe exceder los ${maxSizeMB}MB.`);
                // No se añade clase de error al input de archivo directamente, es más complejo de estilizar.
                return false;
            }
            // Podría validarse el tipo de archivo aquí también:
            // const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            // if (!allowedTypes.includes(file.type)) { ... }
        }
        limpiarError(null, archivoError); // Limpiar error si no hay archivo o si es válido
        return true;
    }


    // --- FUNCIONES AUXILIARES PARA ERRORES ---
    function mostrarError(inputElement, errorElement, mensaje) {
        if (errorElement) errorElement.textContent = mensaje;
        if (inputElement) {
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid');
        }
    }

    function limpiarError(inputElement, errorElement) {
        if (errorElement) errorElement.textContent = '';
        if (inputElement) {
            inputElement.classList.remove('is-invalid');
            // Opcionalmente, añadir clase de válido si se desea feedback visual positivo
            // inputElement.classList.add('is-valid');
        }
    }

    // --- MANEJO DEL ENVÍO DEL FORMULARIO ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío real del formulario

        // Ejecutar todas las validaciones
        const esNombreValido = validarNombre();
        const esEmailValido = validarEmail();
        const esTelefonoValido = validarTelefono();
        const sonInteresesValidos = validarIntereses();
        const esHorarioValido = validarHorario();
        const esFechaValida = validarFechaEvento();
        const esArchivoValido = validarArchivo(); // Opcional

        // Comprobar si todas las validaciones pasan
        if (esNombreValido && esEmailValido && esTelefonoValido &&
            sonInteresesValidos && esHorarioValido && esFechaValida && esArchivoValido) {

            console.log('Formulario válido. Recopilando datos...');
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                // Manejo especial para checkboxes (intereses)
                if (key.endsWith('[]')) {
                    const cleanKey = key.slice(0, -2);
                    if (!data[cleanKey]) {
                        data[cleanKey] = [];
                    }
                    data[cleanKey].push(value);
                } else {
                    data[key] = value;
                }
            });

            console.log('Datos del formulario:', data);

            // Simular envío y mostrar mensaje de éxito
            form.reset(); // Limpiar el formulario
            // Limpiar todas las clases de validación de los inputs
            document.querySelectorAll('.input-field, .checkbox-field, .radio-field').forEach(el => {
                el.classList.remove('is-invalid', 'is-valid');
            });
            // Limpiar mensajes de error de fieldsets
            interesesError.textContent = '';
            horarioError.textContent = '';


            successMessageContainer.classList.remove('hidden');
            setTimeout(() => {
                successMessageContainer.classList.add('hidden');
            }, 3000); // Ocultar mensaje después de 3 segundos

        } else {
            console.log('Formulario inválido. Por favor, corrige los errores.');
            successMessageContainer.classList.add('hidden'); // Asegurarse que no se muestre si hay errores
        }
    });

    // --- EVENT LISTENERS PARA VALIDACIÓN EN TIEMPO REAL (opcional, pero mejora UX) ---
    if (nombreInput) nombreInput.addEventListener('input', validarNombre);
    if (emailInput) emailInput.addEventListener('input', validarEmail);
    if (telefonoInput) telefonoInput.addEventListener('input', validarTelefono);
    if (fechaEventoInput) fechaEventoInput.addEventListener('change', validarFechaEvento); // 'change' es mejor para date
    if (archivoInput) archivoInput.addEventListener('change', validarArchivo);

    // Para checkboxes y radios, la validación al cambiar cualquier opción es más adecuada
    interesesCheckboxes.forEach(checkbox => checkbox.addEventListener('change', validarIntereses));
    horarioRadios.forEach(radio => radio.addEventListener('change', validarHorario));

});
