// Lista inicial de planetas. Usamos 'let' para poder modificarla.
let planetasFavoritos = [
    { nombre: "Tierra", tipo: "Rocoso", habitado: true, id: 1 },
    { nombre: "Marte", tipo: "Rocoso", habitado: false, id: 2 },
    { nombre: "Júpiter", tipo: "Gaseoso", habitado: false, id: 3 },
    { nombre: "Kepler-186f", tipo: "Rocoso", habitado: "Potencialmente", id: 4 }
];
let proximoId = 5; // Para asignar IDs únicos a nuevos planetas

/**
 * Devuelve una copia de la lista de planetas favoritos.
 * @returns {Array<Object>} Un array con los planetas.
 */
function obtenerPlanetas() {
    // Devolvemos una copia para evitar mutaciones externas directas del array original.
    return [...planetasFavoritos];
}

/**
 * Agrega un nuevo planeta a la lista de descubrimientos.
 * @param {string} nombre - El nombre del planeta.
 * @param {string} tipo - El tipo de planeta (ej: Rocoso, Gaseoso, Helado).
 * @param {boolean|string} habitado - Si el planeta está habitado (true/false) o es potencialmente habitable (string).
 * @returns {Object|null} El objeto del planeta agregado o null si faltan datos.
 */
function agregarPlaneta(nombre, tipo, habitado) {
    // Validación básica de los datos de entrada
    if (!nombre || !tipo || habitado === undefined) {
        // Usamos console.error para los mensajes de error, es una buena práctica.
        console.error("Error: Para agregar un planeta se requiere nombre, tipo y estado de habitabilidad.");
        return null; // Retornamos null para indicar que la operación falló.
    }

    const nuevoPlaneta = {
        id: proximoId++, // Asignamos y luego incrementamos el ID
        nombre: nombre,
        tipo: tipo,
        habitado: habitado
    };
    planetasFavoritos.push(nuevoPlaneta);
    // No es necesario console.log aquí, la función principal (app.js) se encargará de los mensajes al usuario.
    return nuevoPlaneta; // Devolvemos el planeta recién creado.
}

/**
 * Cuenta cuántos planetas de un tipo específico existen en la lista.
 * @param {string} tipoBuscado - El tipo de planeta a contar (ej: "Rocoso").
 * @returns {number} La cantidad de planetas de ese tipo.
 */
function contarPlanetasPorTipo(tipoBuscado) {
    if (!tipoBuscado) return 0; // Si no se especifica tipo, no hay nada que contar.
    // Usamos toLowerCase para hacer la comparación insensible a mayúsculas/minúsculas.
    return planetasFavoritos.filter(planeta => planeta.tipo.toLowerCase() === tipoBuscado.toLowerCase()).length;
}

/**
 * Obtiene el número total de planetas descubiertos.
 * @returns {number} El total de planetas en la lista.
 */
function obtenerTotalPlanetas() {
    return planetasFavoritos.length;
}

// Exportamos las funciones para que puedan ser utilizadas en otros archivos (módulos).
// Este es el sistema de módulos CommonJS de Node.js.
module.exports = {
    obtenerPlanetas,
    agregarPlaneta,
    contarPlanetasPorTipo,
    obtenerTotalPlanetas
};
