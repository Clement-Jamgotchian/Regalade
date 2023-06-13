import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { MyLayout } from '../MyLayout';
import './Faq.scss';

function Faq() {
  return (
    <MyLayout>
      <section className="faq">
        <h1>FAQ</h1>
        <Accordion defaultActiveKey={['0']} alwaysOpen className="faq-accordion">
          <Accordion.Item eventKey="0" className="faq-accordion-item">
            <Accordion.Header className="faq-accordion-item-header">
              Si j&apos;aime pas le sucre est ce que je peux remplacer
              par du sel ?
            </Accordion.Header>
            <Accordion.Body className="faq-accordion-item-body">
              Evidemment le but est de laisser libre cours à votre imagination.
              Et pourquoi pas des tartines de roquefort banane ?
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="faq-accordion-item">
            <Accordion.Header className="faq-accordion-item-header">
              Que faire si je n&apos;ai pas le temps de faire à manger ?
            </Accordion.Header>
            <Accordion.Body className="faq-accordion-item-body">
              Il y a des recettes avec des temps de préparation différents et
              même des difficultés différentes tu trouveras ton bonheur avec
              tes disponibilités et tes goûts.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="faq-accordion-item">
            <Accordion.Header className="faq-accordion-item-header">
              Que faire si je n&apos;ai pas le temps de faire à manger ?
            </Accordion.Header>
            <Accordion.Body className="faq-accordion-item-body">
              Il y a des recettes avec des temps de préparation différents et
              même des difficultés différentes tu trouveras ton bonheur avec
              tes disponibilités et tes goûts.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="faq-accordion-item">
            <Accordion.Header className="faq-accordion-item-header">
              Que faire si je n&apos;ai pas le temps de faire à manger ?
            </Accordion.Header>
            <Accordion.Body className="faq-accordion-item-body">
              Il y a des recettes avec des temps de préparation différents et
              même des difficultés différentes tu trouveras ton bonheur avec
              tes disponibilités et tes goûts.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className="faq-accordion-item">
            <Accordion.Header className="faq-accordion-item-header">
              Que faire si je n&apos;ai pas le temps de faire à manger ?
            </Accordion.Header>
            <Accordion.Body className="faq-accordion-item-body">
              Il y a des recettes avec des temps de préparation différents et
              même des difficultés différentes tu trouveras ton bonheur avec
              tes disponibilités et tes goûts.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className="faq-accordion-item">
            <Accordion.Header className="faq-accordion-item-header">
              Que faire si je n&apos;ai pas le temps de faire à manger ?
            </Accordion.Header>
            <Accordion.Body className="faq-accordion-item-body">
              Il y a des recettes avec des temps de préparation différents et
              même des difficultés différentes tu trouveras ton bonheur avec
              tes disponibilités et tes goûts.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </MyLayout>
  );
}

export default Faq;
