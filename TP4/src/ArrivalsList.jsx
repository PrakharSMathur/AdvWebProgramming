import { useEffect, useState } from 'react'

function ArrivalsList({text, getCount, getArrivals}) {
  const [flights, setFlights] = useState([])
  const [numberOfFlights, setnumberOfFlights] = useState([])

  const airportID = text
  
  const fetchArrivals = async (airportID) => {
    try {
        // Make the API call using fetch
        console.log(airportID)
        let url = 'https://www.skyscanner.com/g/arrival-departure-svc/api/airports/'+airportID+'/arrivals';
        const response = await fetch(url);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Extract data from the response
        const data = await response.json();

        setFlights(data.arrivals)
        setnumberOfFlights(data.arrivals.length);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    // Check if the component is mounted before calling fetchDepartures
    let isMounted = true;

    if (isMounted) {
      fetchArrivals(airportID);
    }

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [airportID]);

  useEffect(() => {
    getCount(numberOfFlights);
    getArrivals(flights);

  }, [numberOfFlights, flights, getCount, getArrivals]);

};

export default ArrivalsList