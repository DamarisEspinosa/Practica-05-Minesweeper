window.onload = function() {
    var parametrosURL = new URLSearchParams(window.location.search);
    var tamaño = parametrosURL.get('tamanioTablero');

    crearTablero(tamaño);
};

function crearTablero(tamaño) {
    var contenedor = document.getElementById("contenedor-tablero");

    for (var i = 0; i < tamaño; i++) {
        var fila = document.createElement("div");
        fila.className = "fila";
        for (var j = 0; j < tamaño; j++) {
            var cuadro = document.createElement("div");
            cuadro.className = "cuadro";
            fila.appendChild(cuadro);
      }
      contenedor.appendChild(fila);
    }
}
