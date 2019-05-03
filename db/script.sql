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

-- Dumping structure for procedure ezbillboards.putBillboardInfo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `putBillboardInfo`(
	IN `billboard_ID_IN` BIGINT
,
	IN `billboardName_IN` VARCHAR(50),
	IN `billboardDesc_IN` VARCHAR(50),
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

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
