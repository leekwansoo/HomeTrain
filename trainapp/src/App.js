import React, { useState, useEffect } from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { Route, Routes, Link, Outlet, useNavigate} from 'react-router-dom'
import Main from './Main'
import DataUpload from './DataUpload'
import Login from './Login'
import Register from './Register'
import AppUser from './AppUser'


function App() {


   let navigate = useNavigate(); 
   
return (
  <>
    <div>  
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{ navigate('/')}}>Login</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/main')}}>Main</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/register')}}>Register</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/dataupload')}}>DataInput</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/appuser')}}>AppUser</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    </div>
    <div>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="main" element={<Main />} />
      <Route path="register" element={<Register />} />
      <Route path="dataupload" element={<DataUpload />} />  
      <Route path="appuser" element={<AppUser />} />  
      <Route path="*" element={<div>"404":없는페이지입니다 </div>} />
    </Routes>
    </div> 
 
  </>
  )  
}

export default App;
