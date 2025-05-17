import './App.css'
import Header from './components/header'
import Hero from './components/hero/hero'
import CreateTrip from './create-trip'
import {Routes, Route} from 'react-router-dom'
import { Toaster } from 'sonner'
import Trip from './viewtrip/[tripID]/index.jsx'
import MyTrips from './my-trips.jsx'



function App() {
 
  return(
    
    <div>
      <Header/>
      <Toaster position="bottom-right" richColors />
     <Routes>
      <Route path="/my-trips" element={<MyTrips/>} />
      <Route path="/" element={<Hero/>} />
      <Route path="/create-trip" element={<CreateTrip/>} />
      <Route path="/viewtrip/:tripID" element={<Trip/>} />
      <Route path="/edit-trip/:id" element={<CreateTrip />} />

     </Routes>
     </div>

  )
}

export default App
