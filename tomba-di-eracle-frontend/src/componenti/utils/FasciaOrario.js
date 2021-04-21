function FasciaOraria(orario){
    if(orario > 4 && orario < 7){
        return "alba"
    } else if (orario > 6 && orario < 13) {
        return "mattina"
    } else if (orario > 12 && orario < 15) {
        return "mezzogiorno"
    } else if (orario > 14 && orario < 17) {
        return "pomeriggio"
    } else if (orario > 16 && orario < 19) {
        return "tramonto"
    } else if (orario > 18 && orario < 23) {
        return "sera"
    } else if (orario > 22 && orario < 2) {
        return "mezzanotte"
    } else if (orario > 1 && orario < 5) {
        return "notte"
    }
}

export default FasciaOraria;