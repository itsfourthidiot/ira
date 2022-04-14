# Add npm and golang to the path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export PATH=$PATH:/usr/local/go/bin

# Build the front-end application
cd /home/ubuntu/ira/Frontend/
npm install
./node_modules/.bin/ng build --configuration production

# Build the back-end application
cd /home/ubuntu/ira/backend/
go build

# Kill the previously running application
kill -9 $(lsof -t -i:8080)

# Run the new application
echo "SECRET_KEY=$SECRET_KEY" >> .env
echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> .env
echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" >> .env
echo "AWS_REGION=$AWS_REGION" >> .env
echo "AWS_BUCKET=$AWS_BUCKET" >> .env
./ira > /dev/null 2>&1 &
