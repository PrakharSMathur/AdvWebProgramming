// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import FlightList from './FlightList.jsx'
// import AirportList from './AirportList.jsx'
// import MenuBar from './MenuBar.jsx'
//
// function App() {
//   const [airportID, setAirportID] = useState("no id")
//   const [departures, setDepartures] = useState([])
//   const [arrivals, setArrivals] = useState([])
//   const [viewFlight, setViewFlight] = useState(false);
//   // function handleDepartures(data){
//   //   setDepartures(data)
//   //   console.log(departures);
//   // }
//   // function handleArrivals(data){
//   //   setArrivals(data)
//   //   console.log(arrivals);
//   // }
//   // function handleAirportID(data) {
//   //   setAirportID(data);
//   // }
//   // function handleViewFlight(data){
//   //   setViewFlight(data);
//   // }
//
//   return (
//     <>
//        <div className="card">
//
        {/*<AirportList textForButton={"Refresh"} textForRefreshButton="Refresh"*/}
        {/*  textForViewFlightsButton="View flights"*/}
        {/*  getAirportID={handleAirportID}*/}
        {/*  getArrivals={handleArrivals}*/}
        {/*  getDepartures={handleDepartures}*/}
        {/*  getViewFlightBool={handleViewFlight}/>*/}
//
//
        {/*{viewFlight && (*/}
        {/*  <FlightList*/}
        {/*    airportID={airportID}*/}
        {/*    arrivalsData={arrivals}*/}
        {/*    departuresData={departures}*/}
        {/*  />*/}
        {/*)}*/}
//         {/*<AirportList textForButton="Refresh"*/}
//         {/*  getAirportID={handleAirportID}*/}
//         {/*  getArrivals={handleArrivals}*/}
//         {/*  getDepartures={handleDepartures}/>*/}
//
//         {/* <FlightList airportID={airportID}
//           arrivals={arrivals}
//           departures={departures}> */}
//
//       </div>
//       <p className="read-the-docs">
//         Authors: Ankush KUMAR & Prakhar MATHUR
//       </p>
//     </>
//   )
// }
//
// export default App


// App.jsx

import { useState } from 'react';
import MenuBar from './MenuBar.jsx';
import './App.css';

function App() {
  const [selectedAirport, setSelectedAirport] = useState(null);

  const handleAirportClick = (airportID) => {
    setSelectedAirport(airportID);
  };

  return (
      <div>
        <MenuBar
            onAirportClick={handleAirportClick}
            selectedAirport={selectedAirport}
        />
      </div>
  );
}

export default App;
