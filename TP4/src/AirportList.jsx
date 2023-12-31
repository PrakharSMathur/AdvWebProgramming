import { useEffect, useState } from 'react'
import { Table, Input } from 'semantic-ui-react'
import DeparturesList from './DeparturesList.jsx'
import ArrivalsList from './ArrivalsList.jsx'
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SplitPane from 'react-split-pane';


function AirportList({textForRefreshButton, textForViewFlightsButton, getArrivals, getDepartures, getAirport}) {
  const [airports, setAirports] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [refreshTimestamp, setRefreshTimestamp] = useState({});
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // State to store refreshed airports
  const [refreshedAirports, setRefreshedAirports] = useState([]);

  // Using an object to store arrival and departure counts for each airport
  const [counts, setCounts] = useState({});

  const [airportID, setAirportID] = useState("no id");

  function handleDepartureCountChange(dataFromButton, iata) {
    setCounts((prevCounts) => {
      if (prevCounts[iata]?.departureCount !== dataFromButton) {
        return {
          ...prevCounts,
          [iata]: {
            ...prevCounts[iata],
            departureCount: dataFromButton,
          },
        };
      }
      return prevCounts;
    });
  }

  function handleArrivalCountChange(dataFromButton, iata) {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [iata]: {
        ...prevCounts[iata],
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

    // Add the clicked airport to the refreshedAirports state
    setRefreshedAirports((prevAirports) => {
      const clickedAirport = airports.find((airport) => airport.iata === clickedAirportID);
      return [...prevAirports, clickedAirport];
    });

    setForceUpdate((prev) => !prev); // Toggle the dummy state to force a re-render
  }

  function handleViewFlightsClick(airport){
    handleRefreshClick();
    getAirport(airport);  // share selected airport data
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

        // Filter data to retain only entries with valid airport IATA codes (or names)
        // and latitude and longitude information
        const filteredData = data.filter(
          (airport) => airport.iata && airport.lat && airport.lon
        );

        setAirports(filteredData);
        filterAirports(filteredData);
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


  // Function to get markers for airports with refresh timestamps
  const RefreshedMarkers = refreshedAirports
      .filter(
        (airport) =>
          airport.lat &&
          airport.lon &&
          refreshTimestamp[airport.iata]
      )
      .map((airport, index) => (
        <Marker
          key={index}
          position={[airport.lat, airport.lon]}
        >
          <Popup>{
            <div>
            <div>Airport IATA: {airport.iata}</div>
            <div>Airport Name: {airport.name}</div>
            <div>Arrivals #: {counts[airport.iata]?.arrivalCount || ' - '}</div>
            <div>Departures #: {counts[airport.iata]?.departureCount || ' - '}</div>
            <div>Latitude: {airport.lat}</div>
            <div>Longitude: {airport.lon}</div>
            <div>
              <button id={airport.iata} onClick={() => handleViewFlightsClick(airport)}>
                View Flights
              </button>
            </div>
          </div>
          }</Popup>
        </Marker>
      ));
  
  // Create a layer control for refreshed airports
  const RefreshedAirportsLayer = (
    <LayersControl.Overlay
      checked
      name="Refreshed Airports"
      key="refreshedAirportsLayer"
    >
      <LayerGroup>{RefreshedMarkers}</LayerGroup>
    </LayersControl.Overlay>
  );

  // Create a LayerGroup for all airports
  const AllAirportsLayer = (
    <LayerGroup key="allAirports">
      {filteredAirports.map((airport, index) => (
        <Marker key={index} position={[airport.lat, airport.lon]}>
          <Popup>{
            <div>
              <div>Airport IATA: {airport.iata}</div>
              <div>Airport Name: {airport.name}</div>
              <div>Latitude: {airport.lat}</div>
              <div>Longitude: {airport.lon}</div>
            </div>
          }</Popup>
        </Marker>
      ))}
    </LayerGroup>
  );

  return (
    <SplitPane
      split="vertical"
      minSize={200}
      defaultSize={700}
      maxSize={800}
      style={{ display: 'flex', height: '100vh' }}
    >
      {/* Left half: Airport Table */}
      <div style={{ flex: 1, paddingRight: '10px', overflowY: 'auto' , height: '100%' }}>
        {/* Search Bar */}
        <Input
          icon="search"
          placeholder="Search Airports..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <p style={{ margin: '10px' }} />

        <div style={{ overflowY: 'auto', height: 'calc(100% - 50px)' }}>
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
                  <Table.Cell>{airport.iata}</Table.Cell>
                  <Table.Cell>{airport.name}</Table.Cell>
                  <Table.Cell>
                    {counts[airport.iata]?.arrivalCount || ' - '}
                  </Table.Cell>
                  <Table.Cell>
                    {counts[airport.iata]?.departureCount || ' - '}
                  </Table.Cell>
                  <Table.Cell>
                    {refreshTimestamp[airport.iata] !== null
                      ? refreshTimestamp[airport.iata] || 'N/A' : 'N/A'}
                  </Table.Cell>
                  <Table.Cell>
                    <button id={airport.iata} onClick={handleRefreshClick}>
                      {' '}{textForRefreshButton}{' '}
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button id={airport.iata} onClick={() => handleViewFlightsClick(airport)}>
                      {' '}{textForViewFlightsButton}{' '}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {airportID !== 'no id' && forceUpdate &&(
            <>
              {/* DeparturesList */}
              <DeparturesList
                key={`departures_${forceUpdate}`}
                text={airportID}
                getCount={(data) =>handleDepartureCountChange(data, airportID)}
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
      </div>

      {/* Right half: Leaflet Map */}
      <div style={{ flex: 1, height: '100%', marginLeft: '10px' }}>
        <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
         >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        
        <LayersControl position="topright">
            {/* Display all airports as a layer (turned off by default) */}
          <LayersControl.Overlay checked={false} name="All Airports">
            {AllAirportsLayer}
          </LayersControl.Overlay>
          {/* Display markers for airports with refresh timestamps */}
          <LayersControl.Overlay>
            {RefreshedAirportsLayer}
          </LayersControl.Overlay>
        </LayersControl>
        </MapContainer>
      </div>
    </SplitPane>
  );

};


export default AirportList