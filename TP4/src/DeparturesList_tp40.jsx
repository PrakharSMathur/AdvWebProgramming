import { useState } from 'react'

function DepartureList() {
  const [flights, setFlight] = useState(
    [
      {arrivalAirportName: "Beyrouth", airlineName: "MEA"},
      {arrivalAirportName: "Rome Fiumicino", airlineName: "Ryanair"},
      {arrivalAirportName: "Indira Gandhi International", airlineName: "Air France"}
    ]
  )
  
  function addFlight(data){
    setFlight((flights) => flights.push(data))
      // Update later
  }
  
  return (
    <>
      <div>
        <ul>
          {flights.map(flight =>
              <li key={flight.arrivalAirportName}> 
                {flight.airlineName}, {flight.arrivalAirportName}
              </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default DepartureList