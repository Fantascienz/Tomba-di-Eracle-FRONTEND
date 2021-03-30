import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './componenti/layout/Footer';
import Login from './componenti/utente/Login';
import Registrazione from './componenti/utente/Registrazione';
import Utente from './componenti/utente/Utente';
import CreazionePersonaggio from './componenti/personaggio/CreazionePersonaggio';
import ModificaUtente from './componenti/utente/ModificaUtente';
import Gamepage from './componenti/game/Gamepage';
import ModificaPersonaggio from './componenti/personaggio/ModificaPersonaggio';
import CreazioneLocation from './componenti/location/CreazioneLocation'
import Macromappa from './componenti/location/Macromappa';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/registrazione" component={Registrazione}/>
          <Route path="/paginaUtente" component={Utente}/>
          <Route path="/creazionePersonaggio/:tipo" component={CreazionePersonaggio}/>
          <Route path="/modificaPersonaggio" component={ModificaPersonaggio} />
          <Route path="/registrazione" component={Registrazione} />
          <Route path="/paginaUtente" component={Utente} />
          <Route path="/modificaUtente" component={ModificaUtente} />
          <Route path="/game" component={ Gamepage } />
          <Route path="/creazioneLocation" component ={CreazioneLocation}/>
          <Route path="/macromappa" component ={ Macromappa }/>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
