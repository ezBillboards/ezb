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
cp -vR ../ezb/ /var/www/html/
