#!/bin/sh

# Update CentOS
printf "\nUpdating CentOS...\n\n"
sudo yum update

# Install Apache
printf "\nInstalling Apache...\n\n"
sudo yum install httpd

# Start Apache Service
printf "\nStarting Apache...\n\n"
sudo systemctl start httpd.service

# Apache Service Status
printf "\nApache Service Status...\n\n"
sudo systemctl status httpd.service

# Activate Apache To Start During System Boot
printf "\nActivating Apache To Start During System Boot...\n\n"
sudo systemctl enable httpd.service

# Install MariaDB
printf "\nInstalling MariaDB...\n\n"
sudo yum install mariadb-server mariadb

# Start MariaDB
printf "\nStarting MariaDB...\n\n"
sudo systemctl start mariadb

# Secure MariaDB
printf "\nSecuring MariaDB...\n\n"
sudo mysql_secure_installation

# Enable MariaDB During Boot
printf "\nEnabling MariaDB During Boot...\n\n"
sudo systemctl enable mariadb.service

# Install PHP
printf "\nInstalling PHP...\n\n"
sudo yum install php php-mysql

# Restart Apache
printf "\nRestarting Apache...\n\n"
sudo systemctl restart httpd.service

# Copy Files To HTML
printf "\nCopying Files To Apache...\n\n"
sudo cp -vR ../ezb/ /var/www/html/

# Move Files
printf "\nMoving Files...\n\n"
sudo mv -v /var/www/html/ezb/config.ini /var/www/
sudo mv -v /var/www/html/ezb/img/ /var/www/html/
sudo mkdir /var/www/backups
sudo rm -fv /var/www/html/ezb/ezb_install.sh
sudo rm -fv /var/www/html/ezb/ezb_uninstall.sh
sudo rm -Rfv /var/www/html/ezb/db/

# Change Ownership And Permissions
printf "\nChanging Ownership And Permissions...\n\n"
sudo chown -v apache:apache /var/www/config.ini
sudo chown -v apache:apache /var/www/html/ezb/server/remove-unverified-accounts.php
sudo chown -v apache:apache /var/www/html/ezb/server/add-schedule.php
sudo chmod -v 755 /var/www/html/ezb/server/remove-unverified-accounts.php
sudo chmod -v 755 /var/www/html/ezb/server/add-schedule.php

# Dump DB
printf "\nDumping DB...\n\n"
printf "DB Root Password:\n"
sudo mysql -u root -p < ./db/init.sql

# Set Up Cron
printf "\nSetting Up Cron...\n\n"
removeUnverifiedAccounts="0 3 * * * php /var/www/html/ezb/server/remove-unverified-accounts.php"
addSchedule="0 0 * * * php /var/www/html/ezb/server/add-schedule.php"
sudo echo -e "$removeUnverifiedAccounts\n$addSchedule" | crontab -u apache -

# Start Cron
printf "\nStarting Cron...\n\n"
sudo systemctl start crond.service

# Check Cron Status
printf "\nChecking Cron Status...\n\n"
sudo systemctl status crond.service

# Activate Cron At Boot
printf "\nActivating Cron At Boot...\n\n"
sudo systemctl enable crond.service


