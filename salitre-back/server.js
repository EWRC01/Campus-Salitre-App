// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

//Credentials to connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change to your MySQL username
  password: 'usbw', // Change to your MySQL password
  database: 'salitre',
});


//Try to connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


//API endpoint to login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE Username = ? AND User_Password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error performing login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // Login successful
        res.json({ success: true });
      } else {
        // Login failed
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

//API endpoint to register a new user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (Username, User_Password) VALUES (?, ?)';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error performing registration:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Registration successful
      res.json({ success: true });
    }
  });
});

//API endpoint to register a new name of crop
app.post('/api/registertypecultivation', (req, res) => {
  const { nameCultivation } = req.body;
  const query = 'INSERT INTO types_cultivation (Name_Type_Cultivation) VALUES (?)';
  connection.query(query, [nameCultivation], (err, results) => {
    if (err) {
      console.error('Error during register the crop:', err);
      res.status(500).json({error: 'Internal Server Error' });
    } else {
      res.json({ success:true });
    }
  });
});

//API endpoint to get all the type of cultivation
app.get('/api/types-cultivation', (req, res) => {
  const query = 'SELECT ID_Type_Cultivation, Name_Type_Cultivation FROM types_cultivation';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Crops' , err);
      res.status(500).json({  error: 'Internal Server Error'  });
    } else {
      res.json(results);
    }
  });
});

//API endpoint to add data necessary for the crops
app.post('/api/features-cultivation', (req, res) => {
  const { ID_Type_Cultivation, Required_Relative_Humidity, Required_Temperature, Required_Oxygen } = req.body;
  const query = 'INSERT INTO cultivation (ID_Type_Cultivation, Required_Relative_Humidity, Required_Temperature, Required_Oxygen) VALUES (?, ?, ?, ?)';
  connection.query(query, [ID_Type_Cultivation, Required_Relative_Humidity, Required_Temperature, Required_Oxygen], (err, results) => {
    if (err) {
      console.error('Error performing cultivation record insertion:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Cultivation record inserted successfully
      res.json({ success: true });
    }
  });
});

//API Endpoint to get data from the features crops
app.get('/api/all-crops', (req, res) => {
  const {ID_Type_Cultivation} = req.query
  const query = 'SELECT * FROM cultivation WHERE ID_Type_Cultivation = ?';
  connection.query(query, [ID_Type_Cultivation], (err, results) => {
    if(err) {
      console.error('Error fetching all crops', err);
      res.status(500).json({error:'Internal Server Error'});
    } else {
      res.json(results);
    }
  });
});

// Add this new API endpoint
app.post('/api/add-sensor', (req, res) => {
  const { Sensor_Name, Sensor_Status, Sensor_Description } = req.body;
  const query = 'INSERT INTO sensors (Sensor_Name, Sensor_Status, Sensor_Description) VALUES (?, ?, ?)';
  connection.query(query, [Sensor_Name, Sensor_Status, Sensor_Description], (err, results) => {
    if (err) {
      console.error('Error adding sensor:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});

//API endpoint to get all the sensors
app.get('/api/get-sensors', (req, res) => {
  const query = 'SELECT ID_Sensor, Sensor_Name, Sensor_Status, Sensor_Description FROM sensors';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Crops' , err);
      res.status(500).json({  error: 'Internal Server Error'  });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/add-sensor-data', (req, res) => {
  const {
    ID_Cultivation,
    ID_Sensor,
    Hour,
    Date,
    Relative_Temperature_Crop,
    Relative_Humidity_Crop,
    Crop_Moisture
 } = req.body;

  const query = 'INSERT INTO Irrigation_System (ID_Cultivation, ID_Sensor, Hour, Date, Relative_Temperature_Crop, Relative_Humidity_Crop, Crop_Moisture) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [ID_Cultivation, ID_Sensor, Hour, Date, Relative_Temperature_Crop, Relative_Humidity_Crop, Crop_Moisture], (err, results) => {
    if (err) {
      console.error('Error adding sensor data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
