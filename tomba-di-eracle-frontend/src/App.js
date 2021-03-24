import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './componenti/layout/Footer';
import Header from './componenti/layout/Header';

function App() {
  return (
    <div className="App">
      
      <Header/>

      <Router>
        <Switch>
          <Route path="/" exact component={""}></Route>
        </Switch>
      </Router>

      <Footer/>

    </div>
  );
}

export default App;
