/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

function StepThree() {
  const [stepNumber, setStepNumber] = useState(1);
  const [allStep, setAllStep] = useState('');
  const [allStepLocal, setAllStepLocal] = useState([]);
  const [oneStep, setOneStep] = useState('');
  console.log(allStepLocal);
  console.log(allStep);

  const addStep = () => {
    const newStep = oneStep;
    const newSteplocal = {
      oneStep,
      number: stepNumber,
    };
    setAllStepLocal([...allStepLocal, newSteplocal]);
    setAllStep(`${allStep} Etape ${stepNumber} ${newStep}`);
  };
  return (
    <section className="CreateRecipe-3">

      <Row className="mb-3 CreateRecipe-form-row-3">
        <InputGroup className="CreateRecipe-form-row-3-group" as={Col} md="3">
          <Form.Label className="CreateRecipe-form-row-3-group-label">Les étapes</Form.Label>
          <InputGroup.Text>
            Etape
            {' '}
            {stepNumber}
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            required
            className="CreateRecipe-form-row-3-group-input"
            type="textarea"
            name="step"
            id="step"
            placeholder="Ecrire une étape"
            min={0}
            max={1000}
            onChange={(e) => { setOneStep(e.target.value); }}
          />
        </InputGroup>
      </Row>
      <Button className="CreateRecipe-form-button" type="button" onClick={() => { setStepNumber(stepNumber + 1); addStep(); setOneStep(''); }}>Ajouter une étape</Button>

    </section>
  );
}

export default StepThree;
