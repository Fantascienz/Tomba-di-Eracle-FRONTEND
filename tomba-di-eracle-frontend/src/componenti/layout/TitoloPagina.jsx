import React from "react"

export const TitoloPagina = ({ titolo, fontSize }) => {

    if(fontSize){
        fontSize=fontSize;
    } else {
        fontSize="10vmin"
    }

    return (
        <>
            <div className="centrato">
                <div className="centrato" style={{ width: "50%", minWidth: "375px", height: "10%", textShadow: "2px 2px black" }}>
                    <span className="font-lombardia-yellow" style={{ fontSize: fontSize }}>{titolo}</span>
                </div>
            </div>
        </>
    )
}