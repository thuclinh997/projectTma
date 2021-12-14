import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';

function ChangePassword() {
  const params = useParams();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [user, setUser] = useState({});
  const [errorNotFound, setErrorNotFound] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const user = await Axios.get(
          `http://localhost:3300/supplier/${params.id}/change-password`,
        );
        if (user.data.user) {
          return setUser(user.data.user);
        }
        return setErrorNotFound(user.data.error);
      } catch (error) {
        return setErrorNotFound(error.message);
      }
    })();
  }, [params.id]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const user = await Axios.put(
        `http://localhost:3300/supplier/${params.id}/confirm`,
        {
          password: password,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
      );
      if (user.data.success) {
        setError();
        return NotificationManager.success(user.data.success);
      }
      return setError(user.data.error);
    } catch (error) {
      return setError(error.response.data.error);
    }
  };
  return (
    <div className="contact">
      <div className="wrap">
        <div className="top-head">
          <h3>Change password</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
            </li>
            <li className="breadcrumb-item">
              <span>Change password</span>
            </li>
          </ul>
        </div>
        <div className="section group">
          <div className="col span_2_of_3">
            <div className="contact-form">
              {errorNotFound ? (
                <div className="error">{errorNotFound}</div>
              ) : (
                <div>
                  <h3>
                    Change password user -{' '}
                    <i
                      style={{
                        color: '#21A9AD',
                      }}
                    >
                      {user.email}
                    </i>
                  </h3>
                  {error && <div className="error">{error}</div>}
                  <form onSubmit={handleChangePassword} autoComplete="off">
                    <div>
                      <span>
                        <label>
                          Password <i className="danger">*</i>
                        </label>
                      </span>
                      <span>
                        <input
                          type="password"
                          className="textbox"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </span>
                    </div>
                    <div>
                      <span>
                        <label>
                          New password <i className="danger">*</i>
                        </label>
                      </span>
                      <span>
                        <input
                          type="password"
                          className="textbox"
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                        />
                      </span>
                    </div>
                    <div>
                      <span>
                        <label>
                          Confirm password <i className="danger">*</i>
                        </label>
                      </span>
                      <span>
                        <input
                          type="password"
                          className="textbox"
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangePassword;
