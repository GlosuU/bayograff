# bayograff

Write an autobiography, a journal, or a chronology online

## Necessary external accounts (add private parameters to .env file)

-   Auth0 (https://auth0.com/)
-   MongoDB (e.g. Atlas)

## Project setup

```
npm install
```

NOTE: Requires Node version 14

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

## TODOs

-   Add 404 and 500 views
-   Add "delete all data" in Profile Page
-   Change page title and icon with router: https://dev.to/webhookrelay/a-simple-way-to-keep-your-vue-page-title-in-sync-with-the-router-ec0
-   Fix Header and NavBar from scrolling down

## RELEASES

- v2.3.0: Revert to Node engine 14.x for Render
- v2.2.0: Node engine 18.x
- v2.1.0: Node engine 16.x
- v2.0.0: Polished deployment in Render
- v1.2.0: Upped Node engine to v14
- v1.1.4: Reverting Bayograff to Webapp
- v1.1.3: Fix MongoDB connection in PROD
- v1.1.2: Preparing deployment in Render
- v1.1.1: Updated Mongoose dependency
- v1.1.0: Updated basic dependencies via dependabot
- v1.0.6: Resurrected Bayograff 
- v1.0.5: Updated some dependencies via dependabot
- v1.0.4: Dependabot + IntelliJ usage
- v1.0.3: Updated some dependencies via dependabot
