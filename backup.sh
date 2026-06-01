#!/bin/bash
mkdir -p ./backups
docker exec mysql_db mysqldump -u root -proot lumimusic > ./backups/backup_lumimusic_$(date +%Y%m%d).sql