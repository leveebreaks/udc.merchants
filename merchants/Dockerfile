FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-env

WORKDIR /src

COPY UDC.MerchantApi/*.csproj ./UDC.MerchantApi/
RUN dotnet restore ./UDC.MerchantApi/UDC.MerchantApi.csproj

COPY . .

WORKDIR /src/UDC.MerchantApi