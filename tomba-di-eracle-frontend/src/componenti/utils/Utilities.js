export function estraiNome(nominativo){
    var soloNome = ""
    for (var i = 0; i<nominativo.length-1; i++){
        if(nominativo.charAt(i) != " "){
            soloNome+=nominativo.charAt(i);
        } else {
            break;
        }
    }
    return soloNome;
}