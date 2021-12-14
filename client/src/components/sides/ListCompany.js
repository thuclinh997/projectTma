import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function ListCompany() {
  const [datas, setDataHome] = useState([]);
  // localStorage.setItem('name', 'thuclinh');
  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get('http://localhost:3300/');
        return setDataHome(res.data);
      } catch (error) {
        return error.message;
      }
    })();
  }, []);
  return (
    <div className="content-top-grids">
      <div className="wrap">
        {datas.map((data, index) => (
          <div className="top-grid" key={index}>
            <div className="top-grid-head">
              <h3> {data.name}</h3>
              <img src={data.image || 'images/01.jpg'} alt="" />
            </div>
            <div className="top-grid-info">
              <h4>{data.business}</h4>
              <p>{data.description}</p>
            </div>
            <Link to={`/company/${data._id}/detail`}>Read more</Link>
          </div>
        ))}

        <div className="clear"> </div>
      </div>
    </div>
  );
}

export default ListCompany;
