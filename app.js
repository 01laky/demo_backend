import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import noteMiddleware from './notes';

const app = express(),
            DIST_DIR = __dirname;
app.use(express.static(DIST_DIR));


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/notes', noteMiddleware)

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
