import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Atoms/Navbar/Navbar';
import HomePage from './Components/Pages/HomePage/HomePage';
import WorkSpace from './Components/Pages/WorkSpace/WorkSpace';
import Overview from './Components/Pages/HomePage/HomePage'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/managetasks' element={<WorkSpace/>}></Route>

        <Route path='/managetasks/:id' element={<WorkSpace/>}  />
      </Routes>
    </div>
  );
}

export default App;
