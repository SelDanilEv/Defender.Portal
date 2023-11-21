docker rm -f Portal
docker build . -t portal && ^
docker run -d --name Portal ^
-p 49053:80 ^
--env-file ./../../secrets.list ^
-e ASPNETCORE_ENVIRONMENT=DockerDev ^
-e ASPNETCORE_HOSTINGSTARTUPASSEMBLIES=Microsoft.AspNetCore.SpaProxy ^
-it portal
echo finish portal
pause
