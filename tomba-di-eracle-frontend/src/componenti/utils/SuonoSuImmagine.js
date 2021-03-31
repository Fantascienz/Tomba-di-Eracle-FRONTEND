import useSound from 'use-sound';

export const SoundImage = ({suono, immagine}) => {
    const [play] = useSound(suono);
    return <img src={immagine} alt="..." onMouseOver={play}/>
}


export const SoundDiv = ({suono, contenuto, stile}) => {
  const [play] = useSound(suono);
  return (
    <div onMouseOver={play} style={stile}>
      {contenuto}
    </div>
  )
}