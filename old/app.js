// Whole-script strict mode syntax
'use strict';

// Import express and create an express app
const express = require('express');
const app = express();
const port = 9500; // Port to listen on

// Winston logger
const {transports, createLogger, format} = require('winston');
const logger = createLogger({
	level: 'info', // Default log level, no need for more
	// Format the log output configuration, define output as JSON (default) and add a timestamp
	format: format.combine(
		format.timestamp(),
		format.json(),
	),
	// Define the transports, in this case we only use a file transport
	transports: [
		new transports.File({filename: './logs/' + new Date().toISOString() + 'alerting.log'}),
	],
});

app.use(express.json()); // For parsing application/json

// 404 Not Found handler
app.get('*', (req, res) => {
	res.status(404).send('404 Not Found');
});

// Alerts endpoint, will log the alert to the console and to a file in ./logs
// the alert is a json object
app.post('/alerts', (req, res) => {
	console.log(req.body);
	logger.info(req.body);
	res.status(200).send('OK'); // Return 200 OK
});

// Start the server
app.listen(port, () => {
	logger.info(`Logger listening http://localhost:${port}`);
});
