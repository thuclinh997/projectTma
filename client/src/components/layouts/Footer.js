import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
      <div className="border"></div>
      <div className="footer">
        <div className="wrap">
          <div className="footer-left">
            <Link to="/">
              <img
                src="/images/logo2.png"
                alt=""
                style={{
                  width: '250px',
                }}
              />
            </Link>
          </div>
          <div className="footer-right">
            <p>
              &copy; 2021 Trust Your Supplier. All Rights Company | Design
              by&nbsp; ThucLinh
            </p>
          </div>
          <div className="clear"> </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
