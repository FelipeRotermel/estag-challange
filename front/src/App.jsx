import { useState } from 'react'
import Router from './routes.jsx';
import NavBar from './components/NavBar/NavBar.jsx';

import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <Router />
    </>
  )
}

export default App;
