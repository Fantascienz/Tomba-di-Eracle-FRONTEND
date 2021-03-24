import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './componenti/layout/Footer';
import Login from './componenti/utente/Login';
import Registrazione from './componenti/utente/Registrazione';
import Utente from './componenti/utente/Utente';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/" exact component={""}></Route>
          <Route path="/registrazione" component={Registrazione}/>
          <Route path="/paginaUtente" component={Utente}/>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
