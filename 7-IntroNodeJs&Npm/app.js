// Importamos nuestro módulo local 'planetas.js'.
// Node.js buscará un archivo llamado planetas.js en el mismo directorio.
const gestorPlanetas = require('./planetas');

// Importamos el módulo 'chalk' que instalamos previamente con npm.
// Node.js lo buscará en la carpeta 'node_modules'.
const chalk = require('chalk');

/**
 * Muestra la lista de planetas en la consola con un formato estilizado usando chalk.
 */
function mostrarPlanetasConEstilo() {
    const planetas = gestorPlanetas.obtenerPlanetas(); // Obtenemos la lista de planetas

    // Usamos chalk para darle color y estilo al texto de la consola.
    console.log(chalk.bold.cyanBright("\n🌌 ¡Mis Planetas Favoritos para Explorar! 🌌"));
    console.log(chalk.cyanBright("----------------------------------------------"));

    if (planetas.length === 0) {
        console.log(chalk.yellow("  Aún no has descubierto ningún planeta. ¡Sigue explorando!"));
    } else {
        planetas.forEach(planeta => {
            console.log(chalk.green(`  🪐 Nombre: ${chalk.bold(planeta.nombre)} (ID: ${planeta.id})`));
            console.log(chalk.blue(`     🌠 Tipo: ${planeta.tipo}`));

            let habitadoTexto;
            if (typeof planeta.habitado === 'boolean') {
                // Si es booleano, mostramos SÍ o NO con fondos de color.
                habitadoTexto = planeta.habitado ? chalk.bgGreen.black(" SÍ ") : chalk.bgRed.white(" NO ");
            } else {
                // Si es un string (ej: "Potencialmente"), lo mostramos con otro estilo.
                habitadoTexto = chalk.bgYellow.black(` ${String(planeta.habitado).toUpperCase()} `);
            }
            console.log(chalk.magenta(`     🏠 Habitado: ${habitadoTexto}`));
            console.log(chalk.cyanBright("----------------------------------------------"));
        });
    }
}

/**
 * Muestra estadísticas sobre los planetas descubiertos.
 */
function mostrarEstadisticas() {
    const total = gestorPlanetas.obtenerTotalPlanetas();
    const rocosos = gestorPlanetas.contarPlanetasPorTipo("Rocoso");
    const gaseosos = gestorPlanetas.contarPlanetasPorTipo("Gaseoso");
    const helados = gestorPlanetas.contarPlanetasPorTipo("Helado"); // Nueva estadística

    console.log(chalk.bold.yellowBright("\n📊 Estadísticas Planetarias Detalladas 📊"));
    console.log(chalk.yellowBright("---------------------------------------"));
    console.log(chalk.white(`  Total de planetas descubiertos: ${chalk.bold.cyan(total)}`));
    console.log(chalk.white(`  Planetas Rocosos: ${chalk.bold.green(rocosos)}`));
    console.log(chalk.white(`  Planetas Gaseosos: ${chalk.bold.blue(gaseosos)}`));
    console.log(chalk.white(`  Planetas Helados: ${chalk.bold.magenta(helados)}`)); // Mostramos nueva estadística
    console.log(chalk.yellowBright("---------------------------------------"));
}

// --- Flujo principal de la aplicación ---

// Mensaje de bienvenida estilizado.
console.log(chalk.bold.inverse("\n🚀 Iniciando Sistema de Exploración Planetaria Avanzado... 🚀\n"));

// Mostrar los planetas iniciales que ya estaban en nuestra lista.
console.log(chalk.underline.yellow("Descubrimientos iniciales:"));
mostrarPlanetasConEstilo();

// Simular el descubrimiento y registro de nuevos planetas.
console.log(chalk.bold.magenta("\n🛰️  Registrando nuevos descubrimientos..."));
gestorPlanetas.agregarPlaneta("Europa", "Helado", "Potencialmente (océano subsuperficial)");
gestorPlanetas.agregarPlaneta("Saturno", "Gaseoso", false);
gestorPlanetas.agregarPlaneta("Pandora", "Rocoso", true); // Un planeta ficticio para más variedad

// Mostrar la lista actualizada de planetas.
console.log(chalk.underline.yellow("\nLista actualizada tras nuevos hallazgos:"));
mostrarPlanetasConEstilo();

// Mostrar las estadísticas actualizadas.
mostrarEstadisticas();

// Mensaje de despedida.
console.log(chalk.bold.inverse("\n🛰️  Fin de la transmisión del día. ¡Felices exploraciones futuras! 🛰️\n"));
