import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';
import AdminNavbar from './component/adminnavbar';
import UserNavbar from './component/usernavbar';
import Device from './component/device';
import 'bootstrap/dist/css/bootstrap.min.css';


function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Login /> } />
          <Route element={ <UserNavbar /> }>
            <Route path="/device" element={ <Device /> } />
          </Route>
          <Route path="/admin">
            <Route element={ <AdminNavbar /> }>
              <Route path="device" element={ <Device /> } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;