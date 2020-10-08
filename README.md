# bayograff

Write an autobiography, a journal or a chronology online

## TODOS

-   Sort list of reporterms by startDate
-   Pop up confirmation before deleting
-   Flash messages when editting or creating reporterm
-   Better icons for edit/delete/etc
-   Select images for reporterms from enum
-   Polish exporter to get better .txt and .tex files
-   Allow for sorting by title or last updated

-   Background colors (still showing some yellow)
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
