class WhatsAppController{

    constructor(){

        console.log('WhatsAppController Ok');

        this.loadElements();

    }

    loadElements(){

        this.el = {};

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;

        });//Atribui ao objeto os elementos convertidos em CamelCase
    }
}