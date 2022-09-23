class Utils {

    static dateFormat(date){ //Criando metodo estático que pode ser chamado pela classe sem instânciar o objeto 

        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();

    }

}