/* eslint-disable object-shorthand */
import './HomepageInscription.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Dispatch
import { useDispatch } from 'react-redux';
import { setConnectedUser } from '../../actions/user';

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
  const [currDegUp, setCurrDegUp] = useState(0);
  const [currDegIn, setCurrDegIn] = useState(180);
  const [logoDeg, setLogoDeg] = useState(0);
  const [displayUp, setDisplayUp] = useState('');
  const [displayIn, setDisplayIn] = useState('none');
  const [displayCarousel, setDisplayCarousel] = useState('');
  const [displayDetails, setDisplayDetails] = useState('flex');
  const [indexIn, setIndexIn] = useState(0);
  const [indexUp, setIndexUp] = useState(10);
  const [error, setError] = useState('');

  // registration state
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

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
      setCurrDegUp(0);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/login_check', {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(setConnectedUser(true));
        window.location.replace('/home');
      })
      .catch((err) => {
        console.log(err);
        alert('Mauvais email/password');
      });
  };

  const handleSubmitCreate = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log('bon mot de passe');
      axios.post('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/user', {
        email: email,
        nickname: nickname,
        password: password,
      })
        .then((res) => {
          console.log(res.data);
          dispatch(setConnectedUser(true));
          window.location.replace('/home');
        })
        .catch(() => {
          alert('Oups !');
          setError('');
        });
    } else {
      console.log('mauvais mot de passe');
    }
  };

  return (
    <div className="formSign">
      <section className="formSign-container" style={{ display: `${displayCarousel}` }}>
        <div className="formSign-carousel">
          <form
            className="formSign-carousel-up"
            onSubmit={handleSubmitCreate}
            style={{ transform: `rotateY(${currDegUp}deg) translateZ(150px) translateY(200px)`, zIndex: `${indexUp}` }}
          >
            <button type="submit" className="formSign-signupButton" style={{ display: `${displayUp}`, zIndex: `${indexUp}` }} onClick={rotate}>Se connecter</button>
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
                console.log(confirmPassword);
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
            <img src={trancheTomate} alt="trancheTomate" className="item trancheTomate" />
            <img src={huile} alt="huile" className="item huile" />
            <img src={pain} alt="pain" className="item pain" />
            <img src={pomme} alt="pomme" className="item pomme" />
            <img src={concombre} alt="concombre" className="item concombre" />
          </div>
          <form
            className="formSign-carousel-in"
            onSubmit={handleSubmit}
            style={{ transform: `rotateY(${currDegIn}deg) translateZ(150px) translateY(200px)`, zIndex: `${indexIn}` }}
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
            <button type="button" className="formSign-cancelButton" onClick={displayTrigger}><img src={cancel} alt="bouton croix pour fermer" className="formSign-cancelButton-image" /></button>
            <p className="formSign-carousel-title"> Se connecter</p>
            <input
              style={{ display: `${displayIn}`, zIndex: `${indexIn}` }}
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
              style={{ display: `${displayIn}`, zIndex: `${indexIn}` }}
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
              style={{ display: `${displayIn}`, zIndex: `${indexIn}` }}
              type="submit"
              className="formSign-submit"
            >
              Continuer &#x2794;
            </button>
          </form>
        </div>
      </section>
      <section className="formSign-details" style={{ display: `${displayDetails}` }}>
        <img src={logo} alt="logo régalade" className="formSign-logo" />
        <p className="formSign-description">
          Explorez un monde de saveurs avec notre site de recettes.
          Des plats délicieux, des astuces pratiques et une cuisine inspirante vous attendent.
          Rejoignez-nous et découvrez le plaisir de cuisiner au quotidien !
        </p>
        <button type="button" className="formSign-buttonSign" onClick={displayTrigger}> Se connecter / S&apos;inscrire</button>
        <Link to="/home" className="formSign-button">Aller vers le site</Link>
      </section>
    </div>
  );
}

export default HomepageInscription;
