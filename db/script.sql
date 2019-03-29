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

-- Dumping structure for procedure ezbdev.getBillboardInfo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBillboardInfo`(
	IN `billboard_ID_IN` BIGINT

)
BEGIN
	Select * from tblbillboards 
	where billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getBillboards
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBillboards`()
BEGIN
	Select billboard_ID, billboardName, billboardDescription, billboardImage_URL from tblbillboards;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getLoginAdmin
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLoginAdmin`(
	IN `emailAddress_IN` VARCHAR(100)


)
BEGIN
	Select admin_ID from tbladmin
	where emailAddress = emailAddress_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getLoginApprover
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLoginApprover`(
	IN `emailAddress_IN` VARCHAR(100)



)
BEGIN
	Select approver_ID from tblapprovers
	where emailAddress = emailAddress_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getLoginPublisher
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLoginPublisher`(
	IN `emailAddress_IN` VARCHAR(100)


)
BEGIN
	Select publisher_ID from tblpublishers
	where emailAddress = emailAddress_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getLoginUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLoginUser`(
	IN `emailAddress_IN` VARCHAR(100)






)
BEGIN
	Select user_ID from tblusers
	where emailAddress = emailAddress_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getProcessedRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProcessedRequest`(
	IN `status_ID_IN` INT





)
BEGIN
	Select request_ID,requestDate,startDate, endDate, tblbillboards.billboard_ID, billboardName,tblusers.firstName, tblusers.lastName,displayPerCycle, duration
	artworkName,extension,artworkURL,comments,tblapprovers.firstName as approverFirstName, tblapprovers.lastName as approverLastName,
	approveDate, tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
	join tblusers on tblusers.user_ID = tbladrequest.user_ID
	join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
	join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
	join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
	left join tblapprovers on tblapprovers.approver_ID = tbladrequest.approver_ID
	where tbladrequest.status_ID = status_ID_IN
	order by requestDate asc;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getRegulations
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRegulations`(
	IN `billboard_ID_IN` BIGINT
)
BEGIN
	Select regulation from tblbillboardregulation
	where billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getRejections
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRejections`(
	IN `billboard_ID_IN` BIGINT
)
BEGIN
	Select rejection from tblcommonrejections
	where billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRequest`(
	IN `requestFrom_IN` DATETIME,
	IN `requestTo_IN` DATETIME

)
BEGIN
	IF requestFrom_IN IS NULL and requestTo_IN IS NULL then
		Select request_ID,requestDate,tblbillboards.billboard_ID, billboardName,firstName, lastName,displayPerCycle,
		artworkName,artworkURL,extension,tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = 1
		order by requestDate asc;
	ELSEIF requestTo_IN IS NULL then
		Select request_ID,requestDate,tblbillboards.billboard_ID, billboardName,firstName, lastName,displayPerCycle,
		artworkName,artworkURL,extension,tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = 1 AND DATE(requestDate) >= requestFrom_IN
		order by requestDate asc;
	ELSEIF requestFrom_IN IS NULL then
		Select request_ID,requestDate,tblbillboards.billboard_ID, billboardName,firstName, lastName,displayPerCycle,
		artworkName,artworkURL,extension,tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = 1 AND DATE(requestDate) <= requestTo_IN
		order by requestDate asc;
	ELSE
		Select request_ID,requestDate,tblbillboards.billboard_ID, billboardName,firstName, lastName,displayPerCycle,
		artworkName,artworkURL,extension,tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = 1 AND DATE(requestDate) >= requestFrom_IN AND DATE(requestDate) <= requestTo_IN
		order by requestDate asc;
	END IF;
	
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.getUserInfo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserInfo`(
	IN `request_ID_IN` BIGINT



)
BEGIN
	SELECT firstName, lastName, emailAddress, mobilePhone, workPhone,companyName, 
	companyURL,facebookURL,instagramURL,twitterURL, address1,address2,city,state,zipcode 
	FROM tblusers join tbladrequest
	on tblusers.user_ID = tbladrequest.user_ID
	 where tbladrequest.request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.postAdRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postAdRequest`(
	IN `user_ID_IN` BIGINT,
	IN `artwork_URL_IN` VARCHAR(1000)






,
	IN `artworkName_IN` VARCHAR(50),
	IN `extension_IN` VARCHAR(10),
	IN `width_IN` INT,
	IN `height_IN` INT,
	IN `size_IN` INT,
	IN `billboard_ID_IN` BIGINT,
	IN `package_ID_IN` BIGINT


,
	IN `startDate_IN` DATE













)
BEGIN
	Declare packageDuration int;
	Declare packageDisplayPerCycle smallint;
	DECLARE requestEndDate DATE;
	SELECT @packageDuration := duration, @packageDisplayPerCycle := displayPerCycle from tblpackage where package_ID = package_ID_IN;
	SET requestEndDate = DATE_ADD(startDate_IN,INTERVAL @packageDuration DAY);
	Insert Into tblartwork (user_ID, artworkURL,artworkName,extension,width,height,size) 
	values (user_ID_IN,artwork_URL_IN,artworkName_IN,extension_IN,width_IN,height_IN,size_IN);
	Insert into tbladrequest (user_ID,artwork_ID,status_ID,package_ID,requestDate,startDate,endDate) 
	values (user_ID_IN,last_insert_id(),1,package_ID_IN,current_timestamp(),startDate_IN,requestEndDate);

	
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
	values (emailAddress_IN,firstName_IN,lastName_IN,psswd_IN);
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
	values (emailAddress_IN,firstName_IN,lastName_IN,psswd_IN);
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
	address1,address2,city,state,zipCode,psswd,signupDate,lastLoginDate) 
	values (emailAddress_IN,firstName_IN,lastName_IN,mobilePhone_IN,
	workPhone_IN,companyName_IN,companyURL_IN,facebookURL_IN,instagramURL_IN,twitterURL_IN,
	address1_IN,address2_in,city_IN,state_IN,zipCode_IN,psswd_IN,curdate(),curdate());
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.putCancelRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCancelRequest`(
	IN `request_ID_IN` BIGINT
)
BEGIN
	Update tbladrequest
	SET status_ID = 4
	where request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.putStatusApprover
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putStatusApprover`(
	IN `request_ID_IN` BIGINT,
	IN `approver_ID_IN` BIGINT

,
	IN `status_ID_IN` INT,
	IN `comments_IN` VARCHAR(200)

)
BEGIN
	Update tbladrequest
	SET status_ID = status_ID_IN,approver_ID = approver_ID_IN,comments = comments_IN ,approveDate = current_timestamp()
	where request_ID = request_ID_IN;	
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.putStatusPaid
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putStatusPaid`(
	IN `request_ID_IN` BIGINT
)
BEGIN
	Update tbladrequest
	SET status_ID = 5
	where request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbdev.putStatusPublisher
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putStatusPublisher`(
	IN `request_ID_IN` BIGINT,
	IN `publisher_ID_IN` BIGINT
)
BEGIN
	Update tbladrequest
	SET status_ID = 6,publisher_ID = publisher_ID_IN ,publishDate = current_timestamp()
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

-- Dumping data for table ezbdev.tbladmin: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbladmin` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbladmin` ENABLE KEYS */;

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
  `comments` varchar(500) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tbladrequest: ~4 rows (approximately)
/*!40000 ALTER TABLE `tbladrequest` DISABLE KEYS */;
INSERT INTO `tbladrequest` (`request_ID`, `user_ID`, `artwork_ID`, `status_ID`, `package_ID`, `requestDate`, `startDate`, `endDate`, `approver_ID`, `approveDate`, `publisher_ID`, `publishDate`, `comments`) VALUES
	(1, 1, 21, 1, 5, '2019-03-14 20:20:20', '2019-03-16 00:00:00', '2019-03-30 00:00:00', NULL, NULL, NULL, NULL, NULL),
	(2, 1, 22, 1, 4, '2019-03-13 20:20:20', '2019-03-16 00:00:00', '2019-04-13 00:00:00', NULL, NULL, NULL, NULL, NULL),
	(3, 1, 23, 1, 4, '2019-03-12 20:20:20', '2019-03-16 00:00:00', '2019-04-13 00:00:00', NULL, NULL, NULL, NULL, NULL),
	(5, 2, 25, 2, 6, '2019-03-14 00:00:00', '2019-03-16 00:00:00', '2019-03-30 00:00:00', 6, '2019-03-14 00:00:00', NULL, NULL, NULL),
	(6, 2, 26, 1, 6, '2019-03-15 00:00:00', '2019-03-16 00:00:00', '2019-03-30 00:00:00', NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `tbladrequest` ENABLE KEYS */;

-- Dumping structure for table ezbdev.tbladvertisement
CREATE TABLE IF NOT EXISTS `tbladvertisement` (
  `advertisement_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `request_ID` bigint(20) NOT NULL,
  `artwork_ID` bigint(20) NOT NULL,
  `schedule_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`advertisement_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tbladvertisement: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbladvertisement` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbladvertisement` ENABLE KEYS */;

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

-- Dumping data for table ezbdev.tblapprovers: ~2 rows (approximately)
/*!40000 ALTER TABLE `tblapprovers` DISABLE KEYS */;
INSERT INTO `tblapprovers` (`approver_ID`, `emailAddress`, `firstName`, `lastName`, `psswd`, `tempsswd`) VALUES
	(1, 'example@example.com', 'Felix', 'Gonzalez', 'bbf2dead374654cbb32a917afd236656', NULL),
	(5, 'example1@example1.com', 'Juan', 'Del Pueblo', '6bc8954e3c2b6dfbb5ad2d25acc45be4', NULL),
	(6, 'example@approver.com', 'Carlos', 'Aponte', 'd8e98f7cc38ada6fd9ca0ae9e53bf0bf', NULL);
/*!40000 ALTER TABLE `tblapprovers` ENABLE KEYS */;

-- Dumping structure for table ezbdev.tblartwork
CREATE TABLE IF NOT EXISTS `tblartwork` (
  `artwork_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_ID` bigint(20) NOT NULL,
  `artworkURL` varchar(1000) NOT NULL,
  `artworkName` varchar(50) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `Size` int(11) NOT NULL,
  PRIMARY KEY (`artwork_ID`),
  UNIQUE KEY `artwork_ID` (`artwork_ID`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `tblusers` (`user_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tblartwork: ~24 rows (approximately)
/*!40000 ALTER TABLE `tblartwork` DISABLE KEYS */;
INSERT INTO `tblartwork` (`artwork_ID`, `user_ID`, `artworkURL`, `artworkName`, `extension`, `width`, `height`, `Size`) VALUES
	(1, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(2, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(3, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(4, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(5, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(6, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(7, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(8, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(9, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(10, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(11, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(12, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(13, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(14, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(15, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(16, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(17, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(18, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(19, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(20, 1, 'as;dkfj', 'image', '.jpg', 10, 12, 14),
	(21, 1, '../../img/requests/1.jpg', 'Coca Cola', 'jpg', 20, 10, 15),
	(22, 1, '../../img/requests/2.jpg', 'BURGERTOWN', 'jpg', 80, 40, 33),
	(23, 1, '../../img/requests/3.jpg', 'PEPSI', 'jpg', 40, 20, 25),
	(24, 1, 'image.jpg', 'image', '.jpg', 10, 12, 14),
	(25, 2, 'image.jpg', 'image', '.jpg', 10, 12, 14),
	(26, 2, '../../img/requests/6.jpg', 'image', '.jpg', 10, 12, 14);
/*!40000 ALTER TABLE `tblartwork` ENABLE KEYS */;

-- Dumping structure for table ezbdev.tblbillboardregulation
CREATE TABLE IF NOT EXISTS `tblbillboardregulation` (
  `reg_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `regulation` varchar(200) NOT NULL,
  PRIMARY KEY (`reg_ID`),
  KEY `regBillboard` (`billboard_ID`),
  CONSTRAINT `regBillboard` FOREIGN KEY (`billboard_ID`) REFERENCES `tblbillboards` (`billboard_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tblbillboardregulation: ~9 rows (approximately)
/*!40000 ALTER TABLE `tblbillboardregulation` DISABLE KEYS */;
INSERT INTO `tblbillboardregulation` (`reg_ID`, `billboard_ID`, `regulation`) VALUES
	(1, 3, 'No alcohol'),
	(2, 3, 'No animations'),
	(3, 3, 'Appropriate vocabulary'),
	(4, 3, 'No conflicting theme'),
	(5, 6, 'No alcohol'),
	(6, 6, 'No animations'),
	(7, 6, 'Appropriate vocabulary'),
	(8, 7, 'No alcohol'),
	(9, 7, 'No animations');
/*!40000 ALTER TABLE `tblbillboardregulation` ENABLE KEYS */;

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

-- Dumping data for table ezbdev.tblbillboards: ~7 rows (approximately)
/*!40000 ALTER TABLE `tblbillboards` DISABLE KEYS */;
INSERT INTO `tblbillboards` (`billboard_ID`, `billboardName`, `billboardDescription`, `billboardImage_URL`, `width`, `height`, `latitude`, `longitude`, `minWidthRes`, `maxWidthRes`, `minHeightRes`, `maxHeightRes`, `readTime`, `impressions`, `traffic`, `Cycle`) VALUES
	(1, 'Luchetti Billboard', 'This is the Luchetti Billboard', '../../img/billboards/1.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400),
	(2, 'Stefanis Billboard', 'This is the Stefanis Billboard', '../../img/billboards/2.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400),
	(3, 'Chardon Billboard', 'This is the Chardon Billboard', '../../img/billboards/3.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400),
	(4, 'Biology Billboard', 'This is the Biology Billboard', '../../img/billboards/4.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400),
	(5, 'Student Center Billboard', 'This is the Student Center Billboard', '../../img/billboards/5.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400),
	(6, 'Luchetti Billboard', 'This is the Luchetti Billboard', '../../img/billboards/1.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400),
	(7, 'Chardon Billboard', 'This is the Chardon Billboard', '../../img/billboards/3.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400),
	(8, 'Monson Billboard', 'This is the Monson Billboard', '../../img/billboards/5.jpg', 10, 10, 10, 10, 10, 10, 100, 20, 18, 200, 300, 400);
/*!40000 ALTER TABLE `tblbillboards` ENABLE KEYS */;

-- Dumping structure for table ezbdev.tblcommonrejections
CREATE TABLE IF NOT EXISTS `tblcommonrejections` (
  `reject_ID` int(11) NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `rejection` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`reject_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tblcommonrejections: ~9 rows (approximately)
/*!40000 ALTER TABLE `tblcommonrejections` DISABLE KEYS */;
INSERT INTO `tblcommonrejections` (`reject_ID`, `billboard_ID`, `rejection`) VALUES
	(1, 3, 'Animated image'),
	(2, 3, 'Alcohol reference'),
	(3, 3, 'Inappropriate language'),
	(4, 3, 'Conflict of interest'),
	(5, 6, 'Use of alcohol'),
	(6, 6, 'Animated image'),
	(7, 6, 'Too much colors'),
	(8, 7, 'Drug related'),
	(9, 7, 'Conflict of interest');
/*!40000 ALTER TABLE `tblcommonrejections` ENABLE KEYS */;

-- Dumping structure for table ezbdev.tblconfig
CREATE TABLE IF NOT EXISTS `tblconfig` (
  `config_Key` int(11) NOT NULL,
  `config_Value` varchar(50) NOT NULL,
  PRIMARY KEY (`config_Key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tblconfig: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblconfig` ENABLE KEYS */;

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

-- Dumping data for table ezbdev.tblpackage: ~5 rows (approximately)
/*!40000 ALTER TABLE `tblpackage` DISABLE KEYS */;
INSERT INTO `tblpackage` (`package_ID`, `billboard_ID`, `displayPerCycle`, `duration`, `price`) VALUES
	(1, 1, 4, 28, 1700.00),
	(3, 3, 4, 28, 1700.00),
	(4, 3, 4, 28, 1700.00),
	(5, 6, 4, 14, 900.00),
	(6, 7, 4, 14, 900.00);
/*!40000 ALTER TABLE `tblpackage` ENABLE KEYS */;

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

-- Dumping data for table ezbdev.tblpublishers: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblpublishers` DISABLE KEYS */;
INSERT INTO `tblpublishers` (`publisher_ID`, `emailAddress`, `firstName`, `lastName`, `psswd`, `tempsswd`) VALUES
	(1, 'example@publisher.com', 'Carlos', 'Rodriguez', '52aded165360352a0f5857571d96d68f', NULL);
/*!40000 ALTER TABLE `tblpublishers` ENABLE KEYS */;

-- Dumping structure for table ezbdev.tblrequeststatus
CREATE TABLE IF NOT EXISTS `tblrequeststatus` (
  `status_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `statusName` varchar(25) NOT NULL,
  `statusDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`status_ID`),
  UNIQUE KEY `status_ID` (`status_ID`),
  UNIQUE KEY `statusName` (`statusName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tblrequeststatus: ~6 rows (approximately)
/*!40000 ALTER TABLE `tblrequeststatus` DISABLE KEYS */;
INSERT INTO `tblrequeststatus` (`status_ID`, `statusName`, `statusDescription`) VALUES
	(1, 'Requested', NULL),
	(2, 'Approved', NULL),
	(3, 'Denied', NULL),
	(4, 'Cancelled', NULL),
	(5, 'Paid', NULL),
	(6, 'Published', NULL);
/*!40000 ALTER TABLE `tblrequeststatus` ENABLE KEYS */;

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

-- Dumping data for table ezbdev.tblschedule: ~720 rows (approximately)
/*!40000 ALTER TABLE `tblschedule` DISABLE KEYS */;
INSERT INTO `tblschedule` (`schedule_ID`, `billboard_ID`, `remainingSlots`, `scheduleDate`) VALUES
	(1, 5, 10, '2019-03-14'),
	(2, 5, 10, '2019-03-15'),
	(3, 5, 10, '2019-03-16'),
	(4, 5, 10, '2019-03-17'),
	(5, 5, 10, '2019-03-18'),
	(6, 5, 10, '2019-03-19'),
	(7, 5, 10, '2019-03-20'),
	(8, 5, 10, '2019-03-21'),
	(9, 5, 10, '2019-03-22'),
	(10, 5, 10, '2019-03-23'),
	(11, 5, 10, '2019-03-24'),
	(12, 5, 10, '2019-03-25'),
	(13, 5, 10, '2019-03-26'),
	(14, 5, 10, '2019-03-27'),
	(15, 5, 10, '2019-03-28'),
	(16, 5, 10, '2019-03-29'),
	(17, 5, 10, '2019-03-30'),
	(18, 5, 10, '2019-03-31'),
	(19, 5, 10, '2019-04-01'),
	(20, 5, 10, '2019-04-02'),
	(21, 5, 10, '2019-04-03'),
	(22, 5, 10, '2019-04-04'),
	(23, 5, 10, '2019-04-05'),
	(24, 5, 10, '2019-04-06'),
	(25, 5, 10, '2019-04-07'),
	(26, 5, 10, '2019-04-08'),
	(27, 5, 10, '2019-04-09'),
	(28, 5, 10, '2019-04-10'),
	(29, 5, 10, '2019-04-11'),
	(30, 5, 10, '2019-04-12'),
	(31, 5, 10, '2019-04-13'),
	(32, 5, 10, '2019-04-14'),
	(33, 5, 10, '2019-04-15'),
	(34, 5, 10, '2019-04-16'),
	(35, 5, 10, '2019-04-17'),
	(36, 5, 10, '2019-04-18'),
	(37, 5, 10, '2019-04-19'),
	(38, 5, 10, '2019-04-20'),
	(39, 5, 10, '2019-04-21'),
	(40, 5, 10, '2019-04-22'),
	(41, 5, 10, '2019-04-23'),
	(42, 5, 10, '2019-04-24'),
	(43, 5, 10, '2019-04-25'),
	(44, 5, 10, '2019-04-26'),
	(45, 5, 10, '2019-04-27'),
	(46, 5, 10, '2019-04-28'),
	(47, 5, 10, '2019-04-29'),
	(48, 5, 10, '2019-04-30'),
	(49, 5, 10, '2019-05-01'),
	(50, 5, 10, '2019-05-02'),
	(51, 5, 10, '2019-05-03'),
	(52, 5, 10, '2019-05-04'),
	(53, 5, 10, '2019-05-05'),
	(54, 5, 10, '2019-05-06'),
	(55, 5, 10, '2019-05-07'),
	(56, 5, 10, '2019-05-08'),
	(57, 5, 10, '2019-05-09'),
	(58, 5, 10, '2019-05-10'),
	(59, 5, 10, '2019-05-11'),
	(60, 5, 10, '2019-05-12'),
	(61, 5, 10, '2019-05-13'),
	(62, 5, 10, '2019-05-14'),
	(63, 5, 10, '2019-05-15'),
	(64, 5, 10, '2019-05-16'),
	(65, 5, 10, '2019-05-17'),
	(66, 5, 10, '2019-05-18'),
	(67, 5, 10, '2019-05-19'),
	(68, 5, 10, '2019-05-20'),
	(69, 5, 10, '2019-05-21'),
	(70, 5, 10, '2019-05-22'),
	(71, 5, 10, '2019-05-23'),
	(72, 5, 10, '2019-05-24'),
	(73, 5, 10, '2019-05-25'),
	(74, 5, 10, '2019-05-26'),
	(75, 5, 10, '2019-05-27'),
	(76, 5, 10, '2019-05-28'),
	(77, 5, 10, '2019-05-29'),
	(78, 5, 10, '2019-05-30'),
	(79, 5, 10, '2019-05-31'),
	(80, 5, 10, '2019-06-01'),
	(81, 5, 10, '2019-06-02'),
	(82, 5, 10, '2019-06-03'),
	(83, 5, 10, '2019-06-04'),
	(84, 5, 10, '2019-06-05'),
	(85, 5, 10, '2019-06-06'),
	(86, 5, 10, '2019-06-07'),
	(87, 5, 10, '2019-06-08'),
	(88, 5, 10, '2019-06-09'),
	(89, 5, 10, '2019-06-10'),
	(90, 5, 10, '2019-06-11'),
	(91, 5, 10, '2019-06-12'),
	(92, 5, 10, '2019-06-13'),
	(93, 5, 10, '2019-06-14'),
	(94, 5, 10, '2019-06-15'),
	(95, 5, 10, '2019-06-16'),
	(96, 5, 10, '2019-06-17'),
	(97, 5, 10, '2019-06-18'),
	(98, 5, 10, '2019-06-19'),
	(99, 5, 10, '2019-06-20'),
	(100, 5, 10, '2019-06-21'),
	(101, 5, 10, '2019-06-22'),
	(102, 5, 10, '2019-06-23'),
	(103, 5, 10, '2019-06-24'),
	(104, 5, 10, '2019-06-25'),
	(105, 5, 10, '2019-06-26'),
	(106, 5, 10, '2019-06-27'),
	(107, 5, 10, '2019-06-28'),
	(108, 5, 10, '2019-06-29'),
	(109, 5, 10, '2019-06-30'),
	(110, 5, 10, '2019-07-01'),
	(111, 5, 10, '2019-07-02'),
	(112, 5, 10, '2019-07-03'),
	(113, 5, 10, '2019-07-04'),
	(114, 5, 10, '2019-07-05'),
	(115, 5, 10, '2019-07-06'),
	(116, 5, 10, '2019-07-07'),
	(117, 5, 10, '2019-07-08'),
	(118, 5, 10, '2019-07-09'),
	(119, 5, 10, '2019-07-10'),
	(120, 5, 10, '2019-07-11'),
	(121, 5, 10, '2019-07-12'),
	(122, 5, 10, '2019-07-13'),
	(123, 5, 10, '2019-07-14'),
	(124, 5, 10, '2019-07-15'),
	(125, 5, 10, '2019-07-16'),
	(126, 5, 10, '2019-07-17'),
	(127, 5, 10, '2019-07-18'),
	(128, 5, 10, '2019-07-19'),
	(129, 5, 10, '2019-07-20'),
	(130, 5, 10, '2019-07-21'),
	(131, 5, 10, '2019-07-22'),
	(132, 5, 10, '2019-07-23'),
	(133, 5, 10, '2019-07-24'),
	(134, 5, 10, '2019-07-25'),
	(135, 5, 10, '2019-07-26'),
	(136, 5, 10, '2019-07-27'),
	(137, 5, 10, '2019-07-28'),
	(138, 5, 10, '2019-07-29'),
	(139, 5, 10, '2019-07-30'),
	(140, 5, 10, '2019-07-31'),
	(141, 5, 10, '2019-08-01'),
	(142, 5, 10, '2019-08-02'),
	(143, 5, 10, '2019-08-03'),
	(144, 5, 10, '2019-08-04'),
	(145, 5, 10, '2019-08-05'),
	(146, 5, 10, '2019-08-06'),
	(147, 5, 10, '2019-08-07'),
	(148, 5, 10, '2019-08-08'),
	(149, 5, 10, '2019-08-09'),
	(150, 5, 10, '2019-08-10'),
	(151, 5, 10, '2019-08-11'),
	(152, 5, 10, '2019-08-12'),
	(153, 5, 10, '2019-08-13'),
	(154, 5, 10, '2019-08-14'),
	(155, 5, 10, '2019-08-15'),
	(156, 5, 10, '2019-08-16'),
	(157, 5, 10, '2019-08-17'),
	(158, 5, 10, '2019-08-18'),
	(159, 5, 10, '2019-08-19'),
	(160, 5, 10, '2019-08-20'),
	(161, 5, 10, '2019-08-21'),
	(162, 5, 10, '2019-08-22'),
	(163, 5, 10, '2019-08-23'),
	(164, 5, 10, '2019-08-24'),
	(165, 5, 10, '2019-08-25'),
	(166, 5, 10, '2019-08-26'),
	(167, 5, 10, '2019-08-27'),
	(168, 5, 10, '2019-08-28'),
	(169, 5, 10, '2019-08-29'),
	(170, 5, 10, '2019-08-30'),
	(171, 5, 10, '2019-08-31'),
	(172, 5, 10, '2019-09-01'),
	(173, 5, 10, '2019-09-02'),
	(174, 5, 10, '2019-09-03'),
	(175, 5, 10, '2019-09-04'),
	(176, 5, 10, '2019-09-05'),
	(177, 5, 10, '2019-09-06'),
	(178, 5, 10, '2019-09-07'),
	(179, 5, 10, '2019-09-08'),
	(180, 5, 10, '2019-09-09'),
	(181, 6, 10, '2019-03-14'),
	(182, 6, 10, '2019-03-15'),
	(183, 6, -2, '2019-03-16'),
	(184, 6, -2, '2019-03-17'),
	(185, 6, -2, '2019-03-18'),
	(186, 6, -2, '2019-03-19'),
	(187, 6, -2, '2019-03-20'),
	(188, 6, -2, '2019-03-21'),
	(189, 6, -2, '2019-03-22'),
	(190, 6, -2, '2019-03-23'),
	(191, 6, -2, '2019-03-24'),
	(192, 6, -2, '2019-03-25'),
	(193, 6, -2, '2019-03-26'),
	(194, 6, -2, '2019-03-27'),
	(195, 6, -2, '2019-03-28'),
	(196, 6, -2, '2019-03-29'),
	(197, 6, 2, '2019-03-30'),
	(198, 6, 2, '2019-03-31'),
	(199, 6, 2, '2019-04-01'),
	(200, 6, 2, '2019-04-02'),
	(201, 6, 2, '2019-04-03'),
	(202, 6, 2, '2019-04-04'),
	(203, 6, 2, '2019-04-05'),
	(204, 6, 2, '2019-04-06'),
	(205, 6, 2, '2019-04-07'),
	(206, 6, 2, '2019-04-08'),
	(207, 6, 2, '2019-04-09'),
	(208, 6, 2, '2019-04-10'),
	(209, 6, 2, '2019-04-11'),
	(210, 6, 2, '2019-04-12'),
	(211, 6, 10, '2019-04-13'),
	(212, 6, 10, '2019-04-14'),
	(213, 6, 10, '2019-04-15'),
	(214, 6, 10, '2019-04-16'),
	(215, 6, 10, '2019-04-17'),
	(216, 6, 10, '2019-04-18'),
	(217, 6, 10, '2019-04-19'),
	(218, 6, 10, '2019-04-20'),
	(219, 6, 10, '2019-04-21'),
	(220, 6, 10, '2019-04-22'),
	(221, 6, 10, '2019-04-23'),
	(222, 6, 10, '2019-04-24'),
	(223, 6, 10, '2019-04-25'),
	(224, 6, 10, '2019-04-26'),
	(225, 6, 10, '2019-04-27'),
	(226, 6, 10, '2019-04-28'),
	(227, 6, 10, '2019-04-29'),
	(228, 6, 10, '2019-04-30'),
	(229, 6, 10, '2019-05-01'),
	(230, 6, 10, '2019-05-02'),
	(231, 6, 10, '2019-05-03'),
	(232, 6, 10, '2019-05-04'),
	(233, 6, 10, '2019-05-05'),
	(234, 6, 10, '2019-05-06'),
	(235, 6, 10, '2019-05-07'),
	(236, 6, 10, '2019-05-08'),
	(237, 6, 10, '2019-05-09'),
	(238, 6, 10, '2019-05-10'),
	(239, 6, 10, '2019-05-11'),
	(240, 6, 10, '2019-05-12'),
	(241, 6, 10, '2019-05-13'),
	(242, 6, 10, '2019-05-14'),
	(243, 6, 10, '2019-05-15'),
	(244, 6, 10, '2019-05-16'),
	(245, 6, 10, '2019-05-17'),
	(246, 6, 10, '2019-05-18'),
	(247, 6, 10, '2019-05-19'),
	(248, 6, 10, '2019-05-20'),
	(249, 6, 10, '2019-05-21'),
	(250, 6, 10, '2019-05-22'),
	(251, 6, 10, '2019-05-23'),
	(252, 6, 10, '2019-05-24'),
	(253, 6, 10, '2019-05-25'),
	(254, 6, 10, '2019-05-26'),
	(255, 6, 10, '2019-05-27'),
	(256, 6, 10, '2019-05-28'),
	(257, 6, 10, '2019-05-29'),
	(258, 6, 10, '2019-05-30'),
	(259, 6, 10, '2019-05-31'),
	(260, 6, 10, '2019-06-01'),
	(261, 6, 10, '2019-06-02'),
	(262, 6, 10, '2019-06-03'),
	(263, 6, 10, '2019-06-04'),
	(264, 6, 10, '2019-06-05'),
	(265, 6, 10, '2019-06-06'),
	(266, 6, 10, '2019-06-07'),
	(267, 6, 10, '2019-06-08'),
	(268, 6, 10, '2019-06-09'),
	(269, 6, 10, '2019-06-10'),
	(270, 6, 10, '2019-06-11'),
	(271, 6, 10, '2019-06-12'),
	(272, 6, 10, '2019-06-13'),
	(273, 6, 10, '2019-06-14'),
	(274, 6, 10, '2019-06-15'),
	(275, 6, 10, '2019-06-16'),
	(276, 6, 10, '2019-06-17'),
	(277, 6, 10, '2019-06-18'),
	(278, 6, 10, '2019-06-19'),
	(279, 6, 10, '2019-06-20'),
	(280, 6, 10, '2019-06-21'),
	(281, 6, 10, '2019-06-22'),
	(282, 6, 10, '2019-06-23'),
	(283, 6, 10, '2019-06-24'),
	(284, 6, 10, '2019-06-25'),
	(285, 6, 10, '2019-06-26'),
	(286, 6, 10, '2019-06-27'),
	(287, 6, 10, '2019-06-28'),
	(288, 6, 10, '2019-06-29'),
	(289, 6, 10, '2019-06-30'),
	(290, 6, 10, '2019-07-01'),
	(291, 6, 10, '2019-07-02'),
	(292, 6, 10, '2019-07-03'),
	(293, 6, 10, '2019-07-04'),
	(294, 6, 10, '2019-07-05'),
	(295, 6, 10, '2019-07-06'),
	(296, 6, 10, '2019-07-07'),
	(297, 6, 10, '2019-07-08'),
	(298, 6, 10, '2019-07-09'),
	(299, 6, 10, '2019-07-10'),
	(300, 6, 10, '2019-07-11'),
	(301, 6, 10, '2019-07-12'),
	(302, 6, 10, '2019-07-13'),
	(303, 6, 10, '2019-07-14'),
	(304, 6, 10, '2019-07-15'),
	(305, 6, 10, '2019-07-16'),
	(306, 6, 10, '2019-07-17'),
	(307, 6, 10, '2019-07-18'),
	(308, 6, 10, '2019-07-19'),
	(309, 6, 10, '2019-07-20'),
	(310, 6, 10, '2019-07-21'),
	(311, 6, 10, '2019-07-22'),
	(312, 6, 10, '2019-07-23'),
	(313, 6, 10, '2019-07-24'),
	(314, 6, 10, '2019-07-25'),
	(315, 6, 10, '2019-07-26'),
	(316, 6, 10, '2019-07-27'),
	(317, 6, 10, '2019-07-28'),
	(318, 6, 10, '2019-07-29'),
	(319, 6, 10, '2019-07-30'),
	(320, 6, 10, '2019-07-31'),
	(321, 6, 10, '2019-08-01'),
	(322, 6, 10, '2019-08-02'),
	(323, 6, 10, '2019-08-03'),
	(324, 6, 10, '2019-08-04'),
	(325, 6, 10, '2019-08-05'),
	(326, 6, 10, '2019-08-06'),
	(327, 6, 10, '2019-08-07'),
	(328, 6, 10, '2019-08-08'),
	(329, 6, 10, '2019-08-09'),
	(330, 6, 10, '2019-08-10'),
	(331, 6, 10, '2019-08-11'),
	(332, 6, 10, '2019-08-12'),
	(333, 6, 10, '2019-08-13'),
	(334, 6, 10, '2019-08-14'),
	(335, 6, 10, '2019-08-15'),
	(336, 6, 10, '2019-08-16'),
	(337, 6, 10, '2019-08-17'),
	(338, 6, 10, '2019-08-18'),
	(339, 6, 10, '2019-08-19'),
	(340, 6, 10, '2019-08-20'),
	(341, 6, 10, '2019-08-21'),
	(342, 6, 10, '2019-08-22'),
	(343, 6, 10, '2019-08-23'),
	(344, 6, 10, '2019-08-24'),
	(345, 6, 10, '2019-08-25'),
	(346, 6, 10, '2019-08-26'),
	(347, 6, 10, '2019-08-27'),
	(348, 6, 10, '2019-08-28'),
	(349, 6, 10, '2019-08-29'),
	(350, 6, 10, '2019-08-30'),
	(351, 6, 10, '2019-08-31'),
	(352, 6, 10, '2019-09-01'),
	(353, 6, 10, '2019-09-02'),
	(354, 6, 10, '2019-09-03'),
	(355, 6, 10, '2019-09-04'),
	(356, 6, 10, '2019-09-05'),
	(357, 6, 10, '2019-09-06'),
	(358, 6, 10, '2019-09-07'),
	(359, 6, 10, '2019-09-08'),
	(360, 6, 10, '2019-09-09'),
	(361, 7, 10, '2019-03-14'),
	(362, 7, 10, '2019-03-15'),
	(363, 7, 2, '2019-03-16'),
	(364, 7, 2, '2019-03-17'),
	(365, 7, 2, '2019-03-18'),
	(366, 7, 2, '2019-03-19'),
	(367, 7, 2, '2019-03-20'),
	(368, 7, 2, '2019-03-21'),
	(369, 7, 2, '2019-03-22'),
	(370, 7, 2, '2019-03-23'),
	(371, 7, 2, '2019-03-24'),
	(372, 7, 2, '2019-03-25'),
	(373, 7, 2, '2019-03-26'),
	(374, 7, 2, '2019-03-27'),
	(375, 7, 2, '2019-03-28'),
	(376, 7, 2, '2019-03-29'),
	(377, 7, 10, '2019-03-30'),
	(378, 7, 10, '2019-03-31'),
	(379, 7, 10, '2019-04-01'),
	(380, 7, 10, '2019-04-02'),
	(381, 7, 10, '2019-04-03'),
	(382, 7, 10, '2019-04-04'),
	(383, 7, 10, '2019-04-05'),
	(384, 7, 10, '2019-04-06'),
	(385, 7, 10, '2019-04-07'),
	(386, 7, 10, '2019-04-08'),
	(387, 7, 10, '2019-04-09'),
	(388, 7, 10, '2019-04-10'),
	(389, 7, 10, '2019-04-11'),
	(390, 7, 10, '2019-04-12'),
	(391, 7, 10, '2019-04-13'),
	(392, 7, 10, '2019-04-14'),
	(393, 7, 10, '2019-04-15'),
	(394, 7, 10, '2019-04-16'),
	(395, 7, 10, '2019-04-17'),
	(396, 7, 10, '2019-04-18'),
	(397, 7, 10, '2019-04-19'),
	(398, 7, 10, '2019-04-20'),
	(399, 7, 10, '2019-04-21'),
	(400, 7, 10, '2019-04-22'),
	(401, 7, 10, '2019-04-23'),
	(402, 7, 10, '2019-04-24'),
	(403, 7, 10, '2019-04-25'),
	(404, 7, 10, '2019-04-26'),
	(405, 7, 10, '2019-04-27'),
	(406, 7, 10, '2019-04-28'),
	(407, 7, 10, '2019-04-29'),
	(408, 7, 10, '2019-04-30'),
	(409, 7, 10, '2019-05-01'),
	(410, 7, 10, '2019-05-02'),
	(411, 7, 10, '2019-05-03'),
	(412, 7, 10, '2019-05-04'),
	(413, 7, 10, '2019-05-05'),
	(414, 7, 10, '2019-05-06'),
	(415, 7, 10, '2019-05-07'),
	(416, 7, 10, '2019-05-08'),
	(417, 7, 10, '2019-05-09'),
	(418, 7, 10, '2019-05-10'),
	(419, 7, 10, '2019-05-11'),
	(420, 7, 10, '2019-05-12'),
	(421, 7, 10, '2019-05-13'),
	(422, 7, 10, '2019-05-14'),
	(423, 7, 10, '2019-05-15'),
	(424, 7, 10, '2019-05-16'),
	(425, 7, 10, '2019-05-17'),
	(426, 7, 10, '2019-05-18'),
	(427, 7, 10, '2019-05-19'),
	(428, 7, 10, '2019-05-20'),
	(429, 7, 10, '2019-05-21'),
	(430, 7, 10, '2019-05-22'),
	(431, 7, 10, '2019-05-23'),
	(432, 7, 10, '2019-05-24'),
	(433, 7, 10, '2019-05-25'),
	(434, 7, 10, '2019-05-26'),
	(435, 7, 10, '2019-05-27'),
	(436, 7, 10, '2019-05-28'),
	(437, 7, 10, '2019-05-29'),
	(438, 7, 10, '2019-05-30'),
	(439, 7, 10, '2019-05-31'),
	(440, 7, 10, '2019-06-01'),
	(441, 7, 10, '2019-06-02'),
	(442, 7, 10, '2019-06-03'),
	(443, 7, 10, '2019-06-04'),
	(444, 7, 10, '2019-06-05'),
	(445, 7, 10, '2019-06-06'),
	(446, 7, 10, '2019-06-07'),
	(447, 7, 10, '2019-06-08'),
	(448, 7, 10, '2019-06-09'),
	(449, 7, 10, '2019-06-10'),
	(450, 7, 10, '2019-06-11'),
	(451, 7, 10, '2019-06-12'),
	(452, 7, 10, '2019-06-13'),
	(453, 7, 10, '2019-06-14'),
	(454, 7, 10, '2019-06-15'),
	(455, 7, 10, '2019-06-16'),
	(456, 7, 10, '2019-06-17'),
	(457, 7, 10, '2019-06-18'),
	(458, 7, 10, '2019-06-19'),
	(459, 7, 10, '2019-06-20'),
	(460, 7, 10, '2019-06-21'),
	(461, 7, 10, '2019-06-22'),
	(462, 7, 10, '2019-06-23'),
	(463, 7, 10, '2019-06-24'),
	(464, 7, 10, '2019-06-25'),
	(465, 7, 10, '2019-06-26'),
	(466, 7, 10, '2019-06-27'),
	(467, 7, 10, '2019-06-28'),
	(468, 7, 10, '2019-06-29'),
	(469, 7, 10, '2019-06-30'),
	(470, 7, 10, '2019-07-01'),
	(471, 7, 10, '2019-07-02'),
	(472, 7, 10, '2019-07-03'),
	(473, 7, 10, '2019-07-04'),
	(474, 7, 10, '2019-07-05'),
	(475, 7, 10, '2019-07-06'),
	(476, 7, 10, '2019-07-07'),
	(477, 7, 10, '2019-07-08'),
	(478, 7, 10, '2019-07-09'),
	(479, 7, 10, '2019-07-10'),
	(480, 7, 10, '2019-07-11'),
	(481, 7, 10, '2019-07-12'),
	(482, 7, 10, '2019-07-13'),
	(483, 7, 10, '2019-07-14'),
	(484, 7, 10, '2019-07-15'),
	(485, 7, 10, '2019-07-16'),
	(486, 7, 10, '2019-07-17'),
	(487, 7, 10, '2019-07-18'),
	(488, 7, 10, '2019-07-19'),
	(489, 7, 10, '2019-07-20'),
	(490, 7, 10, '2019-07-21'),
	(491, 7, 10, '2019-07-22'),
	(492, 7, 10, '2019-07-23'),
	(493, 7, 10, '2019-07-24'),
	(494, 7, 10, '2019-07-25'),
	(495, 7, 10, '2019-07-26'),
	(496, 7, 10, '2019-07-27'),
	(497, 7, 10, '2019-07-28'),
	(498, 7, 10, '2019-07-29'),
	(499, 7, 10, '2019-07-30'),
	(500, 7, 10, '2019-07-31'),
	(501, 7, 10, '2019-08-01'),
	(502, 7, 10, '2019-08-02'),
	(503, 7, 10, '2019-08-03'),
	(504, 7, 10, '2019-08-04'),
	(505, 7, 10, '2019-08-05'),
	(506, 7, 10, '2019-08-06'),
	(507, 7, 10, '2019-08-07'),
	(508, 7, 10, '2019-08-08'),
	(509, 7, 10, '2019-08-09'),
	(510, 7, 10, '2019-08-10'),
	(511, 7, 10, '2019-08-11'),
	(512, 7, 10, '2019-08-12'),
	(513, 7, 10, '2019-08-13'),
	(514, 7, 10, '2019-08-14'),
	(515, 7, 10, '2019-08-15'),
	(516, 7, 10, '2019-08-16'),
	(517, 7, 10, '2019-08-17'),
	(518, 7, 10, '2019-08-18'),
	(519, 7, 10, '2019-08-19'),
	(520, 7, 10, '2019-08-20'),
	(521, 7, 10, '2019-08-21'),
	(522, 7, 10, '2019-08-22'),
	(523, 7, 10, '2019-08-23'),
	(524, 7, 10, '2019-08-24'),
	(525, 7, 10, '2019-08-25'),
	(526, 7, 10, '2019-08-26'),
	(527, 7, 10, '2019-08-27'),
	(528, 7, 10, '2019-08-28'),
	(529, 7, 10, '2019-08-29'),
	(530, 7, 10, '2019-08-30'),
	(531, 7, 10, '2019-08-31'),
	(532, 7, 10, '2019-09-01'),
	(533, 7, 10, '2019-09-02'),
	(534, 7, 10, '2019-09-03'),
	(535, 7, 10, '2019-09-04'),
	(536, 7, 10, '2019-09-05'),
	(537, 7, 10, '2019-09-06'),
	(538, 7, 10, '2019-09-07'),
	(539, 7, 10, '2019-09-08'),
	(540, 7, 10, '2019-09-09'),
	(541, 8, 10, '2019-03-14'),
	(542, 8, 10, '2019-03-15'),
	(543, 8, 10, '2019-03-16'),
	(544, 8, 10, '2019-03-17'),
	(545, 8, 10, '2019-03-18'),
	(546, 8, 10, '2019-03-19'),
	(547, 8, 10, '2019-03-20'),
	(548, 8, 10, '2019-03-21'),
	(549, 8, 10, '2019-03-22'),
	(550, 8, 10, '2019-03-23'),
	(551, 8, 10, '2019-03-24'),
	(552, 8, 10, '2019-03-25'),
	(553, 8, 10, '2019-03-26'),
	(554, 8, 10, '2019-03-27'),
	(555, 8, 10, '2019-03-28'),
	(556, 8, 10, '2019-03-29'),
	(557, 8, 10, '2019-03-30'),
	(558, 8, 10, '2019-03-31'),
	(559, 8, 10, '2019-04-01'),
	(560, 8, 10, '2019-04-02'),
	(561, 8, 10, '2019-04-03'),
	(562, 8, 10, '2019-04-04'),
	(563, 8, 10, '2019-04-05'),
	(564, 8, 10, '2019-04-06'),
	(565, 8, 10, '2019-04-07'),
	(566, 8, 10, '2019-04-08'),
	(567, 8, 10, '2019-04-09'),
	(568, 8, 10, '2019-04-10'),
	(569, 8, 10, '2019-04-11'),
	(570, 8, 10, '2019-04-12'),
	(571, 8, 10, '2019-04-13'),
	(572, 8, 10, '2019-04-14'),
	(573, 8, 10, '2019-04-15'),
	(574, 8, 10, '2019-04-16'),
	(575, 8, 10, '2019-04-17'),
	(576, 8, 10, '2019-04-18'),
	(577, 8, 10, '2019-04-19'),
	(578, 8, 10, '2019-04-20'),
	(579, 8, 10, '2019-04-21'),
	(580, 8, 10, '2019-04-22'),
	(581, 8, 10, '2019-04-23'),
	(582, 8, 10, '2019-04-24'),
	(583, 8, 10, '2019-04-25'),
	(584, 8, 10, '2019-04-26'),
	(585, 8, 10, '2019-04-27'),
	(586, 8, 10, '2019-04-28'),
	(587, 8, 10, '2019-04-29'),
	(588, 8, 10, '2019-04-30'),
	(589, 8, 10, '2019-05-01'),
	(590, 8, 10, '2019-05-02'),
	(591, 8, 10, '2019-05-03'),
	(592, 8, 10, '2019-05-04'),
	(593, 8, 10, '2019-05-05'),
	(594, 8, 10, '2019-05-06'),
	(595, 8, 10, '2019-05-07'),
	(596, 8, 10, '2019-05-08'),
	(597, 8, 10, '2019-05-09'),
	(598, 8, 10, '2019-05-10'),
	(599, 8, 10, '2019-05-11'),
	(600, 8, 10, '2019-05-12'),
	(601, 8, 10, '2019-05-13'),
	(602, 8, 10, '2019-05-14'),
	(603, 8, 10, '2019-05-15'),
	(604, 8, 10, '2019-05-16'),
	(605, 8, 10, '2019-05-17'),
	(606, 8, 10, '2019-05-18'),
	(607, 8, 10, '2019-05-19'),
	(608, 8, 10, '2019-05-20'),
	(609, 8, 10, '2019-05-21'),
	(610, 8, 10, '2019-05-22'),
	(611, 8, 10, '2019-05-23'),
	(612, 8, 10, '2019-05-24'),
	(613, 8, 10, '2019-05-25'),
	(614, 8, 10, '2019-05-26'),
	(615, 8, 10, '2019-05-27'),
	(616, 8, 10, '2019-05-28'),
	(617, 8, 10, '2019-05-29'),
	(618, 8, 10, '2019-05-30'),
	(619, 8, 10, '2019-05-31'),
	(620, 8, 10, '2019-06-01'),
	(621, 8, 10, '2019-06-02'),
	(622, 8, 10, '2019-06-03'),
	(623, 8, 10, '2019-06-04'),
	(624, 8, 10, '2019-06-05'),
	(625, 8, 10, '2019-06-06'),
	(626, 8, 10, '2019-06-07'),
	(627, 8, 10, '2019-06-08'),
	(628, 8, 10, '2019-06-09'),
	(629, 8, 10, '2019-06-10'),
	(630, 8, 10, '2019-06-11'),
	(631, 8, 10, '2019-06-12'),
	(632, 8, 10, '2019-06-13'),
	(633, 8, 10, '2019-06-14'),
	(634, 8, 10, '2019-06-15'),
	(635, 8, 10, '2019-06-16'),
	(636, 8, 10, '2019-06-17'),
	(637, 8, 10, '2019-06-18'),
	(638, 8, 10, '2019-06-19'),
	(639, 8, 10, '2019-06-20'),
	(640, 8, 10, '2019-06-21'),
	(641, 8, 10, '2019-06-22'),
	(642, 8, 10, '2019-06-23'),
	(643, 8, 10, '2019-06-24'),
	(644, 8, 10, '2019-06-25'),
	(645, 8, 10, '2019-06-26'),
	(646, 8, 10, '2019-06-27'),
	(647, 8, 10, '2019-06-28'),
	(648, 8, 10, '2019-06-29'),
	(649, 8, 10, '2019-06-30'),
	(650, 8, 10, '2019-07-01'),
	(651, 8, 10, '2019-07-02'),
	(652, 8, 10, '2019-07-03'),
	(653, 8, 10, '2019-07-04'),
	(654, 8, 10, '2019-07-05'),
	(655, 8, 10, '2019-07-06'),
	(656, 8, 10, '2019-07-07'),
	(657, 8, 10, '2019-07-08'),
	(658, 8, 10, '2019-07-09'),
	(659, 8, 10, '2019-07-10'),
	(660, 8, 10, '2019-07-11'),
	(661, 8, 10, '2019-07-12'),
	(662, 8, 10, '2019-07-13'),
	(663, 8, 10, '2019-07-14'),
	(664, 8, 10, '2019-07-15'),
	(665, 8, 10, '2019-07-16'),
	(666, 8, 10, '2019-07-17'),
	(667, 8, 10, '2019-07-18'),
	(668, 8, 10, '2019-07-19'),
	(669, 8, 10, '2019-07-20'),
	(670, 8, 10, '2019-07-21'),
	(671, 8, 10, '2019-07-22'),
	(672, 8, 10, '2019-07-23'),
	(673, 8, 10, '2019-07-24'),
	(674, 8, 10, '2019-07-25'),
	(675, 8, 10, '2019-07-26'),
	(676, 8, 10, '2019-07-27'),
	(677, 8, 10, '2019-07-28'),
	(678, 8, 10, '2019-07-29'),
	(679, 8, 10, '2019-07-30'),
	(680, 8, 10, '2019-07-31'),
	(681, 8, 10, '2019-08-01'),
	(682, 8, 10, '2019-08-02'),
	(683, 8, 10, '2019-08-03'),
	(684, 8, 10, '2019-08-04'),
	(685, 8, 10, '2019-08-05'),
	(686, 8, 10, '2019-08-06'),
	(687, 8, 10, '2019-08-07'),
	(688, 8, 10, '2019-08-08'),
	(689, 8, 10, '2019-08-09'),
	(690, 8, 10, '2019-08-10'),
	(691, 8, 10, '2019-08-11'),
	(692, 8, 10, '2019-08-12'),
	(693, 8, 10, '2019-08-13'),
	(694, 8, 10, '2019-08-14'),
	(695, 8, 10, '2019-08-15'),
	(696, 8, 10, '2019-08-16'),
	(697, 8, 10, '2019-08-17'),
	(698, 8, 10, '2019-08-18'),
	(699, 8, 10, '2019-08-19'),
	(700, 8, 10, '2019-08-20'),
	(701, 8, 10, '2019-08-21'),
	(702, 8, 10, '2019-08-22'),
	(703, 8, 10, '2019-08-23'),
	(704, 8, 10, '2019-08-24'),
	(705, 8, 10, '2019-08-25'),
	(706, 8, 10, '2019-08-26'),
	(707, 8, 10, '2019-08-27'),
	(708, 8, 10, '2019-08-28'),
	(709, 8, 10, '2019-08-29'),
	(710, 8, 10, '2019-08-30'),
	(711, 8, 10, '2019-08-31'),
	(712, 8, 10, '2019-09-01'),
	(713, 8, 10, '2019-09-02'),
	(714, 8, 10, '2019-09-03'),
	(715, 8, 10, '2019-09-04'),
	(716, 8, 10, '2019-09-05'),
	(717, 8, 10, '2019-09-06'),
	(718, 8, 10, '2019-09-07'),
	(719, 8, 10, '2019-09-08'),
	(720, 8, 10, '2019-09-09');
/*!40000 ALTER TABLE `tblschedule` ENABLE KEYS */;

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
  `address1` varchar(200) NOT NULL,
  `address2` varchar(200) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zipcode` varchar(5) NOT NULL,
  `psswd` varchar(255) NOT NULL,
  `tempsswd` varchar(10) DEFAULT NULL,
  `signupDate` datetime NOT NULL,
  `lastLoginDate` datetime NOT NULL,
  PRIMARY KEY (`user_ID`,`emailAddress`),
  UNIQUE KEY `user_ID` (`user_ID`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbdev.tblusers: ~2 rows (approximately)
/*!40000 ALTER TABLE `tblusers` DISABLE KEYS */;
INSERT INTO `tblusers` (`user_ID`, `emailAddress`, `firstName`, `lastName`, `mobilePhone`, `workPhone`, `companyName`, `companyURL`, `facebookURL`, `instagramURL`, `twitterURL`, `address1`, `address2`, `city`, `state`, `zipcode`, `psswd`, `tempsswd`, `signupDate`, `lastLoginDate`) VALUES
	(1, 'exam@ple.com', 'Benito', 'Martinez', '939-787-7878', '787-939-8510', 'x100pre', NULL, 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'Calle', '1', 'Vega Baja', 'PR', '00123', '0dae7275d5c5e3fc14892c486c7ca483', NULL, '2019-03-12 00:00:00', '2019-03-12 00:00:00'),
	(2, 'example@billboards.com', 'Rafael', 'Taraza', '939-454-9851', '787-147-8520', 'blinders', NULL, 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'Street 1', 'APT1', 'San Juan', 'PR', '00969', 'f0d1db5d5d760f621a482cf77b85e65f', NULL, '2019-03-14 00:00:00', '2019-03-14 00:00:00'),
	(3, 'example2@billboards.com', 'Juan', 'Antonio', '787-123-4567', '787-123-4567', 'recordLabel', 'www.google.com', 'https://www.facebook.com', 'https://www.instagram.com', 'https://www.twitter.com', 'Street 1', 'APT1', 'San Juan', 'PR', '00969', 'f0d1db5d5d760f621a482cf77b85e65f', NULL, '2019-03-15 00:00:00', '2019-03-15 00:00:00');
/*!40000 ALTER TABLE `tblusers` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
