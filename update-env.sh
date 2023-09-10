#!/bin/bash

NEW_DATABASE_ID=$(npm run init-db | tail -n 1)

sed -i "s/DATABASE_ID=.*/DATABASE_ID=$(echo $NEW_DATABASE_ID | sed -e 's/[\/&]/\\&/g')/" .env

docker-compose up -d
