//var gender  = document.querySelectorAll("#form-user-create [name=gender]:checked"); //Seleciona no formulario com esse id o input com o nome gender que está selecionado

var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

document.getElementById("form-user-create").addEventListener("submit", function(event){

    event.preventDefault(); //cancela a atualização da pagina do metodo post do form

    fields.forEach(function(field, index){

        if(field.name == "gender"){
    
            if(field.checked){
    
                user[field.name] = field.value;
    
            }
    
        }else{
    
            user[field.name] = field.value;
        }
    
    
    });
    console.log(user);

})
