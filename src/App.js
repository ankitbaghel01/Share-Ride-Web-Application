import React from 'react';
import LoginPage from './components/Login/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import RegistrationPage from './components/Register/Register';
import Verify from './components/Verify/Verify';
import Home from './components/Home/Home';
import Navbar from './components/Nav/Nav'



function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/" element={<Home/>} />


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

















