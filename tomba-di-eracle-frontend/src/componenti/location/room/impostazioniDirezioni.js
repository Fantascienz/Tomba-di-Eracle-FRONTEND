export const coefficienteId = (cellePerRiga) => {
    switch (cellePerRiga) {
        case '3':
            return parseInt('1000', 10)
        case '2':
            return parseInt('10000', 10)
        case '1':
            return parseInt('100000', 10)
    }
}

export const setDirezioniX3 = (idSuperLoc,id) => {
    let loc = parseInt(id,10)
    let superLoc = parseInt(idSuperLoc,10);
    switch (id) {
        case 1000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: superLoc,
                //id specchio generata backend
            }
        case 2000 + superLoc:
        case 3000 + superLoc:
        case 4000 + superLoc:
        case 5000 + superLoc:
        case 6000 + superLoc:
        case 7000 + superLoc:
        case 8000 + superLoc:
        case 9000 + superLoc:
    }
}

export const setDirezioniX2 = (id) => {
    switch (id) {
        case '1':
        case '2':
        case '3':
        case '4':
    }
}

export const setDirezioniX1 = (id) => {

}