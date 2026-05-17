#!/bin/sh

echo "Installing dependencies..."
composer dump-autoload --optimize
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "Waiting for database..."
until mysqladmin ping -h mysql_db -uroot -proot --ssl=0 --silent; do
  sleep 2
done

echo "Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

php artisan config:clear
php artisan cache:clear

echo "Running migrations..."
php artisan migrate --force

echo "Seeding database..."
php artisan db:seed --force

echo "Starting Apache..."
apache2-foreground