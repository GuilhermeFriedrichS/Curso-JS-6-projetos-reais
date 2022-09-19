//var gender  = document.querySelectorAll("#form-user-create [name=gender]:checked"); //Seleciona no formulario com esse id o input com o nome gender que está selecionado

var fields = document.querySelectorAll("#form-user-create [name]");

fields.forEach(function(field, index){

    if(field.name == "gender"){

        if(field.checked){

            console.log("Sim",field);

        }

    }else{
        console.log("Não")
    }


});
