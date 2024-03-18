window.onload = function() {
    var parametrosURL = new URLSearchParams(window.location.search);
    var filas = parametrosURL.get('cantFilas');
    var columnas = parametrosURL.get('cantColumnas');

    crearTablero(filas, columnas);
};

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
