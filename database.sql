-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2023 at 12:22 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `types_cultivation`
--

DROP TABLE IF EXISTS `types_cultivation`;
CREATE TABLE IF NOT EXISTS `types_cultivation` (
  `ID_Type_Cultivation` int(11) NOT NULL AUTO_INCREMENT,
  `Name_Type_Cultivation` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_Type_Cultivation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID_User` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Role` int(11) NOT NULL,
  `Username` varchar(80) NOT NULL,
  `User_Password` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cultivation`
--
ALTER TABLE `cultivation`
  ADD CONSTRAINT `FOREIGN KEY` FOREIGN KEY (`ID_Type_Cultivation`) REFERENCES `types_cultivation` (`ID_Type_Cultivation`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
