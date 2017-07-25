#!/usr/bin/env bash

set -e

rm -rf plugin/*

cp -r src/panel src/manifest.json src/popup.html src/images plugin

npm run webpack