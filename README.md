# Gurutzeta App

[![qa](https://github.com/artberri/gurutzetapp/actions/workflows/qa.yml/badge.svg)](https://github.com/artberri/gurutzetapp/actions/workflows/qa.yml)

## Development

Create a `.env` file in the web folder with the secrets:

```ini
VITE_CONTENTFUL_SPACE_ID=
VITE_CONTENTFUL_ACCESS_TOKEN=
VITE_SENTRY_DSN=
VITE_SENTRY_RELEASE=dev
```

## Build the APK

Place the `berriart.jks` keystore file in the `android` folder. Then:

```sh
npm i -g @bubblewrap/cli
cd android
export BUBBLEWRAP_KEYSTORE_PASSWORD='XXXXXXXXXXXX'
export BUBBLEWRAP_KEY_PASSWORD='XXXXXXXXXXXX'
bubblewrap build
```
