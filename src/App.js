import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OverviewContainer from './containers/OverviewContainer';

function App() {
  return (
    <>
    <h1>ZigZagStats.com</h1>
    <OverviewContainer></OverviewContainer>
    </>
  );
}

export default App;
