import './App.scss';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Login_Doctor from './components/Login_Doctor'
import Login_Patient from './components/Login_Patient'
import Signup_Doctor from './components/Signup_Doctor'
import Signup_Patient from './components/Signup_Patient'

function App() {
  var x = false;
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path='/'
          exact
        >
          {/* {x? <Home></Home>: <Redirect to={'/login'} />} */}
          <Home></Home>
        </Route>



        <Route path='/sigunup'>
          <Signup></Signup>
        </Route>

        <Route path='/login' exact>
          <Login></Login>
        </Route>
        <Route path='/login/doctor'>
          <Login_Doctor></Login_Doctor>
        </Route>

        <Route path='/login/patient'>
          <Login_Patient></Login_Patient>
        </Route>

        <Route path='/signup/doctor'>
          <Signup_Doctor></Signup_Doctor>
        </Route>

        <Route path='/signup/patient'>
          <Signup_Patient></Signup_Patient>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
