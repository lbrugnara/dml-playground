#!/bin/bash

RUNTIME=${1:-linux-arm}
DML_DIR=$PWD
NODE_ENV=production

# Delete previous build
if [ -d "build/$RUNTIME" ]; then
    rm -r build/$RUNTIME
fi

# Prepare build dir
mkdir -p build/$RUNTIME/{api,client}

# Publish the api
dotnet publish -c Release -r $RUNTIME -o $DML_DIR/build/$RUNTIME/api src/api/DmlPlaygroundApi.csproj

# Build the client
cd src/client/src
npm run build
cp ../build/* -r $DML_DIR/build/$RUNTIME/client/

# Create the package
cd $DML_DIR/build/$RUNTIME
tar -zcvf dml-${RUNTIME}.tar.gz api/ client/
