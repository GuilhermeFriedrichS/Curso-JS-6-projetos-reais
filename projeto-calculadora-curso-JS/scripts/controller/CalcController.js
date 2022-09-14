class CalcControler{

    constructor(){

        this._displayCalc = "0";
        this._dataAtual; //O _ faz atributos privados

    }

    get displayCalc(){ // consulta o valor do atributo privado
        return this._displayCalc;
    }
    set displayCalc(valor){ // atribui o valor do atributo privado, sempre que criar um atributo privado é preciso criar get e set
        this._displayCalc = valor;
    }

    get dataAtual(){
        return this._dataAtual;
    }

    set dataAtual(valor){
        this._dataAtual = valor;
    }
    

}
