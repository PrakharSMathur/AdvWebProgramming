import { useState} from 'react'
import { Table } from 'semantic-ui-react'

function FlightList({airportID, arrivals, departures}) {
  const [flights, setFlights] = useState([])
  function addFlights(data){
    setFlights(data)
  }
  addFlights(departures)

  return (
    <div>
      <p>Hello {airportID}</p>
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

export default FlightList