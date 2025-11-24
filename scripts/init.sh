#!/usr/bin/bash

echo 'setting up enviroment'
pnpm install # install dependencies
echo 'packages installed'
echo 'starting development server'
node seed.js # seed data
pnpm run dev # run development enviroment (at localhost:3000)