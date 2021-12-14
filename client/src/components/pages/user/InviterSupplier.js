import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';
// import { useForm } from 'react-hook-form';
function InviterSupplier() {
  const receiverEmailRef = useRef();

  const params = useParams();

  const [receiverEmail, setReceiverEmail] = useState('');
  const [emailAccount, setEmailAccount] = useState('');
  const [confirmEmailAccount, setConfirmEmailAccount] = useState('');
  const [error, setError] = useState();

  const handleChangeInput = (args) => (event) => {
    setError('');
    args(event.target.value);
  };
  const handleInviter = async (event) => {
    event.preventDefault();
    try {
      const invitation = await Axios.post(
        'http://localhost:3300/supplier/inviter',
        {
          inviter: params.email,
          invited: receiverEmail,
          accountInvited: emailAccount,
          confirmAccount: confirmEmailAccount,
          persona: 'supplier',
        },
      );
      console.log('hello');
      if (invitation.data.success) {
        setError('');
        setReceiverEmail('');
        setEmailAccount('');
        setConfirmEmailAccount('');
        receiverEmailRef.current.focus();
        return NotificationManager.success(invitation.data.success);
      } else {
        return setError(invitation.data.error);
      }
    } catch (error) {
      return setError(error.response.data.error);
    }
  };

  // console.log(receiverEmail)
  return (
    <div className="contact">
      <div className="wrap">
        <div className="top-head">
          <h3>Inviter</h3>
          <ul>
            <li>
              <Link to="/">Home / </Link>
            </li>
            <li>
              <Link to={`/user/${params.email}/profile`}>Profile/</Link>
            </li>
            <li>
              <span>inviter</span>
            </li>
          </ul>
        </div>
        <div className="section group">
          <div className="col span_2_of_3">
            <div className="contact-form">
              <h3>Inviter supplier</h3>
              {error && <div className="error">{error}</div>}
              <form onSubmit={handleInviter} autoComplete="off">
                <div>
                  <span>
                    <label>
                      Email receiver <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    {/* {errors.receiverEmail && <i className="danger">Email receiver is require </i>} */}
                    <input
                      name="receiverEmail"
                      placeholder="Enter receiver email "
                      value={receiverEmail || ''}
                      ref={receiverEmailRef}
                      // {...register('receiverEmail', { required: true })}
                      onChange={handleChangeInput(setReceiverEmail)}
                      type="text"
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      Account email <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    {/* {errors.emailAccount && <i className="danger">Email account is require </i>} */}
                    <input
                      name="emailAccount"
                      type="text"
                      placeholder="Enter email account"
                      value={emailAccount || ''}
                      // {...register('emailAccount', { required: true })}

                      onChange={handleChangeInput(setEmailAccount)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      Confirm account email <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    {/* {errors.confirmEmailAccount && <i className="danger">confirm account email is require </i>} */}
                    <input
                      name="emailAccount"
                      type="text"
                      placeholder="Confirm account email"
                      value={confirmEmailAccount || ''}
                      // {...register('confirmEmailAccount', { required: true })}
                      onChange={handleChangeInput(setConfirmEmailAccount)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <input type="submit" value="Submit" />
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviterSupplier;
