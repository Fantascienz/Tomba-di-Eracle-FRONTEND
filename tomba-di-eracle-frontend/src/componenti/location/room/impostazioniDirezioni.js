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

const generaIdLocationSpecchio = (idSuperLoc, idLoc) => {
    if (idSuperLoc % 1000 <= 144) {
        return idLoc + 144;
    } else if (idSuperLoc % 1000 >= 289 && idSuperLoc % 1000 <= 336) {
        return idLoc + 48;
    } else if (idSuperLoc % 1000 > 336) {
        return idLoc - 48;
    }
    return idLoc - 144;
}

export const setDirezioniX3 = (idSuperLoc, id) => {
    let loc = parseInt(id, 10)
    let superLoc = parseInt(idSuperLoc, 10);
    switch (id) {
        case 1000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: superLoc,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 2000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 3000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: superLoc,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 4000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: superLoc,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 5000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 6000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: superLoc,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 7000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: superLoc,
                idLocationOvest: superLoc,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 8000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: superLoc,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 9000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: superLoc,
                idLocationSud: superLoc,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
    }
}

export const setDirezioniX2 = (idSuperLoc, id) => {
    let loc = parseInt(id, 10)
    let superLoc = parseInt(idSuperLoc, 10);
    switch (id) {
        case 10000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: loc + 10000,
                idLocationSud: loc + 20000,
                idLocationOvest: superLoc,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 20000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: superLoc,
                idLocationSud: loc + 20000,
                idLocationOvest: loc - 10000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 30000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 20000,
                idLocationEst: loc + 10000,
                idLocationSud: superLoc,
                idLocationOvest: superLoc,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
        case 40000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 20000,
                idLocationEst: superLoc,
                idLocationSud: superLoc,
                idLocationOvest: loc - 10000,
                idLocationSpecchio: generaIdLocationSpecchio(superLoc,loc)
            }
    }
}

export const setDirezioniX1 = (idSuperLoc, id) => {
    let loc = parseInt(id, 10)
    let superLoc = parseInt(idSuperLoc, 10);
    return {
        idLocation: loc >= 300000 ? loc - 100000 : loc,
        idLocationNord: superLoc,
        idLocationEst: superLoc,
        idLocationSud: superLoc,
        idLocationOvest: superLoc,
        idLocationSpecchio: generaIdLocationSpecchio1x1(superLoc, loc >= 300000 ? loc - 100000 : loc)
        
    }
}

const generaIdLocationSpecchio1x1 = (idSuperLoc, loc) => {
    let radice = (loc - loc % 100000)/100000;
    if (radice==1){
        return generaIdLocationSpecchio(idSuperLoc, loc)
    } else if (radice==2){
        return generaIdLocationSpecchio(idSuperLoc, idSuperLoc)
    }
}