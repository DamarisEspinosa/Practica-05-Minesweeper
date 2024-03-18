var primerTurno = true; 

window.onload = function() {
    var parametrosURL = new URLSearchParams(window.location.search);
    var filas = parseInt(parametrosURL.get('cantFilas'));
    var columnas = parseInt(parametrosURL.get('cantColumnas'));
    var minas = parseInt(parametrosURL.get('cantidadMinas'));

    crearTablero(filas, columnas);
    minasRestantes(minas);

    var cuadros = document.querySelectorAll('.cuadro');
    
    cuadros.forEach(cuadro => {
        cuadro.addEventListener('click', function(event) {
            event.preventDefault(); 
            if (this.classList.contains('juego-terminado')) {
                return;
            } 
            if (primerTurno) { 
                primerTurno = false; 
                colocarMinas(filas, columnas, minas); 
            }

            if (!juegoTerminado()) {
                if (cuadro.classList.contains('mina')) {
                    mostrarMina(cuadro);
                    marcarMinasRestantes();
                    mostrarMensaje('¡Has caído en una mina! Juego terminado.');
                    deshabilitarTablero();
                } else {
                    var minasAdyacentes = contarMinasAdyacentes(cuadro);
                    cuadro.innerText = minasAdyacentes;
                }
            }
        });

        cuadro.addEventListener('contextmenu', function(event) {
            event.preventDefault(); 
            if (this.classList.contains('juego-terminado')) {
                return;
            }
            if (!cuadro.classList.contains('descubierto')) {
                if (!cuadro.classList.contains('bandera')) {
                    cuadro.classList.add('bandera'); 
                    cuadro.style.backgroundColor = 'yellow'; 
                } else {
                    cuadro.classList.remove('bandera'); 
                    cuadro.style.backgroundColor = ''; 
                }
                minasRestantes(minas); 
            }
        });
    });

    var botonReinicio = document.getElementById('restart');
    botonReinicio.addEventListener('click', function() {
        primerTurno = true; // Reiniciar la bandera del primer turno al reiniciar el juego
        limpiarTablero();
        minasRestantes(minas);
    });
};


function marcarBandera(cuadro) {
    if (!cuadro.classList.contains('bandera')) {
        cuadro.classList.add('bandera');
    } else {
        cuadro.classList.remove('bandera');
    }
}

function marcarJuegoComoTerminado() {
    var cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
        cuadro.classList.add('juego-terminado');
    });
}

function deshabilitarTablero() {
    var cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
        cuadro.removeEventListener('click', clicEnCuadro); 
    });
    marcarJuegoComoTerminado(); 
}

function clicEnCuadro() {
    if (this.classList.contains('juego-terminado')) {
        return;
    }
    if (!juegoTerminado()) { 
        var cuadro = this;
        if (cuadro.classList.contains('mina')) {
            deshabilitarTablero(); 
            mostrarMina(cuadro);
            marcarMinasRestantes();
            mostrarMensaje('¡Has caído en una mina! Juego terminado.');
        } else {
            var minasAdyacentes = contarMinasAdyacentes(cuadro);
            cuadro.innerText = minasAdyacentes;
        }
    }
}


function jugadorHaGanado() {
    var cuadros = document.querySelectorAll('.cuadro');
    var minasMarcadas = document.querySelectorAll('.bandera').length;
    var totalMinas = document.querySelectorAll('.mina').length;

    return minasMarcadas === totalMinas;
}
function juegoTerminado() {
    var cuadros = document.querySelectorAll('.cuadro');
    for (var i = 0; i < cuadros.length; i++) {
        if (!cuadros[i].classList.contains('descubierto') && !cuadros[i].classList.contains('bandera')) {
            return false; 
        }
    }

    if (jugadorHaGanado()) {
        mostrarMensaje('¡Felicidades! Has encontrado todas las minas. ¡Has ganado!');
    } else {
        mostrarMensaje('¡Has caído en una mina! Juego terminado.');
    }

    return true; 
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
    var contadorMinas = document.querySelector('#minas');
    contadorMinas.innerText = `Minas: ${minas}`;

    var cuadrosConBandera = document.querySelectorAll('.bandera');
    var minasRestantes = minas - cuadrosConBandera.length;
    contadorMinas.innerText = `Minas: ${minasRestantes}`;
}

function limpiarTablero() {
    var cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
        cuadro.classList.remove('mina');
        cuadro.style.backgroundColor = '';
        cuadro.innerText = ''; 
    });
}

function contarMinasAdyacentes(cuadro) {
    if (cuadro.classList.contains('juego-terminado')) {
        return 0;
    } 
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
    cuadro.style.backgroundColor = 'red'; 
}

function marcarMinasRestantes() {
    var minas = document.querySelectorAll('.mina');
    minas.forEach(mina => {
        mina.style.backgroundColor = 'red'; 
    });
}

function mostrarMensaje(mensaje) {
    var mensajeElemento = document.createElement('p');
    mensajeElemento.innerText = mensaje;
    mensajeElemento.style.color = 'red';
    var contenedorMensaje = document.getElementById('mensaje');
    contenedorMensaje.innerHTML = ''; 
    contenedorMensaje.appendChild(mensajeElemento); 
}
