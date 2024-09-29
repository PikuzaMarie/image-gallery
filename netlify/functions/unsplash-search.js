const fetch = require('node-fetch');
require('dotenv').config();

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

exports.handler = async function(event, context) {
    try {
        const { query, page = 1, per_page = 10 } = JSON.parse(event.body);

        const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${per_page}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error sending request to Unsplash API' }),
        };
    }
};