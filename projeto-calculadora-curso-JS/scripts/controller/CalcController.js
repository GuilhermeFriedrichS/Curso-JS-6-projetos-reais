class CalcControler{

    constructor(){

        this._lastOperator = '';
        this._lastNumber = 0;
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._operation = [];
        this._locale = 'pt-BR'
        this._currentDate; //O _ faz atributos privados
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvents();
        this.initKeyBoard();
        
    }

    initialize(){
        
        this.setdisplayDateTime();

        setInterval(() => {

            this.setdisplayDateTime();

        },1000); //execulta a função dentro deste intervalo
        this.setLastNumberToDisplay();
        this.pasteFromClipboard()

        document.querySelectorAll('.btn-ac').forEach(btn=>{

            btn.addEventListener('dblclick', e=>{

                this.toggleAudio();

            });

        });

    }

    toggleAudio(){

        this._audioOnOff = !this._audioOnOff;

    }

    playAudio(){

        if (this._audioOnOff){

            this._audio.currentTime = 0;
            this._audio.play();

        }

    }

    initKeyBoard(){

        document.addEventListener('keyup', e=>{

            this.playAudio();

            switch (e.key){
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot();
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
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
            }
            
        })

    }

    pasteFromClipboard(){
        
        document.addEventListener('paste', e=>{

            let text = e.clipboardData.getData('text');

            this.displayCalc = parseFloat(text);
        })

    }

    copyToClipboard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

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
        this._lastNumber = []
        this._lastOperator = [];
        this.setLastNumberToDisplay();

    }
    clearEntry(){

        this._operation.pop();
        this.setLastNumberToDisplay();

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
    
    getResult(){
        
        try{  

            return eval(this._operation.join(""));
        }catch(e){
            setTimeout(()=>{

                this.setError();

            }, 1);
            
        }
        

    }

    calc(){

        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3 ){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber]

        }

        if (this._operation.length > 3){

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        }else if(this._operation.length == 3){

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        if (last == '%'){

            result /= 100;

            this._operation = [result];

        }else{

            this._operation = [result];

            if (last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){

        let lastItem;

        for(let i = this._operation.length-1; i>=0; i--){

            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            };
           
        }

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this.lastNumber;

        }

        return lastItem;
    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    };

    addOperation(value){

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){

                this.setLastOperation(value);
                

            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay()
            }

        }else{

            if(this.isOperator(value)){
                this.pushOperation(value);
                
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue); //push() adiciona o valor no final da array e pop() para excluir
               
            }
            this.setLastNumberToDisplay();
        }
    }

    setError(){
        this.displayCalc="Error";
    }

    addDot(){
        let lastOpertation = this.getLastOperation();

        if (typeof lastOpertation === 'string' && lastOpertation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOpertation) || !lastOpertation){
            this.pushOperation("0.");
        }else {
            this.setLastOperation(lastOpertation.toString()+'.')
        }
        
        this.setLastNumberToDisplay();
    };

    execBtn(value){
        
        this.playAudio();
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
                this.calc();
                break;
            case 'ponto':
                this.addDot();
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
        buttons.forEach((btn, index)=>{ //percorre a lista de bottons e para cada botão encontrado execulta o addEventListener 

            this.addEventListenerAll(btn,'click drag', e=>{
                let textbtn = btn.className.baseVal.replace("btn-",""); //Pega o nome da classe e substitui btn- por vazio
                
                this.execBtn(textbtn);  
                
            });

            this.addEventListenerAll(btn,'mouseover mouseup mousedown', e=>{

                btn.style.cursor = "pointer"; //muda o cursor parra a mão de click

            });

        });
    }



    get displayCalc(){ // consulta o valor do atributo privado
        return this._displayCalcEl.innerHTML
    }
    set displayCalc(value){ // atribui o valor do atributo privado, sempre que criar um atributo privado é preciso criar get e set

        if(value.toString().length > 10 ){
            this.setError();
            return false;
        }

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

