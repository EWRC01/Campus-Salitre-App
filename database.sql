-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 12, 2023 at 05:51 PM
-- Server version: 5.7.36
-- PHP Version: 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `salitre`
--
CREATE DATABASE IF NOT EXISTS `salitre` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `salitre`;

-- --------------------------------------------------------

--
-- Table structure for table `cultivation`
--

DROP TABLE IF EXISTS `cultivation`;
CREATE TABLE IF NOT EXISTS `cultivation` (
  `ID_Cultivation` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Type_Cultivation` int(11) NOT NULL,
  `Required_Relative_Humidity` float NOT NULL,
  `Required_Temperature` float NOT NULL,
  `Required_Oxygen` float NOT NULL,
  PRIMARY KEY (`ID_Cultivation`),
  KEY `FOREIGN KEY` (`ID_Type_Cultivation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `irrigation_system`
--

DROP TABLE IF EXISTS `irrigation_system`;
CREATE TABLE IF NOT EXISTS `irrigation_system` (
  `ID_Node` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Cultivation` int(11) NOT NULL,
  `ID_Sensor` int(11) NOT NULL,
  `Hour` time NOT NULL,
  `Date` date NOT NULL,
  `Relative_Temperature_Crop` float NOT NULL,
  `Relative_Humidity_Crop` float NOT NULL,
  `Crop_Moisture` float NOT NULL,
  PRIMARY KEY (`ID_Node`),
  KEY `FK_1` (`ID_Cultivation`),
  KEY `FK_2` (`ID_Sensor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sensors`
--

DROP TABLE IF EXISTS `sensors`;
CREATE TABLE IF NOT EXISTS `sensors` (
  `ID_Sensor` int(11) NOT NULL AUTO_INCREMENT,
  `Sensor_Name` varchar(80) NOT NULL,
  `Sensor_Status` varchar(20) NOT NULL,
  `Sensor_Description` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_Sensor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `types_cultivation`
--

DROP TABLE IF EXISTS `types_cultivation`;
CREATE TABLE IF NOT EXISTS `types_cultivation` (
  `ID_Type_Cultivation` int(11) NOT NULL AUTO_INCREMENT,
  `Name_Type_Cultivation` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_Type_Cultivation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID_User` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Role` int(11) DEFAULT NULL,
  `Username` varchar(80) NOT NULL,
  `User_Password` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cultivation`
--
ALTER TABLE `cultivation`
  ADD CONSTRAINT `FOREIGN KEY` FOREIGN KEY (`ID_Type_Cultivation`) REFERENCES `types_cultivation` (`ID_Type_Cultivation`);

--
-- Constraints for table `irrigation_system`
--
ALTER TABLE `irrigation_system`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`ID_Cultivation`) REFERENCES `cultivation` (`ID_Cultivation`),
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`ID_Sensor`) REFERENCES `sensors` (`ID_Sensor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
