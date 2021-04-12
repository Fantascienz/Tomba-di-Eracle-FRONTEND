

export const SelezionaMeteo = ({ idSelect,handleChange,orario }) => {
    return (
        <select name={idSelect} id={idSelect} onChange={handleChange} className="form-select" style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
            <option value={1}>Seleziona Condizioni Meteo {orario}</option>
            <option value={1}>Condizioni Meteo Reali</option>
            <option value={2}>Sereno</option>
            <option value={3}>Nuvoloso</option>
            <option value={6}>Pioggia</option>
            <option value={4}>Pioggia Leggera</option>
            <option value={8}>Tempesta</option>
            <option value={5}>Nebbia</option>
            <option value={7}>Neve</option>
        </select>
    )
}