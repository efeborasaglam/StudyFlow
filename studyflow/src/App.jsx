import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup.jsx'
import Login from './Login'
import Home from './Home.jsx'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () =>{
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
  };

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route
          path="/home"
          element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
          <Route path='*' element={<Navigate to='/login'/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
