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


-- Dumping database structure for ezbillboards
CREATE DATABASE IF NOT EXISTS `ezbillboards` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ezbillboards`;

Create user 'ezb'@'ezb.uprm.edu' identified by 'Ezb2019*';
grant all privileges on * . * to 'ezb'@'ezb.uprm.edu';
flush privileges;

-- Dumping structure for procedure ezbillboards.deleteAccount
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAccount`(
	IN `user_ID_IN` BIGINT

)
BEGIN
	#Parameters: User_ID
	#Disables user account
	update tblusers 
	set enabled = 0
	where user_ID = user_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.deleteBillboard
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteBillboard`(
	IN `billboard_ID_IN` BIGINT

)
BEGIN
	#Parameters: billboard_ID
	#Disables billboard
	update tblbillboards 
	set enabled = 0
	where billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.deletePackage
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePackage`(
	IN `package_ID_IN` BIGINT


)
BEGIN
	#Parameters: package_ID
	#Disables billboard package
	update tblpackage
	set enabled = 0
	where package_ID = package_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.deleteRegulation
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteRegulation`(
	IN `regulation_ID_IN` BIGINT

)
BEGIN
	#Parameters: regulation_ID
	#Disables billboard regulation
	update tblbillboardregulation
	set enabled = 0
	where reg_ID = regulation_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.deleteRejection
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteRejection`(
	IN `rejection_ID_IN` BIGINT

)
BEGIN
	#Parameters: rejection_ID
	#Disables billboard common rejection
	update tblcommonrejections
	set enabled = 0
	where reject_ID = rejection_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.deleteUnverifiedAccounts
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUnverifiedAccounts`()
BEGIN
	delete from tblusers
	where verified = 0;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getAccounts
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAccounts`(
	IN `role_ID_IN` BIGINT






)
BEGIN
	#Parameters: role_ID
	#Selects all users from a specific role
	#User must be enabled
	select user_ID,office,CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as emailAddress,
	firstName,lastName, mobilePhone,workPhone,companyName,companyURL,address1,address2,city,state,zipcode from tblusers
	where role_ID = role_ID_IN and enabled = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getAdminPackages
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdminPackages`(
	IN `billboard_ID_IN` BIGINT



)
BEGIN
	#Parameter: billboard_ID
	#Returns all packages from a specific billboard
	#Package must be enabled
	#ordered by duration and displays pero cycle
	Select *
	from tblpackage
	where billboard_ID = billboard_ID_IN and enabled = 1
	order by duration asc, displayPerCycle;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getAdminRegulations
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdminRegulations`(
	IN `billboard_ID_IN` BIGINT

)
BEGIN
	#Parameter: billboard_ID
	#Returns all regulations from a specific billboard
	#Regulation must be enabled
	Select *
	from tblbillboardregulation
	where billboard_ID = billboard_ID_IN and enabled = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getAdminRejections
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdminRejections`(
	IN `billboard_ID_IN` BIGINT

)
BEGIN
	#Parameter: billboard_ID
	#Returns all rejections from a specific billboard
	#Rejection must be enabled
	Select *
	from tblcommonrejections
	where billboard_ID = billboard_ID_IN and enabled = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getBillboardInfo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBillboardInfo`(
	IN `billboard_ID_IN` BIGINT


)
BEGIN
	#Parameter: billboard_ID
	#Returns the billboard information 
	#of a specific billboard
	Select * from tblbillboards 
	where billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getBillboards
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBillboards`()
BEGIN
	#Returns all Billboards
	#Billboards must be enabled
	Select billboard_ID, billboardName, billboardDescription, billboardImage_URL,imageRatio,imageExtension,
	minWidthRes, minHeightRes,tolerance from tblbillboards
	where enabled = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getCheckoutInformation
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCheckoutInformation`(
	IN `transaction_ID_IN` VARCHAR(50)






)
BEGIN
	Select request_ID,CAST(AES_DECRYPT(payerEmail, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as payerEmail,CAST(AES_DECRYPT(payerFirstName, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as payerFirstName,
	CAST(AES_DECRYPT(payerLastName, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as payerLastName,transactionType,tandem,price,
	DATE_FORMAT(timestamp_trans, "%M %e, %Y") as paymentDate from tblcheckout
	where transaction_ID = transaction_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getContact
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getContact`()
BEGIN
	#Contact information of administration
	select * from tblcontact;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getEmails
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmails`()
BEGIN
	Select CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as emailAddress
	from tblusers; 
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getLoginUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLoginUser`(
	IN `emailAddress_IN` VARCHAR(100)










,
	IN `psswd_IN` VARCHAR(255)




)
BEGIN
	#Parameter: emailAddress_IN
	#Verify if the email exists
	Select user_ID, role_ID,verified, statusTemp,enabled from tblusers
	where CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) = emailAddress_IN and (psswd = MD5(psswd_IN) OR tempPsswd = MD5(psswd_IN));
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getLogs
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLogs`(
	IN `startDate_IN` DATE,
	IN `endDate_IN` DATE

)
BEGIN
	select DATE_FORMAT(log_timestamp, "%M %e, %Y") as date,
	DATE_FORMAT(log_timestamp, "%H:%i:%s") as time,
	email, action, detailAction
	from tbllogs
	where Date(log_timestamp)>= startDate_IN and Date(log_timestamp) <= endDate_In
	order by tbllogs.log_timestamp desc;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getPackages
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPackages`(
	IN `billboard_ID_IN` BIGINT,
	IN `Date_IN` DATE









)
BEGIN
	#Parameter: Billboard_ID, Date
	#Returns the package availability
	#of a specific billboard and date
	#verifies availability for the duration
	#of each package that is enabled
	Select *,
	CASE
		WHEN count(schedule_ID) = duration and displayPerCycle <= min(remainingSlots) then TRUE
		ELSE FALSE
	END as availability
	 from 
	(select package_ID, tblpackage.billboard_ID as packBill, displayPerCycle, duration,price,schedule_ID,
	tblschedule.billboard_ID as schedBill,remainingSlots, scheduleDate from tblpackage 
	join tblschedule
	on tblpackage.billboard_ID = tblschedule.billboard_ID
	where scheduleDate >= Date_IN and scheduleDate < DATE_ADD(Date_IN,INTERVAL duration DAY)
	and tblschedule.billboard_ID = billboard_ID_In and tblpackage.enabled = 1
	group by package_ID,schedule_ID) as availability
	group by package_ID
	order by duration asc, displayPerCycle;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getPassword
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPassword`(
	IN `user_ID_IN` BIGINT

)
BEGIN
	#Parameter: User ID
	#Verify user password
	Select psswd from tblusers
	where user_ID = user_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getProcessedRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProcessedRequest`(
	IN `status_ID_IN` INT















)
BEGIN
	#Parameter: Status ID
	#Returns all processed request
	#with the specific status
	IF status_ID_IN = 5 THEN
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,DATE_FORMAT(startDate, "%M %e, %Y") as startDate,DATE_FORMAT(endDate, "%M %e, %Y") as endDate,
		DATE_FORMAT(approveDate, "%M %e, %Y") as approveDate,DATE_FORMAT(paymentDate, "%M %e, %Y") as paymentDateFormat, tblbillboards.billboard_ID, 
		billboardName, tblusers.firstName, tblusers.lastName,approverFirstName,approverLastName,publisherFirstName,publisherLastName,
		tbladrequest.displayPerCycle, tbladrequest.duration, artworkURL, artworkName, extension,tblartwork.width,tblartwork.height,tblartwork.size,comments
		from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		left join
		(Select request_ID as ID, tblusers.firstName as approverFirstName, tblusers.lastName as approverLastName,publisherFirstName, publisherLastName from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.approver_ID
		left join
		(Select request_ID as reqID, tblusers.firstName as publisherFirstName, tblusers.lastName as publisherLastName from tbladrequest
		left join tblusers on tblusers.user_ID = tbladrequest.publisher_ID) as publisher
		on reqID = tbladrequest.request_ID) as approver
		on ID = tbladrequest.request_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = status_ID_IN
		order by paymentDate asc;
	ELSEIF status_ID_IN = 4 THEN
			Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,DATE_FORMAT(startDate, "%M %e, %Y") as startDate,DATE_FORMAT(endDate, "%M %e, %Y") as endDate,
			DATE_FORMAT(approveDate, "%M %e, %Y") as approveDate,DATE_FORMAT(cancelDate, "%M %e, %Y") as cancelDate, tblbillboards.billboard_ID, 
			billboardName, tblusers.firstName, tblusers.lastName,cancelFirstName,cancelLastName,
			tbladrequest.displayPerCycle, tbladrequest.duration, artworkURL, artworkName, extension,tblartwork.width,tblartwork.height,tblartwork.size,comments
			from tbladrequest
			join tblusers on tblusers.user_ID = tbladrequest.user_ID
			left join
			(Select request_ID as reqID, tblusers.firstName as cancelFirstName, tblusers.lastName as cancelLastName from tbladrequest
			left join tblusers on tblusers.user_ID = tbladrequest.cancel_ID) as canceller
			on reqID = tbladrequest.request_ID
			join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
			join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
			join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
			where tbladrequest.status_ID = status_ID_IN
			order by paymentDate asc;
	ELSE
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,DATE_FORMAT(startDate, "%M %e, %Y") as startDate,DATE_FORMAT(endDate, "%M %e, %Y") as endDate,
		DATE_FORMAT(approveDate, "%M %e, %Y") as approveDate,DATE_FORMAT(paymentDate, "%M %e, %Y") as paymentDateFormat, tblbillboards.billboard_ID, 
		billboardName, tblusers.firstName, tblusers.lastName,approverFirstName,approverLastName,publisherFirstName,publisherLastName,
		tbladrequest.displayPerCycle, tbladrequest.duration, artworkURL, artworkName, extension,tblartwork.width,tblartwork.height,tblartwork.size,comments
		from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		left join
		(Select request_ID as ID, tblusers.firstName as approverFirstName, tblusers.lastName as approverLastName,publisherFirstName, publisherLastName from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.approver_ID
		left join
		(Select request_ID as reqID, tblusers.firstName as publisherFirstName, tblusers.lastName as publisherLastName from tbladrequest
		left join tblusers on tblusers.user_ID = tbladrequest.publisher_ID) as publisher
		on reqID = tbladrequest.request_ID) as approver
		on ID = tbladrequest.request_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = status_ID_IN
		order by requestDate asc;
	END IF;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getRegulations
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRegulations`(
	IN `billboard_ID_IN` BIGINT

)
BEGIN
	
	Select regulation from tblbillboardregulation
	where billboard_ID = billboard_ID_IN
	and enabled = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getRejections
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRejections`(
	IN `billboard_ID_IN` BIGINT

)
BEGIN
	Select rejection from tblcommonrejections
	where billboard_ID = billboard_ID_IN
	and enabled = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRequest`(
	IN `requestFrom_IN` DATETIME,
	IN `requestTo_IN` DATETIME






)
BEGIN
	#Parameters: Request date from , request date to
	#Returns pending request from the first date
	#to the second date including each date
	IF requestFrom_IN IS NULL and requestTo_IN IS NULL then
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,tblbillboards.billboard_ID, billboardName,firstName, lastName,tbladrequest.displayPerCycle,
		artworkName,artworkURL,extension,tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = 1
		order by requestDate asc;
	ELSEIF requestTo_IN IS NULL then
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,tblbillboards.billboard_ID, billboardName,firstName, lastName,tbladrequest.displayPerCycle,
		artworkName,artworkURL,extension,tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = 1 AND DATE(requestDate) >= requestFrom_IN
		order by requestDate asc;
	ELSEIF requestFrom_IN IS NULL then
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,tblbillboards.billboard_ID, billboardName,firstName, lastName,tbladrequest.displayPerCycle,
		artworkName,artworkURL,extension,tblartwork.width,tblartwork.height,tblartwork.size from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = 1 AND DATE(requestDate) <= requestTo_IN
		order by requestDate asc;
	ELSE
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,tblbillboards.billboard_ID, billboardName,firstName, lastName,tbladrequest.displayPerCycle,
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

-- Dumping structure for procedure ezbillboards.getRequestEmail
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRequestEmail`(
	IN `request_ID_IN` BIGINT

)
BEGIN
	Select CAST(AES_DECRYPT(tblusers.emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as emailAddress from tbladrequest
	join tblusers on tbladrequest.user_ID = tblusers.user_ID
	where tbladrequest.request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getRequestInformation
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getRequestInformation`(
	IN `request_ID_IN` BIGINT


)
    COMMENT 'Request payment'
BEGIN
	select firstName,lastName,CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as emailAddress,address1,address2,city,zipcode,mobilePhone,tblpackage.package_ID,tbladrequest.price from tbladrequest
	join tblusers on tblusers.user_ID = tbladrequest.user_ID
	join tblpackage on tblpackage.package_ID = tbladrequest.package_ID
	where tbladrequest.request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getSettings
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getSettings`()
BEGIN
	Select * from tblsettings
	where sett_ID = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getUserAccount
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserAccount`(
	IN `user_ID_IN` BIGINT




)
BEGIN
	#Parameter: User ID
	#Returns the user information
	SELECT firstName, lastName, CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as emailAddress, mobilePhone, workPhone,companyName,office, 
	companyURL,facebookURL,instagramURL,twitterURL, address1,address2,city,state,zipcode 
	FROM tblusers WHERE user_ID = user_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getUserID
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserID`(
	IN `emailAddress_IN` VARCHAR(150)



)
BEGIN
	#Parameter: emailAddress
	#Returns the user ID of that specific email
	Select user_ID from tblusers
	where CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) = emailAddress_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getUserInfo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserInfo`(
	IN `request_ID_IN` BIGINT






)
BEGIN
	#Parameter: request id
	#Returns the user info of that specific request
	SELECT firstName, lastName, CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) as emailAddress, mobilePhone, workPhone,companyName, 
	companyURL,facebookURL,instagramURL,twitterURL, address1,address2,city,state,zipcode 
	FROM tblusers join tbladrequest
	on tblusers.user_ID = tbladrequest.user_ID
	where tbladrequest.request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.getUserRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserRequest`(
	IN `user_ID_IN` BIGINT,
	IN `status_ID_IN` INT






















)
BEGIN
	#Parameters: User ID, Status ID
	#Returns the specific user's request for any status
	#With the particular information of each request
	IF status_ID_IN = 4 THEN
		Select request_ID,
		DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,
		DATE_FORMAT(cancelDate, "%M %e, %Y") as cancelDateFormat, 
		tblbillboards.billboard_ID, billboardName, billboardDescription,
		cancelFirstName,cancelLastName,
		CASE
			WHEN cancelRole = 1 then 'User'
			ELSE 'Approver'
		END as canceller,
		DATE_FORMAT(approveDate, "%M %e, %Y") as approveDateFormat,
		tbladrequest.displayPerCycle, tbladrequest.duration, artworkURL, artworkName, extension,
		tblartwork.width,tblartwork.height,tblartwork.size,comments
		from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		left join
		(Select request_ID as reqID, tblusers.role_ID as cancelRole, tblusers.firstName as cancelFirstName, 
		tblusers.lastName as cancelLastName from tbladrequest
		left join tblusers on tblusers.user_ID = tbladrequest.cancel_ID) as canceler
		on reqID = tbladrequest.request_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = status_ID_IN and tblusers.user_ID = user_ID_IN
		order by cancelDate desc;
	ELSEIF status_ID_IN = 6 THEN
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,DATE_FORMAT(startDate, "%M %e, %Y") as startDateFormat,
		DATE_FORMAT(endDate, "%M %e, %Y") as endDateFormat,DATE_FORMAT(paymentDate, "%M %e, %Y") as paymentDateFormat,DATE_FORMAT(publishDate, "%M %e, %Y") as publishDateFormat, 
		CASE
			WHEN current_date() < Date(startDate) then 'Waiting Starting Date'
			WHEN datediff(DATE(startdate),current_date()) <= 0 and datediff(DATE(endDate),current_date()) >=0 then 'Displaying'
			ELSE 'Displayed'
		END as status,
		DATE_FORMAT(approveDate, "%M %e, %Y") as approveDateFormat, paymentDate, tblbillboards.billboard_ID, billboardName,billboardDescription,
		tblusers.firstName as requestFirstName, tblusers.lastName as requestLastName,approverFirstName,approverLastName,publisherFirstName,publisherLastName,
		tbladrequest.displayPerCycle, tbladrequest.duration, artworkURL, artworkName, extension,tblartwork.width,tblartwork.height,tblartwork.size,comments
		from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		left join
		(Select request_ID as ID, tblusers.firstName as approverFirstName, tblusers.lastName as approverLastName,publisherFirstName, publisherLastName from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.approver_ID
		left join
		(Select request_ID as reqID, tblusers.firstName as publisherFirstName, tblusers.lastName as publisherLastName from tbladrequest
		left join tblusers on tblusers.user_ID = tbladrequest.publisher_ID) as publisher
		on reqID = tbladrequest.request_ID) as approver
		on ID = tbladrequest.request_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = status_ID_IN and tblusers.user_ID = user_ID_IN
		order by requestDate asc;
	ELSEIF status_ID_IN = 3 THEN
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,
		DATE_FORMAT(startDate, "%M %e, %Y") as startDateFormat, DATE_FORMAT(endDate, "%M %e, %Y") as endDateFormat,DATE_FORMAT(approveDate, "%M %e, %Y") as deniedDateFormat,
		DATE_FORMAT(paymentDate, "%M %e, %Y") as paymentDateFormat, tblbillboards.billboard_ID, billboardName,billboardDescription,
		tblusers.firstName as requestFirstName, tblusers.lastName as requestLastName,approverFirstName,approverLastName,publisherFirstName,publisherLastName,
		tbladrequest.displayPerCycle, tbladrequest.duration, artworkURL, artworkName, extension,tblartwork.width,tblartwork.height,tblartwork.size,comments
		from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		left join
		(Select request_ID as ID, tblusers.firstName as approverFirstName, tblusers.lastName as approverLastName,publisherFirstName, publisherLastName from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.approver_ID
		left join
		(Select request_ID as reqID, tblusers.firstName as publisherFirstName, tblusers.lastName as publisherLastName from tbladrequest
		left join tblusers on tblusers.user_ID = tbladrequest.publisher_ID) as publisher
		on reqID = tbladrequest.request_ID) as approver
		on ID = tbladrequest.request_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = status_ID_IN and tblusers.user_ID = user_ID_IN
		order by requestDate asc;
	ELSE
		Select request_ID,DATE_FORMAT(requestDate, "%M %e, %Y") as requestDateFormat,
		DATE_FORMAT(startDate, "%M %e, %Y") as startDateFormat, DATE_FORMAT(endDate, "%M %e, %Y") as endDateFormat,DATE_FORMAT(approveDate, "%M %e, %Y") as approveDateFormat,
		DATE_FORMAT(paymentDate, "%M %e, %Y") as paymentDateFormat, tblbillboards.billboard_ID, billboardName,billboardDescription,
		tblusers.firstName as requestFirstName, tblusers.lastName as requestLastName,approverFirstName,approverLastName,publisherFirstName,publisherLastName,
		tbladrequest.displayPerCycle, tbladrequest.duration, artworkURL, artworkName, extension,tblartwork.width,tblartwork.height,tblartwork.size,comments
		from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.user_ID
		left join
		(Select request_ID as ID, tblusers.firstName as approverFirstName, tblusers.lastName as approverLastName,publisherFirstName, publisherLastName from tbladrequest
		join tblusers on tblusers.user_ID = tbladrequest.approver_ID
		left join
		(Select request_ID as reqID, tblusers.firstName as publisherFirstName, tblusers.lastName as publisherLastName from tbladrequest
		left join tblusers on tblusers.user_ID = tbladrequest.publisher_ID) as publisher
		on reqID = tbladrequest.request_ID) as approver
		on ID = tbladrequest.request_ID
		join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
		join tblbillboards on tblpackage.billboard_ID = tblbillboards.billboard_ID
		join tblartwork on tblartwork.artwork_ID = tbladrequest.artwork_ID
		where tbladrequest.status_ID = status_ID_IN and tblusers.user_ID = user_ID_IN
		order by requestDate asc;
	END IF;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postAccountAdmin
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postAccountAdmin`(
	IN `firstName_IN` VARCHAR(300),
	IN `lastName_IN` VARCHAR(300),
	IN `emailAddress_IN` VARCHAR(300),
	IN `psswd_IN` VARCHAR(255),
	IN `workPhone_IN` VARCHAR(300),
	IN `mobilePhone_IN` VARCHAR(300),
	IN `office_IN` VARCHAR(300),
	IN `role_IN` VARCHAR(50)




)
BEGIN
	#Post an account non-users
	#roles: Administrator, publisher or approvers
	#With temp password
	IF role_IN = 'Administrator' THEN
		insert into tblusers(emailAddress,firstName,lastName,workPhone,mobilePhone,office,tempPsswd,role_ID,verified,statusTemp)
		values (AES_ENCRYPT(emailAddress_IN,'hhrjo40OH0XXHZ9ygwQ9'), firstName_IN, lastName_IN, workPhone_IN, mobilePhone_IN,office_IN,MD5(psswd_IN),4,1,1);
	ELSEIF role_IN = 'Publisher' THEN
		insert into tblusers(emailAddress,firstName,lastName,workPhone,mobilePhone,office, tempPsswd,role_ID,verified,statusTemp)
		values (AES_ENCRYPT(emailAddress_IN,'hhrjo40OH0XXHZ9ygwQ9'), firstName_IN, lastName_IN, workPhone_IN, mobilePhone_IN,office_IN,MD5(psswd_IN),3,1,1);
	ELSE
		insert into tblusers(emailAddress,firstName,lastName,workPhone,mobilePhone,office,tempPsswd,role_ID,verified,statusTemp)
		values (AES_ENCRYPT(emailAddress_IN,'hhrjo40OH0XXHZ9ygwQ9'), firstName_IN, lastName_IN, workPhone_IN, mobilePhone_IN,office_IN,MD5(psswd_IN),2,1,1);
	END IF; 
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postAdRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postAdRequest`(
	IN `user_ID_IN` BIGINT,
	IN `billboard_ID_IN` BIGINT,
	IN `package_ID_IN` BIGINT


,
	IN `duration_IN` INT,
	IN `displayPerCycle_IN` SMALLINT,
	IN `price_IN` DECIMAL(12,2),
	IN `startDate_IN` DATE,
	IN `artworkName_IN` VARCHAR(100),
	IN `extension_IN` VARCHAR(10),
	IN `width_IN` INT,
	IN `height_IN` INT,
	IN `size_IN` INT


,
	IN `ratio_IN` VARCHAR(50)










)
BEGIN
	#Post advertisement request by the user
	Declare packageDuration int;
	Declare artworkID bigint;
	Declare requestID bigint;
	Declare packageDisplayPerCycle smallint;
	Declare packagePrice decimal;
	DECLARE requestEndDate DATE;
	
	#Duration and frequency of the package selected
	SELECT duration,displayPerCycle, price into @packageDuration,  @packageDisplayPerCycle, @packagePrice 
	from tblpackage where package_ID = package_ID_IN;
	
	#End date of the request
	#start date plus duration
	SET requestEndDate = DATE_ADD(startDate_IN,INTERVAL @packageDuration DAY);
	
	Insert Into tblartwork (user_ID,artworkName,extension,width,height,size,ratio) 
	values (user_ID_IN,artworkName_IN,extension_IN,width_IN,height_IN,size_IN,ratio_IN);
	
	#Last artwork ID inserted
	Set artworkID = last_insert_id();
	
	#Insert advertisement request information
	Insert into tbladrequest (user_ID,artwork_ID,status_ID,package_ID,duration,displayPerCycle,price,requestDate,startDate,endDate) 
	values (user_ID_IN,last_insert_id(),1,package_ID_IN,duration_IN,displayPerCycle_IN,price_IN,current_timestamp(),startDate_IN,requestEndDate);
	
	#Update artwork information of the new
	#advertisement request
	update tblartwork
	set tblartwork.artworkURL = Concat('img/requests/',last_insert_id(),'.',extension)
	where tblartwork.artwork_ID = artworkID;
	
	#Request ID of the new request
	select @requestID := request_ID as requestID_OUT from tbladrequest
	WHERE tbladrequest.artwork_ID = artworkID;
	 
	#Update table schedule of the remaining slots
	Update tblschedule
	SET remainingSlots = remainingSlots - displayPerCycle_IN
	where scheduleDate >= startDate_IN 
	and scheduleDate < requestEndDate
	and billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postBillboard
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postBillboard`(
	IN `billboardName_IN` VARCHAR(200),
	IN `billboardDescription_IN` VARCHAR(1000),
	IN `billboardImageURL_IN` VARCHAR(100),
	IN `width_IN` INT,
	IN `height_IN` INT,
	IN `latitude_IN` DOUBLE,
	IN `longitude_IN` DOUBLE,
	IN `minWidthRes_IN` INT,
	IN `maxWidthRes_IN` INT,
	IN `minHeightRes_IN` INT,
	IN `maxHeightRes_IN` INT,
	IN `tolerance_IN` INT,
	IN `readTime_IN` INT,
	IN `impressions_IN` INT,
	IN `traffic_IN` INT,
	IN `Cycle_IN` INT,
	IN `slots_IN` INT,
	IN `imageRatio_IN` VARCHAR(500),
	IN `imageExtension_IN` VARCHAR(500)




)
BEGIN
	#Parameters: Billboard information
	#Post billboard information
	DECLARE seconds int default 60;
	declare slots int;
	declare billboardID bigint;
	Insert into tblbillboards (billboardName, billboardDescription,billboardImage_URL, width, height, latitude,longitude,
	minWidthRes,maxWidthRes,minHeightRes,maxHeightRes,tolerance, readTime, impressions, traffic, cycle,imageRatio,imageExtension)
	values(billboardName_IN, billboardDescription_IN,billboardImageURL_IN, width_IN, height_IN, latitude_IN,longitude_IN,
	 minWidthRes_IN, maxWidthRes_IN, minHeightRes_IN,maxHeightRes_IN,tolerance_IN, readTime_IN, impressions_IN, traffic_IN, cycle_IN,imageRatio_IN,imageExtension_IN);
	/*SET slots = cycle*seconds/readTime;*/
	select last_insert_id() as ID;
	#Create billboard schedule form 3 months
	call postSchedule(last_insert_ID(),slots_In);
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postCheckout
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCheckout`(
	IN `transaction_ID_IN` VARCHAR(50),
	IN `firstName_IN` VARCHAR(255),
	IN `lastName_IN` VARCHAR(255),
	IN `emailAddress_IN` VARCHAR(255),
	IN `request_ID_IN` BIGINT,
	IN `package_ID_IN` BIGINT,
	IN `price_IN` DECIMAL(14,2)







)
BEGIN
	insert into tblcheckout(transaction_ID,firstName,lastName,emailAddress,request_ID,package_ID,price,timestamp_trans,checkoutstatus)
	values(transaction_ID_IN,AES_ENCRYPT(firstName_IN,'hhrjo40OH0XXHZ9ygwQ9'),AES_ENCRYPT(lastName_IN,'hhrjo40OH0XXHZ9ygwQ9'),AES_ENCRYPT(emailAddress_IN,'hhrjo40OH0XXHZ9ygwQ9'),request_ID_IN,package_ID_IN,price_IN,current_timestamp(),0);
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postCommonRejection
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postCommonRejection`(
	IN `billboard_ID_IN` BIGINT,
	IN `rejection_IN` VARCHAR(200)

)
BEGIN
	#Paramteres: Billboard ID, Rejection information
	#Post new common rejection to a specific billboard.
	insert into tblcommonrejections (billboard_ID,rejection)
	values(billboard_ID_IN,rejection_IN);
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postLog
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postLog`(
	IN `email_IN` VARCHAR(100),
	IN `action_IN` VARCHAR(255),
	IN `detailAction_IN` VARCHAR(1000)
)
BEGIN
	insert into tbllogs(log_timestamp,email,action,detailAction)
	values(current_timestamp(),email_In,action_IN,detailAction_IN);
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postPackage
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postPackage`(
	IN `billboard_ID_IN` BIGINT,
	IN `duration_IN` INT,
	IN `displayPerCycle_IN` SMALLINT,
	IN `price_IN` DECIMAL(10,2)





)
BEGIN
	#Parameters: Package information
	#Insert a new package to a specific billboard.
	Insert into tblpackage (billboard_ID, displayPerCycle, duration, price) 
	values (billboard_ID_IN, displayPerCycle_IN, duration_IN, price_In);
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postRegulation
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postRegulation`(
	IN `billboard_ID_IN` BIGINT,
	IN `regulation_IN` VARCHAR(200)


)
BEGIN
	#Parameters: regulation description
	#Insert a new regulation to a specific billboard.
	insert into tblbillboardregulation (billboard_ID,regulation)
	values (billboard_ID_IN, regulation_IN);
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postSchedule
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postSchedule`(
	IN `billboard_ID_IN` BIGINT,
	IN `totalSlots_IN` INT










)
BEGIN
	/*Declare*/
	Declare currentDate DATE default CURDATE();
	Declare i int default 0;
	#Parameters: Billboard ID and total slots
	#Insert 180 schedule dates for the new billboard
	WHILE i < 180 DO
		insert into tblschedule(billboard_ID, remainingSlots,scheduleDate)
		values (billboard_ID_IN, totalSlots_IN, currentDate);
		SET currentDate = DATE_ADD(currentDate,INTERVAL 1 DAY );
		SET i = i + 1;
	END WHILE;
		
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.postUser
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `postUser`(
	IN `emailAddress_IN` VARCHAR(300),
	IN `firstName_IN` VARCHAR(300),
	IN `lastName_IN` VARCHAR(300),
	IN `mobilePhone_IN` VARCHAR(300),
	IN `workPhone_IN` VARCHAR(300),
	IN `companyName_IN` VARCHAR(300),
	IN `companyURL_IN` VARCHAR(300),
	IN `facebookURL_IN` VARCHAR(300),
	IN `instagramURL_IN` VARCHAR(300),
	IN `twitterURL_IN` VARCHAR(300),
	IN `address1_IN` VARCHAR(300),
	IN `address2_in` VARCHAR(300),
	IN `city_IN` VARCHAR(300),
	IN `state_IN` VARCHAR(300),
	IN `zipCode_IN` VARCHAR(300),
	IN `psswd_IN` VARCHAR(255)















)
BEGIN
	#Parameters: User info
	#User registration with current timestamp
	insert into tblusers(role_ID,emailAddress,firstName,lastName,mobilePhone,
	workPhone,companyName, companyURL,facebookURL, instagramURL,twitterURL,
	address1,address2,city,state,zipCode,psswd,signupDate,lastLoginDate) 
	values (1,AES_ENCRYPT(emailAddress_IN,'hhrjo40OH0XXHZ9ygwQ9'),firstName_IN,lastName_IN,mobilePhone_IN,
	workPhone_IN,companyName_IN,companyURL_IN,facebookURL_IN,instagramURL_IN,twitterURL_IN,
	address1_IN,address2_in,city_IN,state_IN,zipCode_IN,MD5(psswd_IN),current_timestamp(),current_timestamp());
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putAbout
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putAbout`(
	IN `about_IN` VARCHAR(10000)

)
BEGIN
	#Update about information
	update tblsettings
	set about = about_IN
	where sett_ID = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putAccount
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putAccount`(
	IN `user_ID_IN` BIGINT,
	IN `firstName_IN` VARCHAR(300),
	IN `lastName_IN` VARCHAR(300),
	IN `emailAddress_IN` VARCHAR(300),
	IN `mobilePhone_IN` VARCHAR(300),
	IN `workPhone_IN` VARCHAR(300),
	IN `companyName_IN` VARCHAR(300),
	IN `office_IN` VARCHAR(300),
	IN `address1_IN` VARCHAR(300),
	IN `address2_IN` VARCHAR(300),
	IN `state_IN` VARCHAR(300),
	IN `city_IN` VARCHAR(300),
	IN `zipcode_IN` VARCHAR(300),
	IN `companyURL_IN` VARCHAR(400),
	IN `fb_IN` VARCHAR(400),
	IN `tw_IN` VARCHAR(400),
	IN `inst_IN` VARCHAR(400)







)
BEGIN
	#Update USERS account information
	update tblusers
	set firstName = firstName_IN,lastName = lastName_IN,emailAddress = AES_ENCRYPT(emailAddress_IN,'hhrjo40OH0XXHZ9ygwQ9'),mobilePhone = mobilePhone_IN,workPhone = workPhone_IN,
	companyName = companyName_IN,office = office_IN, companyURL = companyURL_IN, Address1 = address1_IN,Address2 = address2_IN, city = city_IN, state = state_IN, zipcode = zipcode_IN,
	 facebookURL = fb_IN, instagramURL = inst_IN, twitterURL = tw_IN 
	where user_ID = user_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putAccountAdmin
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putAccountAdmin`(
	IN `user_ID_IN` BIGINT,
	IN `firstName_IN` VARCHAR(300),
	IN `lastName_IN` VARCHAR(300),
	IN `workPhone_IN` VARCHAR(300),
	IN `mobilePhone_IN` VARCHAR(300),
	IN `office_IN` VARCHAR(300),
	IN `role_IN` VARCHAR(50)



)
BEGIN	
	#Update NON-USERS account information
	IF role_IN = 'Administrator' THEN
		update tblusers
		set firstName = firstName_IN,lastName = lastName_IN,workPhone = workPhone_IN,mobilePhone = mobilePhone_IN,
		office = office_IN,role_ID = 4
		where user_ID = user_ID_IN;
	ELSEIF role_IN = 'Publisher' THEN
		update tblusers
		set firstName = firstName_IN,lastName = lastName_IN,workPhone = workPhone_IN,mobilePhone = mobilePhone_IN,
		office = office_IN,role_ID = 3
		where user_ID = user_ID_IN;
	ELSE
		update tblusers
		set firstName = firstName_IN,lastName = lastName_IN,workPhone = workPhone_IN,mobilePhone = mobilePhone_IN,
		office = office_IN,role_ID = 2
		where user_ID = user_ID_IN;
	END IF; 
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putBillboardInfo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putBillboardInfo`(
	IN `billboard_ID_IN` BIGINT
,
	IN `billboardName_IN` VARCHAR(200),
	IN `billboardDesc_IN` VARCHAR(1000),
	IN `width_IN` INT,
	IN `height_IN` INT,
	IN `latitude_IN` DOUBLE,
	IN `longitude_IN` DOUBLE,
	IN `minwidth_IN` INT,
	IN `maxwidth_IN` INT,
	IN `minheight_IN` INT,
	IN `maxheight_IN` INT,
	IN `tolerance_IN` INT,
	IN `readtime_IN` INT,
	IN `impressions_IN` INT,
	IN `traffic_IN` INT,
	IN `cycle_IN` INT


,
	IN `imageRatio_IN` VARCHAR(100),
	IN `imageExtension_IN` VARCHAR(100)

)
BEGIN
	#Update billboard information
	#ADMIN VIEW
	update tblbillboards
	set billboardName = billboardName_IN, billboardDescription = billboardDesc_IN, width = width_IN, height = height_IN, latitude = latitude_IN,
	longitude = longitude_IN, minWidthRes = minwidth_IN, maxWidthRes = maxwidth_IN, minHeightRes = minheight_IN, maxHeightRes = maxheight_IN, tolerance = tolerance_IN,
	readTime = readtime_IN, impressions = impressions_IN,traffic = traffic_IN, cycle = cycle_IN,imageRatio = imageRatio_IN, imageExtension = imageExtension_iN
	where billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putBillboardURL
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putBillboardURL`(
	IN `billboard_ID_IN` BIGINT,
	IN `billboardURL_IN` VARCHAR(250)



)
BEGIN
	#Update billboard URL if extension changes
	update tblbillboards
	set billboardImage_URL = billboardURL_IN
	where billboard_ID = billboard_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putCancelRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCancelRequest`(
	IN `request_ID_IN` BIGINT

,
	IN `user_ID_IN` BIGINT







)
BEGIN
	#Cancel a specific request
	DECLARE requestStartDate DATE;
	DECLARE requestEndDate DATE;
	DECLARE billboardID Bigint;
	DECLARE packageDisplayPerCycle INT;
	
	select billboard_ID,startDate,endDate,tbladrequest.displayPerCycle into @billboardID, @requestStartDate, @requestEndDate,@packageDisplayPerCycle
	from tbladrequest join tblpackage on tbladrequest.package_ID = tblpackage.package_ID
	where request_ID = request_ID_IN;
	
	Update tbladrequest
	SET status_ID = 4, cancel_ID = user_ID_IN, cancelDate = current_timestamp()
	where request_ID = request_ID_IN;
	
	Update tblschedule
	SET remainingSlots = remainingSlots + @packageDisplayPerCycle
	where scheduleDate >= @requestStartDate 
	and scheduleDate < @requestEndDate
	and billboard_ID = @billboardID;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putCheckoutError
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCheckoutError`(
	IN `transaction_ID_IN` VARCHAR(26),
	IN `errorNo_IN` VARCHAR(50),
	IN `errorMessage_IN` VARCHAR(255)



)
BEGIN
	update tblcheckout
	set errorNumber = errorNo_In, errorMessage = errorMessage_IN,checkoutstatus = 1
	where transaction_ID = transaction_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putCheckoutSuccess
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCheckoutSuccess`(
	IN `transaction_ID_IN` VARCHAR(50),
	IN `firstName_IN` VARCHAR(100),
	IN `lastName_IN` VARCHAR(255),
	IN `email_IN` VARCHAR(255),
	IN `tandem_IN` VARCHAR(50),
	IN `type_IN` VARCHAR(50)











)
BEGIN
	DECLARE requestID BIGINT;
	
	update tblcheckout
	set payerFirstName = AES_ENCRYPT(firstName_IN,'hhrjo40OH0XXHZ9ygwQ9'), payerLastName = AES_ENCRYPT(lastName_IN,'hhrjo40OH0XXHZ9ygwQ9'),payerEmail = AES_ENCRYPT(email_IN,'hhrjo40OH0XXHZ9ygwQ9'),
	tandem = tandem_IN, transactionType = type_IN, timestamp_response = current_timestamp(),checkoutstatus=2
	where transaction_ID = transaction_ID_IN;
	
	#Duration and frequency of the package selected
	SELECT request_ID into @requestID 
	from tblcheckout where transaction_ID = transaction_ID_IN;
	
	Update tbladrequest
	SET status_ID = 5,paymentDate = current_timestamp()
	where request_ID = @requestID;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putCommonRejection
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putCommonRejection`(
	IN `rejection_ID_IN` BIGINT,
	IN `rejection_IN` VARCHAR(500)

)
BEGIN
	update tblcommonrejections
	set rejection = rejection_IN
	where rejection_ID = rejection_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putContact
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putContact`(
	IN `postalAddress_IN` VARCHAR(200),
	IN `physicalAddress_IN` VARCHAR(200)
,
	IN `phone_IN` VARCHAR(200),
	IN `extensions_IN` VARCHAR(200),
	IN `directPhone_IN` VARCHAR(200),
	IN `fax_IN` VARCHAR(200),
	IN `email_IN` VARCHAR(200),
	IN `officeHours_IN` VARCHAR(200)


)
BEGIN
	#Update web application contact information
	update tblcontact
	set postalAddress = postalAddress_IN,physicalAddress = physicalAddress_IN, phone = phone_IN,
	extensions = extensions_IN, directPhone = directPhone_IN, fax = fax_IN, email = email_IN, officeHours = officeHours_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putNextSchedule
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putNextSchedule`()
BEGIN
	insert into tblschedule(billboard_ID,remainingSlots,scheduleDate)
	Select tblbillboards.billboard_ID as billboard_ID, cycle*60/readtime as remainingSlots,DATE_ADD(MAX(scheduleDate),
	INTERVAL 1 DAY) as scheduleDate from tblbillboards
	join tblschedule
	on tblbillboards.billboard_ID = tblschedule.billboard_ID
	where tblbillboards.enabled = 1
	group by tblbillboards.billboard_ID;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putPackage
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putPackage`(
	IN `package_ID_IN` BIGINT,
	IN `duration_IN` INT,
	IN `displayPerCycle_IN` SMALLINT,
	IN `price_IN` DECIMAL(12,2)



)
BEGIN
	update tblpackage
	set displayPerCycle = displayPerCycle_IN, duration = duration_IN,price = price_IN
	where package_ID = package_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putPaidRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putPaidRequest`(
	IN `request_ID_IN` BIGINT


)
BEGIN
	#Update request to paid,
	#Hardcoded to paid
	#Missing reca information for the moment
	Update tbladrequest
	SET status_ID = 5,paymentDate = current_timestamp()
	where request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putPassword
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putPassword`(
	IN `user_ID_IN` BIGINT,
	IN `psswd_IN` VARCHAR(255)





)
BEGIN
	#FORGOT PASSWORD
	#NEW NON USER ACCOUNT
	#Update password
	#Set temp password to null
	update tblusers 
	set tblusers.psswd = MD5(psswd_IN), tblusers.tempPsswd = null,tblusers.statusTemp = 0
	where user_ID = user_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putRegulation
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putRegulation`(
	IN `regulation_ID_IN` BIGINT,
	IN `regulation_IN` VARCHAR(500)

)
BEGIN
	update tblbillboardregulation 
	set regulation = regulation_IN
	where reg_ID = regulation_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putStatusApprover
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putStatusApprover`(
	IN `request_ID_IN` BIGINT,
	IN `approver_ID_IN` BIGINT

,
	IN `status_ID_IN` INT,
	IN `comments_IN` VARCHAR(200)


)
BEGIN
	#Update request status to approved or denied
	Update tbladrequest
	SET status_ID = status_ID_IN,approver_ID = approver_ID_IN,comments = comments_IN ,approveDate = current_timestamp()
	where request_ID = request_ID_IN;	
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putStatusPaid
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putStatusPaid`(
	IN `request_ID_IN` BIGINT


)
BEGIN
	#Update request to paid,
	#Hardcoded to paid
	#Missing reca information for the moment
	Update tbladrequest
	SET status_ID = 5,paymentDate = current_timestamp()
	where request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putStatusPublisher
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putStatusPublisher`(
	IN `request_ID_IN` BIGINT,
	IN `publisher_ID_IN` BIGINT

)
BEGIN
	#update ad request to published.
	Update tbladrequest
	SET status_ID = 6,publisher_ID = publisher_ID_IN ,publishDate = current_timestamp()
	where request_ID = request_ID_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putTempPsswd
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putTempPsswd`(
	IN `emailAddress_IN` VARCHAR(300),
	IN `tempPsswd_IN` VARCHAR(10)








)
BEGIN
	#update user account
	#Set password null
	#set temp password
	update tblusers
	set tempPsswd = MD5(tempPsswd_IN), statusTemp = 1, psswd = null
	where CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) = emailAddress_IN;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putTerms
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putTerms`(
	IN `terms_IN` VARCHAR(52000)


)
BEGIN
	#Update terms & agreement information
	update tblsettings
	set terms = terms_IN
	where sett_ID = 1;
END//
DELIMITER ;

-- Dumping structure for procedure ezbillboards.putVerified
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putVerified`(
	IN `emailAddress_IN` VARCHAR(100)



)
BEGIN
	#Update user account
	#Set email as verified
	 update tblusers
	 set verified = 1
	 where CAST(AES_DECRYPT(emailAddress, 'hhrjo40OH0XXHZ9ygwQ9') AS CHAR(200)) = emailAddress_IN;
END//
DELIMITER ;

-- Dumping structure for table ezbillboards.tbladrequest
CREATE TABLE IF NOT EXISTS `tbladrequest` (
  `request_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_ID` bigint(20) NOT NULL DEFAULT 0,
  `artwork_ID` bigint(20) NOT NULL,
  `status_ID` bigint(20) NOT NULL,
  `package_ID` bigint(20) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `displayPerCycle` smallint(6) DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `requestDate` datetime NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `approver_ID` bigint(20) DEFAULT NULL,
  `approveDate` datetime DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `publisher_ID` bigint(20) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `paymentDate` datetime DEFAULT NULL,
  `cancel_ID` bigint(20) unsigned DEFAULT NULL,
  `cancelDate` datetime DEFAULT NULL,
  PRIMARY KEY (`request_ID`),
  UNIQUE KEY `request_ID` (`request_ID`),
  KEY `status` (`status_ID`),
  KEY `approver` (`approver_ID`),
  KEY `publisher` (`publisher_ID`),
  KEY `user` (`user_ID`),
  KEY `artwork` (`artwork_ID`),
  KEY `package` (`package_ID`),
  CONSTRAINT `approver` FOREIGN KEY (`approver_ID`) REFERENCES `tblusers` (`user_ID`),
  CONSTRAINT `artwork` FOREIGN KEY (`artwork_ID`) REFERENCES `tblartwork` (`artwork_ID`),
  CONSTRAINT `package` FOREIGN KEY (`package_ID`) REFERENCES `tblpackage` (`package_ID`),
  CONSTRAINT `publisher` FOREIGN KEY (`publisher_ID`) REFERENCES `tblusers` (`user_ID`),
  CONSTRAINT `status` FOREIGN KEY (`status_ID`) REFERENCES `tblrequeststatus` (`status_ID`),
  CONSTRAINT `user` FOREIGN KEY (`user_ID`) REFERENCES `tblusers` (`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tbladrequest: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbladrequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbladrequest` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblartwork
CREATE TABLE IF NOT EXISTS `tblartwork` (
  `artwork_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_ID` bigint(20) NOT NULL,
  `artworkURL` varchar(1000) DEFAULT NULL,
  `artworkName` varchar(50) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `Size` int(11) NOT NULL,
  `ratio` varchar(50) NOT NULL,
  PRIMARY KEY (`artwork_ID`),
  UNIQUE KEY `artwork_ID` (`artwork_ID`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `tblusers` (`user_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblartwork: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblartwork` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblartwork` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblbillboardregulation
CREATE TABLE IF NOT EXISTS `tblbillboardregulation` (
  `reg_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `regulation` varchar(500) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`reg_ID`),
  KEY `regBillboard` (`billboard_ID`),
  CONSTRAINT `regBillboard` FOREIGN KEY (`billboard_ID`) REFERENCES `tblbillboards` (`billboard_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblbillboardregulation: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblbillboardregulation` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblbillboardregulation` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblbillboards
CREATE TABLE IF NOT EXISTS `tblbillboards` (
  `billboard_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboardName` varchar(200) NOT NULL,
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
  `tolerance` int(11) NOT NULL,
  `traffic` int(11) NOT NULL,
  `Cycle` int(11) NOT NULL,
  `imageRatio` varchar(500) NOT NULL,
  `imageExtension` varchar(500) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`billboard_ID`),
  UNIQUE KEY `billboard_ID` (`billboard_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblbillboards: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblbillboards` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblbillboards` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblcheckout
CREATE TABLE IF NOT EXISTS `tblcheckout` (
  `checkout_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transaction_ID` varchar(26) NOT NULL DEFAULT '',
  `firstName` varchar(100) NOT NULL DEFAULT '',
  `lastName` varchar(255) NOT NULL DEFAULT '',
  `emailAddress` varchar(100) DEFAULT NULL,
  `request_ID` bigint(20) unsigned DEFAULT NULL,
  `package_ID` bigint(20) DEFAULT NULL,
  `price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `timestamp_trans` timestamp NOT NULL DEFAULT current_timestamp(),
  `checkoutstatus` tinyint(4) NOT NULL DEFAULT 0,
  `payerFirstName` varchar(100) DEFAULT NULL,
  `payerLastName` varchar(255) DEFAULT NULL,
  `payerEmail` varchar(255) DEFAULT NULL,
  `transactionType` varchar(255) DEFAULT NULL,
  `tandem` varchar(9) DEFAULT NULL,
  `timestamp_response` timestamp NULL DEFAULT NULL,
  `errorNumber` varchar(50) DEFAULT NULL,
  `errorMessage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`checkout_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblcheckout: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblcheckout` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblcheckout` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblcommonrejections
CREATE TABLE IF NOT EXISTS `tblcommonrejections` (
  `reject_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `rejection` varchar(500) NOT NULL DEFAULT '0',
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`reject_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblcommonrejections: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblcommonrejections` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblcommonrejections` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblcontact
CREATE TABLE IF NOT EXISTS `tblcontact` (
  `postalAddress` varchar(200) DEFAULT NULL,
  `physicalAddress` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `extensions` varchar(200) DEFAULT NULL,
  `directPhone` varchar(200) DEFAULT NULL,
  `fax` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `officeHours` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblcontact: ~1 rows (approximately)
/*!40000 ALTER TABLE `tblcontact` DISABLE KEYS */;
INSERT INTO `tblcontact` (`postalAddress`, `physicalAddress`, `phone`, `extensions`, `directPhone`, `fax`, `email`, `officeHours`) VALUES
	('Oficina de la Rectora\nCall Box 9000, Mayaguez, PR 00681-9000', 'Boulevard Alfonso Valdes 259\nEdificio de Diego #201', '(787)832-4040', '3131, 3135,3139', '(787)265-3878', '(787)834-3031', 'rectora.uprm@upr.edu', 'M-F 7:45 A.M to 11:45 A.M., 1:00 P.M. to 4:30 P.M.');
/*!40000 ALTER TABLE `tblcontact` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tbllogs
CREATE TABLE IF NOT EXISTS `tbllogs` (
  `log_timestamp` datetime DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `action` varchar(255) NOT NULL,
  `detailAction` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tbllogs: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbllogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbllogs` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblpackage
CREATE TABLE IF NOT EXISTS `tblpackage` (
  `package_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `displayPerCycle` smallint(6) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`package_ID`),
  UNIQUE KEY `package_ID` (`package_ID`),
  KEY `billboard_Package` (`billboard_ID`),
  CONSTRAINT `billboard_Package` FOREIGN KEY (`billboard_ID`) REFERENCES `tblbillboards` (`billboard_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Packages available for a billboard.';

-- Dumping data for table ezbillboards.tblpackage: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblpackage` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblpackage` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblrequeststatus
CREATE TABLE IF NOT EXISTS `tblrequeststatus` (
  `status_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `statusName` varchar(25) NOT NULL,
  `statusDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`status_ID`),
  UNIQUE KEY `status_ID` (`status_ID`),
  UNIQUE KEY `statusName` (`statusName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblrequeststatus: ~6 rows (approximately)
/*!40000 ALTER TABLE `tblrequeststatus` DISABLE KEYS */;
INSERT INTO `tblrequeststatus` (`status_ID`, `statusName`, `statusDescription`) VALUES
	(1, 'Requested', NULL),
	(2, 'Approved', NULL),
	(3, 'Denied', NULL),
	(4, 'Cancelled', NULL),
	(5, 'Paid', NULL),
	(6, 'Published', NULL);
/*!40000 ALTER TABLE `tblrequeststatus` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblschedule
CREATE TABLE IF NOT EXISTS `tblschedule` (
  `schedule_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `billboard_ID` bigint(20) NOT NULL,
  `remainingSlots` int(11) NOT NULL,
  `scheduleDate` date NOT NULL,
  PRIMARY KEY (`schedule_ID`),
  UNIQUE KEY `schedule_ID` (`schedule_ID`),
  KEY `billboard` (`billboard_ID`),
  CONSTRAINT `billboard` FOREIGN KEY (`billboard_ID`) REFERENCES `tblbillboards` (`billboard_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblschedule: ~0 rows (approximately)
/*!40000 ALTER TABLE `tblschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblschedule` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblsettings
CREATE TABLE IF NOT EXISTS `tblsettings` (
  `sett_ID` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `about` varchar(10000) NOT NULL,
  `terms` varchar(52000) NOT NULL,
  PRIMARY KEY (`sett_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblsettings: ~1 rows (approximately)
/*!40000 ALTER TABLE `tblsettings` DISABLE KEYS */;
INSERT INTO `tblsettings` (`sett_ID`, `about`, `terms`) VALUES
	(1, '\r\nThe Mayaguez University Campus of the University of Puerto Rico has a long tradition of academic excellence. Our history is based on the commitment of our students, educators, researchers and employees, who have given their best to build the quality of which we are so proud of the school.\r\n<br>\r\nIn current times, there are many and, particularly, more complicated challenges that we face, so our greatest strength as an institution, should be the communion with our mission to continue providing the educational excellence that distinguishes us. Forging students, whether undergraduate or graduate, oriented to research, holistic approach and entrepreneurship, and capable of contributing to the social, cultural and economic development of our country and the universe, continues as our northern and growing banner .\r\n<br>\r\nAs Acting Chancellor of this unmistakably majestic University, the ever Colegio de Mayaguez, I work to build stronger ties with the industry and with our surrounding community that will lead us to strengthen our knowledge and duties, especially for our students. For this reason, I invite you to join the initiatives that, during this journey of vision and sustainability, we will be sharing with you and that will be focused on solidifying our leading position in higher education in Puerto Rico, the Caribbean and the world.\r\n<br>\r\nFor my part, I feel especially proud to lead the roads of the University Campus of Mayaguez in these moments of great challenges, in which we will have the opportunity to become the heart and soul that makes our island emerge and the dowry with more and better professionals, who contribute to its growth as a country.\r\n<br>\r\nI trust that, with your support, all the efforts that we are working on, strengthen our present and empower our future.\r\n<br><br>\r\n \r\n\r\nProf. Wilma Santiago Gabrielini, M.Arq.\r\n<br><br>\r\nActing Chancellor\r\n<br>', 'Thanks for using our products and services including ezb.uprm.edu and any of its subdomains (Services). The Services are provided by EZBillboards.\r\n<br>\r\n<br>\r\nBy using our Services from time to time, it is presumed that you have read through these Terms and Conditions and failure to do so shall be a complete bar on any and all claims in law or equity that you bring against EZBillboards for any reason whatsoever - please read them carefully. Your acceptance of these Terms and Conditions (this Agreement) is an electronically binding agreement upon you and such acceptance shall have the same legal force and effect as if you had physically signed such Agreement. You agree to the admissibility of computer records and electronic evidence in any dispute under this Agreement. If you do not accept these Terms and Conditions, please do not register for or participate in using the Services offered by and through EZBillboards.\r\n<br><br>\r\nAs used in this Agreement, you or User means both (a) the individual now registering as a user of the Services or an existing user of the Services now agreeing to this Agreement, as the case may be, and (b) if applicable, the company or other business or governmental entity specified by you upon registration (any such entity, your Company). You and your Company, if any, are jointly and severally liable for your obligations under this Agreement.\r\n<br><br>\r\nOur Services are diverse, so sometimes additional terms or product requirements may apply. Some EZBillboards Services such as Board Owner Enrollment and Listing Agreement may have additional or other terms that we provide to you when you use these and other Services. Additional terms will be available with the relevant Services, and those additional terms become part of your agreement with us if you use those Services. If you do not have the authority to enter into payment agreements on behalf of yourself or your company, do not accept these Terms and Conditions.\r\n<br><br>\r\nPrivacy and Your Personal Information\r\nFor information about EZBillboards data protection practices, please read EZBillboards Privacy Policy, which is hereby incorporated into these Terms and Conditions. This Policy explains how EZBillboards treats your personal information when you access the Site and use the Services provided. The Policy may be updated from time to time in our discretion. Changes will be effective upon their being posted to the Site\r\n<br><br>\r\nServices\r\nEZBillboards (ezb.uprm.edu) is an automated on-line selling and buying platform for billboards, media owners and other related products or services.\r\n<br><br>\r\nWe provide a variety options and flexibility to advertisers. Advertisers can buy guaranteed impressions and set up campaigns using the packages and contracting functionality. Real-time bidding allows advertisers to bid for inventory and execute campaigns on demand in real- time. Each buying option, provides functionality previously not available to advertisers.\r\n<br><br>\r\nEZBillboards allows advertisers, media buyers or agencies for themselves or on behalf of their clients or individual users (Buyers) to plan and search for inventory or media inventory, build campaigns, obtain pricing information, create and upload artwork, make payments, execute media buys and monitor campaign effectiveness in real-time.\r\n<br><br>\r\nEZBillboards allows media, billboard, board owners, other media owners or third parties that have exclusive representation rights (Sellers) to list, market and sell their media and inventory on-line. All Sellers who sell media assets and billboard ads will be required to execute a Board Owner Enrollment and Listing Agreement to use EZBillboards Services that lists each partys obligations. EZBillboards may offer additional Services to Buyers and Sellers directly or via third parties that may be subject to additional costs and terms and those additional terms become part of your agreement with us if you use those Services.\r\n<br><br>\r\nBuyers will be responsible for providing certain information required to buy and display advertising using EZBillboards including but not limited to name, address, cell phone, and credit card information. Sellers will be responsible for providing certain information required to list and enable each asset or billboard for EZBillboards Services including but not limited to contact, location, size, pricing, product information, and technical requirements for your billboard or scheduling system.\r\n<br><br>\r\nEZBillboards may provide certain creative services to advertisers and Buyers and help them prepare content for display on Sellers billboards or assets. In certain cases, Sellers will be required to work with EZBillboards to ensure such ads are displayed appropriately. Buyers shall prepare materials in accordance with technical specifications outlined in EZBillboards.\r\n<br><br>\r\nIn addition, Buyers, Sellers or registered users may communicate with other users on EZBillboards or post information requests, text, graphics, pictures and other content on EZBillboards.\r\n<br><br>\r\nEZBillboards is a venue or third party partner for Buyers and Sellers that enables automated sales of advertising inventory and provides other services facilitating transactions between both parties. We provide a payment and collection mechanism for the sale of such Services. We make every effort to qualify Users but we make no representation, and give you no assurance, that:\r\n<br><br>\r\nThe persons using EZBillboards (a) are not misrepresenting their identity, location or authority to enter into contracts, and (b) are of legal age and capacity to enter into contracts.\r\nA Seller enabling Services or items on EZBillboards will be able to or will complete the sale of the service or item or deliver the item or service to the buyer, or that a Buyer is able to or will complete the purchase of an service or item from a Seller.\r\nA Seller has truthfully and accurately described an Item placed on the Site.\r\nAn service or item listed for sale on EZBillboards exists, or is (a) of any particular quality, (b) non-infringing with regard to the intellectual property rights of any person or entity, or (c) that an service or item may be legally sold by the Seller.\r\nThe sale of a service or item complies with any or all applicable legal requirements for the sale of that service or item, including but not limited to statutes, regulations or requirements of any country, state, locality, province, municipality or other government authority or regulatory entity regarding sales, or the sale of any Services or item(s).\r\nBoth Sellers and Buyers represent and warrant that all information given to us (including your name, address and other information associated with your and all information communicated to other users of EZBillboards or the site, whether in a listing or a posting, is true, accurate, up-to-date and not misleading.\r\n<br><br>\r\nFalsely registering as a Buyer and/or gaining access to, using or sharing information not for these purposes is forbidden and will result in suspension or termination from the EZBillboards system by EZBillboards. Buyers who request and receive planning information, RFIs or RFPs and/or place media order or execute media buys do so with the intent to use it solely for their or their clients advertising purposes. If approved for access to the planning and buying service, you agree that upon requesting and receiving media proposals that any further communication, negotiation or agreement regarding those proposals obtained through the service will be continued through the EZBillboards system. In the event that agreement to purchase or order the listings in the proposals is reached, you agree to place the order through the EZBillboards system.\r\n<br><br>\r\nWe have the right, but not the obligation, to monitor, edit, refuse to post or remove any listing or posting from EZBillboards, in our discretion. Notwithstanding this right, we are not responsible for the content of listings or postings posted by Buyers, Sellers, and Users. Monitoring of postings and listings by us is not intended to verify the accuracy of the information contained therein and should not be relied upon by you for any purpose.\r\n<br><br>\r\nEZBillboards does not guarantee the price, terms, product, availability or services offered or provided by any third party until it is agreed to electronically. EZBillboards is not legally responsible for, and does not warrant, represent or guarantee any goods, services, information, or otherwise provided by third parties. If you should have a dispute with a third party, EZBillboards is in no way legally responsible for any claims in law or equity, demands or actual, consequential, incidental, nominal, special or punitive damages of any type, whether known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of or in any way connected with such claim, demand or dispute.\r\n<br><br>\r\nUsing Our Services\r\nYou must follow any policies made available to you within the Services.\r\n<br><br>\r\nIf EZBillboards suspects you of misusing our Services or terms or policies, taking any actions that we perceive could adversely affect EZBillboards business or violating any laws or regulations, we may suspend or stop providing our Services to you and your company.\r\n<br><br>\r\nUsing our Services does not give you ownership of any intellectual property rights in our Services or the content you access. You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law. These terms do not grant you the right to use, remove or alter any branding or logos used in our Services.\r\n<br><br>\r\nOur Services display some content that is not EZBillboards. This content is the sole responsibility of the entity that makes it available. We review content to determine whether it is acceptable, readable, appropriate, or violates our policies, and we may remove or refuse to display content that we reasonably believe is inappropriate or violates our policies or the law. In addition, we will review content restrictions provided by board or media owners. In most cases, where we deny content EZBillboards alerts the Buyer via email.\r\n<br><br>\r\nEZBillboards may send you service announcements, administrative messages, and other information to improve user experience and users may opt out of some of those communications.\r\n<br><br>\r\nSome of our Services are available on mobile devices. Do not use such Services in a way that distracts you and prevents you from obeying driving or safety laws.\r\n<br><br>\r\nEZBillboards and other EZBillboards.com names and logos and all related product and service names, design marks and slogans used on EZBillboards are the trademarks or service marks of EZBillboards LLC or its affiliates. All other marks are the property of their respective companies. No trademark or service mark license is granted in connection with the materials contained on the Site. Access to the Site does not authorize anyone to use any name, logo or mark in any manner.\r\n<br><br>\r\nYou may not use meta tags or other hidden text utilizing EZBillboards name or trademarks without the express prior written consent of EZBillboards.com.\r\n<br><br>\r\nYour EZBillboards Account\r\nYou may need a EZBillboards Account in order to use some of our Services. You may create your own EZBillboards Account, or your EZBillboards Account may be assigned to you by an administrator, such as your employer or educational institution. If you are using a EZBillboards Account assigned to you by an administrator, different or additional terms may apply and your administrator may be able to access or disable your account.\r\n<br><br>');
/*!40000 ALTER TABLE `tblsettings` ENABLE KEYS */;

-- Dumping structure for table ezbillboards.tblusers
CREATE TABLE IF NOT EXISTS `tblusers` (
  `user_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(300) NOT NULL,
  `role_ID` int(11) DEFAULT NULL,
  `office` varchar(300) DEFAULT NULL,
  `firstName` varchar(300) NOT NULL,
  `lastName` varchar(300) NOT NULL,
  `mobilePhone` varchar(300) DEFAULT NULL,
  `workPhone` varchar(300) DEFAULT NULL,
  `companyName` varchar(300) DEFAULT NULL,
  `companyURL` varchar(400) DEFAULT NULL,
  `facebookURL` varchar(400) DEFAULT NULL,
  `instagramURL` varchar(400) DEFAULT NULL,
  `twitterURL` varchar(400) DEFAULT NULL,
  `address1` varchar(300) DEFAULT NULL,
  `address2` varchar(300) DEFAULT NULL,
  `city` varchar(300) DEFAULT NULL,
  `state` varchar(300) DEFAULT NULL,
  `zipcode` varchar(300) DEFAULT NULL,
  `psswd` varchar(255) DEFAULT NULL,
  `tempPsswd` varchar(255) DEFAULT NULL,
  `signupDate` datetime NOT NULL,
  `lastLoginDate` datetime NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `statusTemp` tinyint(1) NOT NULL DEFAULT 0,
  `enabled` tinyint(3) unsigned DEFAULT 1,
  PRIMARY KEY (`user_ID`,`emailAddress`),
  UNIQUE KEY `user_ID` (`user_ID`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ezbillboards.tblusers: ~1 rows (approximately)
/*!40000 ALTER TABLE `tblusers` DISABLE KEYS */;
INSERT INTO `tblusers` (`user_ID`, `emailAddress`, `role_ID`, `office`, `firstName`, `lastName`, `mobilePhone`, `workPhone`, `companyName`, `companyURL`, `facebookURL`, `instagramURL`, `twitterURL`, `address1`, `address2`, `city`, `state`, `zipcode`, `psswd`, `tempPsswd`, `signupDate`, `lastLoginDate`, `verified`, `statusTemp`, `enabled`) VALUES
	(5, 'Ül?îÒ70k›dØÍã¿°‰ý¶è<ìãÕË·üt', 4, '26a241b42844ce358d4ce9073808973a0e81917754817ac46a05d260fada8188TABhCSSAlheu5IbTutqdCg==', '4d4a69f20c3a63ef0efe489fea7703d1b21f9eadbcfe55c9acc9cb44a335e3666ht0KGjfiM0z7ySC8J0dgg==', 'a8de3fe583790c03a65f211bff0d3db43d565cc8837ab282a70566321b30a67eAMaKNySrsfZDxCY0GyFf/A==', '4a9f7c38e8f7fc981e710978cf118c73c71f242cefab99cf3513463b4721a93bFm/6/dyHXyH5b/GqQ/Rqkg==', '6adcfa5a5e3691831293ea4cda36bd2d81361e93ed14c76c259ea69304babd98OTB7IpUfFq+Jk39ACzI7DA==', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4e31be17e7a92d5c2ff0c7f48a024f25', NULL, '2019-04-16 23:37:45', '2019-04-16 23:37:45', 1, 0, 1);
/*!40000 ALTER TABLE `tblusers` ENABLE KEYS */;

-- Dumping structure for procedure ezbillboards.viewSchedule
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `viewSchedule`()
BEGIN
	Select tblbillboards.billboard_ID as billboard_ID,cycle,readtime, cycle*60/readtime as remainingSlots,DATE_ADD(MAX(scheduleDate),
	INTERVAL 1 DAY) as scheduleDate from tblbillboards
	join tblschedule
	on tblbillboards.billboard_ID = tblschedule.billboard_ID
	where tblbillboards.enabled = 1
	group by tblbillboards.billboard_ID;
END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
