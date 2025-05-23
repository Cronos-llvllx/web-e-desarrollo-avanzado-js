// Estado del juego
let secretNumber; // El número que el jugador debe adivinar
let attemptsLeft; // Intentos restantes
let previousGuesses; // Array para almacenar los intentos anteriores
let gameActive; // Booleano para indicar si el juego está en curso

const MAX_ATTEMPTS = 10; // Número máximo de intentos permitidos
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

/**
 * Inicializa o reinicia el juego.
 */
export function startGame() {
    secretNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    attemptsLeft = MAX_ATTEMPTS;
    previousGuesses = [];
    gameActive = true;
    console.log(`Número secreto (para desarrollo): ${secretNumber}`); // Para facilitar pruebas
    return {
        message: `¡Nuevo juego iniciado! Adivina un número entre ${MIN_NUMBER} y ${MAX_NUMBER}.`,
        attemptsLeft: attemptsLeft,
        previousGuesses: [],
        gameActive: gameActive,
        status: 'info'
    };
}

/**
 * Procesa el intento del jugador.
 * @param {number} guess - El número que el jugador ha ingresado.
 * @returns {object} Un objeto con el mensaje, intentos restantes, y estado del juego.
 */
export function handleGuess(guess) {
    if (!gameActive) {
        return {
            message: "El juego ha terminado. Por favor, inicia uno nuevo.",
            attemptsLeft: attemptsLeft,
            previousGuesses: previousGuesses,
            gameActive: gameActive,
            status: 'warning'
        };
    }

    // Validar la entrada
    if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
        return {
            message: `Por favor, ingresa un número válido entre ${MIN_NUMBER} y ${MAX_NUMBER}.`,
            attemptsLeft: attemptsLeft,
            previousGuesses: previousGuesses,
            gameActive: gameActive,
            status: 'warning'
        };
    }

    // Verificar si el número ya fue intentado
    if (previousGuesses.includes(guess)) {
        return {
            message: `Ya intentaste el número ${guess}. Prueba con otro.`,
            attemptsLeft: attemptsLeft,
            previousGuesses: previousGuesses,
            gameActive: gameActive,
            status: 'info'
        };
    }

    // Procesar el intento
    attemptsLeft--;
    previousGuesses.push(guess);

    if (guess === secretNumber) {
        gameActive = false;
        return {
            message: `¡Felicidades! 🎉 Adivinaste el número ${secretNumber} en ${MAX_ATTEMPTS - attemptsLeft} intentos.`,
            attemptsLeft: attemptsLeft,
            previousGuesses: previousGuesses,
            gameActive: gameActive,
            status: 'correct'
        };
    } else if (attemptsLeft === 0) {
        gameActive = false;
        return {
            message: `¡Juego terminado! 😥 Te quedaste sin intentos. El número era ${secretNumber}.`,
            attemptsLeft: attemptsLeft,
            previousGuesses: previousGuesses,
            gameActive: gameActive,
            status: 'error'
        };
    } else if (guess < secretNumber) {
        return {
            message: `El número ${guess} es demasiado BAJO. ¡Sigue intentando!`,
            attemptsLeft: attemptsLeft,
            previousGuesses: previousGuesses,
            gameActive: gameActive,
            status: 'info'
        };
    } else { // guess > secretNumber
        return {
            message: `El número ${guess} es demasiado ALTO. ¡Sigue intentando!`,
            attemptsLeft: attemptsLeft,
            previousGuesses: previousGuesses,
            gameActive: gameActive,
            status: 'info'
        };
    }
}

/**
 * Devuelve el estado actual del juego (si está activo o no).
 * @returns {boolean}
 */
export function isGameActive() {
    return gameActive;
}
