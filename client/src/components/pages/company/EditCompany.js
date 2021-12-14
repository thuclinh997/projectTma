/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';

// import { EmailContext } from '../../App.js
function EditCompany() {
  const params = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [business, setBusiness] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [image, setImage] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(
          `http://localhost:3300/company/${params.id}/edit`,
        );
        return (
          setName(res.data.name || ''),
          setDescription(res.data.description || ''),
          setBusiness(res.data.business || ''),
          setStreet(res.data.contact.street || ''),
          setImage(res.data.image || ''),
          setCity(res.data.contact.city || ''),
          setCountry(res.data.contact.country || ''),
          setPhone(res.data.contact.phone_number || '')
        );
      } catch (error) {
        return console.log(error.message);
      }
    })();
  }, []);
  const handleChangeInput = (args) => (event) => {
    setError(null);
    return args(event.target.value);
  };

  useEffect(() => {
    return () => {
      selectedImage && URL.revokeObjectURL(selectedImage.preview);
    };
  }, [previewSource]);

  const handleChangeImage = (e) => {
    // console.log('hello')
    setSelectedImage(e.target.value);
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setSelectedImage(file);
    return previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return (reader.onloadend = () => {
      setPreviewSource(reader.result);
    });
  };
  // console.log(previewSource);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(
        `http://localhost:3300/company/${params.id}/update`,
        {
          name: name,
          description: description,
          business: business,
          image: previewSource,
          'contact.street': street,
          'contact.city': city,
          'contact.country': country,
          'contact.phone_number': phone,
        },
      );
      if (res.data.success) {
        setError(null);
        return NotificationManager.success(res.data.success);
      }
      return setError(res.data.error);
    } catch (error) {
      return setError(error.response.data.error);
    }
  };
  return (
    <div className="contact">
      <div className="wrap">
        <div className="top-head">
          <h3>Edit</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/company/${params.id}/detail`}>Detail </Link>
            </li>
            <li className="breadcrumb-item">
              <span>Edit</span>
            </li>
          </ul>
        </div>
        <div className="section group">
          <form
            onSubmit={handleUpdate}
            autoComplete="off"
            encType="multipart/form-data"
          >
            <div className="col span_1_of_3">
              <div className="company_address">
                <h3>Edit company {name}</h3>
                {
                  <img
                    src={selectedImage.preview || image || '/images/about1.jpg'}
                    alt=""
                  />
                }
                <input type="file" name="image" onChange={handleChangeImage} />
              </div>
            </div>
            <div className="col span_2_of_3">
              <div
                className="contact-form"
                style={{
                  position: 'relative',
                }}
              >
                {error && <div className="error">{error}</div>}
                <div>
                  <span>
                    <label>
                      Name <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <input
                      type="text"
                      name="name"
                      placeholder={name}
                      value={name || ''}
                      onChange={handleChangeInput(setName)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      Business <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <input
                      type="text"
                      name="business"
                      placeholder={business}
                      value={business || ''}
                      onChange={handleChangeInput(setBusiness)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      Street <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <input
                      type="text"
                      placeholder={street}
                      value={street || ''}
                      onChange={handleChangeInput(setStreet)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      City <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <input
                      type="text"
                      placeholder={city}
                      value={city || ''}
                      onChange={handleChangeInput(setCity)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      Country <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <input
                      type="text"
                      placeholder={country}
                      value={country}
                      onChange={handleChangeInput(setCountry)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      Phone <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <input
                      type="text"
                      placeholder={phone}
                      value={phone || ''}
                      onChange={handleChangeInput(setPhone)}
                      className="textbox"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <label>
                      description <i className="danger">*</i>
                    </label>
                  </span>
                  <span>
                    <textarea
                      name="userMsg"
                      placeholder={description}
                      value={description}
                      type="text"
                      onChange={handleChangeInput(setDescription)}
                    ></textarea>
                  </span>
                </div>
                <div>
                  <span>
                    <input type="submit" value="Submit" />
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCompany;
