import { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'

function DeparturesList({text}) {
  const [flights, setFlights] = useState([])
  const airportID = text

  function addFlights(data){
    setFlights(data)
      // Update later
  }
  
  const fetchDepartures = async (airportID) => {
    try {
        // Make the API call using fetch
        let url = 'https://www.skyscanner.com/g/arrival-departure-svc/api/airports/'+airportID+'/departures';
        const response = await fetch(url);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Extract data from the response
        const data = await response.json();

        // Assuming data.departures is the array you want to update the state with
        //console.log(data.departures)
        addFlights(data.departures)
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchDepartures(airportID); // Fetch data when the component mounts
  }, []);

  return (
    <div>
      <p>Hello {text} or {airportID}</p>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Flight ID</Table.HeaderCell>
            <Table.HeaderCell>Departure Time</Table.HeaderCell>
            <Table.HeaderCell>Arrival Time</Table.HeaderCell>
            <Table.HeaderCell>Airline Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {flights.map((flight, index) => (
            <Table.Row key={index}>
              <Table.Cell>{flight.flightNumber}</Table.Cell>
              <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
              <Table.Cell>{flight.scheduledArrivalTime}</Table.Cell>
              <Table.Cell>{flight.airlineName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );

};

export default DeparturesList

// export default function DeparturesList(text){
//   return <p>Text to display is: {text}</p>
// }

// export default function DeparturesList({textForButton, funtionFromParent}){
//   function handleClick(){
//     funtionFromParent("data from button")
//   }
//   return <button onClick={handleClick}>{textForButton}</button>
// }