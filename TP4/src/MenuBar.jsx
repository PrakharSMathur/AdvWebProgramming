// import React, { useState } from 'react';
// import { Menu } from 'semantic-ui-react';
// import AirportList from './AirportList';
// import FlightList from './FlightList.jsx';
//
// function MenuBar() {
//     const [activeTab, setActiveTab] = useState('airport');
//     const [selectedAirport, setSelectedAirport] = useState(null);
//
//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };
//
//     const handleAirportClick = (airportID) => {
//         setSelectedAirport(airportID);
//     };
//
//     return (
//         <div>
//             <Menu attached='top' tabular>
//
//                 <Menu.Item
//                     name='airport'
//                     active={activeTab === 'airport'}
//                     onClick={() => handleTabChange('airport')}
//                 >
//                     Airport
//                 </Menu.Item>
//                 <Menu.Item
//                     name='departures'
//                     active={activeTab === 'flights'}
//                     onClick={() => handleTabChange('flights')}
//                 >
//                     Departures
//                 </Menu.Item>
//             </Menu>
//
//             {activeTab === 'airport' && (
//                 <AirportList
//                     textForButton="Refresh"
//                     getAirportID={handleAirportClick}
//                 />
//             )}
//
//             {activeTab === 'flights' && selectedAirport && (
//                 <FlightList airportID={selectedAirport} />
//             )}
//         </div>
//     );
// }
//
// export default MenuBar;

import {useState} from 'react';
import {Menu} from 'semantic-ui-react';
import AirportList from './AirportList';
import FlightList from './FlightList.jsx';

function MenuBar() {
    const [activeTab, setActiveTab] = useState('airport');
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [arrivals, setArrivals] = useState([])
    const [departures, setDepartures] = useState([])
    const [viewFlight, setViewFlight] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    function handleDepartures(data) {
        setDepartures(data)
        console.log(departures);
    }

    function handleArrivals(data) {
        setArrivals(data)
        console.log(arrivals);
    }

    function handleAirportID(data) {
        setSelectedAirport(data);
    }

    function handleViewFlight(data) {
        setViewFlight(data);
    }

    return (
        <div>
            <Menu attached='top' tabular>
                <Menu.Item
                    name='airport'
                    active={activeTab === 'airport'}
                    onClick={() => handleTabChange('airport')}
                >
                    Airport
                </Menu.Item>
                <Menu.Item
                    name='flights'
                    active={activeTab === 'flights'}
                    onClick={() => handleTabChange('flights')}
                >
                    Flights
                </Menu.Item>
            </Menu>

            {activeTab === 'airport' && (
                <AirportList textForButton={"Refresh"} textForRefreshButton="Refresh"
                             textForViewFlightsButton="View flights"
                             getAirportID={handleAirportID}
                             getArrivals={handleArrivals}
                             getDepartures={handleDepartures}
                             getViewFlightBool={handleViewFlight}/>
            )}

            {activeTab === 'flights' && selectedAirport && viewFlight && (
                <FlightList
                    airportID={selectedAirport}
                    arrivalsData={arrivals}
                    departuresData={departures}
                />

            )}

        </div>
    );
}

export default MenuBar;


