import './App.css'
import TableComponent from './components/TableComponent'
import ScoreComponent from './components/ScoreComponent'
import EuchreComponent from './components/EuchreComponent';

//import Clubs from './assets/images/Suits/Clubs.png'


function App() {

 
  return (
    <>
        <div className="game">
          <EuchreComponent>
            <ScoreComponent/>
            <TableComponent/>
          </EuchreComponent>
        </div>
    </>
  )
}

export default App
