import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Drawer, useMediaQuery, IconButton, Box, AppBar, Toolbar, Tooltip} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import GrassIcon from '@mui/icons-material/Grass';
import SensorsIcon from '@mui/icons-material/Sensors';
import LogoutIcon from '@mui/icons-material/Logout'; // Importa el icono Logout
import MenuIcon from '@mui/icons-material/Menu'; // Importa el icono Menu
import Logo from './img/logo.png';

const sideMenuStyle = {
  height: '100%', // Establecer el alto al 100% de la altura de la ventana
  backgroundColor: '#011B40', // Establecer el color de fondo a azul
  color: 'white', // Establecer el color del texto a blanco
  padding: '20px', // Agregar un espacio en el borde superior
};

const iconStyle = {
  color: 'white', 
};

function SideMenu({ setIsAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const drawerContent = (
    <div style={sideMenuStyle}>
      <img src={Logo} alt="Logo" style={{ width: '200px', marginBottom: '40px' }} /> 
      <List>
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <DashboardIcon style={iconStyle} /> {/* Cambiar el color del icono Home a rojo */}
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        <ListItem component={Link} to="/register" button>
          <ListItemIcon>
            <PersonIcon style={iconStyle} /> {/* Cambiar el color del icono PersonAdd a rojo */}
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>

        <ListItem component={Link} to="/register-crop" button>
          <ListItemIcon>
            <GrassIcon style={iconStyle} /> {/* Cambiar el color del icono Sensors a rojo */}
          </ListItemIcon>
          <ListItemText primary="Cultivo" />
        </ListItem>

        <ListItem component={Link} to="/add-sensor" button>
          <ListItemIcon>
            <SensorsIcon style={iconStyle} /> {/* Cambiar el color del icono Sensors a rojo */}
          </ListItemIcon>
          <ListItemText primary="Sensor" />
        </ListItem>

        <ListItem component={Link} to="/cultivation-details" button>
          <ListItemIcon>
            <GrassIcon style={iconStyle} /> {/* Cambiar el color del icono Sensors a rojo */}
          </ListItemIcon>
          <ListItemText primary="Cultivation-details" />
        </ListItem>


        
      
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon style={iconStyle} /> {/* Cambiar el color del icono Logout a rojo */}
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {isMobile && (
        <Box display="flex" justifyContent="flex-start">
        
  <Toolbar>
  <Tooltip title="Menú">
  <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
    <MenuIcon />
  </IconButton>
</Tooltip>

  </Toolbar>


        </Box>
      )}
      <Drawer variant={isMobile ? "temporary" : "permanent"} open={isMobile ? isOpen : true} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default SideMenu;
