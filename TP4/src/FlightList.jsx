
import  { useState, useEffect } from 'react';
import { Table, Container, Menu, Segment } from 'semantic-ui-react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    LayersControl,
    LayerGroup
} from 'react-leaflet';
import SplitPane from 'react-split-pane';
import airportsData from './airports.json';
import './MenuStyle.css'


function FlightList({ airport: airport, arrivalsData, departuresData, switchToAirportList }) {
    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [activeTab, setActiveTab] = useState('arrivals');

    useEffect(() => {
        setArrivals(arrivalsData);
    }, [arrivalsData]);

    useEffect(() => {
        setDepartures(departuresData);
    }, [departuresData]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };



    const getAirportLatLng = (iataCode) => {
        const airport = airportsData.find((airport) => airport.iata === iataCode);
        return airport ? [airport.lat, airport.lon] : [0, 0]; // Return [0, 0] if airport data is not found
    };

    const getMarkersAndLines = () => {
        const markers = [];
        const lines = [];

        const tableData = activeTab === 'arrivals' ? arrivals : departures;
        // const destinationIata = activeTab === 'arrivals' ? airportID : null;
        console.log("Arrivals");
        console.log(arrivals);
        console.log("tableData");
        console.log(tableData);
        if (arrivals.length > 0) {
            const centerLatLng = getAirportLatLng(arrivals[0]?.arrivalAirportCode); // Use arrival airport for center
            console.log(centerLatLng);
            tableData.forEach((flight) => {

                let adjustedOrigin, adjustedDestination;

                if (activeTab === 'arrivals') {

                    adjustedDestination = [centerLatLng[0], centerLatLng[1]];
                    adjustedOrigin = [
                        getAirportLatLng(flight.departureAirportCode)[0],
                        getAirportLatLng(flight.departureAirportCode)[1],
                    ];
                }

                if (activeTab === 'departures') {
                    adjustedOrigin = [centerLatLng[0], centerLatLng[1]];
                    adjustedDestination = [
                        getAirportLatLng(flight.arrivalAirportCode)[0],
                        getAirportLatLng(flight.arrivalAirportCode)[1],
                    ];
                }

                markers.push(
                    <Marker key={`marker-${flight.flightNumber}`} position={adjustedOrigin}>
                        <Popup>
                            {
                                <div>
                                    <div>Departure Airport</div>
                                    <div>Airport IATA: {flight.departureAirportCode}</div>
                                    <div>Airport Name: {flight.departureAirportName}</div>
                                    <div>Airline Name: {flight.airlineName}</div>
                                    <div>Flight Number: {flight.flightNumber}</div>
                                    <div>Arrival Time: {flight.scheduledArrivalTime}</div>
                                    <div> Departure Time: {flight.scheduledDepartureTime}</div>
                                </div>
                            }</Popup>
                    </Marker>
                );

                markers.push(
                    <Marker
                        key={`marker-${flight.flightNumber}-destination`}
                        position={adjustedDestination}
                    >
                        <Popup>
                            {/*{activeTab === 'arrivals' ? airport : flight.arrivalAirportCode}*/}
                            <div>
                                <div>Arrival Airport</div>
                                <div>Airport IATA: {flight.arrivalAirportCode}</div>
                                <div>Airport Name: {flight.arrivalAirportName}</div>
                                <div>Airline Name: {flight.airlineName}</div>
                                <div>Flight Number: {flight.flightNumber}</div>
                                <div>Arrival Time: {flight.scheduledArrivalTime}</div>
                                   <div> Departure Time: {flight.scheduledDepartureTime}</div>
                            </div>
                        </Popup>
                    </Marker>
                );

                lines.push(
                    <Polyline
                        key={`line-${flight.flightNumber}`}
                        positions={[adjustedOrigin, adjustedDestination]}
                        color="blue"
                    />
                );
                // }
            });
        }

        return { markers, lines };
    };

    const { markers, lines } = getMarkersAndLines();



    return (
        <Container>
            <Segment placeholder>
                <Menu attached="top" inverted tabular style={menuStyle}>
                    <Menu.Item
                        name="arrivals"
                        active={activeTab === 'arrivals'}
                        onClick={() => handleTabChange('arrivals')}
                        style={menuItemStyle}
                    >
                        Arrivals
                    </Menu.Item>
                    <Menu.Item
                        name="departures"
                        active={activeTab === 'departures'}
                        onClick={() => handleTabChange('departures')}
                        style={menuItemStyle}
                    >
                        Departures
                    </Menu.Item>
                </Menu>

                <SplitPane split="vertical" minSize={100} defaultSize={400}>
                    <div>
                        {activeTab === 'arrivals' && (
                            <Table celled>
                                {/* Arrival table content */}
                                {/* ... */}
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Flight ID</Table.HeaderCell>
                                        <Table.HeaderCell>Arrival Time</Table.HeaderCell>
                                        <Table.HeaderCell>Airline Name</Table.HeaderCell>
                                        <Table.HeaderCell>Origin</Table.HeaderCell>
                                        <Table.HeaderCell>Departed At</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {arrivals.map((flight, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{flight.flightNumber}</Table.Cell>
                                            <Table.Cell>{formatTimestamp(flight.scheduledArrivalTime)}</Table.Cell>
                                            <Table.Cell>{flight.airlineName}</Table.Cell>
                                            <Table.Cell>{flight.departureAirportCode}</Table.Cell>
                                            <Table.Cell>{formatTimestamp(flight.scheduledDepartureTime)}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}

                        {activeTab === 'departures' && (
                            <Table celled>
                                {/* Departure table content */}
                                {/* ... */}
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Flight ID</Table.HeaderCell>
                                        <Table.HeaderCell>Departure Time</Table.HeaderCell>
                                        <Table.HeaderCell>Airline Name</Table.HeaderCell>
                                        <Table.HeaderCell>Destination</Table.HeaderCell>
                                        <Table.HeaderCell>Arrives At</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {departures.map((flight, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{flight.flightNumber}</Table.Cell>
                                            <Table.Cell>{formatTimestamp(flight.scheduledDepartureTime)}</Table.Cell>
                                            <Table.Cell>{flight.airlineName}</Table.Cell>
                                            <Table.Cell>{flight.arrivalAirportCode}</Table.Cell>
                                            <Table.Cell>{formatTimestamp(flight.scheduledDepartureTime)}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}
                    </div>

                    <div>
                        <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />

                            <LayersControl position="topright">
                                <LayersControl.Overlay checked name="Flight Paths">
                                    <LayerGroup>{lines}</LayerGroup>
                                </LayersControl.Overlay>
                                <LayersControl.Overlay checked name="Markers">
                                    <LayerGroup>{markers}</LayerGroup>
                                </LayersControl.Overlay>
                            </LayersControl>
                        </MapContainer>
                    </div>
                </SplitPane>

                <button onClick={switchToAirportList}>Switch to Airport List</button>
            </Segment>
        </Container>
    );
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust options as needed for the desired format
}


const menuStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f4f4f4', // Set your desired background color
    borderBottom: '1px solid #ddd', // Add a border at the bottom
    marginTop: '10px', // Add margin at the top
};

const menuItemStyle = {
    padding: '10px 20px', // Adjust padding for better spacing
    cursor: 'pointer',
};
export default FlightList;
