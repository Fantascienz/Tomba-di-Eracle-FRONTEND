import FasciaOraria from "../utils/FasciaOrario";
import { estraiNome } from "../utils/Utilities";


const MessaggioChirottero = ({ chirottero, mittente, data }) => {

    var provaData = new Date(data);

    function fasciaOraria(){
        var orario = provaData.toLocaleString(undefined, {hour: "numeric"});
        var fasciaOraria = FasciaOraria(orario);

        if(fasciaOraria=="alba"){
            return "Sono le prime luci dell'alba, quando"
        } else if (fasciaOraria=="mattina") {
            return "Nel cuore della mattina,"
        } else if (fasciaOraria=="mezzogiorno") {
            return "E' da poco passato mezzogiorno, quando"
        } else if (fasciaOraria=="pomeriggio") {
            return "E' primo pomeriggio, quando"
        } else if (fasciaOraria=="tramonto") {
            return "Il sole sta calando oltre i monti ad ovest, quando"
        } else if (fasciaOraria=="sera") {
            return "Sono le prime ore della sera, quando"
        } else if (fasciaOraria=="mezzanotte") {
            return "E' da poco passata la mezzanotte, quando"
        } else if (fasciaOraria=="notte") {
            return "Nel pieno della notte"
        }
    }

    return (
        <>
            { mittente !== '' ?
                <>
                    {/* <h1 className="font-lombardia-yellow bg-dark rounded">Chirottero di {mittente}</h1> */}
                    <i className="font-lombardia" style={{ fontSize: '1.5em', lineHeight: "1" }}>{provaData.toLocaleDateString(undefined, {day: 'numeric'})} {provaData.toLocaleDateString(undefined, {month: 'long'}).charAt(0).toUpperCase()+provaData.toLocaleDateString(undefined, {month: 'long'}).slice(1)} {provaData.toLocaleDateString(undefined, {year: 'numeric'})-810},</i>
                    <br/>
                    <i className="font-lombardia" style={{ fontSize: '1.5em', lineHeight: "1" }}>{fasciaOraria()} una piccola creatura atterra sulla tua spalla. Affannata, arranca fino al tuo orecchio e, aprendo la bocca, la voce di <b>{estraiNome(mittente)}</b> proferisce queste parole:</i>
                    <br/>
                    <p className="font-lombardia" style={{ fontSize: '1.5em', lineHeight: "1" }}>"{chirottero}"</p>
                    <i className="font-lombardia" style={{ fontSize: '1.5em', lineHeight: "1" }}>Poi, appena la voce cessa di parlare, con un secco stridio la creatura collassa in un mucchietto di cenere e polvere.</i>
                </>
                :
                <h1 className="font-lombardia-yellow bg-dark rounded">Scegli Chirottero</h1>
            }
        </>
    )
}

export default MessaggioChirottero;