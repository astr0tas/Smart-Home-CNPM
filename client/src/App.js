import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';
import AdminNavbar from './component/adminnavbar';
import UserNavbar from './component/usernavbar';
import Sensor from './component/sensor';
import 'bootstrap/dist/css/bootstrap.min.css';


function App()
{
  return (
    <div className="App d-flex flex-column justify-content-center">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Login /> } />
          <Route element={ <UserNavbar /> }>
            <Route path="/sensor" element={ <Sensor /> } />
          </Route>
          <Route path="/admin">
            <Route element={ <AdminNavbar /> }>
              <Route path="sensor" element={ <Sensor /> } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;