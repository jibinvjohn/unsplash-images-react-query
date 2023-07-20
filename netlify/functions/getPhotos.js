//netlify/functions/getPhotos.js 
require("dotenv").config();

const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const { keyword } = event.queryStringParameters;
    const url = `https://api.unsplash.com/search/photos?client_id=${process.env.VITE_API_KEY}&query=${keyword}`;
    let response = await axios.get(
      url,
      {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
        params: { trophies: true },
      }
    );
    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};