import './App.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { renderRoutes } from './routes'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {renderRoutes()}
        </Switch>
      </div>
    </Router>
  )
}

export default App
