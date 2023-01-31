// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import Favourites from './Components/Favourites';
import { BrowserRouter,Route,Switch } from 'react-router-dom'
function App() {
  return (
    <div>
      <Navbar />
      {/* <Banner />
      <List /> */}
      <Favourites />
    </div>
  );
}

export default App;
