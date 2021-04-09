const express = require('express');
const app = express()
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require('cors')

// Body Parser
app.use(express.json());
// Cookie Parser
app.use(cookieParser()); 
//!!- Kommentar på cors
app.use(cors())

// Rute files
//!!- Disse bør være i toppen, med resterende imports.
const auth = require('./routes/authRoute')
const scraper = require('./routes/scrapeRoute')

// Mount routers
app.use('/api', auth)
app.use('/api/scrape', scraper)

// app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../client/build')));

//!!- Kanskje skrive en mer konkret route her? Ikke viktig dog.
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

//!!- Flytte denne opp i toppen? Port bør også hentes fra env, og 5000 bør være fallback. 
const port = 5000;
app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

