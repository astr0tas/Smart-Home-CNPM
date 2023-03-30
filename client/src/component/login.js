import "../css/login.css"

const Login = () =>
{
      /*
      https://media.istockphoto.com/id/1218148871/vector/smart-home-emblem-for-digital-technologies-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=XBQEUXQu4VQhH6G-JgjGwUTiHsNqsL1UdA4PGWbvPig=
      */
      return (
            <div className="login">
                  <div class="container">
                        <img class="pic" src={ require("../image/background.png") } alt="pic"></img>
                        <div class='login-box'>
                              <h1 class='title'>Đăng nhập</h1>
                              <form>
                                    <input type="text" name='uname' placeholder="Tên đăng nhập" className='inp'></input>
                                    <input type="password" name='password' placeholder="Mật khẩu" className='inp'></input>
                                    <input type="submit" className='button' value="Truy cập" />
                              </form>
                              <a href='#' className='link'>Quên mật khẩu?</a>
                        </div>
                  </div>
            </div>
      );
}

export default Login;