#!/bin/bash
set -eox pipefail

# frontend
(
cd ../..

# build front (version is injected from package.json by vite.config.ts)
npm run build
)
