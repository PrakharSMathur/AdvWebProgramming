import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DeparturesList from './DeparturesList.jsx'
import AirportList from './AirportList.jsx'

function App() {
  const [count, setCount] = useState(0)
  let [dataForParagraph, setDataforParagraph] = useState("Loading in progress...")
  function giveButtonDataToParagraph(dataFromButton){
          setDataforParagraph(dataFromButton)
        }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Arrivals + Departures</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        
        <AirportList textForButton="Refresh"
          funtionFromParent={giveButtonDataToParagraph}/>
        <DeparturesList text={dataForParagraph}/>
        {/* <AirportList /> */}
        {/* <DeparturesList text="BRU"/> */}
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App