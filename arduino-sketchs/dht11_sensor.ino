#include <ESP8266WiFi.h> // http://arduino.esp8266.com/stable/package_esp8266com_index.json link to activate the board
#include <DHT.h> // https://github.com/adafruit/DHT-sensor-library 1.3.0 - https://github.com/adafruit/Adafruit_Sensor 1.0.2
#include <NTPClient.h> // https://github.com/arduino-libraries/NTPClient 3.2.1 Version
#include <WiFiUdp.h> // Used to stablish connection to pool of hours 
#include <WiFiClient.h> // Required to stablish connection to wifi and HTTP function
#include <ESP8266HTTPClient.h> // Use ESP8266HTTPClient library


const char* ssid = "Familia_Rodriguez";
const char* password = "Rodriguez1234";
const char* serverName = "http://192.168.1.18:5000/api/add-sensor-data";
const long utcOffsetInSeconds = -21600;
//Week Days
String weekDays[7]={"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

//Month names
String months[12]={"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};


// DHT11 Sensor Configuration
#define DHTPIN 4 // Replace with your GPIO pin
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// NTP Configuration
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

//WifiClient
WiFiClient wificlient;

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Initialize DHT sensor
  dht.begin();

  // Initialize NTP client
  timeClient.begin();
  timeClient.setTimeOffset(-21600); // Set your time zone offset

  // Add your data collection and POST request logic here
}

void loop() {
  timeClient.update();
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  time_t epochTime = timeClient.getEpochTime();
  struct tm *ptm = gmtime ((time_t *)&epochTime); 
  int monthDay = ptm->tm_mday;
  int currentMonth = ptm->tm_mon+1;
  String currentMonthName = months[currentMonth-1];
  int currentYear = ptm->tm_year+1900;
  String CurrentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay);

  // Prepare the data to send to the server
  int ID_Cultivation = 1; // Replace with the appropriate cultivation ID
  int ID_Sensor = 1; // Replace with the appropriate sensor I 
  String Date = CurrentDate; // Extract the date part (YYYY-MM-DD)
  String Time= timeClient.getFormattedTime();  // Extract the time part (HH:mm:ss)
  float Relative_Temperature_Crop = temperature;
  float Relative_Humidity_Crop = humidity;
  float Crop_Moisture = 2.1; // Replace with your moisture data

  Serial.println(float(temperature));

  // Create a JSON object to hold the sensor data
  String sensorData = "{\"ID_Cultivation\":" + String(ID_Cultivation) +
                     ",\"ID_Sensor\":" + String(ID_Sensor) +
                     ",\"Hour\":\"" + (Time) + "\"" +
                     ",\"Date\":\"" + (Date) + "\"" +
                     ",\"Relative_Temperature_Crop\":" + String(Relative_Temperature_Crop) +
                     ",\"Relative_Humidity_Crop\":" + String(Relative_Humidity_Crop) +
                     ",\"Crop_Moisture\":" + String(Crop_Moisture) + "}";

  // Send the data to the server using an HTTP POST request
  sendSensorData(sensorData);
  
  // Delay or use a timer to control data collection frequency
  delay(10000); // Collect data every 1 minute (adjust as needed)
}


void sendSensorData(String data) {
  HTTPClient http;
  http.begin(wificlient, serverName);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(data);
  Serial.println(data);
  Serial.println("HTTP Response code: ");
  Serial.println(httpCode);
  http.end();
}