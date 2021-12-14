/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLayoutEffect, useState, useEffect } from 'react';
import Axios from 'axios';

// import Page404 from '../../notification/Page404';
function ProfileUser() {
  const params = useParams();
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  const nav = useNavigate();
  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(
          `http://localhost:3300/user/${params.email}/profile`,
        );
        if (res.data.user && res.data.success) {
          setError(false);
          setUser(res.data.user);
        }
        if (res.data.error) {
          setError(res.data.error);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, [params.email]);

  useEffect(() => {
    document.title = `user - ${params.email}`;
  }, []);
  const handleLogout = async () => {
    try {
      const user = await Axios.post(
        `http://localhost:3300/user/${params.email}/logout`,
      );
      if (user.data.success) {
        localStorage.removeItem('token');
        nav('/');
        window.location.reload();
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="content">
      {/* <!---start-about----> */}
      {error ? (
        nav('/Page404')
      ) : (
        <div className="about">
          <div className="wrap">
            <div className="top-head">
              <h3>About user </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <span>About</span>
                </li>
              </ul>
            </div>
            <div className="about-grids">
              <div className="about-left">
                <h3>Email: {user.email}</h3>
                <div className="about-left-info">
                  <img src={user.image || '/images/about1.jpg'} alt="" />
                  <h4>description:</h4>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla pariatur
                  </p>
                </div>
              </div>
              <div className="about-right">
                <h3>Product</h3>
                <div className="about-right-grid">
                  <div className="about-right-pic">
                    <span>
                      <i className="fab fa-invision"></i>
                    </span>
                  </div>
                  <div className="about-right-info">
                    <h4>
                      <Link to={`/user/${user.email}/inviter/supplier`}>
                        Inviter supplier
                      </Link>
                    </h4>
                  </div>
                  <div className="clear"> </div>
                </div>
                <div className="about-right-grid">
                  <div className="about-right-pic">
                    <span>
                      <i className="fas fa-user-edit"></i>
                    </span>
                  </div>
                  <div className="about-right-info">
                    <h4>
                      <Link to={`/user/${user.email}/update`}>
                        Edit profile
                      </Link>
                    </h4>
                  </div>
                  <div className="clear"> </div>
                </div>
                <div className="about-right-grid">
                  <div className="about-right-pic">
                    <span>
                      <i className="fas fa-users"></i>
                    </span>
                  </div>
                  <div className="about-right-info">
                    <h4>
                      <Link to={`/user/${user.email}/list/users`}>
                        List user
                      </Link>
                    </h4>
                  </div>
                  <div className="clear"> </div>
                </div>
                <div className="about-right-grid">
                  <div className="about-right-pic">
                    <span>
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                  </div>
                  <div className="about-right-info">
                    <h4>
                      <Link
                        to="#"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </Link>
                    </h4>
                  </div>
                  <div className="clear"> </div>
                </div>
              </div>
              <div className="clear"> </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfileUser;
