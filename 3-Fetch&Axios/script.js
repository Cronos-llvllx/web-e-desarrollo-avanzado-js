document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const fetchButton = document.getElementById('fetch-button');
    const axiosButton = document.getElementById('axios-button');
    const dataContainer = document.getElementById('data-container');
    const loader = document.getElementById('loader'); // Opcional, si se usa un loader visual

    // URL de la API (Rick & Morty API, primera página de personajes)
    const API_URL = 'https://rickandmortyapi.com/api/character?page=1';

    /**
     * Muestra un mensaje de carga en el contenedor de datos.
     */
    function showLoader() {
        if (loader) loader.classList.remove('hidden');
        dataContainer.innerHTML = '<p class="text-gray-400 col-span-full text-center text-xl">Cargando personajes...</p>';
    }

    /**
     * Oculta el mensaje de carga.
     */
    function hideLoader() {
        if (loader) loader.classList.add('hidden');
        // No limpiamos el dataContainer aquí, ya que se llenará con datos o un error.
    }

    /**
     * Maneja y muestra errores en el contenedor de datos.
     * @param {Error} error - El objeto de error.
     * @param {string} method - El método que originó el error ('Fetch' o 'Axios').
     */
    function handleError(error, method) {
        console.error(`Error con ${method}:`, error);
        hideLoader();
        dataContainer.innerHTML = `
            <div class="col-span-full bg-red-800 text-red-100 p-6 rounded-lg shadow-lg text-center">
                <h3 class="font-bold text-xl mb-2">¡Ups! Algo salió mal con ${method}</h3>
                <p>No se pudieron cargar los personajes. Intenta de nuevo más tarde.</p>
                <p class="mt-2 text-sm bg-red-900 p-2 rounded">${error.message}</p>
            </div>
        `;
    }

    /**
     * Muestra los personajes en el contenedor de datos.
     * @param {Array<Object>} characters - Un array de objetos de personajes.
     */
    function displayData(characters) {
        hideLoader();
        dataContainer.innerHTML = ''; // Limpiar contenido anterior

        if (!characters || characters.length === 0) {
            dataContainer.innerHTML = '<p class="text-gray-500 col-span-full text-center">No se encontraron personajes.</p>';
            return;
        }

        characters.forEach(character => {
            const characterCard = `
                <div class="character-card bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-1 transform hover:scale-105 transition-transform duration-300">
                    <img src="${character.image}" alt="[Imagen de ${character.name}]" class="w-full h-48 sm:h-56 object-cover rounded-t-lg">
                    <div class="p-4">
                        <h2 class="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">${character.name}</h2>
                        <p class="text-sm text-gray-300 mb-1"><span class="font-semibold text-gray-200">Estado:</span> ${character.status}</p>
                        <p class="text-sm text-gray-300 mb-1"><span class="font-semibold text-gray-200">Especie:</span> ${character.species}</p>
                        <p class="text-sm text-gray-300"><span class="font-semibold text-gray-200">Origen:</span> ${character.origin.name}</p>
                    </div>
                </div>
            `;
            dataContainer.innerHTML += characterCard;
        });
    }

    /**
     * Obtiene datos de la API utilizando Fetch.
     */
    async function fetchDataWithFetch() {
        showLoader();
        try {
            const response = await fetch(API_URL);
            // fetch no lanza un error para respuestas HTTP 4xx/5xx por defecto.
            // Necesitamos verificar la propiedad `ok`.
            if (!response.ok) {
                // Intentamos obtener un mensaje de error del cuerpo si existe
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    // Si el cuerpo no es JSON o está vacío
                    errorData = { message: `Error HTTP: ${response.status} ${response.statusText}` };
                }
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            displayData(data.results); // La API de Rick & Morty devuelve los personajes en la propiedad 'results'
        } catch (error) {
            handleError(error, 'Fetch');
        }
    }

    /**
     * Obtiene datos de la API utilizando Axios.
     */
    async function fetchDataWithAxios() {
        showLoader();
        try {
            const response = await axios.get(API_URL);
            // Axios lanza un error para respuestas HTTP 4xx/5xx por defecto.
            displayData(response.data.results); // Axios envuelve la respuesta en una propiedad 'data'
        } catch (error) {
            // Axios empaqueta más información en el objeto de error
            if (error.response) {
                // La solicitud se realizó y el servidor respondió con un código de estado
                // que cae fuera del rango de 2xx
                console.error('Datos del error de Axios:', error.response.data);
                console.error('Estado del error de Axios:', error.response.status);
                handleError(new Error(error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`), 'Axios');
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                console.error('Error de solicitud de Axios:', error.request);
                handleError(new Error('No se recibió respuesta del servidor.'), 'Axios');
            } else {
                // Algo sucedió al configurar la solicitud que provocó un error
                console.error('Error general de Axios:', error.message);
                handleError(error, 'Axios');
            }
        }
    }

    // Asignar los manejadores de eventos a los botones
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchDataWithFetch);
    } else {
        console.error("Botón 'fetch-button' no encontrado.");
    }

    if (axiosButton) {
        axiosButton.addEventListener('click', fetchDataWithAxios);
    } else {
        console.error("Botón 'axios-button' no encontrado.");
    }
});