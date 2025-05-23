document.addEventListener('DOMContentLoaded', () => {
    // Definir el esquema de Zod
    const registroSchema = z.object({
        nombre: z.string()
            .min(1, { message: "El nombre es obligatorio." })
            .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
            .regex(/^[a-zA-Z\s'-]+$/, { message: "El nombre solo puede contener letras, espacios, apóstrofes y guiones." }),
        email: z.string()
            .min(1, { message: "El correo electrónico es obligatorio." })
            .email({ message: "Por favor, introduce un correo electrónico válido." }),
        password: z.string()
            .min(1, { message: "La contraseña es obligatoria." })
            .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
            // Opcional: añadir más reglas, como requerir mayúsculas, números, etc.
            // .regex(/^(?=.*[A-Z])(?=.*\d).+$/, { message: "La contraseña debe contener al menos una mayúscula y un número." })
    });

    // Obtener referencias a los elementos del DOM
    const form = document.getElementById('registro-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const nombreError = document.getElementById('nombre-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    const successMessageContainer = document.getElementById('success-message');

    // --- Helper para mostrar/limpiar errores ---
    function displayError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        if (errorElement) errorElement.textContent = message;
        if (inputElement) {
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid');
        }
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        if (errorElement) errorElement.textContent = '';
        if (inputElement) {
            inputElement.classList.remove('is-invalid');
            // Opcionalmente, añadir clase de válido
            // inputElement.classList.add('is-valid');
        }
    }
    
    function markAsValid(fieldId) {
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
        }
    }

    function clearAllErrors() {
        clearError('nombre');
        clearError('email');
        clearError('password');
        nombreInput.classList.remove('is-valid', 'is-invalid');
        emailInput.classList.remove('is-valid', 'is-invalid');
        passwordInput.classList.remove('is-valid', 'is-invalid');
    }

    // --- Validación en tiempo real ---
    function validateFieldRealTime(fieldId, value) {
        try {
            // Validar solo el campo específico
            const fieldSchema = registroSchema.shape[fieldId];
            fieldSchema.parse(value);
            clearError(fieldId);
            markAsValid(fieldId); // Marcar como válido si pasa
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Mostrar el primer error para este campo
                displayError(fieldId, error.errors[0].message);
            }
            return false;
        }
    }

    nombreInput.addEventListener('input', () => validateFieldRealTime('nombre', nombreInput.value));
    emailInput.addEventListener('input', () => validateFieldRealTime('email', emailInput.value));
    passwordInput.addEventListener('input', () => validateFieldRealTime('password', passwordInput.value));


    // --- Manejo del envío del formulario ---
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío real
        clearAllErrors(); // Limpiar errores previos del submit
        successMessageContainer.classList.add('hidden'); // Ocultar mensaje de éxito

        const formData = {
            nombre: nombreInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };

        const result = registroSchema.safeParse(formData);

        if (!result.success) {
            console.log("Errores de validación:", result.error.flatten().fieldErrors);
            // Iterar sobre los errores y mostrarlos
            const fieldErrors = result.error.flatten().fieldErrors;
            for (const field in fieldErrors) {
                // field es 'nombre', 'email', o 'password'
                // fieldErrors[field] es un array de mensajes de error, tomamos el primero.
                if (fieldErrors[field] && fieldErrors[field].length > 0) {
                    displayError(field, fieldErrors[field][0]);
                }
            }
        } else {
            console.log('¡Validación exitosa!', result.data);
            // Aquí normalmente enviarías los datos al servidor
            // Por ahora, mostramos un mensaje de éxito y reseteamos el formulario
            successMessageContainer.classList.remove('hidden');
            form.reset(); // Limpiar campos del formulario
            clearAllErrors(); // Limpiar cualquier estado visual de error/validez

            setTimeout(() => {
                successMessageContainer.classList.add('hidden');
            }, 3000); // Ocultar mensaje después de 3 segundos
        }
    });
});