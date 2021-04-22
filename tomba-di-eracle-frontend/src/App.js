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
import ModificaLocation from './componenti/location/ModificaLocation';
import CreazioneStanza from './componenti/location/CreazioneStanza';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Forecast from './componenti/game/Forecast';
import MessaggiUtenti from './componenti/messaggi/MessaggiUtenti';
import MessaggiAdmin from './componenti/messaggi/MessaggiAdmin';
import CreazioneRoom from './componenti/location//room/CreazioneRoom';
import RiempimentoRoom from './componenti/location/room/RiempimentoRoom';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA8wJClnPKCMWn7r5SPBwqDvvF4ZozAHvQ",
  authDomain: "live-chat-5ec32.firebaseapp.com",
  projectId: "live-chat-5ec32",
  storageBucket: "live-chat-5ec32.appspot.com",
  messagingSenderId: "513828209517",
  appId: "1:513828209517:web:880fc5f10cbeaaaf169064"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
export const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/registrazione" component={Registrazione} />
          <Route path="/paginaUtente" component={Utente} />
          <Route path="/creazionePersonaggio/:tipo" component={CreazionePersonaggio} />
          <Route path="/modificaPersonaggio" component={ModificaPersonaggio} />
          <Route path="/registrazione" component={Registrazione} />
          <Route path="/paginaUtente" component={Utente} />
          <Route path="/modificaUtente" component={ModificaUtente} />
          <Route path="/game" component={Gamepage} />
          <Route path="/creazioneLocation" component={CreazioneLocation} />
          <Route path="/modificaLocation" component={ModificaLocation} />
          <Route path="/creazioneRoom" component={CreazioneRoom} />
          <Route path="/riempimentoRoom" component={RiempimentoRoom}/>
          <Route path="/creazioneStanza" component={CreazioneStanza} />
          <Route path="/macromappa" component={Macromappa} />
          <Route path="/contattaAdmin" component={MessaggiAdmin} />
          <Route path="/messaggiUtenti" component={MessaggiUtenti }/>
        </Switch>
      </Router>
      <Footer />
      <Forecast />
    </div>
  );
}

export default App;
