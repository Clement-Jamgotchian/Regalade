import './Loader.scss';

import tomate from '../../assets/tomate.png';
import trancheTomate from '../../assets/trancheTomate.png';
import huile from '../../assets/huile.png';
import pain from '../../assets/pain.png';
import pomme from '../../assets/pomme.png';
import concombre from '../../assets/concombre.png';

function Loader() {
  return (
    <section className="loader">
      <img src={tomate} alt="tomate" className="loader-item loader-tomate" />
      <img src={trancheTomate} alt="trancheTomate" className="loader-item loader-trancheTomate" />
      <img src={huile} alt="huile" className="loader-item loader-huile" />
      <img src={pain} alt="pain" className="loader-item loader-pain" />
      <img src={pomme} alt="pomme" className="loader-item loader-pomme" />
      <img src={concombre} alt="concombre" className="loader-item loader-concombre" />
    </section>
  );
}

export default Loader;
