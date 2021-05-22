
export function tipoUtenteSessione(tipo) {

    if(JSON.parse(sessionStorage.getItem("utente")).tipo.toUpperCase() == tipo.toUpperCase()){
        return true
    }

    return false;
    
}