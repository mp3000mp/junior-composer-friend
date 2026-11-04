#!/bin/bash
set -eox pipefail

# frontend
(
cd ../..

# get version
version=$(node -p "require('./package.json').version")

# build front
echo "VITE_VERSION=$version" > .env.production.local
npm run build
)
