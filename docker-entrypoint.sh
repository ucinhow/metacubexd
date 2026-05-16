#!/bin/sh

set -eu

# Map DEFAULT_BACKEND_URL to Nuxt runtime config env var.
# Map CONFIG_FILE_PATH to the server-side config path used by remote config fetch.
# Nitro embeds public asset metadata at build time, so do not rewrite config.js.
export NUXT_PUBLIC_DEFAULT_BACKEND_URL="${DEFAULT_BACKEND_URL:-}"
export NUXT_CONFIG_FILE_PATH="${CONFIG_FILE_PATH:-}"
export NUXT_PUBLIC_CONFIG_FILE_PATH="${CONFIG_FILE_PATH:-}"

# Start Node.js server
exec node /app/.output/server/index.mjs
