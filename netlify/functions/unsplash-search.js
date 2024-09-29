const fetch = require('node-fetch');
require('dotenv').config();

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

exports.handler = async function(event, context) {
    const query = event.queryStringParameters.query;
    const page = event.queryStringParameters.page || 1;
    const perPage = event.queryStringParameters.per_page || 10;

    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка при запросе к Unsplash API' }),
        };
    }
};