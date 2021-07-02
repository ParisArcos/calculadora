   //------------------------------------------------ LEYENDA DE ERRORES------------------------------------------------\\
   //"Syntax Error-0") // si no se han hecho operaciones no se puede imprimir el resultado en pantalla
   //"Syntax Error-1"); // si la pantalla es vacia no se ponen signos, excepto el menos
   //"Syntax Error-2"); // no se puede repetir el 0 al principio
   //"Syntax Error-3"); // no se puede repetir el punto
   //"Syntax Error-4"); //no se puede repetir operadores

   //------------------------------------------------ Styles!!!!!!!!------------------------------------------------\\
   function changeMode() {
       var element = document.querySelector(".calculator-grid");
       var element2 = document.querySelector(".back");
       var element3 = document.querySelectorAll(".kbrd");
       var element4 = document.querySelector(".previous");
       element.style.backgroundColor = null;

       element2.style.backgroundColor = null;

       element4.style.backgroundColor = null;

       element.classList.toggle("dark-mode");

       element2.classList.toggle("dark-mode");

       element4.classList.toggle("dark-mode");

       for (const iterator of element3) {
           iterator.style.backgroundColor = null;
           iterator.classList.toggle("dark-mode");

       }

   }
   document.getElementById("base").addEventListener("input", color);

   function color() {
       var clr = document.getElementById("base");

       var element = document.querySelector(".calculator-grid");
       var element2 = document.querySelector(".back");
       var element3 = document.querySelectorAll(".kbrd");
       var element4 = document.querySelector(".previous");

       element.style.backgroundColor = clr.value;

       element2.style.backgroundColor = clr.value;

       element4.style.backgroundColor = clr.value;

       for (const iterator of element3) {
           iterator.style.backgroundColor = clr.value;

       }
   }

   //------------------------------------------------ Events!!!!!!!!------------------------------------------------\\
   let keys = document.querySelectorAll(".kbrd"); //seleccion de botones

   let screen = document.getElementById("screen"); //selleccion de pantalla

   let previus = document.querySelector(".previous"); //selleccion de mini-pantalla

   screen.addEventListener("mouseover", overItem); //efecto hover al entrar

   function overItem(event) { //efecto hover al entrar
       screen.className = "text hovered";
   }

   screen.addEventListener("mouseout", outItem); //efecto hover al salir

   function outItem(event) { //efecto hover al salir
       screen.className = "text";
   }

   for (const iterator of keys) {
       iterator.addEventListener("click", addToScreen); //añadimos evento a los botones
   }

   function addToScreen(event) { // excepciones y control de pantalla
       var btn = event.target.innerHTML;

       if (btn == "=") {
           calculator(screen.value); //Al pulsar igual o enter se hace la operación
           screen.value = "";

       } else if (btn == "C") { //borra la pantalla
           screen.value = "";

       } else if (btn == "Del") { //borra el último caracter introducido
           var del = screen.value;
           screen.value = del.slice(0, del.length - 1);

           //------------------------------------------------ Control errores------------------------------------------------\\           

       } else if (btn == "res") {
           if (resultsKey.length == 0) {
               alert("Syntax Error-0") // si no se han hecho operaciones no se puede imprimir el resultado en pantalla
           } else {
               screen.value = screen.value.concat(resultsKey[resultsKey.length - 1]);
           }

       } else if (secondOperators.includes(btn) && (screen.value == "")) {
           alert("Syntax Error-1"); // si la pantalla es vacia no se ponen signos, excepto el menos

       } else if ((btn == "0") && screen.value[0] == "0") {
           alert("Syntax Error-2"); // no se puede repetir el 0 al principio

       } else if ((btn == ".") && screen.value.includes(".")) {
           alert("Syntax Error-3"); // no se puede repetir el punto

       } else if (mainOperators.includes(btn) && mainOperators.includes(screen.value[screen.value.length - 1])) {
           alert("Syntax Error-4"); //no se puede repetir operadores

       } else {
           for (const iterator of btn) { //añade...
               screen.value += iterator;
           }
       }
   }

   function onlyNumberKey(evt) {
       if (screen.value == "") {
           var ASCIICode = (evt.which) ? evt.which : evt.keyCode
           if (ASCIICode = 45 && (ASCIICode < 48 || ASCIICode > 57))
               return false; // Si la pantalla esta vacia no se pueden meter operadores, letras o simbolos
           return true;

       }
       var ASCIICode = (evt.which) ? evt.which : evt.keyCode
       if (ASCIICode > 47 && (ASCIICode < 48 || ASCIICode > 57))
           return false; // no se pueden meter letras ni simbolos
       return true;
   }

   document.addEventListener("keydown", keyboard);

   function keyboard(event) {
       var btn = event.key;
       if (btn == "Enter") {
           calculator(screen.value); //Al pulsar igual o enter se hace la magia
           screen.value = "";
       } else if (secondOperators.includes(btn) && (screen.value == "")) {
           alert("Syntax Error-1"); // si la pantalla es vacia no se ponen signos, excepto el menos

       } else if ((btn == "0") && screen.value[0] == "0") {
           alert("Syntax Error-2"); // no se puede repetir el 0 al principio

       } else if ((btn == ".") && screen.value.includes(".")) {
           alert("Syntax Error-3"); // no se puede repetir el punto

       } else if (mainOperators.includes(btn) && mainOperators.includes(screen.value[screen.value.length - 1])) {
           alert("Syntax Error-4"); //no se puede repetir operadores
       }

   }



   //------------------------------------------------HERE BEGINS THE MAGIC!!!!!!!!------------------------------------------------\\
   var resultsKey = []; //array donde guardamos los resultados
   const mainOperators = ["*", "/", "+", "-", "%"]; // array que determina el orden de las operaciones (operadores principales)
   const secondOperators = ["*", "/", "+", "%", "."]; // array que determina el orden de las operaciones (operadores principales)
   const mainNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

   function calculator(screenValue) {

       var strSplit = screenValue.split(""); //dividimos el string de la pantalla       
       var iOrderOperators = [] // indice ordenado de operadores(para hacer las operaciones en orden)
       var iOperators = []; // Array donde vamos a guardar el indice de los operadores en la operacion (para separar los números)         
       var nums = []; //array donde vamos a reconstruir los numeros
       var inumsUsed = [];
       var results = []; //array donde guardamos los resultados 


       //------------------------------------------------OPERADORES ORDENADOS------------------------------------------------\\

       for (let x = 0; x <= mainOperators.length; x++) { // recorremos lo operadores principales (de 1 en 1)
           let count = 0; //iniciamos[0] o reiniciamos[0+x] el contador
           strSplit.forEach(element => { // evaluamos cada caracter de strSplit("pantalla")
               if (element.includes(mainOperators[x]) && count != 0) { // comparamos el operador seleccionado con el elemento evaluado
                   iOrderOperators.push(count); //si coincide guardamos el numero del contador
               }
               count++; //si no coincide aumentamos el numero del contador en 1
           });

       }

       //console.log("Indice ordenado="+iOrderOperators);

       //------------------------------------------------OPERADORES DESORDENADOS------------------------------------------------\\
       for (i = 0; i < strSplit.length; i++) { //recorremos la "pantalla"
           if (mainOperators.includes(strSplit[i]) && i != 0) { // si el String de la pantalla contiene alguno de los operadores principales
               iOperators.push(i); //guardame el indice
           }
       }

       //------------------------------------------------ARRAY CON LOS NUMEROS------------------------------------------------\\         
       for (let index = 0; index <= iOperators.length; index++) { //recorremos el indice de operadores
           if (index == 0) { //ini ->  si el indice es el primero 

               var num = strSplit.slice(0, iOperators[index]).join(''); //con .slice->separamos los numeros del resto del array [1,2,5]
               nums.push(num); // con .push lo metemos dentro de nums    //con .join los unimos [125]

           } else if (index != iOperators.length) { //medio -> si es distinto del primero o del ultimo

               var num = strSplit.slice(iOperators[index - 1] + 1, iOperators[index]).join('');
               nums.push(num);

           } else if (index == iOperators.length) { //fin -> si es = al ultimo

               var num = strSplit.slice(iOperators[index - 1] + 1, strSplit.length).join('');
               nums.push(num);
           }
       }

       //------------------------------------------------OPERACIONES------------------------------------------------\\         
       for (let x = 0; x < iOrderOperators.length; x++) { //recorremos el array de prioridades F 
           var iop = iOperators.indexOf(iOrderOperators[x]); //definimos la posicion de las operaciones
           var opArray = [nums[iop], strSplit[iOrderOperators[x]],
               [nums[iop + 1]]
           ]; //montamos un array con los elementos de la operacion


           var operation = opArray.join(""); //unimos todos los elementos de la operacion en un solo array
           console.log("operacion=" + operation);

           var result = eval(operation); //hacemos la operacion
           results.push(parseFloat(result)); //la guardamos en el array de resultados
           resultsKey.push(parseFloat(result));
           previus.innerHTML = results[results.length - 1];

           // en vez de montar un array de numero nuevo, montamos un string nuevo


           for (let ind = 0; ind < nums.length; ind++) { //recorremos la variable que todavia contiene los numeros
               if (ind == iop) { // si es igual al iop de esta operacion
                   inumsUsed.push(iop); //guardame el número como usado
               } else if (ind == (iop + 1)) { // si es igual al iop+1 de esta operacion
                   inumsUsed.push(iop + 1); //guardame el número como usado
               }
           }
           inumsUsed.forEach(element => { //por cada elemento del arra de numeros usados
               nums.splice(element, 1, result); // cambia el numero usado por el resultado
           });

           //console.log("numeros=" + nums);

           console.log("resultado=" + results[x]);
       }
   }

   //----------------------------------------------- X FILES------------------------------------------------\\
   //-----------------------------------------THE TRUTH IS OUT THERE!-----------------------------------------\\
   // Boton de %, esta en LAS DOS vaiables que se evaluan para poder meter un signo con la pantalla vacia, aun asi se pone....=?¿?¿?
   // Boton de +-, cuando lo activo da igual la funcion que ponga dentro, solo añade +- .....?¿?¿?¿
   //--------------------------------------------------EXTRA UPDATES--------------------------------------------\\
   /* Operaciones de mas de 4 operadores dependiendo del orden de operadores da 0, esto se debe a que sobreescribimos el array 
   de numeros con los resultados, sustituyendolos. 
   La solucion es reconstruir el string de entrada, sustiyendo desde strScreen[iOp-1]+1 a strScreen[iOp-1]-1 por el resultado 
   y volviendo a pasarla por calculator().
   */