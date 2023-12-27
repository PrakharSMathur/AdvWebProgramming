import { useEffect, useState } from 'react'

function DeparturesList({text, getCount, getDepartures}) {
  const [flights, setFlights] = useState([])
  const [numberOfFlights, setnumberOfFlights] = useState([])

  const airportID = text
  
  const fetchDepartures = async (airportID) => {
    try {
        // Make the API call using fetch
        console.log(airportID)
        let url = 'https://www.skyscanner.com/g/arrival-departure-svc/api/airports/'+airportID+'/departures';
        const response = await fetch(url);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Extract data from the response
        const data = await response.json();

        setFlights(data.departures)
        setnumberOfFlights(data.departures.length);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    // Check if the component is mounted before calling fetchDepartures
    let isMounted = true;

    if (isMounted) {
      fetchDepartures(airportID);
    }

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [airportID]);

  useEffect(() => {
    getCount(numberOfFlights);
    getDepartures(flights);

  }, [numberOfFlights, flights, getCount, getDepartures]);


};

export default DeparturesList