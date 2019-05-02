#!/bin/sh

# Remove Files
printf "\nRemoving Files From HTML...\n\n"
sudo rm -Rfv /var/www/html/*
sudo rm -fv /var/www/config.ini
sudo rm -Rfv /var/www/backups/

# Clear DB
printf "\nClearing DB...\n\n"
printf "DB Root Password:\n"
sudo mysql -u root -p < ./db/destroy.sql

# Clear Cron
printf "\nClearing Cron...\n\n"
sudo echo "" | crontab -u apache -

