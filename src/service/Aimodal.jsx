// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-1.5-flash';
  const contents = [  
    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget , Give me a Hotels options list with
HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place
Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with
best time to visit in JSON format.
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `I cannot access real-time information, including live pricing for hotels, images, and geo-coordinates.  Nor can I access and display images directly.  Therefore, I can't provide URLs for hotel images or place images.  However, I can give you a JSON structure with the data you requested, and you can populate it with information you find through online searches (like Google, Booking.com, Expedia, etc.).  Remember to verify all prices and details before making your bookings.


\`\`\`json
{
  "tripDetails": {
    "location": "Las Vegas, Nevada",
    "duration": "3 Days",
    "travelers": "Couple",
    "budget": "Cheap"
  },
  "hotels": [
    {
      "hotelName": "Hotel Name 1",
      "hotelAddress": "Address 1",
      "price": "$$$ (Replace with actual price)",
      "hotelImageUrl": "URL_TO_IMAGE_1 (Replace with URL)",
      "geoCoordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": 3.5,  //Replace with actual rating
      "description": "Short hotel description here..."
    },
    {
      "hotelName": "Hotel Name 2",
      "hotelAddress": "Address 2",
      "price": "$$$ (Replace with actual price)",
      "hotelImageUrl": "URL_TO_IMAGE_2 (Replace with URL)",
      "geoCoordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": 4.0, //Replace with actual rating
      "description": "Short hotel description here..."
    },
    {
      "hotelName": "Hotel Name 3",
      "hotelAddress": "Address 3",
      "price": "$$$ (Replace with actual price)",
      "hotelImageUrl": "URL_TO_IMAGE_3 (Replace with URL)",
      "geoCoordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": 3.0, //Replace with actual rating
      "description": "Short hotel description here..."
    }
  ],
  "itinerary": {
    "day1": [
      {
        "placeName": "Fremont Street Experience",
        "placeDetails": "Free outdoor pedestrian mall with light shows.",
        "placeImageUrl": "URL_TO_IMAGE (Replace with URL)",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticketPricing": "Free",
        "rating": 4.2, //Replace with actual rating
        "timeTravel": "2-3 hours"
      },
      {
        "placeName": "Downtown Container Park",
        "placeDetails": "Unique shopping and dining area with repurposed shipping containers.",
        "placeImageUrl": "URL_TO_IMAGE (Replace with URL)",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticketPricing": "Free",
        "rating": 4.0, //Replace with actual rating
        "timeTravel": "1-2 hours"
      }
    ],
    "day2": [
      {
        "placeName": "Strip Walk",
        "placeDetails": "Walk the Las Vegas Strip, see the famous hotels and casinos.",
        "placeImageUrl": "URL_TO_IMAGE (Replace with URL)",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticketPricing": "Free (unless you enter casinos or attractions)",
        "rating": 4.5, //Replace with actual rating
        "timeTravel": "4-5 hours"
      },
      {
        "placeName": "Bellagio Fountains",
        "placeDetails": "Free water show at the Bellagio Hotel.",
        "placeImageUrl": "URL_TO_IMAGE (Replace with URL)",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticketPricing": "Free",
        "rating": 4.8, //Replace with actual rating
        "timeTravel": "1 hour"
      }
    ],
    "day3": [
      {
        "placeName": "Seven Magic Mountains",
        "placeDetails": "Colorful art installation south of Las Vegas (requires transportation).",
        "placeImageUrl": "URL_TO_IMAGE (Replace with URL)",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ticketPricing": "Free",
        "rating": 4.3, //Replace with actual rating
        "timeTravel": "2-3 hours (including travel time)"
      }
    ]
  },
  "bestTimeToVisit": "Fall (September-November) or Spring (March-May) for pleasant weather."
}
\`\`\`

To use this, replace the placeholder values with actual data from your research.  Remember that cheap travel to Las Vegas often means taking advantage of free activities and walking or using public transportation (the Deuce bus is a popular option).  Consider looking for deals on off-Strip hotels to save money.
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  const chunks = [];
  for await (const chunk of response) {
    console.log(chunk.text);
    chunks.push(chunk.text);
  }
  return chunks.join('')
}

export default main;
