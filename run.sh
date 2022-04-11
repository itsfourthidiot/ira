#!/bin/bash
cd /home/ubuntu/ira/Frontend/
/home/ubuntu/.nvm/versions/node/v14.19.1/bin/npm install
./node_modules/.bin/ng build
cd /home/ubuntu/ira/backend/
/usr/local/go/bin/go build
echo "SECRET_KEY=$SECRET_KEY" >> .env
echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> .env
echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" >> .env
echo "AWS_REGION=$AWS_REGION" >> .env
echo "AWS_BUCKET=$AWS_BUCKET" >> .env
./ira
