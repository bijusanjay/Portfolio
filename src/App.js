import './App.css'
import './Portfolio.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Portfolio from './Pages/Portfolio';
import {BrowserRouter as Router, Route, Switch, } from 'react-router-dom'

function App() {
  return (
    <Router>
      
        <div className="App">
          
          <Switch>
            <Route exact path= "/">
            <Navbar />
              <Home />
            </Route>

            <Route path= "/create">
            <Navbar />
              <Create />
            </Route>
          
          <Route path= "/portfolio/:id">
              <Portfolio />
          </Route>

          <Route path='*' exact={true} />
          </Switch>
          
        </div>
      
    </Router>
    
  );
}

export default App;
