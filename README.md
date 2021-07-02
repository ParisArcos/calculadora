# calculadora
Calculadora que respeta las prioridades de las operaciones.
 //------------------------------------------------ LEYENDA DE ERRORES------------------------------------------------\\
   //"Syntax Error-0") // si no se han hecho operaciones no se puede imprimir el resultado en pantalla
   //"Syntax Error-1"); // si la pantalla es vacia no se ponen signos, excepto el menos
   //"Syntax Error-2"); // no se puede repetir el 0 al principio
   //"Syntax Error-3"); // no se puede repetir el punto
   //"Syntax Error-4"); //no se puede repetir operadores
   
  //--------------------------------------------------EXTRA UPDATES--------------------------------------------\\
   /* Operaciones de mas de 4 operadores dependiendo del orden de operadores da 0, esto se debe a que sobreescribimos el array 
   de numeros con los resultados, sustituyendolos. 
   La solucion es reconstruir el string de entrada, sustiyendo desde strScreen[iOp-1]+1 a strScreen[iOp-1]-1 por el resultado 
   y volviendo a pasarla por calculator().
