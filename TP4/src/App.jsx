import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FlightList from './FlightList.jsx'
import AirportList from './AirportList.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [airportID, setAirportID] = useState("no id")
  const [departures, setDepartures] = useState([])
  const [arrivals, setArrivals] = useState([])
  const [viewFlight, setViewFlight] = useState(false);
  function handleDepartures(data){
    setDepartures(data)
    console.log(departures);
  }
  function handleArrivals(data){
    setArrivals(data)
    console.log(arrivals);
  }
  function handleAirportID(data) {
    setAirportID(data);
  }
  function handleViewFlight(data){
    setViewFlight(data);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Arrivals & Departures</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        
        <AirportList textForRefreshButton="Refresh"
          textForViewFlightsButton="View flights"
          getAirportID={handleAirportID}
          getArrivals={handleArrivals}
          getDepartures={handleDepartures}
          getViewFlightBool={handleViewFlight}/>
        
        {viewFlight && (
          <FlightList
            airportID={airportID}
            arrivalsData={arrivals}
            departuresData={departures}
          />
        )}
        
      </div>
      <p className="read-the-docs">
        Authors: Ankush KUMAR & Prakhar MATHUR
      </p>
    </>
  )
}

export default App
