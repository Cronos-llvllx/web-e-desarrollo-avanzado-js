import { startGame, handleGuess, isGameActive } from './game.js';

// Elementos del DOM
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');
const attemptsMessageElement = document.getElementById('attemptsMessage');
const previousGuessesContainer = document.getElementById('previousGuessesContainer');
const previousGuessesList = document.getElementById('previousGuessesList');

/**
 * Actualiza la interfaz de usuario con el estado actual del juego.
 * @param {object} gameState - El objeto devuelto por startGame() o handleGuess().
 */
function updateUI(gameState) {
    messageElement.textContent = gameState.message;
    // Aplicar clase de estilo según el estado del mensaje
    messageElement.className = ''; // Limpiar clases previas
    switch(gameState.status) {
        case 'correct':
            messageElement.classList.add('message-correct');
            break;
        case 'error':
            messageElement.classList.add('message-error');
            break;
        case 'warning':
            messageElement.classList.add('message-warning');
            break;
        case 'info':
        default:
            messageElement.classList.add('message-info');
            break;
    }


    if (gameState.attemptsLeft !== undefined) {
        attemptsMessageElement.textContent = `Intentos restantes: ${gameState.attemptsLeft}`;
    } else {
        attemptsMessageElement.textContent = '';
    }

    if (gameState.previousGuesses && gameState.previousGuesses.length > 0) {
        previousGuessesContainer.style.display = 'block';
        previousGuessesList.innerHTML = ''; // Limpiar lista anterior
        gameState.previousGuesses.forEach(guess => {
            const listItem = document.createElement('li');
            listItem.textContent = guess;
            previousGuessesList.appendChild(listItem);
        });
    } else {
        previousGuessesContainer.style.display = 'none';
        previousGuessesList.innerHTML = '';
    }

    // Habilitar/deshabilitar controles
    const gameIsCurrentlyActive = isGameActive();
    guessInput.disabled = !gameIsCurrentlyActive;
    guessButton.disabled = !gameIsCurrentlyActive;

    if (!gameIsCurrentlyActive) {
        restartButton.style.display = 'inline-block'; // Mostrar botón de reinicio
        guessInput.value = ''; // Limpiar input si el juego terminó
    } else {
        restartButton.style.display = 'none'; // Ocultar botón de reinicio durante el juego
    }
}

/**
 * Manejador para el evento de clic en el botón "Adivinar".
 */
function onGuessButtonClick() {
    const guessValue = parseInt(guessInput.value, 10);
    const gameState = handleGuess(guessValue);
    updateUI(gameState);
    if (isGameActive()) { // Solo limpiar si el juego sigue activo y no fue un error de input
        if (gameState.status !== 'warning' || !isNaN(guessValue)) { // No limpiar si fue un input inválido
             guessInput.value = ''; // Limpiar el input para el siguiente intento
        }
    }
    guessInput.focus(); // Devolver el foco al input
}

/**
 * Manejador para el evento de clic en el botón "Jugar de Nuevo".
 */
function onRestartButtonClick() {
    const initialGameState = startGame();
    updateUI(initialGameState);
    messageElement.classList.remove('message-correct', 'message-error', 'message-warning');
    messageElement.classList.add('message-info'); // Mensaje inicial
    guessInput.value = '';
    guessInput.focus();
}

// Configuración inicial del juego y listeners de eventos
document.addEventListener('DOMContentLoaded', () => {
    const initialGameState = startGame();
    updateUI(initialGameState);

    guessButton.addEventListener('click', onGuessButtonClick);
    restartButton.addEventListener('click', onRestartButtonClick);

    // Permitir enviar con la tecla Enter en el input
    guessInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar envío de formulario si estuviera dentro de uno
            onGuessButtonClick();
        }
    });

    guessInput.focus(); // Poner el foco en el input al cargar
});