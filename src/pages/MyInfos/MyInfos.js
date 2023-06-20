/* eslint-disable no-unused-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './MyInfos.scss';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Alert, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setNewNickname } from '../../actions/user';
import utilisateur from '../../assets/images/utilisateur.png';
import { changeAlertVariant, newAlertMessage, showOrHideAlert } from '../../actions/list';
import MyVerticallyCenteredModal from './Modal/Modal';
import adulte from '../../assets/la-personne.png';
import enfant from '../../assets/enfant.png';
import AxiosPrivate from '../../utils/AxiosPrivate';

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
  const [members, setMembers] = useState([]);
  const [isAdult, setIsAdult] = useState(true);
  const [nicknameMember, setNicknameMember] = useState('');
  const [clickedAdd, setClickedAdd] = useState(true);
  const [postImage, setPostImage] = useState({
    picture: '',
  });

  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (confirmPassword !== password) {
      e.stopPropagation();
    } else {
      setValidated(true);
      await AxiosPrivate.put('/user', {
        email: email,
        nickname: nickname,
        picture: postImage.picture,
      })
        .then(() => {
          dispatch(newAlertMessage('modifications bien ajoutées'));
          dispatch(showOrHideAlert(true));
          dispatch(changeAlertVariant('success'));
          setTimeout(() => {
            dispatch(showOrHideAlert(false));
          }, '5000');
        })
        .catch((err) => {
          console.log(err);
          dispatch(newAlertMessage("Les modifications n'ont pas pu etre ajoutées"));
          dispatch(showOrHideAlert(true));
          dispatch(changeAlertVariant('danger'));
          setTimeout(() => {
            dispatch(showOrHideAlert(false));
          }, '5000');
        });
    }
  };

  const changeClickedAdd = () => {
    if (clickedAdd === true) {
      setClickedAdd(false);
    } else {
      setClickedAdd(true);
    }
  };

  const handleSubmitMember = async (id) => {
    await AxiosPrivate.put(`/members/${id}`, {
      nickname: nicknameMember,
      isAdult: isAdult,
    })
      .then(() => {
        dispatch(newAlertMessage('modifications de membres bien ajoutées'));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('success'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
        changeClickedAdd();
      })
      .catch((err) => {
        console.log(err);
        dispatch(newAlertMessage("Les modifications des membres n'ont pas pu être ajoutées"));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('danger'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
      });
  };

  const getPicture = (photo) => {
    if (photo.picture !== null) {
      return (
        `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/${photo.picture}`
      );
    }
    return (
      utilisateur
    );
  };

  const getPictureMember = (member) => {
    if (member.isAdult === true) {
      return (
        adulte
      );
    }
    return (
      enfant
    );
  };

  const getProfil = async () => {
    await AxiosPrivate.get('/user')
      .then((response) => {
        setProfil(response.data);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
        dispatch(setNewNickname(response.data.nickname));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMembers = async () => {
    await AxiosPrivate.get('/members')
      .then((response) => {
        setMembers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromMember = async (id) => {
    await AxiosPrivate
      .delete(
        `/members/${id}`,
      )
      .then(() => {
        dispatch(newAlertMessage('Membre bien supprimé'));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('success'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
        changeClickedAdd();
      })
      .catch(() => {
        dispatch(newAlertMessage("Le membre n'a pas pu être supprimé"));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('danger'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
      });
  };

  const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ picture: base64 });
  };

  //   atob()

  // const handlemodalShow = () => { setModalShow(false); };
  // eslint-disable-next-line no-unused-expressions

  useEffect(() => {
    getProfil();
    getMembers();
  }, []);

  useEffect(() => {
    getProfil();
    getMembers();
    console.log(profil);
  }, [clickedAdd]);

  return (
    <section className="MyInfos-container">
      <Form
        className="MyInfos"
        noValidate
        validated={validated}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
            <Form.Label className="MyInfos-row-group-label">Confirmation de mot de passe</Form.Label>
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
                src={getPicture(profil)}
                alt="profil de l'utilisateur"
                className="MyInfos-row-group-img"
              />
            </Form.Label>
            <Form.Control
              className="MyInfos-row-group-input"
              type="file"
              label="Image"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
              required
            />
          </Form.Group>
        </Row>
        <Button type="submit">Modifier</Button>
      </Form>

      <h1>Modification des membres</h1>
      <section className="MyInfos-formMember-container">
        {members.map((member) => (
          <Form
            key={member.id}
            className="MyInfos-formMember"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmitMember(member.id);
            }}
          >
            <Form.Group className="MyInfos-row-group" as={Col} md="4">
              <Form.Label className="MyInfos-row-group-label">
                <img
                  src={getPictureMember(member)}
                  alt="profil de l'utilisateur"
                  className="MyInfos-row-group-img"
                />
              </Form.Label>
              <Form.Control
                required
                type="text"
                className="MyInfos-row-group-input-members"
                name="nicknameMembers"
                id="nicknameMembers"
                placeholder="Pseudo du membre"
                defaultValue={member.nickname}
                onChange={(event) => {
                  setNicknameMember(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Select
              onChange={(event) => {
                if (event.target.value === 'Enfant') {
                  setIsAdult(false);
                } else {
                  setIsAdult(true);
                }
              }}
              aria-label="Default select example"
            >
              <option>{member.isAdult ? 'Adulte' : 'Enfant'}</option>
              <option>
                Enfant
              </option>
              <option>
                Adulte
              </option>
            </Form.Select>
            <Button className="MyInfos-row-group-button" type="submit">Modifier</Button>
            <Button
              className="MyInfos-row-group-button MyInfos-row-group-button-delete"
              type="button"
              onClick={() => {
                removeFromMember(member.id);
              }}
            >
              supprimer
            </Button>
          </Form>
        ))}
      </section>
      <Button className="MyInfos-row-group-button" variant="primary" onClick={() => setModalShow(true)}>
        Ajouter un membre
      </Button>
      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => dispatch(showOrHideAlert(false))}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setclickedadd={setClickedAdd}
        clickedadd={clickedAdd}
      />
    </section>
  );
}

export default MyInfos;
