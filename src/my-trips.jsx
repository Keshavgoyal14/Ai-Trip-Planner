import { db } from "./firebaseConfig"
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { GetPlacesDetails } from "./service/GlobalApi";

function MyTrips() {
  const [trips, setTrips] = useState([]);
    const [photoURL, setPhotoUrl] = useState({});

  const fetchTrips = async () => {
    try {
      const user = localStorage.getItem("user");
      const userData = JSON.parse(user);

      if (!userData || !userData.email) {
        console.log("User not logged in");
        setTrips([]);
        return;
      }

      const tripsRef = collection(db, "AiTrips");
      const q = query(tripsRef, where("UserEmail", "==", userData.email));
      const snapshot = await getDocs(q);

      const userTrips = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTrips(userTrips);
      console.log("Trip List", userTrips);
      userTrips.forEach((trip) => {
        GetPhoto(trip);})}
    catch (error) {
      console.error("Error fetching trips:", error);
    }
  };
  const GetPhoto = async (trip) => { 
    const data = {
      textQuery: trip?.userSelection?.location,
    };
  
    const result = await GetPlacesDetails(data);
    console.log(result);
    const photoName = result?.places?.[0]?.photos?.[3]?.name;
  
    if (photoName) {
      const photoRef = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=500&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
     setPhotoUrl((prev) => ({ ...prev, [trip.id]: photoRef }))
      
    } else {
      console.warn("No valid photo found.")
    }
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[35px] text-gray-700 text-center font-bold m-5 uppercase">My Trips</h2>
    
      {trips.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {trips.map((item) => (
            <div key={item.id} className="border p-4 m-2 rounded shadow">
            <img src={photoURL[item.id]} alt="No Image Found" />
              <h2 className="text-xl mt-3 font-bold text-gray-700">{item.userSelection.location}</h2>
              <p className="text-[15px] font-medium text-gray-400">
                {item.userSelection.NoOfDays} day {item.userSelection.budget} budget trip
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>No Trips Found</div>
      )}</div>
    
  );
}

export default MyTrips;
