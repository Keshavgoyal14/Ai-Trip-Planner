import { db } from "./firebaseConfig"
import { collection, query, where, getDocs ,deleteDoc , doc} from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button} from "./components/ui/button";
import { GetPlacesDetails } from "./service/GlobalApi";
import HandleCompletePDF from "./components/PdfConverter";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
function MyTrips() {
    const navigate = useNavigate()
    const [editTrip, setEditTrip] = useState(null);
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
 const handleDelete= async(id)=>{
    await deleteDoc(doc(db, "AiTrips", id));
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips);
    toast.success("Trip Deleted Successfully");
 }
 const handleUpdate=(item)=>{
    setEditTrip(item)
    navigate(`/edit-trip/${item.id}` ,{
      state: {
        editTrip: item,
      },
    });

 }
  useEffect(() => {
    fetchTrips();
  }, []);

   return (
    <div className="flex flex-col items-center dark:text-gray-300 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl text-gray-700 dark:text-gray-300 text-center font-bold m-5 uppercase">
        My Trips
      </h2>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {trips.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-2xl shadow dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-300 transition duration-500 ease-in-out flex flex-col"
            >
              <img
                src={photoURL[item.id]}
                alt="No Image Found"
                className="w-full h-48 object-cover rounded-xl"
              />
              <h2 className="text-lg mt-3 font-bold text-gray-700 dark:text-gray-400">
                {item.userSelection.location}
              </h2>
              <p className="text-sm mt-1 font-medium text-gray-400 dark:text-gray-500">
                {item.userSelection.NoOfDays} day {item.userSelection.budget} budget trip
              </p>

              <div className="flex gap-2 items-center mt-4 flex-wrap">
                <Link to={`/viewtrip/${item.id}`}>
                  <Button variant="default" className="dark:bg-gray-300 hover:cursor-pointer">
                    View
                  </Button>
                </Link>
                <HandleCompletePDF trip={item} />
                <button onClick={() => handleDelete(item.id)} className="hover:cursor-pointer">
                  <MdDelete size={25} />
                </button>
                <button onClick={() => handleUpdate(item)} className="ml-2">
                  <MdModeEditOutline size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Trips Found</div>
      )}
    </div>
  );
}

export default MyTrips;
