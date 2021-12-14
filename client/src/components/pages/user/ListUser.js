/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import ChangeStatus from '../Modal/ChangeStatus';
import ResetPassword from '../Modal/ResetPassword';
function ListUser() {
  //modal

  // and model
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [userId, setUseId] = useState('');
  const [status, setStatus] = useState('');

  const handleChangeStatus = (param) => {
    // setStatus('');
    setUseId(param);
  };
  const handleResetPassword = (param) => {
    setUseId(param);
  };
  useEffect(() => {
    (async () => {
      const res = await Axios.get(
        `http://localhost:3300/user/${params.email}/list/users`,
      );
      setUsers(res.data || []);
    })();
  }, []);
  // console.log(users[0]);
  return (
    <div className="content">
      <div className="services">
        {userId && <ChangeStatus id={userId} changeStatus={setStatus} />}
        {userId && <ResetPassword id={userId} />}
        <div className="wrap">
          <div className="top-head">
            <h3>Services</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <span> List user</span>
              </li>
            </ul>
          </div>
          <br />
          <div className="clear"> </div>
          <div className="services-grids">
            {users.length === 0 && <h3>List user empty</h3>}
            {users.map((user, index) => (
              <div className="services-grid last-grid" key={index}>
                <a href="#">
                  <img
                    src={user.data.image || '/images/s2.jpg'}
                    alt="Image 2"
                  />
                </a>
                <h3>
                  Email:{' '}
                  <span
                    style={{
                      color: 'darkred',
                    }}
                  >
                    {user.data.email}
                  </span>
                </h3>
                <h3>
                  Status:{' '}
                  <span
                    style={{
                      color: 'darkred',
                    }}
                  >
                    {(userId === user.invited && status) || user.status}
                    
                  </span>
                </h3>
                <div>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    className="button"
                    style={{
                      marginRight: '20px',
                    }}
                    onClick={() => handleChangeStatus(user.invited)}
                  >
                    Change status{' '}
                  </button>
                  <button
                    data-toggle="modal"
                    data-target="#exampleModal"
                    className="button reset"
                    type="submit"
                    onClick={() => handleResetPassword(user.invited)}
                  >
                    reset Password
                  </button>
                </div>
              </div>
            ))}

            <div className="clear"> </div>
          </div>
          <div className="clear"> </div>
        </div>
      </div>
    </div>
  );
}

export default ListUser;
