import 'antd/dist/antd.css';
// import './App.css';
import Signup from './components/Signup/Signup'
import Login from './components/login/Login';
import Teams from './components/teams/Teams'
import Settings from './components/settingsPage/SettingsPage';
import NotFound from './components/notFound/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/Teams">
            <Teams />
          </Route>
          <Route path="/Settings">
            <Settings />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
