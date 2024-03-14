# Practica-05-Minesweeper

## Requerimientos
- Antes de iniciar el juego, se debe pedir el tamaño del tablero (cantidad de renglones y columnas) y la cantidad de minas que va a tener el juego. Cabe aclarar que el tamaño mínimo para el tablero es de 5 x 5. Con estos parámetros dados se puede iniciar el juego.
- Una de las reglas del buscaminas es que en el primer turno, el jugador no puede perder (osea caer en una mina). Por lo que si ya se ha calculado el tablero (puesto las minas) y el usuario en el primer turno se selecciona una mina, entonces se tendrá que volver a calcular el tablero (colocar las minas).
- Al seleccionar una casilla, se debe colocar el número de minas que están alrededor. Es opcional destapar las casillas alrededor de no tiene minas.
- El juego se termina cuando se han destapado todas las casillas que no tienen minas se hayan destapado.
- Opcionalmente se puede colocar la funcionalidad de marcar una casilla que se piensa que tiene mina (poner una banderita en el juego original).