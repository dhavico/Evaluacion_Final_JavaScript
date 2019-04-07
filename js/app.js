var Calculadora = (function(){
    var estadoOperacion = "";
    var primerNumero = 0;
    var numeroGuardado = 0;
    return {
        init: function(){
            var teclas = document.getElementsByClassName("tecla")
            for (let index = 0; index < teclas.length; index++) {
                teclas[index].addEventListener("mousedown", function(){
                    Calculadora.reducirTamanioTecla(teclas[index]);
                });
                teclas[index].addEventListener("mouseup", function(){
                    Calculadora.aumentarTamanioTecla(teclas[index])
                });
                teclas[index].addEventListener("click", function(){
                    if(document.getElementById("display").textContent == "INVALIDO"){
                        document.getElementById("display").textContent = 0;
                    }
                    if(!isNaN(parseInt(teclas[index].id))){ 
                        Calculadora.pintarNumero(teclas[index]);
                    }
                    else{
                        switch (teclas[index].id) {
                            case "on":
                                Calculadora.limpiarPantalla();
                                break;
                            case "punto":
                                Calculadora.agregarPunto();
                                break;
                            case "sign":
                                Calculadora.agregarNegativo();
                                break;
                            case "mas":
                                estadoOperacion = "mas";
                                numeroGuardado = 0;
                                primerNumero = parseFloat(document.getElementById("display").textContent);
                                document.getElementById("display").textContent = "0";
                                break;
                            case "menos":
                                estadoOperacion = "menos";
                                numeroGuardado = 0;
                                primerNumero = parseFloat(document.getElementById("display").textContent);
                                document.getElementById("display").textContent = "0";
                                break;
                            case "por":
                                estadoOperacion = "por";
                                numeroGuardado = 0;
                                primerNumero = parseFloat(document.getElementById("display").textContent);
                                document.getElementById("display").textContent = "0";
                                break;
                            case "dividido":
                                estadoOperacion = "dividido";
                                numeroGuardado = 0;
                                primerNumero = parseFloat(document.getElementById("display").textContent);
                                document.getElementById("display").textContent = "0";
                                break;
                            case "igual":
                                var segundoNumero = parseFloat(document.getElementById("display").textContent);
                                numeroGuardado = numeroGuardado == 0 ? segundoNumero : numeroGuardado;
                                Calculadora.defineOperacion(primerNumero, segundoNumero, numeroGuardado);
                        }
                    }
                });
            }
            document.getElementById("display").addEventListener("DOMSubtreeModified", function(e){
                Calculadora.validarDigitosPantalla(e.srcElement.innerText);
            })
        },
        reducirTamanioTecla: function(tecla){
            tecla.style = "transform: scale(0.9)";
        },
        aumentarTamanioTecla: function(tecla){
            tecla.style = "transform: scale(1)";
        },
        pintarNumero(tecla){
            var textContent = document.getElementById("display").textContent;
            var retorno = "";
            if(textContent=="0" && tecla.id == "0"){
                retorno = tecla.id;
            }
            else if(textContent=="0" && tecla.id != "0"){
                retorno = tecla.id;
            }
            else{
                retorno = textContent + tecla.id;
            }
            document.getElementById("display").textContent = retorno;
        },
        limpiarPantalla(){
            document.getElementById("display").textContent = "0";
            primerNumero = 0;
            numeroGuardado = 0;
            estadoOperacion = "";
        },
        agregarPunto(){
            var textContent = document.getElementById("display").textContent;
            if(textContent.indexOf('.')==-1){
                document.getElementById("display").textContent = textContent + ".";
            }
        },
        agregarNegativo(){
            var textContent = document.getElementById("display").textContent;
            var retorno = "";
            if(textContent == "0") return;
            if(textContent.indexOf('-')==-1){
                retorno = "-" + textContent;
            }
            else{
                retorno = textContent.replace("-", "");
            }
            document.getElementById("display").textContent = retorno;
        },
        validarDigitosPantalla(text){
            document.getElementById("display").textContent = text.substring(0,8);
        },
        defineOperacion(primerNumero, segundoNumero, numeroGuardado){
            segundoNumero = (numeroGuardado == 0 ? segundoNumero : numeroGuardado)
            switch (estadoOperacion) {
                case "mas":
                    document.getElementById("display").textContent = Calculadora.suma(primerNumero, segundoNumero);
                    break;
                case "menos":
                    document.getElementById("display").textContent = Calculadora.resta(primerNumero, segundoNumero);
                    break;
                case "por":
                    document.getElementById("display").textContent = Calculadora.multiplicacion(primerNumero, segundoNumero);
                    break;
                case "dividido":
                    document.getElementById("display").textContent = Calculadora.division(primerNumero, segundoNumero);
                    break;
            }
        },
        suma(numero1, numero2){
            var retorno = 0;
            retorno = numero1 + numero2;
            primerNumero = retorno;
            return retorno;
        },
        resta(numero1, numero2){
            var retorno = 0;
            retorno = numero1 - numero2;
            primerNumero = retorno;
            return retorno;
        },
        multiplicacion(numero1, numero2){
            var retorno = 0;
            retorno = numero1 * numero2;
            primerNumero = retorno;
            return retorno;
        },
        division(numero1, numero2){
            var retorno = 0;
            if(numero2 == 0) return retorno = "INVALIDO";
            retorno = numero1 / numero2;
            primerNumero = retorno;
            return retorno;
        }
    }
})();
Calculadora.init();