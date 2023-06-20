/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeAlertVariant, newAlertMessage, showOrHideAlert } from '../../../actions/list';

function MyVerticallyCenteredModal(props) {
  const [nickname, setNickname] = useState('');
  const [isAdult, setIsAdult] = useState(false);
  const showAlert = useSelector((state) => state.list.showAlert);
  const alertMessage = useSelector((state) => state.list.alertMessage);
  const alertVariant = useSelector((state) => state.list.alertVariant);

  const dispatch = useDispatch();
  const handleCreateMember = async (event) => {
    event.preventDefault();
    await axios.post('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/members', {
      nickname,
      isAdult,
    })
      .then(() => {
        dispatch(newAlertMessage('Un membres a bien été ajoutées'));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('success'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
        if (props.clickedadd === true) {
          props.setclickedadd(false);
        } else {
          props.setclickedadd(true);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(newAlertMessage("Le membre n'a pas pu être ajoutées"));
        dispatch(showOrHideAlert(true));
        dispatch(changeAlertVariant('danger'));
        setTimeout(() => {
          dispatch(showOrHideAlert(false));
        }, '5000');
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
                onChange={(event) => {
                  setNickname(event.target.value);
                }}
                placeholder="Pseudo"
              />
              <Form.Control.Feedback>Parfait!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
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
              <option>Adulte ou enfant</option>
              <option>Enfant</option>
              <option>Adulte</option>
            </Form.Select>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
          >
            Ajouter
          </Button>
          <Button type="button" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
