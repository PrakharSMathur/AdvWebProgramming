import { useState, useEffect } from 'react';
import { Table, Container, Grid, Menu, Segment } from 'semantic-ui-react';
import './MenuStyle.css'
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

    return (
        <Container>
            <Segment placeholder>
                <Menu pointing secondary style={menuStyle}>
                    <Menu.Item
                        name='arrivals'
                        active={activeTab === 'arrivals'}
                        onClick={() => handleTabChange('arrivals')}
                        style={menuItemStyle}
                    >
                        Arrivals
                    </Menu.Item>
                    <Menu.Item
                        name='departures'
                        active={activeTab === 'departures'}
                        onClick={() => handleTabChange('departures')}
                        style={menuItemStyle}
                    >
                        Departures
                    </Menu.Item>
                </Menu>

                <Grid columns={2} stackable textAlign={'center'}>
                    <Grid.Column>
                        {activeTab === 'arrivals' && (
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Flight ID</Table.HeaderCell>
                                        <Table.HeaderCell>Arrival Time</Table.HeaderCell>
                                        <Table.HeaderCell>Airline Name</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {arrivals.map((flight, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{flight.flightNumber}</Table.Cell>
                                            <Table.Cell>{flight.scheduledArrivalTime}</Table.Cell>
                                            <Table.Cell>{flight.airlineName}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}
                    </Grid.Column>

                    <Grid.Column>
                        {activeTab === 'departures' && (
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Flight ID</Table.HeaderCell>
                                        <Table.HeaderCell>Departure Time</Table.HeaderCell>
                                        <Table.HeaderCell>Airline Name</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {departures.map((flight, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{flight.flightNumber}</Table.Cell>
                                            <Table.Cell>{flight.scheduledDepartureTime}</Table.Cell>
                                            <Table.Cell>{flight.airlineName}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    );
}

const menuStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f4f4f4', // Set your desired background color
    borderBottom: '1px solid #ddd', // Add a border at the bottom
};

const menuItemStyle = {
    padding: '10px 20px', // Adjust padding for better spacing
    cursor: 'pointer',
};
export default FlightList;
