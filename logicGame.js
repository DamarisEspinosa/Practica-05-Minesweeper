window.onload = function() {
    var parametrosURL = new URLSearchParams(window.location.search);
    var filas = parseInt(parametrosURL.get('cantFilas'));
    var columnas = parseInt(parametrosURL.get('cantColumnas'));
    var minas = parseInt(parametrosURL.get('cantidadMinas'));

    crearTablero(filas, columnas);
    colocarMinas(filas, columnas, minas);
    minasRestantes(minas);

    var cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
        cuadro.addEventListener('click', clicEnCuadro);
    });

    var botonReinicio = document.getElementById('restart');
    botonReinicio.addEventListener('click', limpiarTablero);
};

function deshabilitarTablero() {
    var cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
        cuadro.removeEventListener('click', clicEnCuadro); // Eliminar el controlador de eventos
    });
}

function clicEnCuadro() {
    if (!juegoTerminado()) { // Verificar si el juego ha terminado
        var cuadro = this;
        if (cuadro.classList.contains('mina')) {
            mostrarMina(cuadro);
            marcarMinasRestantes();
            mostrarMensaje('¡Has caído en una mina! Juego terminado.');
            deshabilitarTablero(); // Deshabilitar el tablero
        } else {
            var minasAdyacentes = contarMinasAdyacentes(cuadro);
            cuadro.innerText = minasAdyacentes;
        }
    }
}

function juegoTerminado() {
    var cuadros = document.querySelectorAll('.cuadro');
    for (var i = 0; i < cuadros.length; i++) {
        if (!cuadros[i].innerText && !cuadros[i].classList.contains('mina')) {
            return false; // Si hay algún cuadro vacío que no es una mina, el juego no ha terminado
        }
    }
    return true; // Si no hay cuadros vacíos que no sean minas, el juego ha terminado
}

function crearTablero(filas, columnas) {
    var contenedor = document.getElementById("contenedor-tablero");

    for (var i = 0; i < filas; i++) {
        var fila = document.createElement("div");
        fila.className = "fila";
        for (var j = 0; j < columnas; j++) {
            var cuadro = document.createElement("div");
            cuadro.className = "cuadro";
            fila.appendChild(cuadro);
        }
        contenedor.appendChild(fila);
    }
}

function colocarMinas(filas, columnas, cantidadMinas) {
    var cuadros = document.querySelectorAll('.cuadro');
    var totalCuadros = filas * columnas;

    if (cantidadMinas > totalCuadros) {
        console.error('La cantidad de minas especificada es mayor que el total de cuadros.');
        return;
    }

    var minasColocadas = 0;
    while (minasColocadas < cantidadMinas) {
        var posicionAleatoria = Math.floor(Math.random() * totalCuadros);
        if (!cuadros[posicionAleatoria].classList.contains('mina')) {
            cuadros[posicionAleatoria].classList.add('mina');
            minasColocadas++;
        }
    }
}

function minasRestantes(minas) {
    document.querySelector('#minas').innerText = `Minas: ${minas}`;
}

function limpiarTablero() {
    var cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
        cuadro.classList.remove('mina');
        cuadro.style.backgroundColor = '';
        cuadro.innerText = ''; // Limpiar el texto dentro del cuadro
    });
}

function contarMinasAdyacentes(cuadro) {
    var filas = document.querySelectorAll('.fila');
    var indexFila = Array.from(filas).indexOf(cuadro.parentNode);
    var indexCuadro = Array.from(cuadro.parentNode.children).indexOf(cuadro);
    var minasAdyacentes = 0;

    for (var i = Math.max(0, indexFila - 1); i <= Math.min(filas.length - 1, indexFila + 1); i++) {
        for (var j = Math.max(0, indexCuadro - 1); j <= Math.min(filas[i].children.length - 1, indexCuadro + 1); j++) {
            if (filas[i].children[j].classList.contains('mina')) {
                minasAdyacentes++;
            }
        }
    }

    return minasAdyacentes;
}

function mostrarMina(cuadro) {
    cuadro.style.backgroundColor = 'red'; // Marcar el cuadro en rojo
}

function marcarMinasRestantes() {
    var minas = document.querySelectorAll('.mina');
    minas.forEach(mina => {
        mina.style.backgroundColor = 'red'; // Marcar todas las minas restantes en rojo
    });
}

function mostrarMensaje(mensaje) {
    var mensajeElemento = document.createElement('p');
    mensajeElemento.innerText = mensaje;
    mensajeElemento.style.color = 'red';
    var contenedorMensaje = document.getElementById('mensaje');
    contenedorMensaje.innerHTML = ''; // Limpiar mensajes anteriores
    contenedorMensaje.appendChild(mensajeElemento); // Agregar el mensaje al contenedor
}
