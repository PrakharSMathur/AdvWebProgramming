// import { useState, useEffect } from 'react';
// import { Table, Container, Grid, Menu, Segment } from 'semantic-ui-react';
// import './MenuStyle.css'
// import {render} from "react-dom";
// import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
// import { TileLayer } from 'https://cdn.esm.sh/react-leaflet/TileLayer'
// import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'
// function FlightList({ airportID, arrivalsData, departuresData }) {
//     const [arrivals, setArrivals] = useState([]);
//     const [departures, setDepartures] = useState([]);
//     const [activeTab, setActiveTab] = useState('arrivals');
//
//     useEffect(() => {
//         setArrivals(arrivalsData);
//     }, [arrivalsData]);
//
//     useEffect(() => {
//         setDepartures(departuresData);
//     }, [departuresData]);
//
//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };
//
//     return (
//         <Container>
//             <Segment placeholder>
//                 <Menu attached='top'  style={menuStyle}>
//                     <Menu.Item
//                         name='arrivals'
//                         active={activeTab === 'arrivals'}
//                         onClick={() => handleTabChange('arrivals')}
//                         style={menuItemStyle}
//                     >
//                         Arrivals
//                     </Menu.Item>
//                     <Menu.Item
//                         name='departures'
//                         active={activeTab === 'departures'}
//                         onClick={() => handleTabChange('departures')}
//                         style={menuItemStyle}
//                     >
//                         Departures
//                     </Menu.Item>
//                 </Menu>
//
//                 <Grid columns={2} stackable textAlign={'center'}>
//                     <Grid.Column>
//                         {activeTab === 'arrivals' && (
//                             <Table celled>
//                                 <Table.Header>
//                                     <Table.Row>
//                                         <Table.HeaderCell>Flight ID</Table.HeaderCell>
//                                         <Table.HeaderCell>Arrival Time</Table.HeaderCell>
//                                         <Table.HeaderCell>Airline Name</Table.HeaderCell>
//                                         <Table.HeaderCell>Origin</Table.HeaderCell>
//                                         <Table.HeaderCell>Departed At</Table.HeaderCell>
//                                     </Table.Row>
//                                 </Table.Header>
//                                 <Table.Body>
//                                     {arrivals.map((flight, index) => (
//                                         <Table.Row key={index}>
//                                             <Table.Cell>{flight.flightNumber}</Table.Cell>
//                                             <Table.Cell>{flight.scheduledArrivalTime}</Table.Cell>
//                                             <Table.Cell>{flight.airlineName}</Table.Cell>
//                                             <Table.Cell>{flight.departureAirportCode}</Table.Cell>
//                                             <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
//                                         </Table.Row>
//                                     ))}
//                                 </Table.Body>
//                             </Table>
//                         )}
//                     </Grid.Column>
//
//                     <Grid.Column>
//                         {activeTab === 'departures' && (
//                             <Table celled>
//                                 <Table.Header>
//                                     <Table.Row>
//                                         <Table.HeaderCell>Flight ID</Table.HeaderCell>
//                                         <Table.HeaderCell>Departure Time</Table.HeaderCell>
//                                         <Table.HeaderCell>Airline Name</Table.HeaderCell>
//                                         <Table.HeaderCell>Destination</Table.HeaderCell>
//                                         <Table.HeaderCell>Arrives At</Table.HeaderCell>
//                                     </Table.Row>
//                                 </Table.Header>
//                                 <Table.Body>
//                                     {departures.map((flight, index) => (
//                                         <Table.Row key={index}>
//                                             <Table.Cell>{flight.flightNumber}</Table.Cell>
//                                             <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
//                                             <Table.Cell>{flight.airlineName}</Table.Cell>
//                                             <Table.Cell>{flight.arrivalAirportCode}</Table.Cell>
//                                             <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
//                                         </Table.Row>
//                                     ))}
//                                 </Table.Body>
//                             </Table>
//                         )}
//                     </Grid.Column>
//                 </Grid>
//             </Segment>
//         </Container>
//
//     );
//
//     const position = [51.505, -0.09]
//
//     render(
//         <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position}>
//                 <Popup>
//                     A pretty CSS3 popup. <br /> Easily customizable.
//                 </Popup>
//             </Marker>
//         </MapContainer>
//     )
// }
//
// const menuStyle = {
//     display: 'flex',
//     justifyContent: 'space-around',
//     backgroundColor: '#f4f4f4', // Set your desired background color
//     borderBottom: '1px solid #ddd', // Add a border at the bottom
// };
//
// const menuItemStyle = {
//     padding: '10px 20px', // Adjust padding for better spacing
//     cursor: 'pointer',
// };
// export default FlightList;
import React, { useState, useEffect } from 'react';
import { Table, Container, Grid, Menu, Segment } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import airportsData from './airports.json'; // Assuming you save the JSON file locally

function FlightList({ airportID, arrivalsData, departuresData }) {
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
        return airport ? [airport.lat, airport.lon] : null;
    };

    const getMarkersAndLines = () => {
        const markers = [];
        const lines = [];

        const tableData = activeTab === 'arrivals' ? arrivals : departures;
        const destinationIata = activeTab === 'arrivals' ? airportID : null;

        const centerLatLng = getAirportLatLng(arrivals[0].departureAirportCode);

        tableData.forEach((flight) => {
            const originLatLng = getAirportLatLng(flight.departureAirportCode);
            const destinationLatLng =
                activeTab === 'arrivals'
                    ? getAirportLatLng(destinationIata)
                    : getAirportLatLng(flight.arrivalAirportCode);

            if (originLatLng && destinationLatLng) {
                // Subtracting the center coordinates to anchor the markers and lines to the map
                const adjustedOrigin = [originLatLng[0] - centerLatLng[0], originLatLng[1] - centerLatLng[1]];
                const adjustedDestination = [destinationLatLng[0] - centerLatLng[0], destinationLatLng[1] - centerLatLng[1]];

                markers.push(
                    <Marker key={`marker-${flight.flightNumber}`} position={adjustedOrigin}>
                        <Popup>{flight.departureAirportCode}</Popup>
                    </Marker>
                );

                markers.push(
                    <Marker key={`marker-${flight.flightNumber}-destination`} position={adjustedDestination}>
                        <Popup>{activeTab === 'arrivals' ? airportID : flight.arrivalAirportCode}</Popup>
                    </Marker>
                );

                lines.push(
                    <Polyline key={`line-${flight.flightNumber}`} positions={[adjustedOrigin, adjustedDestination]} color="blue" />
                );
            }
        });

        return { markers, lines };
    };

    const { markers, lines } = getMarkersAndLines();

    return (
        <Container>
            <Segment placeholder>
                <Menu attached="top" inverted>
                    <Menu.Item
                        name="arrivals"
                        active={activeTab === 'arrivals'}
                        onClick={() => handleTabChange('arrivals')}
                    >
                        Arrivals
                    </Menu.Item>
                    <Menu.Item
                        name="departures"
                        active={activeTab === 'departures'}
                        onClick={() => handleTabChange('departures')}
                    >
                        Departures
                    </Menu.Item>
                </Menu>

                <Grid columns={2} stackable textAlign={'center'}>
                    <Grid.Column>
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
                                            <Table.Cell>{flight.scheduledArrivalTime}</Table.Cell>
                                            <Table.Cell>{flight.airlineName}</Table.Cell>
                                            <Table.Cell>{flight.departureAirportCode}</Table.Cell>
                                            <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
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
                                            <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
                                            <Table.Cell>{flight.airlineName}</Table.Cell>
                                            <Table.Cell>{flight.arrivalAirportCode}</Table.Cell>
                                            <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}
                    </Grid.Column>

                    <Grid.Column>
                        <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {markers}
                            {lines}
                        </MapContainer>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    );
}

export default FlightList;
