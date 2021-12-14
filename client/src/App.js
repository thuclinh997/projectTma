/* eslint-disable react-hooks/exhaustive-deps */
import 'react-notifications/lib/notifications.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { NotificationContainer } from 'react-notifications';

import jwt from 'jsonwebtoken';
import NavBar from './components/layouts/NavBar.js';
import Home from './components/pages/Home.js';
import CompanyDetail from './components/pages/company/CompanyDetail.js';
import Login from './components/pages/user/Login.js';
import EditCompany from './components/pages/company/EditCompany.js';
import ProfileUser from './components/pages/user/ProfileUser.js';
import InviterSupplier from './components/pages/user/InviterSupplier.js';
import ChangePassword from './components/pages/suppliers/ChangePassword.js';
import Confirm from './components/pages/suppliers/Confirm.js';
import UpdateUser from './components/pages/user/UpdateUser.js';
import Page404 from './components/notification/Page404.js';
// import NoActive from './components/notification/NoActive';
import Footer from './components/layouts/Footer.js';
import ListUser from './components/pages/user/ListUser.js';

export const EmailContext = createContext();
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (token) {
      const user = jwt.decode(token);
      // console.log(user);
      if (!user) {
        setToken(localStorage.removeItem('token'));
      } else {
        setEmail(user.email);
      }
    }
  }, []);
  // console.log(dataHome);
  return (
    <EmailContext.Provider value={email}>
      <NavBar email={email} />
      <NotificationContainer />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/company/:id/detail"
            element={<CompanyDetail email={email} />}
          />
          <Route path="/user/login" element={<Login />} />
          <Route path="/supplier/:id/confirm" element={<Confirm />} />
          <Route
            path="/supplier/:id/change-password"
            element={<ChangePassword />}
          />
          <Route path="*" element={<Page404 />} />
          {email && (
            <>
              <Route path="/user/:email/update" element={<UpdateUser />} />
              <Route
                path="/company/:id/update"
                element={<EditCompany email={email} />}
              />
              <Route path="/user/:email/profile" element={<ProfileUser />} />
              <Route
                path="/user/:email/inviter/supplier"
                element={<InviterSupplier />}
              />
              <Route path="user/:email/list/users" element={<ListUser />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </EmailContext.Provider>
  );
}

export default App;
