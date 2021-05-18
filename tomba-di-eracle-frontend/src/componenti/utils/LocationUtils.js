//trova una location completa dalla lista delle location in sessione
export function trovaLocation(loc) {

    var location = {}
    var allLocations = JSON.parse(sessionStorage.getItem('allLocations'));

    for (let i = 0; i < allLocations.length; i++) {
        if (allLocations[i].id == loc) {
            location = allLocations[i];
            break;
        } else {
            location = loc
        }
    }

    return location;

}

//trova la location da cui discende la stanza
export function trovaLocPadre(daFiglia) {

    if (daFiglia <= 384) {
        return null;
    } else if (daFiglia > 384) {
        if (daFiglia > 1000 && daFiglia < 9999) {
            //estrai xxx da Nxxx
            return daFiglia % 1000
        } else if (daFiglia > 10000 && daFiglia < 99999) {
            //estrai nxxx da Mnxxx
            return daFiglia % 10000
        } else if (daFiglia > 100000 && daFiglia < 199999) {
            //estrai mnxxx da Kmnxxx
            return daFiglia % 100000
        } else if (daFiglia > 200000) {
            //estrai mnxxx da Tmnxxx
            return daFiglia % 200000
        }
    }

}

//trova tutte le location da cui discende la stanza, creando un oggetto con quelle location
export function trovaAlberoLocPadri(daFiglia) {
    var alberoLocationsPadri = {}

    if (daFiglia <= 384) {
        return alberoLocationsPadri = {
            opzione: "xxx",
            strato0: trovaLocation(daFiglia)
        };
    } else if (daFiglia > 384) {
        if (daFiglia > 1000 && daFiglia < 9999) {
            //estrai xxx da Nxxx ed inserisci 1) strato0: xxx | 2) strato1: Nxxx
            return alberoLocationsPadri = {
                opzione: "mxxx",
                strato0: trovaLocation(daFiglia % 1000),
                strato1: trovaLocation(daFiglia)
            }
        } else if (daFiglia > 10000 && daFiglia < 99999) {
            //estrai xxx da Mnxxx 
            //estrai nxxx da Mnxxx ed inserisci 1) strato0: xxx | 2) strato1: Nxxx | 3) strato2: Mnxxx
            var strato0 = daFiglia % 1000;
            var strato1 = daFiglia % 10000 - strato0 == 0 ? daFiglia : daFiglia % 10000;
            var strato2 = daFiglia % 10000 - strato0 == 0 ? 0 : daFiglia;

            if (strato2 == 0) {
                return alberoLocationsPadri = {
                    opzione: "d0xxx",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato1)
                }
            } else {
                return alberoLocationsPadri = {
                    opzione: "dmxxx",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato1),
                    strato2: trovaLocation(strato2)
                }
            }

        } else if (daFiglia > 100000 && daFiglia < 199999) {
            //estrai xxx da Kmnxxx 
            //estrai nxxx da Kmnxxx
            //estrai mnxxx da Kmnxxx ed inserisci 1) strato0: xxx | 2) strato1: Nxxx | 3) strato2: Mnxxx | 4) strato3: Kmnxxx

            var strato0 = daFiglia % 1000;
            var strato1 = daFiglia % 10000;
            var strato2 = daFiglia % 100000;
            var strato3 = daFiglia;

            if (strato1 != strato0 && strato2 != strato1 && strato2 != strato0) {
                return alberoLocationsPadri = {
                    opzione: "cdmxxx",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato1),
                    strato2: trovaLocation(strato2),
                    strato3: trovaLocation(strato3)
                }
            } else if (strato1 == strato0 && strato2 != strato0) {
                return alberoLocationsPadri = {
                    opzione: "cd0xxx",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato2),
                    strato2: trovaLocation(strato3)
                }
            } else if (strato2 == strato1 && strato2 != strato0) {
                return alberoLocationsPadri = {
                    opzione: "c0mxxx",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato1),
                    strato2: trovaLocation(strato3)
                }
            } else if (strato1 == strato0 && strato2 == strato0 && strato2 == strato1) {
                return alberoLocationsPadri = {
                    opzione: "c00xxx",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato3)
                }
            }

        } else if (daFiglia > 200000) {
            //estrai xxx da Tmnxxx 
            //estrai nxxx da Tmnxxx
            //estrai mnxxx da Tmnxxx ed inserisci 1) strato0: xxx | 2) strato1: Nxxx | 3) strato2: Mnxxx | 4) strato3: Tmnxxx
            var strato0 = daFiglia % 1000;
            var strato1 = daFiglia % 10000;
            var strato2 = daFiglia % 200000;
            var strato3 = daFiglia;

            if (strato1 != strato0 && strato2 != strato1 && strato2 != strato0) {
                return alberoLocationsPadri = {
                    opzione: "cdmxxx-extra",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato1),
                    strato2: trovaLocation(strato2),
                    strato3: trovaLocation(strato3)
                }
            } else if (strato1 == strato0 && strato2 != strato0) {
                return alberoLocationsPadri = {
                    opzione: "cd0xxx-extra",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato2),
                    strato2: trovaLocation(strato3)
                }
            } else if (strato2 == strato1 && strato2 != strato0) {
                return alberoLocationsPadri = {
                    opzione: "c0mxxx-extra",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato1),
                    strato2: trovaLocation(strato3)
                }
            } else if (strato1 == strato0 && strato2 == strato0 && strato2 == strato1) {
                return alberoLocationsPadri = {
                    opzione: "c00xxx-extra",
                    strato0: trovaLocation(strato0),
                    strato1: trovaLocation(strato3)
                }
            }
        }
    }
}

//trova tutte le location che discendono dalla location selezionata
export function trovaLocsFiglie(locPadre) {

    //controlla che tipo di location è: xxx | mxxx | dmxxx | cdmxxx
    var tipoLocation = '';
    if (locPadre - locPadre % 1000 == 0) {
        tipoLocation = 'xxx'
    } else if (locPadre - locPadre % 10000 == 0) {
        tipoLocation = 'mxxx'
    } else if (locPadre - locPadre % 100000 == 0) {
        tipoLocation = 'dmxxx'
    } else if (locPadre - locPadre % 1000000 == 0) {
        tipoLocation = 'cdmxxx'
    }

    //trova tutte le location che contengono la Location padre e aggiungile ad un oggetto
    var alberoLocationsFiglie = []
    var allLocations = JSON.parse(sessionStorage.getItem('allLocations'));
    var numeroFiglie = 0
    var numeroFiglieDiFiglie = 0
    for (let i = 0; i < allLocations.length; i++) {
        if (tipoLocation == 'xxx') {
            if (allLocations[i].id % 1000 == locPadre && allLocations[i].id!=locPadre) {
                alberoLocationsFiglie.push(trovaLocsFiglie(allLocations[i].id))
                numeroFiglieDiFiglie=numeroFiglieDiFiglie+trovaLocsFiglie(allLocations[i].id).numeroFiglie;

                if(allLocations[i].id == (9000+locPadre)){
                    break
                } else if(allLocations[i].id == (40000+locPadre)){
                    break
                }
            }
        } else if (tipoLocation == 'mxxx'){
            if (allLocations[i].id % 10000 == locPadre && allLocations[i].id!=locPadre) {
                alberoLocationsFiglie.push(trovaLocsFiglie(allLocations[i].id))
                numeroFiglieDiFiglie=numeroFiglieDiFiglie+trovaLocsFiglie(allLocations[i].id).numeroFiglie;

                if(allLocations[i].id == (40000+locPadre)){
                    break
                }
                
            }
        } else if (tipoLocation == 'dmxxx'){
            if (allLocations[i].id % 100000 == locPadre && allLocations[i].id!=locPadre) {
                alberoLocationsFiglie.push(trovaLocsFiglie(allLocations[i].id))
                numeroFiglieDiFiglie=numeroFiglieDiFiglie+trovaLocsFiglie(allLocations[i].id).numeroFiglie;
            }
        } else if (tipoLocation == 'cdmxxx'){
            if (allLocations[i].id % 1000000 == locPadre && allLocations[i].id!=locPadre) {
                alberoLocationsFiglie.push(trovaLocsFiglie(allLocations[i].id))
                numeroFiglieDiFiglie=numeroFiglieDiFiglie+trovaLocsFiglie(allLocations[i].id).numeroFiglie;
            }
        }
    }

    numeroFiglie=numeroFiglie+alberoLocationsFiglie.length

    return {
        padre: trovaLocation(locPadre),
        numeroFiglie: numeroFiglie,
        numeroFiglieDiFiglie: numeroFiglieDiFiglie,
        figlie: alberoLocationsFiglie,
        albero: trovaAlberoLocPadri(locPadre)
    }
}

//BOOLEANA, ritorna TRUE se la location in parametro possiede almeno una stanza
export function presenzaStanze(location){
    if(location.numeroStanze>0){
        return true;
    }
    return false;
}