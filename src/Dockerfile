FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Install libc6-compat in the base stage
RUN apk add --no-cache libc6-compat

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

RUN apk add --update libc6-compat nodejs npm

WORKDIR /src

COPY ["WebUI/WebUI.csproj", "WebUI/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]

RUN dotnet restore "WebUI/WebUI.csproj"
COPY . .
WORKDIR "/src/WebUI"
RUN dotnet build "WebUI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebUI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set up runtime environment variables
ENV DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER=true \
    DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_DNS_CACHING=false

# ENTRYPOINT ["dotnet", "WebUI.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet WebUI.dll