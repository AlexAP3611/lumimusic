#!/bin/sh

until mysqladmin ping -h mysql_db -uroot -proot --ssl=0 --silent; do
  sleep 2
done

php artisan config:clear
php artisan cache:clear

echo "Running migrations..."
php artisan migrate --force

echo "Seeding database..."
php artisan db:seed --force

echo "Starting Apache..."
apache2-foreground