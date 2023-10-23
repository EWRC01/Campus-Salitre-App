import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SideMenu from './SideMenu';
import Home from './Home';
import RegisterForm from './RegisterForm';
import FeaturesCultivationForm from './FeauturesCultivationForm';
import RegisterCultivation from './RegisterCultivation';
import CultivationComboBox from './CultivationComboBox';
import CultivationDetails from './CultivationDetails';
import AddSensor from './addSensors';
import SensorsComboBox from './SensorsComboBox';
import SensorChart from './sensorChart';
import AllCrops from './AllCrops';
import './App.css'; // Importa tu archivo CSS

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column' }}>

        <div className="menu-container">
          {isAuthenticated && <SideMenu setIsAuthenticated={setIsAuthenticated} />}
        </div>
        <div className="content-container" >

          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/features-crop" element={isAuthenticated ? <FeaturesCultivationForm /> : <Navigate to="/login" replace />} />
            <Route path="/register-crop" element={isAuthenticated ? <RegisterCultivation /> : <Navigate to="/login" replace />} />
            <Route path="/types-cultivation" element={isAuthenticated ? <CultivationComboBox /> : <Navigate to="/login" replace />} />
            <Route path="/cultivation-details" element={isAuthenticated ? <CultivationDetails /> : <Navigate to="/login" replace />} />
            <Route path="/all-crops" element={isAuthenticated ? <AllCrops /> : <Navigate to="/login" replace />} />
            <Route path="/add-sensor" element={isAuthenticated ? <AddSensor /> : <Navigate to="/login" replace />} />
            <Route path="/get-sensors" element={isAuthenticated ? <SensorsComboBox /> : <Navigate to="/login" replace />} />
            <Route path="/charts" element={isAuthenticated ? <SensorChart /> : <Navigate to="/login" replace />} />
            <Route path="/" element={isAuthenticated ? (
              <>
                <Home />
              </>
            ) : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;