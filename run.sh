#!/bin/bash
dotnet run --project api/DmlPlaygroundApi.csproj &
cd client/src
npm start
