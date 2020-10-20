# bayograff

Write an autobiography, a journal or a chronology online

## TODOS

-   Change text-align center to left in SingleReportermView
-   Reporterms router?
-   Consider extracting everything from reporterm views into templates for Anecdaynotes and Factales

-   Add Anecdaynotes and Factales
-   Add Home and About Pages
-   Add 404 and 500 views
-   Include HTML tags in Latex
-   Add Video
-   Images same size
-   import ImageSelection.vue (needs events etc)
-   Images can't be inserted into Latex :(
-   Allow date input with text (maybe use npm install v-calendar)
-   min and max dates should be one day off maybe (will need to use computed I believe)
-   Allow resizing of text

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
