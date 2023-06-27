/* eslint-disable object-shorthand */
import './HomepageInscription.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Dispatch
import { useDispatch } from 'react-redux';
import {
  setConnectedUser,
  setInvitedUser,
  setNicknameUser,
  setTokenUser,
} from '../../actions/user';

// Axios
// eslint-disable-next-line import/no-named-as-default
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';

// assets
import tomate from '../../assets/tomate.png';
import trancheTomate from '../../assets/trancheTomate.png';
import huile from '../../assets/huile.png';
import pain from '../../assets/pain.png';
import pomme from '../../assets/pomme.png';
import concombre from '../../assets/concombre.png';
import logo from '../../assets/logo.png';
import cancel from '../../assets/cancel.png';

function HomepageInscription() {
  // view state
  const [currDegUp, setCurrDegUp] = useState(180);
  const [currDegIn, setCurrDegIn] = useState(0);
  const [logoDeg, setLogoDeg] = useState(0);
  const [displayUp, setDisplayUp] = useState('none');
  const [displayIn, setDisplayIn] = useState('');

  const [displayCarousel, setDisplayCarousel] = useState('');
  const [displayDetails, setDisplayDetails] = useState('flex');
  const [indexIn, setIndexIn] = useState(10);
  const [indexUp, setIndexUp] = useState(0);

  const [error, setError] = useState('');

  // registration state
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rotate = (e) => {
    if (e.target.className === 'formSign-signupButton') {
      setCurrDegUp(180);
      setCurrDegIn(360);
      setLogoDeg(0);
      setDisplayUp('none');
      setDisplayIn('');
      setIndexUp(0);
      setIndexIn(10);
    }
    if (e.target.className === 'formSign-signinButton') {
      setCurrDegUp(360);
      setCurrDegIn(180);
      setLogoDeg(0);
      setDisplayUp('');
      setDisplayIn('none');
      setIndexUp(10);
      setIndexIn(0);
    }
  };

  const displayTrigger = (e) => {
    if (e.target.className === 'formSign-buttonSign') {
      setDisplayCarousel('flex');
      setDisplayDetails('none');
    }
    if (e.target.className === 'formSign-cancelButton-image') {
      setDisplayCarousel('none');
      setDisplayDetails('flex');
    }
  };

  function handleSubmit() {
    AxiosPrivate
      .post(
        '/login_check',
        {
          email: email,
          password: password,
        },
      )
      .then((res) => {
        dispatch(setTokenUser(res.data.token));
        dispatch(setConnectedUser(true));
        dispatch(setInvitedUser(false));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refresh_token);
        localStorage.setItem('invitedUser', JSON.stringify(false));
        localStorage.setItem('welcomePageShowed', JSON.stringify(true));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Mauvais email/password');
      });
  }

  const handleSubmitCreate = () => {
    if (password === confirmPassword) {
      AxiosPublic
        .post('/user', {
          email: email,
          nickname: nickname,
          password: password,
        })
        .then((res) => {
          console.log(res.data.nickname);
          dispatch(setTokenUser());
          dispatch(setConnectedUser(true));
          dispatch(setNicknameUser(res.data.nickname));
          handleSubmit();
        })
        .catch(() => {
          alert('Oups !');
          setError('');
        });
    } else {
      console.log('mauvais mot de passe');
    }
  };

  const inviteUser = () => {
    dispatch(setInvitedUser(true));
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.setItem('invitedUser', JSON.stringify(true));
    localStorage.setItem('welcomePageShowed', JSON.stringify(true));
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return (
    <div className="formSign">
      <section
        className="formSign-container"
        style={{ display: `${displayCarousel}` }}
      >
        <div className="formSign-carousel">
          <form
            className="formSign-carousel-up"
            onSubmit={(e) => { e.preventDefault(); handleSubmitCreate(); }}
            style={{
              transform: `rotateY(${currDegUp}deg) translateZ(150px) translateY(200px)`, zIndex: `${indexUp}`,
            }}
          >
            <button
              type="button"
              className="formSign-signupButton"
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              onClick={rotate}
            >
              Se connecter
            </button>
            <button
              type="button"
              className="formSign-cancelButton"
              onClick={displayTrigger}
            >
              <img
                src={cancel}
                style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
                alt="bouton croix pour fermer"
                className="formSign-cancelButton-image"
              />
            </button>
            <p style={{ display: `${displayUp}`, zIndex: `${indexUp}` }} className="formSign-carousel-title"> S&apos;inscrire</p>
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="text"
              name="nickname"
              placeholder="Identifiant"
              className="formSign-input"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
              }}
              required
            />
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="email"
              name="email"
              placeholder="E-mail"
              className="formSign-input formSign-in-email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="password"
              placeholder="Mot de passe"
              className="formSign-input formSign-in-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="password"
              placeholder="Confirmation de mot de passe"
              className="formSign-input formSign-in-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              required
            />
            <p>{error}</p>
            <button
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="submit"
              className="formSign-submit"
            >
              Continuer &#x2794;
            </button>
          </form>
          <div
            className="formSign-image"
            style={{ transform: `rotateY(${logoDeg}deg) translateX(-50%)` }}
          >
            <img src={tomate} alt="tomate" className="item tomate" />
            <img
              src={trancheTomate}
              alt="trancheTomate"
              className="item trancheTomate"
            />
            <img src={huile} alt="huile" className="item huile" />
            <img src={pain} alt="pain" className="item pain" />
            <img src={pomme} alt="pomme" className="item pomme" />
            <img src={concombre} alt="concombre" className="item concombre" />
          </div>
          <form
            className="formSign-carousel-in"
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            style={{
              transform: `rotateY(${currDegIn}deg) translateZ(150px) translateY(200px)`, zIndex: `${indexIn}`,
            }}
          >
            <button
              type="button"
              className="formSign-signinButton"
              style={{ display: `${displayIn}`, transition: '1s' }}
              onClick={rotate}
            >
              S&apos;inscrire
            </button>
            <button
              type="button"
              className="formSign-cancelButton"
              onClick={displayTrigger}
            >
              <img
                src={cancel}
                style={{ display: `${displayIn}` }}
                alt="bouton croix pour fermer"
                className="formSign-cancelButton-image"
              />
            </button>
            <p style={{ display: `${displayIn}` }} className="formSign-carousel-title"> Se connecter</p>
            <input
              style={{ display: `${displayIn}` }}
              type="email"
              name="email"
              placeholder="email"
              className="formSign-input"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            <input
              style={{ display: `${displayIn}` }}
              type="password"
              placeholder="Mot de passe"
              className="formSign-input formSign-in-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <button
              style={{ display: `${displayIn}` }}
              type="submit"
              className="formSign-submit"
            >
              Continuer &#x2794;
            </button>
          </form>
        </div>
      </section>
      <section
        className="formSign-details"
        style={{ display: `${displayDetails}` }}
      >
        <img src={logo} alt="logo régalade" className="formSign-logo" />
        <p className="formSign-description">
          Explorez un monde de saveurs avec notre site de recettes. Des plats
          délicieux, des astuces pratiques et une cuisine inspirante vous
          attendent. Rejoignez-nous et découvrez le plaisir de cuisiner au
          quotidien !
        </p>
        <button
          type="button"
          className="formSign-buttonSign"
          onClick={displayTrigger}
        >
          {' '}
          Se connecter / S&apos;inscrire
        </button>

        <Link to="/" className="formSign-button" onClick={inviteUser}>
          Aller vers le site
        </Link>
      </section>
    </div>
  );
}

export default HomepageInscription;
