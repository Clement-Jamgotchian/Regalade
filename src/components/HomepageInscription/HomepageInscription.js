import './HomepageInscription.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import tomate from '../../assets/tomate.png';
import trancheTomate from '../../assets/trancheTomate.png';
import huile from '../../assets/huile.png';
import pain from '../../assets/pain.png';
import pomme from '../../assets/pomme.png';
import concombre from '../../assets/concombre.png';
import logo from '../../assets/logo.png';
import cancel from '../../assets/cancel.png';

function HomepageInscription() {
  const [currDegUp, useCurrDegUp] = useState(0);
  const [currDegIn, useCurrDegIn] = useState(180);
  const [logoDeg, useLogoDeg] = useState(0);
  const [displayUp, useDisplayUp] = useState('');
  const [displayIn, useDisplayIn] = useState('none');
  const [displayCarousel, useDisplayCarousel] = useState('');
  const [displayDetails, useDisplayDetails] = useState('flex');
  const [indexIn, useIndexIn] = useState(0);
  const [indexUp, useIndexUp] = useState(10);
  const rotate = (e) => {
    if (e.target.className === 'formSign-signupButton') {
      useCurrDegUp(180);
      useCurrDegIn(360);
      useLogoDeg(0);
      useDisplayUp('none');
      useDisplayIn('');
      useIndexUp(0);
      useIndexIn(10);
    }
    if (e.target.className === 'formSign-signinButton') {
      useCurrDegUp(0);
      useCurrDegIn(180);
      useLogoDeg(0);
      useDisplayUp('');
      useDisplayIn('none');
      useIndexUp(10);
      useIndexIn(0);
    }
  };

  const displayTrigger = (e) => {
    if (e.target.className === 'formSign-buttonSign') {
      useDisplayCarousel('flex');
      useDisplayDetails('none');
    }
    if (e.target.className === 'formSign-cancelButton-image') {
      useDisplayCarousel('none');
      useDisplayDetails('flex');
    }
  };

  return (
    <div className="formSign">
      <section className="formSign-container" style={{ display: `${displayCarousel}` }}>
        <div className="formSign-carousel">
          <form className="formSign-carousel-up" style={{ transform: `rotateY(${currDegUp}deg) translateZ(150px) translateY(200px)`, zIndex: `${indexUp}` }}>
            <button type="submit" className="formSign-signupButton" style={{ display: `${displayUp}`, zIndex: `${indexUp}` }} onClick={rotate}>Se connecter</button>
            <button type="button" className="formSign-cancelButton" onClick={displayTrigger}><img src={cancel} alt="bouton croix pour fermer" className="formSign-cancelButton-image" /></button>
            <p className="formSign-carousel-title"> S&apos;inscrire</p>
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="text"
              name="identifiant"
              placeholder="Identifiant"
              className="formSign-input"
              required
            />
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="email"
              name="email"
              placeholder="E-mail"
              className="formSign-input formSign-in-email"
              required
            />
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="password"
              placeholder="Mot de passe"
              className="formSign-input formSign-in-password"
              required
            />
            <input
              style={{ display: `${displayUp}`, zIndex: `${indexUp}` }}
              type="password"
              placeholder="Confirmation de mot de passe"
              className="formSign-input formSign-in-password"
              required
            />
            <button style={{ display: `${displayUp}`, zIndex: `${indexUp}` }} type="submit" className="formSign-submit">Continuer &#x2794;</button>
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
          <form className="formSign-carousel-in" style={{ transform: `rotateY(${currDegIn}deg) translateZ(150px) translateY(200px)`, zIndex: `${indexIn}` }}>
            <button type="submit" className="formSign-signinButton" style={{ display: `${displayIn}`, transition: '1s' }} onClick={rotate}>S&apos;inscrire</button>
            <button type="button" className="formSign-cancelButton" onClick={displayTrigger}><img src={cancel} alt="bouton croix pour fermer" className="formSign-cancelButton-image" /></button>
            <p className="formSign-carousel-title"> Se connecter</p>
            <input
              style={{ display: `${displayIn}`, zIndex: `${indexIn}` }}
              type="text"
              name="identifiant"
              placeholder="Identifiant"
              className="formSign-input"
              required
            />
            <input
              style={{ display: `${displayIn}`, zIndex: `${indexIn}` }}
              type="password"
              placeholder="Mot de passe"
              className="formSign-input formSign-in-password"
              required
            />
            <button style={{ display: `${displayIn}`, zIndex: `${indexIn}` }} type="submit" className="formSign-submit">Continuer &#x2794;</button>
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
