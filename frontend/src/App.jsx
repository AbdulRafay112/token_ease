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
import Home from './components/Home';
import Footer from './components/Footer';
function App() {
  return (
    <>
    <Router>
    <Navbar></Navbar>
    <Switch>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/> 
      <Route path='/login' element={<Login/>} />    
    </Switch>
    <Footer></Footer>
    </Router>
    </>
  )
}

export default App
