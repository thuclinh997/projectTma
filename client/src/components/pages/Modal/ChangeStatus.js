import { useState } from 'react';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
function ChangeStatus({ id, changeStatus }) {
  const [status, setStatus] = useState('');
  const handleChangeStatus = (status) => {
    setStatus(status);
  };
  const handleUpdateStatus = async () => {
    try {
      if (status === '') {
        return console.log('no anything');
      }
      changeStatus(status);
      const res = await Axios.put(
        `http://localhost:3300/supplier/${id}/change/status`,
        {
          status: status,
        },
      );
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
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Change status supplier
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
              <button
                className="btn btn-outline-success mr-3"
                type="button"
                onClick={() => {
                  handleChangeStatus('active');
                }}
              >
                Active
              </button>
              <button
                className="btn btn-outline-dark mr-3"
                onClick={() => {
                  handleChangeStatus('lock');
                }}
              >
                Lock
              </button>
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
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleUpdateStatus}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangeStatus;
