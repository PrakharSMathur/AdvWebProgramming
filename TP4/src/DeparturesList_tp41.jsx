import { useEffect, useState } from 'react'

function DepartureList() {
  const [flights, setFlight] = useState([])

  function addFlight(data){
    setFlight(data)
      // Update later
  }
  
  const fetchDepartures = async () => {
    try {
        // Make the API call using fetch
        const response = await fetch('https://www.skyscanner.com/g/arrival-departure-svc/api/airports/BRU/departures');

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Extract data from the response
        const data = await response.json();

        // Assuming data.departures is the array you want to update the state with
        console.log(data.departures)
        addFlight(data.departures)
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchDepartures();
  }, []);

  return (
    <>
      <div>
        <ul>
          {flights.map((flight, index) =>
              <li key={index}>
                {flight.flightNumber}, {flight.scheduledDepartureTime}, {flight.scheduledArrivalTime}, {flight.airlineName}
              </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default DepartureList