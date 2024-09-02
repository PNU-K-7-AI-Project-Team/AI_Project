-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: risk_analysis
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `user_code` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_user_code_idx` (`user_code`),
  CONSTRAINT `fk_user_code` FOREIGN KEY (`user_code`) REFERENCES `user` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,1,'제목1','내용1','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(2,1,'제목2','내용2','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(3,1,'제목3','내용3','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(4,1,'제목4','내용4','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(5,1,'제목5','내용5','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(6,1,'제목6','내용6','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(7,1,'제목7','내용7','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(8,1,'제목8','내용8','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(9,1,'제목9','내용9','admin','관리자','2024-09-02 05:58:40','2024-09-02 05:58:40'),(10,1,'제목101','내용10','admin','관리자','2024-09-02 05:58:40','2024-09-02 14:58:56'),(11,1,'제목1','내용1','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(12,1,'제목2','내용2','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(13,1,'제목3','내용3','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(14,1,'제목4','내용4','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(15,1,'제목5','내용5','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(16,1,'제목6','내용6','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(17,1,'제목7','내용7','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(18,1,'제목8','내용8','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(19,1,'제목9','내용9','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(20,1,'제목10','내용10','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(21,2,'제목1','내용1','admin','관리자','2024-09-02 06:00:03','2024-09-02 06:00:03'),(23,1,'제목1','내용1','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(24,1,'제목2','내용2','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(25,1,'제목3','내용3','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(26,1,'제목4','내용4','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(27,1,'제목5','내용5','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(28,1,'제목6','내용6','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(29,1,'제목7','내용7','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(30,1,'제목8','내용8','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(31,1,'제목9','내용9','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(32,1,'제목10','내용10','admin','관리자','2024-09-02 11:35:33','2024-09-02 11:35:33'),(33,1,'제목1','내용1','admin','관리자','2024-09-02 12:32:03','2024-09-02 12:32:03'),(34,1,'제목12','내용12','admin','관리자','2024-09-02 12:32:20','2024-09-02 12:32:20'),(35,5,'공지사항입니다.','공지사항 내용입니다.','mong','문동윤','2024-09-02 12:36:25','2024-09-02 12:36:25'),(36,5,'최신 공지사항','최신 공지사항 내용입니다.','mong','문동윤','2024-09-02 12:52:32','2024-09-02 12:52:32'),(37,5,'최신 공지사항','최신 공지사항 내용입니다.','mong','문동윤','2024-09-02 12:53:51','2024-09-02 12:53:51'),(38,1,'최신 공지사항','최신 공지사항 내용입니다.','admin','관리자','2024-09-02 12:54:11','2024-09-02 12:54:11'),(39,1,'새로운 공지사항','공지사항 내용','admin','관리자','2024-09-02 13:05:07','2024-09-02 13:05:07'),(40,1,'새로운 공지사항11','공지사항 내용11','admin','관리자','2024-09-02 13:24:24','2024-09-02 13:24:24');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-02 22:25:53
