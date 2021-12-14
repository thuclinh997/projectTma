import { Link } from 'react-router-dom';
// import { useContext } from "react";
function Login() {
  return (
    <li className="nav-item nav-profile">
      <Link to="/user/login" className="nav-link">
        Login
      </Link>
    </li>
  );
}
export default Login;
