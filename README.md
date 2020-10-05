# bayograff

Write an autobiography, a journal or a chronology online

## TODOS

-   Background colors
-   Cards show Updated at
-   Hovering over cards
-   Adjust card size
-   Add Loading Circle to everything but ReportermsList
-   Sort list of reporterms by startDate
-   Polish exporter to get better .txt and .tex files
-   Select images for reporterms from enum

-   Images can't be inserted into Latex :(
-   After searching something, clicking Reporterms does not refresh to all reporterms
-   Allow date input with text (maybe use npm install v-calendar)
-   min and max dates should be one day off maybe (will need to use computed I believe)

## Necessary external accounts (add private parameters to .env file)

-   Auth0 (https://auth0.com/)
-   MongoDB (e.g. Atlas)

## Project setup

```
npm install
```

### Run webapp in development mode

```
npm run dev
```

### Run only server in development mode

```
npm run server-dev
```

### Build the client and run webapp in production mode

```
npm run client-build
npm run start
```
