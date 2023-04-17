import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';
import AdminNavbar from './component/adminnavbar';
import UserNavbar from './component/usernavbar';
import Device from './component/device';
import Sensor from './component/sensor';
import SensorDetail from './component/sensor_detail';
import DeviceList from './component/device_list';
import SensorList from './component/sensor_list';
import 'bootstrap/dist/css/bootstrap.min.css';


function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Login /> } />
          <Route element={ <UserNavbar /> }>

            <Route>
              <Route path="/device" element={ <Device /> } />
              <Route path="/device/:type/list" element={ <DeviceList /> } />
            </Route>

            <Route>
              <Route path="/sensor" element={ <Sensor /> } />
              <Route path='/sensor/:type/:id' element={ <SensorDetail /> } />
            </Route>

          </Route>

          <Route path="/admin">
            <Route element={ <AdminNavbar /> }>

              <Route>
                <Route path="device" element={ <Device /> } />
                <Route path="device/:type/list" element={ <DeviceList /> } />
              </Route>

              <Route>
                <Route path="sensor" element={ <Sensor /> } />
                <Route path="sensor/:type/list" element={ <SensorList /> } />
                <Route path='sensor/:type/:id' element={ <SensorDetail /> } />
              </Route>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;