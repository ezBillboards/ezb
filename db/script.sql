-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for procedure ezbdev.getUserInfo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserInfo`(
	IN `user_ID_IN` BIGINT

)
BEGIN
	SELECT firstName, lastName, emailAddress, mobilePhone, workPhone,companyName, companyURL,facebookURL,instagramURL,twitterURL, Address1,Address2,city,state,zipcode 
	FROM tblusers where tblusers.user_ID = user_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postAdRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postAdRequest`(
	IN `user_ID_IN` BIGINT,
	IN `artwork_URL_IN` VARCHAR(1000)






,
	IN `billboard_ID_IN` BIGINT,
	IN `package_ID_IN` BIGINT


,
	IN `startDate_IN` DATE








)
BEGIN
	Declare packageDuration int;
	Declare packageDisplayPerCycle smallint;
	DECLARE requestEndDate DATE;
	SELECT @packageDuration := duration, @packageDisplayPerCycle := displayPerCycle from tblPackage where package_ID = package_ID_IN;
	SET requestEndDate = DATE_ADD(startDate_IN,INTERVAL @packageDuration DAY);
	Insert Into tblartwork (user_ID, artwork_URL) values (user_ID_IN,artwork_URL_IN);
	Insert into tbladrequest (user_ID,artwork_ID,status_ID,package_ID,requestDate,startDate,endDate) values (user_ID_IN,last_insert_id(),1,package_ID_IN,curdate(),startDate_IN,requestEndDate);

	
	Update tblschedule
	SET remainingSlots = remainingSlots - @packageDisplayPerCycle
	where scheduleDate >= startDate_IN 
	and scheduleDate < requestEndDate
	and billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postApprover
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postApprover`(
	IN `emailAddress_IN` VARCHAR(100),
	IN `firstName_IN` VARCHAR(50),
	IN `lastName_IN` VARCHAR(50),
	IN `psswd_IN` VARCHAR(255)


)
BEGIN
	Insert into tblapprovers (emailAddress,firstName,lastName,psswd)
	values (emailAddress_IN,firstName_IN,lastName_IN,MD5(psswd_IN));
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postBillboard
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postBillboard`(
	IN `billboardName_IN` VARCHAR(50),
	IN `billboardDescription_IN` VARCHAR(255),
	IN `width_IN` INT,
	IN `height_IN` INT,
	IN `latitude_IN` DOUBLE,
	IN `longitude_IN` DOUBLE,
	IN `minWidthRes_IN` INT,
	IN `maxWidthRes_IN` INT,
	IN `minHeightRes_IN` INT,
	IN `maxHeightRes_IN` INT,
	IN `readTime_IN` INT,
	IN `impressions_IN` INT,
	IN `traffic_IN` INT,
	IN `Cycle_IN` INT

















)
BEGIN
	DECLARE seconds int default 60;
	declare slots int;
	Insert into tblbillboards (billboardName, billboardDescription, width, height, latitude,longitude,minWidthRes,maxWidthRes,minHeightRes,maxHeightRes, readTime, impressions, traffic, cycle)
	values(billboardName_IN, billboardDescription_IN, width_IN, height_IN, latitude_IN,longitude_IN, minWidthRes_IN, maxWidthRes_IN, readTime_IN, minHeightRes_IN,maxHeightRes_IN, impressions_IN, traffic_IN, cycle_IN);
	/*SET slots = cycle*seconds/readTime;*/
	call postSchedule(last_insert_ID(),10);
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postPackage
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postPackage`(
	IN `billboard_ID_IN` BIGINT,
	IN `displayPerCycle_IN` SMALLINT,
	IN `duration_IN` INT,
	IN `price_IN` DECIMAL(10,2)



)
BEGIN
	Insert into tblpackage (billboard_ID, displayPerCycle, duration, price) values (billboard_ID_IN, displayPerCycle_IN, duration_IN, price_In);
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postPublisher
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postPublisher`(
	IN `emailAddress_IN` VARCHAR(100),
	IN `firstName_IN` VARCHAR(50),
	IN `lastName_IN` VARCHAR(50),
	IN `psswd_IN` VARCHAR(255)


)
BEGIN
	Insert into tblpublishers (emailAddress,firstName,lastName,psswd)
	values (emailAddress_IN,firstName_IN,lastName_IN,MD5(psswd_IN));
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postSchedule
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postSchedule`(
	IN `billboard_ID_IN` BIGINT,
	IN `totalSlots_IN` INT









)
BEGIN
	/*Declare*/
	Declare currentDate DATE default CURDATE();
	Declare i int default 0;
	WHILE i < 180 DO
		insert into tblschedule(billboard_ID, remainingSlots,scheduleDate)
		values (billboard_ID_IN, totalSlots_IN, currentDate);
		SET currentDate = DATE_ADD(currentDate,INTERVAL 1 DAY );
		SET i = i + 1;
	END WHILE;
		
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postUser`(
	IN `emailAddress_IN` VARCHAR(50),
	IN `firstName_IN` VARCHAR(50),
	IN `lastName_IN` VARCHAR(50),
	IN `mobilePhone_IN` VARCHAR(15),
	IN `workPhone_IN` VARCHAR(15),
	IN `companyName_IN` VARCHAR(50),
	IN `companyURL_IN` VARCHAR(100),
	IN `facebookURL_IN` VARCHAR(100),
	IN `instagramURL_IN` VARCHAR(100),
	IN `twitterURL_IN` VARCHAR(100),
	IN `address1_IN` VARCHAR(200),
	IN `address2_in` VARCHAR(200),
	IN `city_IN` VARCHAR(50),
	IN `state_IN` VARCHAR(50),
	IN `zipCode_IN` VARCHAR(5),
	IN `psswd_IN` VARCHAR(255)





)
BEGIN
	insert into tblusers(emailAddress,firstName,lastName,mobilePhone,
	workPhone,companyName, companyURL,facebookURL, instagramURL,twitterURL,
	Address1,Address2,city,state,zipCode,psswd,signupDate,lastLoginDate) 
	values (emailAddress_IN,firstName_IN,lastName_IN,mobilePhone_IN,
	workPhone_IN,companyName_IN,companyURL_IN,facebookURL_IN,instagramURL_IN,twitterURL_IN,
	address1_IN,address2_in,city_IN,state_IN,zipCode_IN,MD5(psswd_IN),curdate(),curdate());
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.putApproveRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putApproveRequest`(
	IN `request_ID_IN` BIGINT,
	IN `approver_ID_IN` BIGINT

)
BEGIN
	Update tbladrequest
	SET status_ID = 2,approver_ID = approver_ID_IN, approveDate = curdate()
	where request_ID = request_ID_IN;	
END//
DELIMITER ;

-- Dumping structure for table ezbdev.tbladmin
CREATE TABLE IF NOT EXISTS `tbladmin` (
  `admin_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(100) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `psswd` varchar(255) NOT NULL,
  `tempsswd` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`admin_id`,`emailAddress`),
  UNIQUE KEY `admin_ID` (`admin_id`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tbladrequest
CREATE TABLE IF NOT EXISTS `tbladrequest` (
  `request_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_ID` bigint(20) NOT NULL DEFAULT 0,
  `artwork_ID` bigint(20) NOT NULL,
  `status_ID` bigint(20) NOT NULL,
  `package_ID` bigint(20) NOT NULL,
  `requestDate` datetime NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `approver_ID` bigint(20) DEFAULT NULL,
  `approveDate` datetime DEFAULT NULL,
  `publisher_ID` bigint(20) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  PRIMARY KEY (`request_ID`),
  UNIQUE KEY `request_ID` (`request_ID`),
  KEY `status` (`status_ID`),
  KEY `approver` (`approver_ID`),
  KEY `publisher` (`publisher_ID`),
  KEY `user` (`user_ID`),
  KEY `artwork` (`artwork_ID`),
  KEY `package` (`package_ID`),
  CONSTRAINT `approver` FOREIGN KEY (`approver_ID`) REFERENCES `tblapprovers` (`approver_ID`),
  CONSTRAINT `artwork` FOREIGN KEY (`artwork_ID`) REFERENCES `tblartwork` (`artwork_ID`),
  CONSTRAINT `package` FOREIGN KEY (`package_ID`) REFERENCES `tblpackage` (`package_ID`),
  CONSTRAINT `publisher` FOREIGN KEY (`publisher_ID`) REFERENCES `tblpublishers` (`publisher_ID`),
  CONSTRAINT `status` FOREIGN KEY (`status_ID`) REFERENCES `tblrequeststatus` (`status_ID`),
  CONSTRAINT `user` FOREIGN KEY (`user_ID`) REFERENCES `tblusers` (`user_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tbladvertisement
CREATE TABLE IF NOT EXISTS `tbladvertisement` (
  `advertisement_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `request_ID` bigint(20) NOT NULL,
  `artwork_ID` bigint(20) NOT NULL,
  `schedule_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`advertisement_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblapprovers
CREATE TABLE IF NOT EXISTS `tblapprovers` (
  `approver_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(100) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `psswd` varchar(255) NOT NULL,
  `tempsswd` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`approver_ID`,`emailAddress`),
  UNIQUE KEY `approver_ID` (`approver_ID`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblartwork
CREATE TABLE IF NOT EXISTS `tblartwork` (
  `artwork_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_ID` bigint(20) NOT NULL,
  `artwork_URL` varchar(1000) NOT NULL,
  PRIMARY KEY (`artwork_ID`),
  UNIQUE KEY `artwork_ID` (`artwork_ID`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `tblusers` (`user_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblbillboards
CREATE TABLE IF NOT EXISTS `tblbillboards` (
  `billboard_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboardName` varchar(50) NOT NULL,
  `billboardDescription` varchar(255) DEFAULT NULL,
  `billboardImage_URL` varchar(500) DEFAULT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `minWidthRes` int(11) NOT NULL,
  `maxWidthRes` int(11) NOT NULL,
  `minHeightRes` int(11) NOT NULL,
  `maxHeightRes` int(11) NOT NULL,
  `readTime` int(11) NOT NULL,
  `impressions` int(11) NOT NULL,
  `traffic` int(11) NOT NULL,
  `Cycle` int(11) NOT NULL,
  PRIMARY KEY (`billboard_ID`),
  UNIQUE KEY `billboard_ID` (`billboard_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblpackage
CREATE TABLE IF NOT EXISTS `tblpackage` (
  `package_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `displayPerCycle` smallint(6) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`package_ID`),
  UNIQUE KEY `package_ID` (`package_ID`),
  KEY `billboard_Package` (`billboard_ID`),
  CONSTRAINT `billboard_Package` FOREIGN KEY (`billboard_ID`) REFERENCES `tblbillboards` (`billboard_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COMMENT='Packages available for a billboard.';

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblpublishers
CREATE TABLE IF NOT EXISTS `tblpublishers` (
  `publisher_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(100) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `psswd` varchar(255) NOT NULL,
  `tempsswd` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`publisher_ID`,`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblrequeststatus
CREATE TABLE IF NOT EXISTS `tblrequeststatus` (
  `status_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `statusName` varchar(25) NOT NULL,
  `statusDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`status_ID`),
  UNIQUE KEY `status_ID` (`status_ID`),
  UNIQUE KEY `statusName` (`statusName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblschedule
CREATE TABLE IF NOT EXISTS `tblschedule` (
  `schedule_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `remainingSlots` int(11) NOT NULL,
  `scheduleDate` date NOT NULL,
  PRIMARY KEY (`schedule_ID`),
  UNIQUE KEY `schedule_ID` (`schedule_ID`),
  KEY `billboard` (`billboard_ID`),
  CONSTRAINT `billboard` FOREIGN KEY (`billboard_ID`) REFERENCES `tblbillboards` (`billboard_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=721 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table ezbdev.tblusers
CREATE TABLE IF NOT EXISTS `tblusers` (
  `user_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(100) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `mobilePhone` varchar(15) DEFAULT NULL,
  `workPhone` varchar(15) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `companyURL` varchar(100) DEFAULT NULL,
  `facebookURL` varchar(100) DEFAULT NULL,
  `instagramURL` varchar(100) DEFAULT NULL,
  `twitterURL` varchar(100) DEFAULT NULL,
  `Address1` varchar(200) NOT NULL,
  `Address2` varchar(200) NOT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `zipCode` varchar(5) NOT NULL,
  `psswd` varchar(255) NOT NULL,
  `tempsswd` varchar(10) DEFAULT NULL,
  `signupDate` datetime NOT NULL,
  `lastLoginDate` datetime NOT NULL,
  PRIMARY KEY (`user_ID`,`emailAddress`),
  UNIQUE KEY `user_ID` (`user_ID`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
