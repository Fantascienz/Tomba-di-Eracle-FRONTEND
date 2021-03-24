import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './componenti/layout/Footer';
import Header from './componenti/layout/Header';
import Login from './componenti/utente/Login';
import Registrazione from './componenti/utente/Registrazione';

function App() {
  return (
    <div className="App">
      
      <Header/>

      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/" exact component={""}></Route>
          <Route path="/registrazione" component={Registrazione}/>
        </Switch>
      </Router>

      <Footer/>

    </div>
  );
}

export default App;
