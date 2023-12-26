import { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import DeparturesList from './DeparturesList.jsx'


function AirportList({textForButton, getAirportID}) {
  const [airports, setAirports] = useState([])
  const [forceUpdate, setForceUpdate] = useState(false);
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
  

  function handleClick(){
    // const airportID = event.target.id;
    setAirportID(event.target.id);
    getAirportID(airportID);
    setForceUpdate((prev) => !prev); // Toggle the dummy state to force a re-render
  }

  function addAirports(data){
    setAirports(data)
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
              <Table.Cell id={airport.iata}>{airport.iata}</Table.Cell>
              <Table.Cell id={airport.iata}>{airport.name}</Table.Cell>
              <Table.Cell id={airport.iata}>{arrivalCount}</Table.Cell>
              <Table.Cell id={airport.iata}>{departureCount}</Table.Cell>
              <Table.Cell id={airport.iata}><button id={airport.iata} onClick={handleClick}> {textForButton} </button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {airportID !== "no id" && (
        <DeparturesList key={forceUpdate} 
          text={airportID} 
          getCount={handleDepartureCountChange}/>
      )}
    </div>
  );

};


export default AirportList