import logo from './logo.svg';
import './App.scss';
// import { GoogleMap, useLoadScript, Marker } from "react-google-maps"

import Home from "./components/Home"
import Chat from "./components/Chat"

function App() {

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API);
  console.log(process.env.NODE_ENV);

  return (
    <div className="App">
      <Home/>
      <Chat/>
    </div>
  );
}

export default App;
