# bayograff

Write an autobiography, a journal or a chronology online

## TODOS

-   Move access to images to a separate script
-   Back to all reporterms button in ReportermSingle view
-   Duplicate Edit + Delete buttons at bottom in ReportermSingle view
-   Improve font sizes, some are too small
-   Polish exporter to get better .txt and .tex files
-   Reorganize exporter code in server
-   Allow for sorting by title or last updated
-   Show collapsed last updated Reporterm
-   After searching something, clicking Reporterms does not refresh to all reporterms
-   Background colors (still showing some yellow)
-   Paging in Reporterms List

-   Add Anecdaynotes and Factales
-   Add Home and About Pages
-   Add Video
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
