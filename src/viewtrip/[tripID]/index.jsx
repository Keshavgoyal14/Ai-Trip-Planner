import { useState,useEffect } from 'react'
import InfoSection from '../component/InfoSection'
import HotelRecommend from '../component/HotelRecommend'
import PlacesToVisit from '../component/PlacesToVisit'
import { useParams } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { doc, getDoc } from "firebase/firestore";
import HandleCompletePDF  from '../../components/PdfConverter'
function Trip() {
    const {tripID} = useParams()
    const [trip,setrip]=useState([])
    const getTrip = async () => {
        const docRef = doc(db, "AiTrips", tripID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setrip(docSnap.data())
        } else {
            console.log("No such document!");
        }
    }
    

useEffect(() => {
    getTrip();
}, [tripID]);

return (
    <div>
        <InfoSection trip={trip}/>
        <HotelRecommend trip={trip}/>
        <PlacesToVisit trip={trip}/>
        <HandleCompletePDF trip={trip}/>

    </div>
  )
}

export default Trip