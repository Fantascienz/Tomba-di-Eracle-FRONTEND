import React from "react"

export const TitoloPagina = ({ titolo }) => {
    return (
        <React.Fragment>
            <br/>
            <div style={{ backgroundColor: "transparent", height: "15%", zIndex: "998", color: "#eeaa44", textShadow: "2px 2px black", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <span className="font-lombardia" style={{ fontSize: "3.5em" }}>{titolo}</span>
            </div>
        </React.Fragment>
    )
}