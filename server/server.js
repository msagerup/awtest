const express = require('express');
const app = express()
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require('cors')

// Body Parser
app.use(express.json());
// Cookie Parser
app.use(cookieParser());
app.use(cors())

// Rute files
const auth = require('./routes/authRoute')
const scraper = require('./routes/scrapeRoute')

// Mount routers
app.use('/api', auth)
app.use('/api/scrape', scraper)

// app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = 5000;
app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

