/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from 'react';
function CompanyDetail({ email }) {
  const params = useParams();
  const [data, setDataCompany] = useState({});
  const [contact, setConTact] = useState({});
  const [dataUsers, setDataUsers] = useState([]);
  const [state, setState] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await Axios.get(
        `http://localhost:3300/company/${params.id}/detail`,
      );
      return (
        setDataCompany(res.data.company),
        setDataUsers(res.data.company.users),
        setConTact(res.data.company.contact)
      )
    })();
  }, []);
  // const data = email.email;
  useEffect(() => {
    return document.title = `Company - ${data.name}`;
  }, []);
  useEffect(() => {
    for (let i = 0; i < dataUsers.length; i++) {
      if (dataUsers[i].email === email) {
        return setState(true);
      }
    }
  }, [dataUsers, email]);
  return (
    <div className="content">
      {/* <!---start-about----> */}
      <div className="about">
        <div className="wrap">
          <div className="top-head">
            <h3>About Company </h3>
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
              <h3>
                {data.name} - ( {data.business} )
              </h3>
              {state && (
                <div
                  style={{
                    float: 'right',
                    marginRight: '20px',
                  }}
                >
                  <Link
                    style={{
                      color: '#21A9AD',
                    }}
                    to={`/company/${data._id}/update`}
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                </div>
              )}
              <div className="about-left-info">
                <img src={data.image || '/images/about1.jpg'} alt="" />
                <h4>{data.description} </h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p>
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Sections 1.10.32 and
                  1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                  also reproduced in their exact original form, accompanied by
                  English versions from the 1914 translation by H. Rackham.
                </p>
                <h3>contact</h3>
                <p>
                  {contact.street} - {contact.city} - {contact.country} - P:{' '}
                  {contact.phone_number}
                </p>
              </div>
            </div>
            <div className="about-right">
              <h3>Product</h3>
              <div className="about-right-grid">
                <div className="about-right-pic">
                  <span>A</span>
                </div>
                <div className="about-right-info">
                  <h4>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.{' '}
                  </p>
                </div>
                <div className="clear"> </div>
              </div>
            </div>
            <div className="clear"> </div>
          </div>
          {/* <!---start-ourteam----> */}
          <div className="team">
            <h2>
              Employee{' '}
              <small
                style={{
                  fontSize: 15,
                }}
              >
                ( {dataUsers.length} user )
              </small>
            </h2>
            {dataUsers.map((dataUser, index) => (
              <div className="team-member" key={index}>
                <img src={dataUser.image || '/images/t1.jpg'} alt="Image 2" />
                <h3>name: {dataUser.email}</h3>
                {/* <h3>name: {dataUser.email}</h3> */}
                <p>description</p>
                <div className="sub-about-grid-social">
                  <ul>
                    <li>
                      <img src={'/images/facebook.png'} title="facebook" />
                    </li>
                    <li>
                      <img src="/images/gpluse.png" title="Google+" />
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            <div className="clear"> </div>
          </div>
          {/* <!---End-ourteam----> */}
        </div>
      </div>
      {/* <!---End-about----> */}
    </div>
  );
}

export default CompanyDetail;
