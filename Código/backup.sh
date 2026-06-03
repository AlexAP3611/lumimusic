#!/bin/bash
mkdir -p ./backups
docker exec AlejandroAballe-db mysqldump -u root -proot proxectodb > ./backups/backup_lumimusic_$(date +%Y%m%d).sql