class WhatsAppController{

    constructor(){

        console.log('WhatsAppController Ok');

        this.elementsProtoType();
        this.loadElements();
        this.initEvents();

    }

    loadElements(){

        this.el = {};

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;

        });//Atribui ao objeto os elementos convertidos em CamelCase
    }

    elementsProtoType(){ //Cria metodos nos elementos que já existem no HTML

        Element.prototype.hide = function(){

            this.style.display = 'none';
            return this;
        }
        Element.prototype.show = function(){

            this.style.display = 'block';
            return this;

        }
        Element.prototype.toogle = function(){

            this.style.display = (this.style.display === 'none') ? 'block' : 'none'; 
            return this;
        }
        Element.prototype.on = function(events, fn){

            events.split(' ').forEach(event=>{

                this.addEventListener(event, fn);

            });
            return this; //com o return em todos permite que em uma linha de codígo use mais de um metodo ao mesmo tempo
        }

        Element.prototype.css = function(styles){

            for(let name in styles){

                this.style[name] = styles[name]

            }
            return this;
        }

        Element.prototype.addClass = function (name){

            this.classList.add(name);
            return this;
        } 
        Element.prototype.removeClass = function (name){

            this.classList.remove(name);
            return this;
        } 
        Element.prototype.toogleClass = function (name){

            this.classList.toogle(name);
            return this;
        } 
        Element.prototype.hasClass = function (name){

            return this.classList.contais(name);

        } 
    }

    initEvents(){

        this.el.myPhoto.on('click', e=>{

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open');
            }, 300);

        })

        this.el.btnNewContact.on('click', e=>{

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            }, 300);
            
        })
        this.el.btnClosePanelEditProfile.on('click', e=>{


            this.el.panelEditProfile.removeClass('open');

        })
        this.el.btnClosePanelAddContact.on('click', e=>{
 
            this.el.panelAddContact.removeClass('open');

        })
        

    }

    closeAllLeftPanel(){

        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();

    }
}