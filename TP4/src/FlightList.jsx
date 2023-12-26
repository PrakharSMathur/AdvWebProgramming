import React, { useState, useEffect } from 'react';
import { Table, Container, Grid } from 'semantic-ui-react';

function FlightList({ airportID, arrivalsData, departuresData }) {
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    setArrivals(arrivalsData);
  }, [arrivalsData]);

  useEffect(() => {
    setDepartures(departuresData);
  }, [departuresData]);

  return (
    <Container>
      <Grid columns={2} divided>
        <Grid.Row>
          {/* Arrivals Table */}
          <Grid.Column>
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
          </Grid.Column>

          {/* Departures Table */}
          <Grid.Column>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default FlightList;