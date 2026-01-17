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
import DashBoard from './components/DashBoard';
import Department from './components/Department';
function App() {
  return (
    <>
    <Router>
    <Navbar></Navbar>
    <Switch>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/> 
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<DashBoard/>}/>  
      <Route path='/dashboard/department' element={<Department/>}/>  
    </Switch>
    <Footer></Footer>
    </Router>
    </>
  )
}

export default App
