// import { useState } from 'react';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';

function ResetPassword({ id }) {
  // const [status, setStatus] = useState('')
  const handleResetPassword = async () => {
    try {
      const res = await Axios.put(
        `http://localhost:3300/supplier/${id}/reset/password`,
      );
      console.log(res);
      if (res.data.success) {
        return NotificationManager.success(res.data.success);
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Reset password supplier
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              This action will reset the supplier's password, you still want to
              continue
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleResetPassword}
              >
                Reset password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
