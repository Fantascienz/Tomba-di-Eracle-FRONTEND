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

export const setDirezioniX3 = (idSuperLoc, id, umbra, mappa) => {
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
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 2000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 3000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: superLoc,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 4000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: superLoc,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 5000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 6000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: superLoc,
                idLocationSud: loc + 3000,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 7000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: superLoc,
                idLocationOvest: superLoc,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 8000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: loc + 1000,
                idLocationSud: superLoc,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 9000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 3000,
                idLocationEst: superLoc,
                idLocationSud: superLoc,
                idLocationOvest: loc - 1000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
    }
}

export const setDirezioniX2 = (idSuperLoc, id, umbra, mappa) => {
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
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 20000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: superLoc,
                idLocationEst: superLoc,
                idLocationSud: loc + 20000,
                idLocationOvest: loc - 10000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 30000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 20000,
                idLocationEst: loc + 10000,
                idLocationSud: superLoc,
                idLocationOvest: superLoc,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
        case 40000 + superLoc:
            return {
                idLocation: loc,
                idLocationNord: loc - 20000,
                idLocationEst: superLoc,
                idLocationSud: superLoc,
                idLocationOvest: loc - 10000,
                idLocationSpecchio: mappa === 'Macro' ? umbra ? loc - 144 : loc + 144 : umbra ? loc - 48 : loc + 48
            }
    }
}

export const setDirezioniX1 = (idSuperLoc, id, umbra, subUmbra, mappa) => {
    let loc = parseInt(id, 10)
    let superLoc = parseInt(idSuperLoc, 10);
    return {
        idLocation: loc >= 300000 ? loc - 100000 : loc,
        idLocationNord: superLoc,
        idLocationEst: superLoc,
        idLocationSud: superLoc,
        idLocationOvest: superLoc,
        idLocationSpecchio: generaIdLocationSpecchio1x1(mappa, subUmbra, umbra,loc, superLoc)
    }
}

const generaIdLocationSpecchio1x1 = (mappa, subUmbra, umbra,loc, superLoc) => {
    console.log("super loc " + superLoc)
    let remSubUmbra = superLoc % 1000
    console.log("specchiosubumbra " + remSubUmbra)
    let specchioSubUmbra = remSubUmbra <= 288 ? superLoc - 144 : superLoc - 48
    return mappa === 'Macro' ? subUmbra ? specchioSubUmbra : umbra ? loc - 144 : loc + 144 : subUmbra ? specchioSubUmbra : umbra ? loc - 48 : loc + 48
}