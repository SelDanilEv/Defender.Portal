docker rm -f LocalPortal
docker build . -t local-portal && ^
docker run -d --name LocalPortal ^
-p 47053:80 ^
--env-file ./../../secrets/secrets.local.list ^
-e ASPNETCORE_ENVIRONMENT=DockerLocal ^
-e ASPNETCORE_HOSTINGSTARTUPASSEMBLIES=Microsoft.AspNetCore.SpaProxy ^
-it local-portal
echo finish local-portal
docker image prune -f
pause
