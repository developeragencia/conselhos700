#!/bin/bash
echo "🚀 Starting Remix Server..."
npx remix build
PORT=3000 node server.js