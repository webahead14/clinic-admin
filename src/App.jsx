import './App.css';
import { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import axios from 'axios'

import Login from './pages/Login'
import Home from './pages/Home'
import ClientList from './pages/ClientList'
import ProtocolList from './pages/ProtocolList'
import SurveyList from './pages/SurveyList'
import AddClient from './pages/AddClient'
import AddProtocol from './pages/AddProtocol'
import ClientPage from './pages/ClientPage'
import ProtocolPage from './pages/ProtocolPage'


function App() {
  const location = useLocation();

  // Just an axios example
  // useEffect(() => {
  //   axios.get(url)
  //     .then((res) => {
  //       res.data <- no need to JSON.parse the response
  //     })
  //     .catch()

  //   axios.post(url, { body: {} }) <- no need to JSON.stringify the body
  //     .then((res) => {
  //       res.data
  //     })
  //     .catch() 
  // }, [])


  if (location.pathname === "/login") {
    return <Login />;
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/surveys" element={<SurveyList />} />
        <Route path="/protocols" element={<ProtocolList />} />
        <Route path="/add/protocol" element={<AddProtocol />} />
        <Route path="/add/client" element={<AddClient />} />
        <Route path="/client/:id" element={<ClientPage />} />
        <Route path="/protocol/:id" element={<ProtocolPage />} />
      </Routes>
    </div>
  );
}

export default App;
