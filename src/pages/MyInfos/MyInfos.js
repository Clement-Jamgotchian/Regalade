/* eslint-disable jsx-a11y/label-has-associated-control */
import './MyInfos.scss';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Alert, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setNewNickname } from '../../actions/user';
import utilisateur from '../../assets/images/utilisateur.png';
import { newAlertMessage, showOrHideAlert } from '../../actions/list';

function MyInfos() {
  const [profil, setProfil] = useState([]);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);

  const dispatch = useDispatch();

  const getUser = () => {
    axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/user')
      .then((response) => {
        setProfil(response.data);
        console.log(response.data);
        dispatch(setNewNickname(response.data.nickname));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeEmail = (value) => {
    if (value === '') {
      return profil.email;
    }
    return value;
  };

  const changeNickname = (value) => {
    if (value === '') {
      return profil.value;
    }
    return value;
  };

  const handleSubmit = () => {
    axios.put('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/user', {
      email: changeEmail(email),
      nickname: changeNickname(nickname),
    })
      .then(() => {
        dispatch(newAlertMessage('modifications bien ajoutées'));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPicture = (photo) => {
    if (photo !== null) {
      return (
        photo
      );
    }
    return (
      utilisateur
    );
  };

  //   atob()

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Container className="MyInfos">
      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => dispatch(showOrHideAlert(false))}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Row className="MyInfos-container">
        <h3 className="MyInfos-Title">
          Hey,
          {' '}
          {profil.nickname}
        </h3>
      </Row>
      <form className="My-infos-form" onSubmit={handleSubmit}>
        <Col>Mon pseudo</Col>
        <Col>
          <Row className="MyInfos-input-container">
            <input
              className="MyInfos-input"
              type="text"
              name="nickname"
              id="nickname"
              value={nickname}
              placeholder=" "
              onChange={(event) => {
                setNickname(event.target.value);
                console.log(event.target.value);
              }}
              required
            />
            <label className="MyInfos-placeholder" htmlFor="nickname">{profil.nickname}</label>
          </Row>
        </Col>
        <Row className="MyInfos-input-container">
          <p>Mon E-mail</p>
          <input
            className="MyInfos-input"
            type="email"
            name="email"
            id="email"
            placeholder=" "
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <label className="MyInfos-placeholder" htmlFor="email">{profil.email}</label>
        </Row>
        <Row className="MyInfos-input-container">
          <label className="MyInfos-file" htmlFor="picture">
            <img
              src={getPicture(profil.picture)}
              alt="profil de l'utilisateur"
              className="MyInfos-img"
            />
          </label>
          <input type="file" name="picture" id="picture" value={profil.picture} required />
        </Row>
        <button type="submit" className="formSign-button">
          Modifier
        </button>
      </form>
    </Container>
  );
}

export default MyInfos;
