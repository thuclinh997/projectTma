import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
// import { useForm } from 'react-hook-form';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const nav = useNavigate();

  const handleChangeInput = (args) => (event) => {
    setError(null);
    args(event.target.value);
  };

  const handleLogin = async (e) => {
    setPassword('');
    e.preventDefault();
    try {
      const user = await Axios.post('http://localhost:3300/user/login', {
        email: email,
        password: password,
      });
      if (user.data.email && user.data.token) {
        localStorage.setItem('token', user.data.token);
        nav('/');
        window.location.reload();
      } else {
        setError(user.data.error);
      }
    } catch (error) {
      return setError(error.response.data.error);
    }
  };
  return (
    <div className="contact">
      <div className="wrap">
        <div className="top-head">
          <h3>Login</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
            </li>
            <li className="breadcrumb-item">
              <span>Login</span>
            </li>
          </ul>
        </div>
        <div className="section group">
          <div className="col span_1_of_3">
            <div className="company_address">
              <h3>About Me :</h3>
              <p>500 Lorem Ipsum Dolor Sit,</p>
              <p>22-56-2-9 Sit Amet, Lorem,</p>
              <p>VN</p>
              <p>Phone:0123456789</p>
              <p>
                Email:{' '}
                <span>
                  <a href="http://google.com">mail@example.com</a>
                </span>
              </p>
            </div>
          </div>
          <div className="col span_2_of_3">
            <div className="contact-form">
              <h3>Login</h3>
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleLogin} autoComplete="off">
                <div>
                  <span>
                    <label>
                      E-MAIL <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    {/* {errors.Email && <i className="danger">email is require</i>} */}
                    <input
                      name="userEmail"
                      value={email || ''}
                      onChange={handleChangeInput(setEmail)}
                      // {...register('Email', { required: true })}
                      type="text"
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      Password <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <input
                      name="userPhone"
                      type="password"
                      value={password || ''}
                      onChange={handleChangeInput(setPassword)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <input type="submit" value="Submit" />
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
