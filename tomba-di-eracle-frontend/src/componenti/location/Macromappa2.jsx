const Macromappa2 = ({locationSelezionata, idIniziale, immagineSfondoMappa}) => {

    const grigliaMacromappa = (cellePerRiga) => {

        var columns = cellePerRiga;
        var rows = cellePerRiga;
        var celleGriglia = []
        var gridTemplateColumnsN = ""
        var gridTemplateRowsN = ""
        var idStart = idIniziale

        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= columns; j++) {
                let id = idStart++
                celleGriglia.push(
                    <div title={id} 
                        style={{
                        border: ` ${id==locationSelezionata ? "2px solid red": "1px solid black"}`,
                        gridColumnStart: `${j}`,
                        gridRowStart: `${i}`
                    }}
                    >

                    </div>
                )
            }
        }


        for (let c = 1; c <= columns; c++) {
            gridTemplateColumnsN = gridTemplateColumnsN + "auto "
        }

        for (let r = 1; r <= rows; r++) {
            gridTemplateRowsN = gridTemplateRowsN + "auto "
        }

        return (
            <div style={{
                backgroundColor: "red",
                gridColumnStart: "2",
                gridRowStart: "2",
                display: "grid",
                gridTemplateColumns: `${gridTemplateColumnsN}`,
                gridTemplateRows: `${gridTemplateRowsN}`,
                backgroundImage: `url('${immagineSfondoMappa}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 99.8%"
            }}>
                {celleGriglia}
            </div>
        )
    }

    return(
        <>
            {grigliaMacromappa (12)}
        </>
    )

}

export default Macromappa2