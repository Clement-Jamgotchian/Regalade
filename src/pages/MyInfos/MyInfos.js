/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './MyInfos.scss';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Alert, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setNewNickname } from '../../actions/user';
import utilisateur from '../../assets/images/utilisateur.png';
import { newAlertMessage, showOrHideAlert } from '../../actions/list';
import MyVerticallyCenteredModal from './Modal/Modal';

function MyInfos() {
  const [profil, setProfil] = useState([]);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);
  const [modalShow, setModalShow] = React.useState(false);
  const [submitOn, setSubmit] = useState(true);

  const [validated, setValidated] = useState(false);

  console.log(validated);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false && confirmPassword !== password) {
      e.stopPropagation();
    } else {
      setValidated(true);
      await axios.put('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/user', {
        email: email,
        nickname: nickname,
        password: password,
      })
        .then(() => {
          dispatch(newAlertMessage('modifications bien ajoutées'));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const getProfil = async () => {
    await axios.get('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/user')
      .then((response) => {
        setProfil(response.data);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
        console.log(response.data);
        dispatch(setNewNickname(response.data.nickname));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   atob()

  // const handlemodalShow = () => { setModalShow(false); };
  // eslint-disable-next-line no-unused-expressions
  const toggleSubmit = () => { submitOn ? setSubmit(false) : setSubmit(true); };
  useEffect(() => {
    handleSubmit();
  }, [submitOn]);

  useEffect(() => {
    getProfil();
  }, []);

  return (
    <Form className="MyInfos" noValidate validated={validated} onSubmit={handleSubmit}>
      <h1>Modification de mon profil</h1>
      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => dispatch(showOrHideAlert(false))}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Row className="mb-3 MyInfos-row">
        <Form.Group className="MyInfos-row-group" as={Col} md="4">
          <Form.Label className="MyInfos-row-group-label">Mon pseudo</Form.Label>
          <Form.Control
            required
            className="MyInfos-row-group-input"
            type="text"
            name="nickname"
            id="nickname"
            defaultValue={profil.nickname}
            onChange={(event) => {
              setNickname(event.target.value);
            }}
            placeholder="Pseudo"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 MyInfos-row">
        <Form.Group className="MyInfos-row-group" as={Col} md="4">
          <Form.Label className="MyInfos-row-group-label">E-mail</Form.Label>
          <Form.Control
            required
            type="email"
            className="MyInfos-row-group-input"
            name="email"
            id="email"
            placeholder="E-mail"
            defaultValue={profil.email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">N&apos;oublie pas ton e-mail</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 MyInfos-row">
        <Form.Group className="MyInfos-row-group" as={Col} md="4">
          <Form.Label className="MyInfos-row-group-label">Mot de passe</Form.Label>
          <Form.Control
            className="MyInfos-row-group-input"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="mot de passe"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            N&apos;oublie pas de mettre ton mot de passe pour confirmer, tu peux aussi le changer.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 MyInfos-row">
        <Form.Group className="MyInfos-row-group" as={Col} md="4">
          <Form.Label className="MyInfos-row-group-label">confirmation de mot de passe</Form.Label>
          <Form.Control
            className="MyInfos-row-group-input"
            type="password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            placeholder="confirmation de mot de passe"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            N&apos;oublie pas de confirmer ton mot de passe/nouveau mot de passe
            pour pouvoir valider tes informations.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3 MyInfos-row">
        <Form.Group className="MyInfos-row-group" as={Col} md="6">
          <Form.Label className="MyInfos-row-group-label">
            Mon image de profil
            <img
              src={getPicture(profil.picture)}
              alt="profil de l'utilisateur"
              className="MyInfos-row-group-img"
            />
          </Form.Label>
          <Form.Control className="MyInfos-row-group-input" type="file" required />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          className="MyInfos-row-group-check"
          required
          label="Confirmartion de modification"
          feedback="Vous devez cocher pour valider vos modifications"
          // eslint-disable-next-line no-unused-expressions
          onChange={() => { validated === true ? setValidated(false) : setValidated(true); }}
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit" onClick={toggleSubmit}>Modifier</Button>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Form>
  );
}

export default MyInfos;
