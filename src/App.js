import './App.scss';
import { useState } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

//component
import Home_Doctor from './components/Home_Doctor';
import Home_Patient from './components/Home_Patient';
import Signup from './components/Signup';
import Login from './components/Login';
import Login_Doctor from './components/Login_Doctor'
import Login_Patient from './components/Login_Patient'
import Signup_Doctor from './components/Signup_Doctor'
import Signup_Patient from './components/Signup_Patient'

import * as actions from './actions/index'
function App() {
  
  const info_login = JSON.parse(localStorage.getItem('user'))
  const load = useSelector(state => state.load_reducer)
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          {
            info_login === null?<Redirect to={'/login'}/>
            :
            (
              
              info_login.role === 'doctor'?<Home_Doctor></Home_Doctor>
              :<Home_Patient></Home_Patient>
            )
          }
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
