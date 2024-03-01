npm i
npm run build
docker stop fxr-web-ssl
docker build . -t fxr:latest
docker run --rm -d -p 443:443 --name fxr-web-ssl fxr:latest
node ./deploy/cdnRefresh.js
