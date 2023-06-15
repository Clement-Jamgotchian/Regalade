/* eslint-disable object-shorthand */
import './HomepageInscription.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Dispatch
import { useDispatch } from 'react-redux';
import {
  setConnectedUser,
  setInvitedUser,
  setNewNickname,
  setTokenUser,
} from '../../actions/user';

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
      setCurrDegIn(0);
      setLogoDeg(0);
      setDisplayUp('none');
      setDisplayIn('');
    }
    if (e.target.className === 'formSign-signinButton') {
      setCurrDegUp(360);
      setCurrDegIn(180);
      setLogoDeg(0);
      setDisplayUp('');
      setDisplayIn('none');
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

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/login_check',
        {
          email: email,
          password: password,
        },
      )
      .then((res) => {
        console.log(res);
        dispatch(setTokenUser(res.data.token));
        dispatch(setConnectedUser(true));
        dispatch(setInvitedUser(false));
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        // localStorage.setItem('isLogged', setConnectedUser(true));

        console.log("c'est ok");
        navigate('/recettes');
      })
      .catch((err) => {
        console.log(err);
        alert('Mauvais email/password');
      });
  }

  const handleSubmitCreate = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log('bon mot de passe');
      axios
        .post(
          'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/user',
          {
            email: email,
            nickname: nickname,
            password: password,
          },
        )
        .then((res) => {
          console.log(res.data.nickname);
          dispatch(setTokenUser());
          dispatch(setConnectedUser(true));
          dispatch(setNewNickname(res.data.nickname));

          axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
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
            onSubmit={handleSubmitCreate}
            style={{
              transform: `rotateY(${currDegUp}deg) translateZ(150px) translateY(200px)`,
            }}
          >
            <button
              type="submit"
              className="formSign-signupButton"
              style={{ display: `${displayUp}` }}
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
                alt="bouton croix pour fermer"
                className="formSign-cancelButton-image"
              />
            </button>
            <p className="formSign-carousel-title"> S&apos;inscrire</p>
            <input
              style={{ display: `${displayUp}` }}
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
              style={{ display: `${displayUp}` }}
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
              style={{ display: `${displayUp}` }}
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
              style={{ display: `${displayUp}` }}
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
              style={{ display: `${displayUp}` }}
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
            onSubmit={handleSubmit}
            style={{
              transform: `rotateY(${currDegIn}deg) translateZ(150px) translateY(200px)`,
            }}
          >
            <button
              type="submit"
              className="formSign-signinButton"
              style={{ display: `${displayIn}`, transition: '1s' }}
              onClick={rotate}
            >
              S&apos;inscrire
            </button>
            <button
              type="submit"
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
                alt="bouton croix pour fermer"
                className="formSign-cancelButton-image"
              />
            </button>
            <p className="formSign-carousel-title"> Se connecter</p>
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

        <Link to="/recettes" className="formSign-button" onClick={inviteUser}>
          Aller vers le site
        </Link>
      </section>
    </div>
  );
}

export default HomepageInscription;
