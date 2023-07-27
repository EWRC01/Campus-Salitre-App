// src/App.js (updated for React Router v6)
// src/App.js (updated for React Router v6)
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Home from './Home';
import FeaturesCultivationForm from './FeauturesCultivationForm';
import { Box, List, ListItem, ListItemText, ListItemIcon, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import RegisterCultivation from './RegisterCultivation';
import CultivationComboBox from './CultivationComboBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {/* Side menu */}
        <Box
          component="nav"
          sx={{
            backgroundColor: '#131A41',
            color: '#fff',
            minWidth: '10vh',
            padding: '20px',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            display: { xs: 'none', md: 'block' }, // Ocultar en pantallas pequeñas (celular) y mostrar en pantallas medianas y grandes (tablet, computadoras)
            '&:hover': {
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Sombra al hacer hover
            },
          }}
        >
          <List sx={{ '& a': { color: '#fff', textDecoration: 'none' } }}>
            <ListItem component={Link} to="/" button sx={{ '&:hover': { backgroundColor: '#555'} }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={Link} to="/login" button sx={{ '&:hover': { backgroundColor: '#555' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem component={Link} to="/register" button sx={{ '&:hover': { backgroundColor: '#555' } }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Box>





        {/* Mobile menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, padding: '10px' }}>
          <IconButton onClick={toggleMenu} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
            <List sx={{ width: '200px' }}>
              <ListItem component={Link} to="/" button onClick={toggleMenu} sx={{ '&:hover': { backgroundColor: '#d6d7d8' } }}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem component={Link} to="/login" button onClick={toggleMenu} sx={{ '&:hover': { backgroundColor: '#d6d7d8' } }}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem component={Link} to="/register" button onClick={toggleMenu} sx={{ '&:hover': { backgroundColor: '#d6d7d8' } }}>
                <ListItemIcon>
                <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </List>
          </Drawer>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, height: '100vh', padding: '20px', backgroundColor: '#f5f5f5', marginLeft: { xs: 0, md: '130px' } }}>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/register-crop" element={<RegisterCultivation />} />
            <Route path="/types-cultivation" element={<CultivationComboBox/>} />
            <Route path="/features-crop" element={<FeaturesCultivationForm/>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
