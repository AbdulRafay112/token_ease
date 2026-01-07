import { useState,useCallback,useEffect,useRef} from 'react'
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import './css/fonts.css'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom"
import Login from './components/Login';
function App() {
  return (
    <>
    <Router>
    <Navbar></Navbar>
    <Switch>
      <Route path='/signup' element={<SignUp/>}/> 
      <Route path='/login' element={<Login/>} />    
    </Switch>
    </Router>
    </>
  )
}

export default App
