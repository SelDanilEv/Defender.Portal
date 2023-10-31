docker rm -f Portal
docker build . -t portal && ^
docker run -d --name Portal -p 49053:80 ^
--env-file ./../../secrets.list ^
-e ASPNETCORE_ENVIRONMENT=DockerDev ^
-it portal
echo finish portal
pause
