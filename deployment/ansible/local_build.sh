#!/bin/bash
set -x

# frontend
(
# get version
reg='(.+): *(.+)'

line=$(sed -n '/^app_version: /p' vars.yml)
[[ "$line" =~ $reg ]]
version="${BASH_REMATCH[2]}"

cd ../.. &&
  echo "VITE_VERSION=$version" > .env.production.local &&
  npm run build-only
)
