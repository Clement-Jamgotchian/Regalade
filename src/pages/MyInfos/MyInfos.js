/* eslint-disable jsx-a11y/label-has-associated-control */
import './MyInfos.scss';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);

  const [validated, setValidated] = useState(false);

  console.log(email);

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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false && confirmPassword !== password) {
      event.stopPropagation();
    }
    setValidated(true);
    axios.put('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/user', {
      email,
      nickname,
      password,
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
            onChange={(event) => {
              setNickname(event.target.value);
              console.log(event.target.value);
            }}
            placeholder="Pseudo"
            defaultValue={profil.nickname}
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
              className="MyInfos-img"
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
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default MyInfos;
