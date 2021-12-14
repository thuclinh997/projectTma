import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
function Confirm() {
  const params = useParams();
  const [error, setError] = useState();
  const [notification, setNotification] = useState();
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const user = await Axios.get(
          `http://localhost:3300/supplier/${params.id}/confirm`,
        );
        if (user.data.notification) {
          return setNotification(user.data.notification);
        }
        if (user.data.user) {
          return setUser(user.data.user);
        }
        return setError(user.data.error);
      } catch (error) {
        return setError(error.message);
      }
    })();
  }, [params.id]);
  return (
    <div className="content">
      <div className="gallery1">
        <div className="wrap">
          <div className="top-head">
            <h3>Confirm</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home </Link>
              </li>
              <li className="breadcrumb-item">
                <span>Confirm account</span>
              </li>
            </ul>
          </div>
          <div className="about-grids">
            <div
              className="about-left"
              style={{
                margin: '0 auto',
                float: 'none',
                textAlign: 'center',
              }}
            >
              <div className="col span_2_of_3">
                <div className="contact-form">
                  {error || notification ? (
                    <div className="error">{error || notification}</div>
                  ) : (
                    <div>
                      <h3>
                        Welcome{' '}
                        <span
                          style={{
                            color: '#21A9AD',
                          }}
                        >
                          {' '}
                          {user.email}
                        </span>{' '}
                        to Trust you supplier
                      </h3>
                      <h3>agree to join us by clicking the button below</h3>
                      <div className="about-left-info">
                        <div>
                          <input type="hidden" value={params.id} />
                          <span>
                            <Link
                              to={`/supplier/${user.uuid}/change-password`}
                              className="confirm"
                            >
                              {' '}
                              Confirm
                            </Link>
                          </span>
                        </div>
                      </div>
                      <h3>If you don't want to join please let us know</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="clear"> </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
export default Confirm;
