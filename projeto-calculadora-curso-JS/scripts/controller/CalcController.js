class CalcControler{

    constructor(){

        this.locale = 'pt-BR'
        this._currentDate; //O _ faz atributos privados
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        
        this.setdisplayDateTime();

        setInterval(() => {

            this.setdisplayDateTime();

        },1000); //execulta a função dentro deste intervalo
    }

    setdisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    addEventListenerAll(element, events, fn){
        
        events.split(' ').forEach(event => { //split separa em uma array os nomes dos eventos para o forEach 
            element.addEventListener(event, fn, false);
        });
    
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');//Seleciona todos da tag com id buttons que são tag g   
        buttons.forEach(btn=>{ //percorre a lista de bottons e para cada botão encontrado execulta o addEventListener 

            this.addEventListenerAll(btn,'click drag', e=>{
                console.log(btn.className.baseVal.replace("btn-","")); //Pega o nome da classe e substitui btn- por vazio
            });

            this.addEventListenerAll(btn,'mouseover mouseup mousedown', e=>{

                btn.style.cursor = "pointer"; //muda o cursor parra a mão de click

            });

        })
    }



    get displayCalc(){ // consulta o valor do atributo privado
        return this._displayCalcEl.innerHTML
    }
    set displayCalc(value){ // atribui o valor do atributo privado, sempre que criar um atributo privado é preciso criar get e set
        this._displayCalcEl.innerHTML = value;
    }

    
    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(valor){
        this._dateEl.innerHTML = valor;
    }

   get currentDate(){
        return new Date();
   }
   set currentDate(value){
        this._currentDate = value;
   }

   
}

