### AW game Lookup app.

#

A application that uses steams auth, and scrapes steam games.
The user must log in with Steams auth. Once logged in, the user can scrape stam games with a click of a button. The steam config url is in the server folder.

### The app uses:

- create-react-app
- express.js
- Steam auth
- Material-UI
- Redux
- Sentry.io

## env files

- You will have to have a steam api to use the steam auth
- Once you have the api key, create a file in the ./config folder in the server folder.

- name the file config.env

-in the config file place your api like this:
STEAM_KEY=your api key

- https://steamcommunity.com/dev/

## How to install

- Clone git repo

`git clone https://github.com/msagerup/aw.git `.

- navigate to folder `client` folder.

` cd goodgamesTest/client`.

- run npm install and build in the `client` folder.

`npm install `.
`npm run build `.

- navigate to `server` folder.

`cd goodgamesTest/server`.

- run npm install in the server `server` folder.

`npm install `

## Run the server

- in the `server` folder, run:

`npm run server`

## Open browser window on localport

- in a `browser window` on your open localhost on server port.
- default is http://localhost:5000
