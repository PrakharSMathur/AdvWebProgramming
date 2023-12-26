import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DeparturesList from './DeparturesList.jsx'
import AirportList from './AirportList.jsx'

function App() {
  const [count, setCount] = useState(0)
  let [airportID, setAirportID] = useState("no id")
  let [departureCount, setDepartureCount] = useState(" - ")
  let [arrivalCount, setArrivalCount] = useState(" - ")
  function handleDepartureCountChange(dataFromButton){
    setDepartureCount(dataFromButton)
    console.log(departureCount);
  }
  function handleArrivalCountChange(dataFromButton){
    setArrivalCount(dataFromButton)
    console.log(arrivalCount);
  }
  function handleAirportIDChange(dataFromButton) {
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
          getAirportID={handleAirportIDChange}/>
        {/* <DeparturesList text={airportID}/> */}
        
        {/* {airportID !== "no id" && (
          <DeparturesList text={airportID} 
            getDepartureCount={handleDepartureCountChange}/>
        )} */}

        {/* <AirportList /> */}
        {/* <DeparturesList text="BRU"/> */}
        
      </div>
      <p className="read-the-docs">
        Authors: Ankush KUMAR & Prakhar MATHUR
      </p>
    </>
  )
}

export default App
