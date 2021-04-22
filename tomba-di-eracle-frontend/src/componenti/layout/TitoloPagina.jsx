import React from "react"

export const TitoloPagina = ({ titolo }) => {
    return (
        <>
            <div className="centrato">
                <div className="centrato" style={{ width: "50%", minWidth: "375px", height: "10%", color: "#eeaa44", textShadow: "2px 2px black" }}>
                    <span className="font-lombardia" style={{ fontSize: "10vmin" }}>{titolo}</span>
                </div>
            </div>
        </>
    )
}