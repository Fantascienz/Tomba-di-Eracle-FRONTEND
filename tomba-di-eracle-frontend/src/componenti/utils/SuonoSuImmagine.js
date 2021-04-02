import useSound from 'use-sound';


export const SoundImage = ({ suono, immagine }) => {
  const [play] = useSound(suono);
  return <img src={immagine} alt="..." onMouseOver={play} />
}


export const SoundDiv = ({ suono, contenuto, stile }) => {
  const [play] = useSound(suono);
  return (
    <div onMouseOver={play} style={stile}>
      {contenuto}
    </div>
  )
}


export function SuonoDirezione({ suono, funzione, title, className, src, style }) {
  const [play] = useSound(suono, funzione);
  return (
    <div className="navigazione-link" title={title} onClick={play} style={style}>
      <img className={className} src={src} />
    </div>
  )
}


export function SuonoModal({ suono, funzione, bottone }) {
  const [play] = useSound(suono, funzione);
  return (
    <div onClick={play} >
      {bottone}
    </div>
  )
}
