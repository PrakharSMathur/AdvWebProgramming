import './MenuStyle.css'
import {useState} from 'react';
import {Menu} from 'semantic-ui-react';
import AirportList from './AirportList';
import FlightList from './FlightList.jsx';

function MenuBar() {
    const [activeTab, setActiveTab] = useState('airport');
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [arrivals, setArrivals] = useState([])
    const [departures, setDepartures] = useState([])

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    function handleDepartures(data) {
        setDepartures(data)
        // console.log(departures);
    }

    function handleArrivals(data) {
        setArrivals(data)
        // console.log(arrivals);
    }

    function handleAirport(data) {
        // setViewFlight(data);
        setSelectedAirport(data);
        // Switch to the "flights" tab when clicking "View Flights"
        setActiveTab('flights');
    }

    return (
        <div>
            <Menu attached='top' tabular style={menuStyle}>
                <Menu.Item
                    name='airport'
                    active={activeTab === 'airport'}
                    onClick={() => handleTabChange('airport')}
                    style={menuItemStyle}
                >
                    Airport
                </Menu.Item>
                <Menu.Item
                    name='flights'
                    active={activeTab === 'flights'}
                    onClick={() => handleTabChange('flights')}
                    style={menuItemStyle}
                >
                    Flights
                </Menu.Item>
            </Menu>

            {activeTab === 'airport' && (
                <AirportList textForRefreshButton="Refresh"
                             textForViewFlightsButton="View flights"
                             getArrivals={handleArrivals}
                             getDepartures={handleDepartures}
                             getAirport={handleAirport}/>
            )}
            {activeTab === 'flights' && selectedAirport.iata  && (
                <FlightList
                    airport={selectedAirport}
                    arrivalsData={arrivals}
                    departuresData={departures}
                />

            )}

        </div>
    );
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
export default MenuBar;


