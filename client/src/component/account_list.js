import styles from "../css/sensor_list.module.css";
import { TbPlus } from "react-icons/tb";
import $ from 'jquery';
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accout = (props) =>
{
      props.setAccount(props.accounts + 1);

      const deleteAccount = () =>
      {
            axios.post('http://localhost:5000/remove_account', { id: props.ma })
                  .then(res =>
                  {
                        console.log(res);
                        props.setRender(!props.render);
                  })
                  .catch(err => console.log(err))
      }

      return (
            <tr>
                  <td scope="col" className={ `col-1` }>{ props.i }</td>
                  <td scope="col" className={ `col-3 ` }>{ props.ten }</td>
                  <td scope="col" className={ `col-3` }>{ props.email }</td>
                  <td scope="col" className={ `col-3` }>{ props.sdt }</td>
                  <td scope="col" className={ `col-1` }><button className={ `${ styles.decrease }` } onClick={ deleteAccount }>Xóa</button></td>
            </tr>
      );
}

const AccoutList = () =>
{
      const [accounts, setAccount] = useState(0);
      const [render, setRender] = useState(false);

      const Navigate = useNavigate();

      useEffect(() =>
      {
            $('.table_body').empty();
            $('#account').css('color', 'blue');
            const target = ReactDOM.createRoot(document.getElementsByClassName('table_body')[0]);
            axios.get('http://localhost:5000/accounts')
                  .then(res =>
                  {
                        const temp = [];
                        for (let i = 0; i < res.data.length; i++)
                              temp.push(<Accout render={ render } setRender={ setRender } key={ i } i={ i + 1 } setAccount={ setAccount } accounts={ accounts } ten={ res.data[i].ten } email={ res.data[i].email } sdt={ res.data[i].sdt } ma={ res.data[i].MA_USER } />);
                        target.render(<>{ temp }</>);
                  })
                  .catch(err => { console.log(err); })
      }, [render])

      const addAccount = () =>
      {
            if (accounts === 5)
                  window.alert("Số lượng tài khoản ủy quyền đạt mức tối đa");
            else
                  Navigate('./add');
      }

      return (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                  <div className="h-75 w-75 device-page-board d-flex flex-column" style={ { backgroundColor: "white", border: "2px solid black", borderRadius: "20px" } }>
                        <div className="w-100 d-flex justify-content-between" style={ { height: "50px" } }>
                              <div className="w-75 d-flex justify-content-start align-items-center" style={ { marginLeft: "10px", position: "relative" } }>
                                    <button className={ `mx-sm-4 ${ styles.add } d-flex align-items-center` } onClick={ addAccount }><TbPlus />Thêm tài khoản</button>
                              </div>
                        </div>
                        <div className="w-100 overflow-auto" style={ { height: "calc(100% - 50px)" } }>
                              <table className="table table-hover mx-2 mt-3 overflow-auto" style={ { width: "95%" } }>
                                    <thead style={ { borderBottom: "2px solid black" } }>
                                          <tr className="header">
                                                <th scope="col" className={ `col-1 ${ styles.table_header }` }>#</th>
                                                <th scope="col" className={ `col-3 ${ styles.table_header }` }>Tên</th>
                                                <th scope="col" className={ `col-3 ${ styles.table_header }` }>Email</th>
                                                <th scope="col" className={ `col-3 ${ styles.table_header }` }>SĐT</th>
                                                <th scope="col" className={ `col-1 ${ styles.table_header }` }>Tác vụ</th>
                                          </tr>
                                    </thead>
                                    <tbody className="table_body">
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
}

export default AccoutList;