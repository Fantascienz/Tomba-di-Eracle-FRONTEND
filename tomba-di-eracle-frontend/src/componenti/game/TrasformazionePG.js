
const trasformazionePG = (PG, URLformaBase, URLformaForte, URLformaVeloce, nomeFormaBase, nomeFormaForte, nomeFormaVeloce) => {

    const formaBase = () => {
        PG.immagineAttiva = URLformaBase
        sessionStorage.setItem('pgAttivo', JSON.stringify(PG))
    }

    const formaForte = () => {
        PG.immagineAttiva = URLformaForte
        sessionStorage.setItem('pgAttivo', JSON.stringify(PG))
    }

    const formaVeloce = () => {
        PG.immagineAttiva = URLformaVeloce
        sessionStorage.setItem('pgAttivo', JSON.stringify(PG))
    }


    return (<>
        {/* FORMA BASE */}
        {URLformaForte == null && URLformaVeloce == null ?
            null :
            <form onSubmit={() => formaBase()}>
                <button className="btn btn-gold" style={{ width: "100%", fontSize: "1.5em" }}><b className="font-lombardia">{nomeFormaBase}</b></button>
            </form>
        }

        {/* FORMA FORTE */}
        {URLformaForte == null ?
            null :
            <form onSubmit={() => formaForte()}>
                <button className="btn btn-gold" style={{ width: "100%", fontSize: "1.5em" }}><b className="font-lombardia">{nomeFormaForte}</b></button>
            </form>
        }

        {/* FORMA VELOCE */}
        {URLformaVeloce == null ?
            null :
            <form onSubmit={() => formaVeloce()}>
                <button className="btn btn-gold" style={{ width: "100%", fontSize: "1.5em" }}><b className="font-lombardia">{nomeFormaVeloce}</b></button>
            </form>
        }
    </>)
}

export default trasformazionePG;