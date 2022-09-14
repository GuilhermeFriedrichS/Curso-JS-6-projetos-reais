class CalcControler{

    constructor(){

        this._displayCalc = "0";
        this._currentDate; //O _ faz atributos privados
        this.inicialize();
    }

    inicialize(){

        let displayCalcEl = document.querySelector("#display");
        let dateEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");

        displayCalcEl.innerHTML = "4567"; 
        dateEl.innerHTML = "14/09/2022";
        timeEl.innerHTML = "00:00";
    }
    
}

