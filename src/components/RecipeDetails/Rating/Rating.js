/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './Rating.scss';
import AxiosPrivate from '../../../utils/AxiosPrivate';

function Rating({ recipe }) {
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);
  const [clicked5, setClicked5] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [hover5, setHover5] = useState(false);
  const [rating, setRating] = useState();
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      content,
      rating,
      recipe,
    };
    await AxiosPrivate
      .post('/comments', data)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className="Rating">
      <Card.Title className="Rating--title">
        Donnez votre avis
      </Card.Title>
      <Card.Body>
        <FontAwesomeIcon
          icon={clicked1 ? faStar : (hover1 ? faStar : farStar)}
          onMouseOver={() => setHover1(true)}
          onMouseOut={() => setHover1(false)}
          onClick={() => {
            setClicked1(true);
            setClicked2(false);
            setClicked3(false);
            setClicked4(false);
            setClicked5(false);
            setRating(1);
          }}
        />
        <FontAwesomeIcon
          icon={clicked2 ? faStar : (hover2 ? faStar : farStar)}
          onMouseOver={() => {
            setHover1(true);
            setHover2(true);
          }}
          onMouseOut={() => {
            setHover1(false);
            setHover2(false);
          }}
          onClick={() => {
            setClicked1(true);
            setClicked2(true);
            setClicked3(false);
            setClicked4(false);
            setClicked5(false);
            setRating(2);
          }}
        />
        <FontAwesomeIcon
          icon={clicked3 ? faStar : (hover3 ? faStar : farStar)}
          onMouseOver={() => {
            setHover1(true);
            setHover2(true);
            setHover3(true);
          }}
          onMouseOut={() => {
            setHover1(false);
            setHover2(false);
            setHover3(false);
          }}
          onClick={() => {
            setClicked1(true);
            setClicked2(true);
            setClicked3(true);
            setClicked4(false);
            setClicked5(false);
            setRating(3);
          }}
        />
        <FontAwesomeIcon
          icon={clicked4 ? faStar : (hover4 ? faStar : farStar)}
          onMouseOver={() => {
            setHover1(true);
            setHover2(true);
            setHover3(true);
            setHover4(true);
          }}
          onMouseOut={() => {
            setHover1(false);
            setHover2(false);
            setHover3(false);
            setHover4(false);
          }}
          onClick={() => {
            setClicked1(true);
            setClicked2(true);
            setClicked3(true);
            setClicked4(true);
            setClicked5(false);
            setRating(4);
          }}
        />
        <FontAwesomeIcon
          icon={clicked5 ? faStar : (hover5 ? faStar : farStar)}
          onMouseOver={() => {
            setHover1(true);
            setHover2(true);
            setHover3(true);
            setHover4(true);
            setHover5(true);
          }}
          onMouseOut={() => {
            setHover1(false);
            setHover2(false);
            setHover3(false);
            setHover4(false);
            setHover5(false);
          }}
          onClick={() => {
            setClicked1(true);
            setClicked2(true);
            setClicked3(true);
            setClicked4(true);
            setClicked5(true);
            setRating(5);
          }}
        />
        <Form onSubmit={handleSubmit}>
          <Form.Control as="textarea" aria-label="comment" value={content} onChange={(e) => setContent(e.target.value)} />
          <Button className="Rating--submitButton" id="submit-comment" variant="success" type="submit">
            Envoyer
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

Rating.propTypes = {
  recipe: PropTypes.string.isRequired,
};

export default Rating;
