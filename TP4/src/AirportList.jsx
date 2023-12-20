import { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'

function AirportList({textForButton, funtionFromParent}) {
  const [airports, setAirports] = useState([])

  function handleClick(){
    funtionFromParent(data)
  }

  function addAirports(data){
    setAirports(data)
      // Update later
  }
  
  const fetchAirports = async () => {
    try {
        // Make the API call using fetch
        const response = await fetch('https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json');

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Extract data from the response
        const data = await response.json();

        // Assuming data.departures is the array you want to update the state with
        //console.log(data)
        addAirports(data)
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Airport ID</Table.HeaderCell>
            <Table.HeaderCell>Airport Name</Table.HeaderCell>
            <Table.HeaderCell>Number of Arrivals</Table.HeaderCell>
            <Table.HeaderCell>Number of Departures</Table.HeaderCell>
            <Table.HeaderCell>Last Refresh</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {airports.map((airport, index) => (
            <Table.Row key={index}>
              <Table.Cell>{airport.iata}</Table.Cell>
              <Table.Cell>{airport.name}</Table.Cell>
              <Table.Cell><button id={airport.iata} onClick={handleClick}>{textForButton}</button></Table.Cell>
              <Table.Cell><button id={airport.iata} onClick={handleClick}>{textForButton}</button></Table.Cell>
              <Table.Cell><button id={airport.iata} onClick={handleClick}>{textForButton}</button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );

};


export default AirportList

// export default function AirportList({textForButton, funtionFromParent})
// {
//   function handleClick(){
//     funtionFromParent("data from button")
//   }
//   return <button onClick={handleClick}>{textForButton}</button>
// }

// export default function AirportList(text){
//   return <p>Text to display is: {text}</p>
// }