class CalcControler{

    constructor(){

        this._operation = [];
        this._locale = 'pt-BR'
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

    clearAll(){
        this._operation = [];
    }
    clearEntry(){
        this._operation.pop();
    }
    
    getLastOperation(){
        
        return this._operation[this._operation.length-1];
        
    }

    isOperator(value){
        return (['+','-','*','%','/'].indexOf(value) > -1);
        
    }
    
    setLastOperation(value){

        this._operation[this._operation.length-1] = value;
        

    }

    pushOperation(value){

        this._operation.push(value);
        if (this._operation.length > 3){
            
            this.calc();
        
        }
    }
    
    calc(){

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last]

        this.setLastNumberToDisplay()
    }

    setLastNumberToDisplay(){

        let lastNumber;

        for(let i = this._operation.length-1; i>=0; i--){
            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            };
        }
        this.displayCalc = lastNumber;
    };

    addOperation(value){

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){

                this.setLastOperation(value);
                console.log(this._operation);

            }else if(isNaN(value)){
                
                console.log('Outra coisa',value);
                
                
            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay()
            }

        }else{

            if(this.isOperator(value)){
                this.pushOperation(value);
                console.log(this._operation);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue)); //push() adiciona o valor no final da array e pop() para excluir
               
            }
            this.setLastNumberToDisplay();

            

        }
    }

    setError(){
        this.displayCalc="Error";
    }

    execBtn(value){

        switch (value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case '.':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }

    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');//Seleciona todos da tag com id buttons que são tag g   
        buttons.forEach(btn=>{ //percorre a lista de bottons e para cada botão encontrado execulta o addEventListener 

            this.addEventListenerAll(btn,'click drag', e=>{
                let textbtn = btn.className.baseVal.replace("btn-",""); //Pega o nome da classe e substitui btn- por vazio
                this.execBtn(textbtn);
                console.log(textbtn);
                
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

