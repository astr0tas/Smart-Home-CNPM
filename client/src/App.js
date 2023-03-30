import logo from './logo.svg';
import './App.css';
import { BsFillPersonFill } from "react-icons/bs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';

function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Login /> }>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;