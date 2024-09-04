-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: risk_analysis
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_code` varchar(8) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ROLE_ADMIN','ROLE_USER') NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `dept` enum('IT','HR','QM') DEFAULT NULL,
  `position` enum('JUNIOR','SENIOR','MANAGER','DIRECTOR') DEFAULT NULL,
  `region` enum('SEOUL','BUSAN','DAEGU','INCHEON','GWANGJU','DAEJEON','ULSAN') DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_code`),
  UNIQUE KEY `UKa3imlf41l37utmxiquukk8ajc` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('06484968','user','$2a$10$8e2pAripQtS3Ftzfv3xfH.vQMSqpsU7Y8eQDdnzdaWeplksl6ood2','ROLE_USER','신기한','QM','JUNIOR','DAEJEON','1990-12-12',NULL,'2024-09-04 08:51:26'),('57402037','us22','$2a$10$me5br1lvAa5kF7XFvCbf6.Ntotcr7MRS8XbjqnyG/lnnoKZz1WD.m','ROLE_USER','김밥','HR','SENIOR','ULSAN','2019-04-10','M','2024-09-04 08:54:14'),('78301726','admin','$2a$10$cYoalam91EguaQkPky1tpeTaJCSqxB8B6l9VfqP3zelmJdjKO19Iq','ROLE_ADMIN','관리자','IT','MANAGER','SEOUL','2024-09-04','M','2024-09-04 08:48:37'),('89725709','us','$2a$10$QMu.kX.QUBSMsa1sWNi2v.8MK52jqO2loHybRyLU.8euAO7E.p1te','ROLE_USER','둘리','HR','SENIOR','DAEGU','2000-04-10',NULL,'2024-09-04 08:53:07');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-04 18:01:18
