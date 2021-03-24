import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './componenti/layout/Footer';
import Header from './componenti/layout/Header';
<<<<<<< HEAD
import Login from './componenti/utente/Login';

=======
import Registrazione from './componenti/Registrazione';
>>>>>>> 0efbf89 (form registrazione completato)

function App() {
  return (
    <div className="App">
      
      <Header/>

      <Router>
        <Switch>
<<<<<<< HEAD
          <Route path="/" exact component={Login}></Route>
=======
          <Route path="/" exact component={""}></Route>
          <Route path="/registrazione" component={Registrazione}/>
>>>>>>> 0efbf89 (form registrazione completato)
        </Switch>
      </Router>

      <Footer/>

    </div>
  );
}

export default App;
