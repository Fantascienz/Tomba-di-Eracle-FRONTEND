import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './componenti/layout/Footer';
import Header from './componenti/layout/Header';
import Login from './componenti/utente/Login';


function App() {
  return (
    <div className="App">
      
      <Header/>

      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
        </Switch>
      </Router>

      <Footer/>

    </div>
  );
}

export default App;
