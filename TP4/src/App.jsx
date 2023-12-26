import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FlightList from './FlightList.jsx'
import AirportList from './AirportList.jsx'

function App() {
  const [count, setCount] = useState(0)
  let [airportID, setAirportID] = useState("no id")
  let [departures, setDepartures] = useState([])
  let [arrivals, setArrivals] = useState([])
  function handleDepartures(dataFromButton){
    setDepartures(dataFromButton)
    console.log(departures);
  }
  function handleArrivals(dataFromButton){
    setArrivals(dataFromButton)
    console.log(arrivals);
  }
  function handleAirportID(dataFromButton) {
    setAirportID(dataFromButton);
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
        
        <AirportList textForButton="Refresh"
          getAirportID={handleAirportID}
          getArrivals={handleArrivals}
          getDepartures={handleDepartures}/>
        
        <FlightList airportID={airportID}
          arrivalsData={arrivals}
          departuresData={departures}/>
        
      </div>
      <p className="read-the-docs">
        Authors: Ankush KUMAR & Prakhar MATHUR
      </p>
    </>
  )
}

export default App
