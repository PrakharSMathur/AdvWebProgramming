import { useEffect, useState } from 'react'
import { Table, Input } from 'semantic-ui-react'
import DeparturesList from './DeparturesList.jsx'
import ArrivalsList from './ArrivalsList.jsx'


function AirportList({textForRefreshButton, textForViewFlightsButton, getAirportID, getArrivals, getDepartures, getViewFlightBool}) {
  const [airports, setAirports] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [viewFlight, setViewFlight] = useState(false);
  const [refreshTimestamp, setRefreshTimestamp] = useState({});
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Using an object to store arrival and departure counts for each airport
  const [counts, setCounts] = useState({});

  const [airportID, setAirportID] = useState("no id");

  function handleDepartureCountChange(dataFromButton, airportId) {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [airportId]: {
        ...prevCounts[airportId],
        departureCount: dataFromButton,
      },
    }));
  }

  function handleArrivalCountChange(dataFromButton, airportId) {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [airportId]: {
        ...prevCounts[airportId],
        arrivalCount: dataFromButton,
      },
    }));
  }

  function handleDepartures(dataFromButton){
    setDepartures(dataFromButton)
    getDepartures(departures); // Pass data back to parent
    // console.log(departures);
  }
  function handleArrivals(dataFromButton){
    setArrivals(dataFromButton)
    getArrivals(arrivals); // Pass data back to parent
    // console.log(arrivals);
  }
  

  function handleRefreshClick(){
    const clickedAirportID = event.target.id;
    setAirportID(clickedAirportID);
    setRefreshTimestamp((prevTimestamps) => ({
      ...prevTimestamps,
      [clickedAirportID]: new Date().toLocaleTimeString(),
    }));

    setForceUpdate((prev) => !prev); // Toggle the dummy state to force a re-render
  }

  function handleViewFlightsClick(){
    setViewFlight((prev) => !prev);
    getViewFlightBool(viewFlight);
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
        setAirports(data);
        filterAirports(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
  };

  const filterAirports = (data) => {
    const filtered = data.filter(
      (airport) =>
        (airport.iata && airport.iata.toLowerCase().includes(searchInput.toLowerCase())) ||
        (airport.name && airport.name.toLowerCase().includes(searchInput.toLowerCase()))
    );
    setFilteredAirports(filtered);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    filterAirports(airports); // Filter airports based on the updated search input
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  useEffect(() => {
    getAirportID(airportID);
  }, [airportID, getAirportID]);


  return (
    <div>
      {/* Search Bar */}
      <Input
        icon="search"
        placeholder="Search Airports..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <p style={{ margin: '10px' }}/>


      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Airport ID</Table.HeaderCell>
            <Table.HeaderCell>Airport Name</Table.HeaderCell>
            <Table.HeaderCell>Number of Arrivals</Table.HeaderCell>
            <Table.HeaderCell>Number of Departures</Table.HeaderCell>
            <Table.HeaderCell>Last Refresh</Table.HeaderCell>
            <Table.HeaderCell>Refresh</Table.HeaderCell>
            <Table.HeaderCell>View Flights</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredAirports.map((airport, index) => (
            <Table.Row key={index}>
              <Table.Cell >{airport.iata}</Table.Cell>
              <Table.Cell >{airport.name}</Table.Cell>
              <Table.Cell >{counts[airport.iata]?.arrivalCount || " - "}</Table.Cell>
              <Table.Cell >{counts[airport.iata]?.departureCount || " - "}</Table.Cell>
              <Table.Cell >{refreshTimestamp[airport.iata] !== null ? refreshTimestamp[airport.iata] || 'N/A' : 'N/A'}</Table.Cell>
              <Table.Cell ><button id={airport.iata} onClick={handleRefreshClick}> {textForRefreshButton} </button></Table.Cell>
              <Table.Cell ><button id={airport.iata} onClick={handleViewFlightsClick}> {textForViewFlightsButton} </button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {airportID !== "no id" && (
        <>
          {/* DeparturesList */}
          <DeparturesList
            key={`departures_${forceUpdate}`}
            text={airportID}
            getCount={(data) => handleDepartureCountChange(data, airportID)}
            getDepartures={(data) => handleDepartures(data, airportID)}
          />

          {/* ArrivalsList */}
          <ArrivalsList
            key={`arrivals_${forceUpdate}`}
            text={airportID}
            getCount={(data) => handleArrivalCountChange(data, airportID)}
            getArrivals={(data) => handleArrivals(data, airportID)}
          />
        </>
      )}
    </div>
  );

};


export default AirportList