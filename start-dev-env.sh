#!/bin/bash
dotnet run --project api/DmlPlayground/DmlPlaygroundApi.csproj &
cd client/dml-playground/src
npm start
