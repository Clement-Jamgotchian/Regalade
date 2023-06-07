import './HomepageInscription.scss';
import { useState } from 'react';

import tomate from '../../assets/tomate.png';
import trancheTomate from '../../assets/trancheTomate.png';
import huile from '../../assets/huile.png';
import pain from '../../assets/pain.png';
import pomme from '../../assets/pomme.png';
import boisson from '../../assets/boisson.png';
import concombre from '../../assets/concombre.png';

function HomepageInscription() {
  const [currDegUp, useCurrDegUp] = useState(0);
  const [currDegIn, useCurrDegIn] = useState(180);
  const [logoDeg, useLogoDeg] = useState(0);
  const [displayUp, useDisplayUp] = useState('');
  const [displayIn, useDisplayIn] = useState('none');
  const rotate = (e) => {
    if (e.target.className === 'formSign-signupButton') {
      useCurrDegUp(180);
      useCurrDegIn(360);
      useLogoDeg(0);
      useDisplayUp('none');
      useDisplayIn('');
    }
    if (e.target.className === 'formSign-signinButton') {
      useCurrDegUp(0);
      useCurrDegIn(180);
      useLogoDeg(0);
      useDisplayUp('');
      useDisplayIn('none');
    }
  };

  return (
    <div className="formSign">
      <section className="formSign-container">
        <div className="formSign-carousel">
          <form className="formSign-carousel-in" style={{ transform: `rotateY(${currDegIn}deg) translateZ(150px) translateY(200px)` }}>
            <button type="submit" className="formSign-signinButton" style={{ display: `${displayIn}`, transition: '1s' }} onClick={rotate}>S&apos;inscrire</button>
            <input
              style={{ display: `${displayIn}` }}
              type="text"
              name="identifiant"
              placeholder="Identifiant"
              className="formSign-input"
              required
            />
            <input
              style={{ display: `${displayIn}` }}
              type="password"
              placeholder="Mot de passe"
              className="formSign-input formSign-in-password"
              required
            />
            <button style={{ display: `${displayIn}` }} type="submit" className="formSign-submit">Se connecter</button>
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
            <img src={boisson} alt="boisson" className="item boisson" />
            <img src={concombre} alt="concombre" className="item concombre" />
          </div>
          <form className="formSign-carousel-up" style={{ transform: `rotateY(${currDegUp}deg) translateZ(150px) translateY(200px)` }}>
            <input
              style={{ display: `${displayUp}` }}
              type="text"
              name="identifiant"
              placeholder="Identifiant"
              className="formSign-input"
              required
            />
            <input
              style={{ display: `${displayUp}` }}
              type="email"
              name="email"
              placeholder="E-mail"
              className="formSign-input formSign-in-email"
              required
            />
            <input
              style={{ display: `${displayUp}` }}
              type="password"
              placeholder="Mot de passe"
              className="formSign-input formSign-in-password"
              required
            />
            <input
              style={{ display: `${displayUp}` }}
              type="password"
              placeholder="Confirmation de mot de passe"
              className="formSign-input formSign-in-password"
              required
            />
            <button style={{ display: `${displayUp}` }} type="submit" className="formSign-submit">S&apos;inscrire</button>
          </form>
        </div>
      </section>
      <button type="submit" className="formSign-signupButton" onClick={rotate}>Se connecter</button>
      <p className="formSign-description">
        Explorez un monde de saveurs avec notre site de recettes.
        Des plats délicieux, des astuces pratiques et une cuisine inspirante vous attendent.
        Rejoignez-nous et découvrez le plaisir de cuisiner au quotidien !
      </p>
      <a href="#top" className="formSign-button">Aller vers le site</a>
    </div>
  );
}

export default HomepageInscription;
