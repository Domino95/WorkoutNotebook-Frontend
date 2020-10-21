import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { selectPolish, selectEnglish } from "./Redux/actions/index"
import "./styles/app.css"
import "./styles/login.css"
import './styles/navibar.css'
import Authorization from './pages/authorization/authorization'
import AuthorizationMobile from './pages/authorization/authorizationMobile'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Main from './pages/main/main'
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
const App = () => {
  const [userId, setuserId] = useState("")
  const dispatch = useDispatch()


  if (!localStorage.getItem('language') || localStorage.getItem('language') === "ENGLISH") {
    dispatch(selectEnglish())
    localStorage.setItem('language', "ENGLISH")
  }
  else {
    dispatch(selectPolish())
    localStorage.setItem('language', "POLISH")
  }

  if (localStorage.getItem("theme") === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", '#fff');
  }

  const logout = () => {
    setuserId(null)
    localStorage.setItem('userId', "")
    localStorage.setItem('accesToken', "")
    localStorage.setItem('refreshToken', "")
    localStorage.setItem('training_id', "")
    localStorage.setItem('nameWorkout', "")
    localStorage.setItem('exercises', "")
    localStorage.setItem('createdAt', "")
    window.location.reload(false);
  }
  const token = localStorage.getItem("accesToken")
  if (userId) {
    localStorage.setItem('userId', userId)
  }
  return (
    <Router>
      {!token && <Redirect to="/authorization" />}
      {!token && window.innerWidth >= 768 ?
        <Route path="/authorization" render={() => <Authorization setuserId={setuserId} />} /> :
        <Route path="/authorization" render={() => <AuthorizationMobile setuserId={setuserId} />} />}
      {token && <Redirect from="/authorization" exact to="/" />}
      {token && <Route path="/" component={() => <Main logout={() => logout()} />} />}
    </Router>
  );
}
export default App;
