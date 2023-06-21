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

  const deleteStep = (id) => {
    setAllStepLocal(...allStepLocal.slice(0, id), ...allStepLocal.slice(id + 1));
  };

  const stepView = () => {
    if (allStepLocal.length === 0) {
      return (
        "Il n'y a pas encore d'étapes pour cette recette. Elle doit être super rapide."
      );
    }
    return (allStepLocal.map((step) => (
      <InputGroup key={step.number}>
        <InputGroup.Text>
          Etape
          {' '}
          {step.number}
        </InputGroup.Text>
        <InputGroup.Text>{step.oneStep}</InputGroup.Text>
        <Button
          className="CreateRecipe-button-step-delete"
          key={step.number}
          type="button"
          onClick={() => {
            deleteStep(step.number);
          }}
        >
          <img src="" alt="" />
        </Button>
      </InputGroup>
    )));
  };

  const addStep = () => {
    const newStep = oneStep;
    const newSteplocal = {
      oneStep,
      number: Math.max(...allStepLocal.map((t) => t.number)) + 1,
    };
    setAllStepLocal([...allStepLocal, newSteplocal]);
    setAllStep(`${allStep} Etape ${stepNumber} ${newStep}`);
    setStepNumber(stepNumber + 1);
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
      <Button className="CreateRecipe-form-button" type="button" onClick={() => { addStep(); setOneStep(''); }}>Ajouter une étape</Button>
      <Row className="mb-3 CreateRecipe-form-row-3">
        {stepView()}
      </Row>
    </section>
  );
}

export default StepThree;
