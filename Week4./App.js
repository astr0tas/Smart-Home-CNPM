import logo from './logo.svg';
import './App.css';
import { BsFillPersonFill } from "react-icons/bs";

function App() {
  return (
    <div className="App">
      <div id='pic'>
       <img src='https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig='></img>
      </div>
      <div id='login'>
        <h1 id='title'>Đăng nhập</h1>
        <div>
          <input type="text" name='uname' placeholder="Tên đăng nhập" className='inp'></input>
        </div> 
          <input type="password" name='password' placeholder="Mật khẩu" className='inp'></input>
        <button className='inpbtn'>Truy cập</button>
        <a href='#' className='link'>Quên mật khẩu?</a>
      </div>
    </div>
  );
}

export default App;
