import styles from '../css/info.module.css';
import { useEffect, React, useState } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { formDate } from '../tools/time';

const Info = () =>
{
      const Navigate = useNavigate();
      const [name, setName] = useState("N/A");
      const [gender, setGender] = useState("N/A");
      const [date, setDate] = useState("N/A");
      const [ssn, setSSN] = useState("N/A");
      const [email, setEmail] = useState("N/A");
      const [phone, setPhone] = useState("N/A");

      const [oldName, setOldName] = useState("N/A");
      const [oldGender, setOldGender] = useState("N/A");
      const [oldDate, setOldate] = useState("N/A");
      const [oldSSN, setOldSSN] = useState("N/A");
      const [oldEmail, setOldEmail] = useState("N/A");
      const [oldPhone, setOldPhone] = useState("N/A");
      const [pass, setPass] = useState("");
      const [repass, setRepass] = useState("");
      const [wrong, setWrong] = useState(false);

      const [render, setRender] = useState(false);


      useEffect(() =>
      {
            $("#info").css("color", "blue");
            $(`.${ styles.input }`).prop("disabled", true);
            axios.post('http://localhost:5000/getInfo', { username: localStorage.getItem('username') })
                  .then(res =>
                  {
                        setName(res.data[0].ten);
                        setOldName(res.data[0].ten);
                        setDate(formDate(res.data[0].ngay_sinh));
                        setOldate(formDate(res.data[0].ngay_sinh));
                        setSSN(res.data[0].cccd);
                        setOldSSN(res.data[0].cccd);
                        setEmail(res.data[0].email);
                        setOldEmail(res.data[0].email);
                        setPhone(res.data[0].sdt);
                        setOldPhone(res.data[0].sdt);
                        setGender(res.data[0].gioi_tinh);
                        setOldGender(res.data[0].gioi_tinh);
                  })
                  .catch(err => { console.log(err); });
      }, [render]);

      const update = () =>
      {
            if (repass !== pass)
                  setWrong(true);
            else
            {
                  setWrong(false);
                  $(`.updateButton`).css("display", "inline");
                  $(`.${ styles.optionButtons }`).css("display", "none");
                  $(`.${ styles.input }`).prop("disabled", true);
                  $(`.${ styles.password }`).css("display", "none");
                  axios.post('http://localhost:5000/updateInfo', { username: localStorage.getItem('username'), name: name, gender: gender, date: date, phone: phone, ssn: ssn, email: email, password: pass })
                        .then(res =>
                        {
                              console.log(res);
                              setRender(!render);
                              setPass("");
                              setRepass("");
                        })
                        .catch(err => { console.log(err); })
            }
      }

      const logout = () =>
      {
            localStorage.removeItem('username');
            localStorage.removeItem('type');
            Navigate('/');
      }

      return (
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center" style={ {
                  overflow: "auto"
            } }>
                  <div className={ `h-75 w-75 d-flex flex-column overflow-auto h-auto ${ styles.board }` }>
                        <h1 className='text-center'>Thông tin cá nhân</h1>
                        <div className="d-flex flex-column flex-md-row w-100 flex-grow-1 justify-content-md-around align-items-md-center my-auto">
                              <div className="col-md-6">
                                    <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" alt="Avatar" className={ `mx-auto d-block ${ styles.img }` } />
                                    <input type='file' className={ `${ styles.optionButtons } mx-auto` }></input>
                                    <button className={ `${ styles.cancel } mt-5 d-block mx-auto` } onClick={ logout }>Log out</button>
                              </div>
                              <div className="col-md-6">
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Name" value={ name } onChange={ e => { setName(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Giới tính" value={ gender } onChange={ e => { setGender(e.target.value); } } />
                                    <input type="date" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Ngày sinh" value={ date } onChange={ e => { setDate(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Số CCCD" value={ ssn } onChange={ e => { setSSN(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="Email" value={ email } onChange={ e => { setEmail(e.target.value); } } />
                                    <input type="text" className={ `${ styles.input } my-3 mx-md-0 mx-auto d-block` } placeholder="SĐT" value={ phone } onChange={ e => { setPhone(e.target.value); } } />
                                    <input type="text" className={ `${ styles.special } my-3 mx-md-0 mx-auto d-block` } placeholder="Tài khoản" readOnly disabled value={ localStorage.getItem('username') } />
                                    <input type="password" className={ `${ styles.input } my-3 mx-md-0 mx-auto  ${ styles.password }` } placeholder="Mật khẩu" value={ pass } onChange={ e => { setPass(e.target.value); } } />
                                    <input type="password" className={ `${ styles.input } my-3 mx-md-0 mx-auto  ${ styles.password }` } placeholder="Nhập lại mật khẩu" value={ repass } onChange={ e => { setRepass(e.target.value); } } />
                                    { wrong && <div className="d-flex align-items-center" style={ { color: "red", fontSize: "1rem" } }><AiOutlineCloseCircle />Mật khẩu không khớp!</div> }
                              </div>
                        </div>
                        <div className='mb-3 mx-auto'>
                              <button className={ `${ styles.update } updateButton` } onClick={ () =>
                              {
                                    $(`.updateButton`).css("display", "none");
                                    $(`.${ styles.optionButtons }`).css("display", "block");
                                    $(`.${ styles.input }`).prop("disabled", false);
                                    $(`.${ styles.password }`).css("display", "block");
                              } }>Cập nhật</button>
                              <div className={ `${ styles.optionButtons }` }>
                                    <button className={ `${ styles.cancel } me-2` } onClick={ () =>
                                    {
                                          $(`.updateButton`).css("display", "inline");
                                          $(`.${ styles.optionButtons }`).css("display", "none");
                                          $(`.${ styles.input }`).prop("disabled", true);
                                          $(`.${ styles.password }`).css("display", "none");
                                          setWrong(false);
                                          setName(oldName);
                                          setGender(oldGender);
                                          setDate(oldDate);
                                          setEmail(oldEmail);
                                          setSSN(oldSSN);
                                          setPhone(oldPhone);
                                    } }>Hủy bỏ</button>
                                    <button className={ `${ styles.confirm } ms-2` } onClick={ update }>Xác nhận</button>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default Info;
