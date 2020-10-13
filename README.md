# bayograff

Write an autobiography, a journal or a chronology online

## TODOS

-   After searching something, clicking Reporterms does not refresh to all reporterms
-   Background colors (still showing some yellow)
-   Paging in Reporterms List
-   Consider extracting everything from reporterm views into templates for Anecdaynotes and Factales
-   Limit size in card images
-   Allow external images
-   Dates in cards must be inline when card is made vertical due to small screen
-   Sanitize User input in title and content

-   Add Anecdaynotes and Factales
-   Add Home and About Pages
-   Add Video
-   Images same size
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
