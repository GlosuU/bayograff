# bayograff

Write an autobiography, a journal or a chronology online

## TODOS

-   Remove extra images, prepare for release

-   Change title with route: https://dev.to/webhookrelay/a-simple-way-to-keep-your-vue-page-title-in-sync-with-the-router-ec0
-   Add "delete all data" in Profile Page.
-   Add 404 and 500 views
-   Fix Header and NavBar from scrolling down
-   Allow date input with text (looks like it's possible with current plugin?)
-   import ImageSelection.vue (needs events etc)
-   "Cancel" in BayoForm goes back to previous route regardless if it's outside the webpage. Probably should go to reporterms if it's the case
-   Images can't be inserted into Latex :(
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
