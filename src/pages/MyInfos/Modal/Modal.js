/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { newAlertMessage } from '../../../actions/list';

function MyVerticallyCenteredModal(props) {
  const [nickname, setNickname] = useState('');
  const [isAdult, setIsAdult] = useState(true);

  const dispatch = useDispatch();
  const handleCreateMember = async (event) => {
    event.preventDefault();
    await axios.post('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/members', {
      nickname,
      isAdult,
    })
      .then(() => {
        dispatch(newAlertMessage('modifications bien ajoutées'));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleCreateMember}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter un nouveau membre
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                }}
                placeholder="Pseudo"
              />
              <Form.Control.Feedback>Parfait!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Select aria-label="Default select example">
              <option>Adulte ou enfant</option>
              <option value={() => { setIsAdult(false); }}>Enfant</option>
              <option value={() => { setIsAdult(true); }}>Adulte</option>
            </Form.Select>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Ajouter</Button>
          <Button type="button" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
