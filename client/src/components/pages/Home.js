// import Axios from "axios";
import { useEffect } from 'react';
// import { Link } from "react-router-dom";
import Welcome from '../sides/Welcome.js';
import ListCompany from '../sides/ListCompany.js';
import Introduction from '../sides/Introduction.js';
function Home() {
  // console.log(product);
  useEffect(() => {
    document.title = 'Trust your supplier';
  }, []);
  return (
    <div>
      <div className="border"></div>
      <Welcome />
      <div className="border"></div>
      <ListCompany />
      <div className="border"></div>
      <Introduction />
    </div>
  );
}

export default Home;
