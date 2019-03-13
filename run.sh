#!/bin/bash
dotnet run --project src/api/DmlPlaygroundApi.csproj &
cd src/client/src
npm start
