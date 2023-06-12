import styles from '../css/info.module.css';
import { React, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import { AiOutlineCloseCircle } from 'react-icons/ai';


const AddAccount = () =>
{
      const Navigate = useNavigate();

      const [name, setName] = useState("");
      const [gender, setGender] = useState("");
      const [date, setDate] = useState("");
      const [ssn, setSSN] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [pass, setPass] = useState("");
      const [repass, setRepass] = useState("");
      const [account, setAccount] = useState("");

      const [wrong, setWrong] = useState(false);

      $('#account').css('color', 'blue');

      const createAccount = () =>
      {
            if (name === '')
                  window.alert("Vui lòng nhập tên");
            else if (gender === '')
                  window.alert("Vui lòng chọn giới tính");
            else if (date === '')
                  window.alert("Vui lòng chọn ngày sinh");
            else if (ssn === '')
                  window.alert("Vui lòng nhập mã CCCD");
            else if (email === '')
                  window.alert("Vui lòng nhập email");
            else if (phone === '')
                  window.alert("Vui lòng nhập số điện thoại");
            else if (account === '')
                  window.alert("Vui lòng nhập tài khoản");
            else if (pass === '')
                  window.alert("Vui lòng nhập mật khẩu");
            else if (repass === '')
                  window.alert("Vui lòng nhập lại mật khẩu");
            if (pass !== repass)
                  setWrong(true);
            else
            {
                  setWrong(false);
                  axios.post('http://localhost:5000/add_account', { name: name, gender: gender, email: email, phone: phone, account: account, password: pass, date: date, ssn: ssn })
                        .then(res =>
                        {
                              console.log(res);
                              Navigate(-1);
                        })
                        .catch(err => { console.log(err); })
            }
      }

      return (
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center" style={ {
                  overflow: "auto"
            } }>
                  <div className={ `h-75 w-75 d-flex flex-column overflow-auto h-auto ${ styles.board }` }>
                        <h1 className='text-center'>Thêm tài khoản</h1>
                        <div className="d-flex flex-column flex-md-row w-100 flex-grow-1 justify-content-md-around align-items-md-center my-auto">
                              <div className="col-md-6">
                                    <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" alt="Avatar" className={ `mx-auto d-block ${ styles.img }` } />
                                    <input type='file' className={ `d-block mx-auto` }></input>
                              </div>
                              <div className="col-md-6">
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Name" onChange={ e => { setName(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Giới tính" onChange={ e => { setGender(e.target.value); } } />
                                    <input type="date" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Ngày sinh" onChange={ e => { setDate(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Số CCCD" onChange={ e => { setSSN(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Email" onChange={ e => { setEmail(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="SĐT" onChange={ e => { setPhone(e.target.value); } } />
                                    <input type="text" className={ `${ styles.special } my-3 mx-md-0 mx-auto d-block` } placeholder="Tài khoản" onChange={ e => { setAccount(e.target.value); } } />
                                    <input type="password" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Mật khẩu" onChange={ e => { setPass(e.target.value); } } />
                                    <input type="password" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Nhập lại mật khẩu" onChange={ e => { setRepass(e.target.value); } } />
                                    { wrong && <div className="d-flex align-items-center" style={ { color: "red", fontSize: "1rem" } }><AiOutlineCloseCircle />Mật khẩu không khớp!</div> }
                              </div>
                        </div>
                        <div className='mb-3 mx-auto'>
                              <button className={ `${ styles.cancel } me-2` } onClick={ () => Navigate(-1) }>Hủy bỏ</button>
                              <button className={ `${ styles.confirm } ms-2` } onClick={ createAccount }>Xác nhận</button>
                        </div>
                  </div>
            </div>
      )
}

export default AddAccount;