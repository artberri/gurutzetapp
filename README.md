# Gurutzeta App

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0860739-d161-497b-870d-0f9768d580f2/deploy-status)](https://app.netlify.com/sites/effervescent-peony-d6f04a/deploys)

## Development

Create a `.env` file in the web folder with the secrets:

```ini
REACT_APP_CONTENTFUL_SPACE_ID=
REACT_APP_CONTENTFUL_ACCESS_TOKEN=
REACT_APP_SENTRY_DSN=
REACT_APP_SENTRY_RELEASE=dev
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
