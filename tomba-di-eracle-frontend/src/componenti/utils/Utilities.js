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


export function pgIsGarou(pg){
    if(pg.razza == "Homid" || pg.razza == "Metis" || pg.razza == "Lupus" ){
        return true
    }
    return false
}


export function rangoGarou(pg){
    if(pg.rango == 0){
        return "Cucciolo"
    } else if (pg.rango == 1){
        return "Cliath"
    } else if (pg.rango == 2){
        return "Fostern"
    } else if (pg.rango == 3){
        return "Adren"
    } else if (pg.rango == 4){
        return "Athro"
    } else if (pg.rango == 5){
        return "Elder"
    } else if (pg.rango == 6){
        return "Grand Elder"
    } else {
        return pg.rango
    }
}