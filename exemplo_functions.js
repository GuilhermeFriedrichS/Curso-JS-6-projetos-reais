let calc = (x1, x2, operator) =>{ //Arrow Function: Consegue compartilhar informações que estão fora para dentro da função
    return eval(`${x1}${operator}${x2}`) //eval: função que permite que execultar o valor da String
}; 

(function(x1, x2, operator){ //função anonima
    return eval(`${x1}${operator}${x2}`) //eval: função que permite que execultar o valor da String
})(1,2,"*"); 

let resultado = calc(1,2,"*");
console.log(resultado);

window.addEventListener('focus', event => { //Ativado quando focado, uma função como paramentro de outra função

    console.log('focus');

});

window.addEventListener('click', event => { 

    console.log('click');

});

let agora = new Date();
console.log(agora.toLocaleDateString()); //formata a data na regiao do sistema

let carros = ["palio 98", "toro", "uno", 12, true, new Date(), function(){}];

carros.forEach(function(value, index){
    console.log(index, value);
})


class celular    {
    constructor(){
        this.cor = "prata";//O this promove a variavel para um atributo
    }
    ligar(){
        console.log("uma ligação");
        return "ligando";
    }
}

let objeto = new celular;
console.log(objeto.ligar());