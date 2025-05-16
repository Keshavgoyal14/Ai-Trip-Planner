import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPlacesDetails } from "../../service/GlobalApi";

export const handlePlacesPDF = (doc, trip, y) => {
  const itinerary = trip?.Aitrips?.itinerary;
  if (!itinerary) return y;
  doc.setFontSize(16);
  y += 10;
  doc.text("Places to Visit", 10, y);
  y += 5;
  Object.entries(itinerary)
    .sort((a, b) => {
      const dayA = parseInt(a[0].match(/\d+/)?.[0]);
      const dayB = parseInt(b[0].match(/\d+/)?.[0]);
      return dayA - dayB;
    })
    .forEach(([day, places]) => {
      y += 8;
      doc.setFontSize(14);
doc.text(`${day.charAt(0).toUpperCase() + day.slice(1)}:`, 10, y);
      places.forEach((place) => {
        y += 8;
        doc.setFontSize(12);
        doc.text(`Place Name: ${place?.placeName || "N/A"}`, 12, y);
        y += 6;
        doc.text(`Details: ${place?.placeDetails || "N/A"}`, 12, y);
        y += 6;
        doc.text(`Travel Time: ${place?.timeTravel || "N/A"}`, 12, y);
        y += 6;
        doc.text(`Rating: ${place?.rating || "N/A"}`, 12, y);

        y += 8;

        if (y > 270) {
          doc.addPage();
          y = 15;
        }
      });
    });

  return y;
};

function PlacesToVisit({trip}) {
   const [photoURLs, setPhotoURLs] = useState({}); // Store photo URLs for each place




  // Fetch photos for all places
  useEffect(() => {
    if (trip?.Aitrips?.itinerary) {
      Object.entries(trip.Aitrips.itinerary).forEach(([day, places]) => {
        places.forEach((place, index) => {
          GetPhoto(place, `${day}-${index}`); // Use a unique key for each place
        });
      });
    }
  }, [trip]);

  const GetPhoto = async (place, key) => {
    try {
      const data = {
        textQuery: place?.placeName, // Use place name as query
      };

      const result = await GetPlacesDetails(data);
      

      const photoName = result?.places[0]?.photos[2]?.name; // Use the first photo if available

      if (photoName) {
        const photoRef = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
        setPhotoURLs((prev) => ({ ...prev, [key]: photoRef })); // Update photo URL for the place
        console.log(photoRef);
      } else {
        console.warn("No valid photo found for place:", place?.placeName);
        setPhotoURLs((prev) => ({ ...prev, [key]: "/image.png" })); // Set default image
      }
    } catch (error) {
      console.error("Error fetching photo for place:", place?.placeName, error);
      setPhotoURLs((prev) => ({ ...prev, [key]: "/image.png" })); // Set default image on error
    }
  };
  return (
    <div>
       <h2 className='m-5 font-bold text-xl'>Places to Visit</h2>
<div className="flex flex-col gap-4 m-5">
  {trip?.Aitrips?.itinerary &&
    Object.entries(trip.Aitrips.itinerary).sort((a, b) => {
    const dayA = parseInt(a[0].match(/\d+/)?.[0]);
    const dayB = parseInt(b[0].match(/\d+/)?.[0]);
    return dayA - dayB;
  }).map(([day, places], index) => {
      return (
        <div key={index} className="flex flex-col gap-2 p-4 hover:shadow-2xl hover:border-blue-100 hover:border-2 rounded-xl dark:text-gray-300">
          <h2 className="text-xl font-semibold capitalize">{day}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places?.map((place, placeIndex) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName+","+place?.latitute+","+place?.longitude} target="_blank">
            <div
              key={placeIndex}
              className="flex gap-4 items-center p-4 bg-white rounded-xl hover:shadow-lg border dark:bg-gray-900 dark:hover:border-gray-300"
            >
            <img src={photoURLs[`${day}-${placeIndex}`]} alt="Image not found" className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex flex-col gap-1 ">
                <h2 className="text-lg font-medium">{place?.placeName}</h2>
                <h2 className="text-sm text-gray-600 font-medium dark:text-gray-500">{place?.placeDetails}</h2>
                <h2 className="text-sm text-gray-500 dark:text-gray-400">Travel Time:⏱️ {place?.timeTravel}</h2>
                <h2 className="text-sm text-gray-500 dark:text-gray-400">Rating: {place?.rating}⭐</h2>
              </div>
            </div></Link>
          ))}</div>
        </div>
      );
    })}
</div></div>
  )
}

export default PlacesToVisit; 
