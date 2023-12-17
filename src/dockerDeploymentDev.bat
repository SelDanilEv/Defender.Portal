docker rm -f DevPortal
docker build . -t dev-portal && ^
docker run -d --name DevLocalPortal ^
-p 49053:80 ^
--env-file ./../../secrets/secrets.dev.list ^
-e ASPNETCORE_ENVIRONMENT=DockerDev ^
-e ASPNETCORE_HOSTINGSTARTUPASSEMBLIES=Microsoft.AspNetCore.SpaProxy ^
-it dev-portal
echo finish dev-portal
docker image prune -f
pause
