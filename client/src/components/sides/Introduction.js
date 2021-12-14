/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
function Introduction() {
  return (
    <div className="content-banner">
      <div className="wrap">
        <div className="content-banner-info">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,tus error
            sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt e consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>
            - Lorem ipsum /<Link to="#">Admin</Link>
          </h3>
          <div className="clear"> </div>
        </div>
        <div className="content-banner-info-banner">
          <Link to="#">
            <img src={'images/02.jpg'} title={'abnner'} />
          </Link>
        </div>
        <div className="clear"> </div>
      </div>
    </div>
  );
}
export default Introduction;
