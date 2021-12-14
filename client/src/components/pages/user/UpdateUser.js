/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';

import { EmailContext } from '../../../App';
function UpdateUser() {
  const params = useParams();
  const emailUser = useContext(EmailContext);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [errorNotFound, setErrorNotFound] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const user = await Axios.get(
          `http://localhost:3300/user/${params.email}/update`,
        );
        if (user.data) {
          return setUser(user.data);
        }
        return setErrorNotFound(user.data.error);
      } catch (error) {
        return setError(error.response.data.error);
      }
    })();
  }, []);
  const handleChangeInput = (args) => (event) => {
    setError();
    args(event.target.value);
  };

  const handleChangeImage = (e) => {
    // console.log('hello');
    setSelectedImage(e.target.value);
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (user.email !== emailUser) {
        return setError('An error something');
      }
      let updateUser;
      if (checkbox === true) {
        updateUser = await Axios.put(
          `http://localhost:3300/user/${params.email}/update/avatar`,
          {
            image: previewSource,
            password: password,
          },
        );
      } else {
        updateUser = await Axios.put(
          `http://localhost:3300/user/${params.email}/update`,
          {
            image: previewSource,
            password: password,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
        );
      }
      if (updateUser.data.user && updateUser.data.success) {
        setError();
        setPassword('');
        setConfirmPassword('');
        setNewPassword('');
        return NotificationManager.success(updateUser.data.success);
      }
      return setError(updateUser.data.error);
    } catch (error) {
      return setError(error.response.data.error);
    }
  };
  return (
    <div className="contact">
      <div className="wrap">
        <div className="top-head">
          <h3>Update User</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/user/${params.email}/profile`}>Profile</Link>
            </li>
            <li className="breadcrumb-item">
              <span>Update - {emailUser}</span>
            </li>
          </ul>
        </div>
        <div className="section group">
          <form onSubmit={handleUpdate} autoComplete="off">
            <div className="col span_1_of_3">
              <div className="company_address">
                {
                  <img
                    src={previewSource || user.image || '/images/about1.jpg'}
                    alt=""
                  />
                }
                <input
                  type="file"
                  value={selectedImage}
                  name="image"
                  onChange={handleChangeImage}
                />
              </div>
            </div>
            <div className="col span_2_of_3">
              <div className="contact-form">
                {errorNotFound ? (
                  <div className="error">{errorNotFound}</div>
                ) : (
                  <div>
                    <h3>Change password </h3>
                    <span>
                      no change password{' '}
                      <input
                        type="checkbox"
                        value={checkbox}
                        onClick={(e) => setCheckbox(!checkbox)}
                      />
                    </span>
                    {error && <div className="error">{error}</div>}
                    <div>
                      <span>
                        <label>
                          Password <i className="danger">*</i>
                        </label>
                      </span>
                      <span>
                        <input
                          type="password"
                          placeholder="Enter your password "
                          value={password}
                          onChange={handleChangeInput(setPassword)}
                          className="textbox"
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
                          placeholder="New password "
                          disabled={checkbox}
                          value={newPassword}
                          onChange={handleChangeInput(setNewPassword)}
                          className="textbox"
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
                          placeholder="Confirm password "
                          disabled={checkbox}
                          value={confirmPassword}
                          onChange={handleChangeInput(setConfirmPassword)}
                          className="textbox"
                        />
                      </span>
                    </div>
                    <div>
                      <span>
                        <input type="submit" value="Submit" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
