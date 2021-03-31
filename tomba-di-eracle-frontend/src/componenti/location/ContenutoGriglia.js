import star from '../../img/red_star.png'


export const Puntatore = ({display, idCella}) => {

    function attivaDisplay() { 
        if (display == idCella){
            return ('')
        } else {
            return ('none')
        }
    };

    return (
        <div className="centrato" style={{position:"relative", marginLeft:"-50%", backgroundColor:"transparent", height:"100%", width:"200%"}}>
            <img src={star} alt="..." style={{ height:"100%", width:"auto", display:`${attivaDisplay()}` }}/>
        </div>
    )
}