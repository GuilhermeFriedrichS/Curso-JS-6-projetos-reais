let cor = "azul";

switch(cor){

    case "verde":
        console.log("Siga");
        break;
    case "amarelo":
        console.log("Atenção");
        break;
    case "vermelho":
        console.log("Pare");
        break;
    default:
        console.log("Não sei");

} 

let n = 7;

for (let i = 0; i <= 10; i++){
    console.log(`${i} X ${n} = ${i * n}`); //Template String, recurso para adicionar comando JavaScript na string
}