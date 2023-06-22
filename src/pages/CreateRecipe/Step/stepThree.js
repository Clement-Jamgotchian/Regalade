/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

function StepThree({
  setStep,
  setConfirmed,
  // setDisplayOne,
  // setDisplayTwo,
  // setDisplayThree,
  displayThree,
}) {
  const [allStep, setAllStep] = useState('');
  const [allStepLocal, setAllStepLocal] = useState([]);
  const stepNumber = allStepLocal.length + 1;
  const [oneStep, setOneStep] = useState('');

  const deleteStep = (id) => {
    allStepLocal.splice(id - 1, 1);
  };

  const addStep = () => {
  //   allStepLocal.map((stepLocal) => {
  //     setOneStep(stepLocal.oneStep);
  //     setStepNumber(stepLocal.number);
  // });
    const newSteplocal = {
      oneStep,
      number: stepNumber,
    };
    // // eslint-disable-next-line array-callback-return
    // allStepLocal.map((stepLocal) => {
    //   // eslint-disable-next-line no-param-reassign
    //   stepLocal.number = allStepLocal.indexOf(stepLocal) + 1;
    // });
    setAllStepLocal([...allStepLocal, newSteplocal]);
    setAllStep(`${allStep} Etape ${stepNumber} ${oneStep}`);
  };

  const stepView = () => {
    if (allStepLocal.length === 0) {
      return (
        "Il n'y a pas encore d'étapes pour cette recette. Elle doit être super rapide."
      );
    }
    return (

      allStepLocal.map((stepLocal) => {
        // eslint-disable-next-line no-param-reassign
        stepLocal.number = allStepLocal.indexOf(stepLocal) + 1;
        return (
          <InputGroup key={stepLocal.number}>
            <InputGroup.Text>
              Etape
              {' '}
              {allStepLocal.indexOf(stepLocal) + 1}
            </InputGroup.Text>
            <InputGroup.Text>{stepLocal.oneStep}</InputGroup.Text>
            <Button
              className="CreateRecipe-button-step-delete"
              type="button"
              onClick={() => {
                deleteStep(stepLocal.number);
                setAllStepLocal([...allStepLocal]);
              }}
            >
              <img src="" alt="" />
            </Button>
          </InputGroup>
        );
      }));
  };

  const setAllStepInApi = () => {
    setAllStep(allStepLocal.map((stepLocal) => (`Etape ${stepLocal.number} ${stepLocal.oneStep}`)));
    setStep(allStep.toString());
  };

  useEffect(() => {
    setAllStepInApi();
  }, [allStepLocal]);

  return (
    <section className="CreateRecipe-3" style={{ display: `${displayThree}` }}>
      <h2>Etape 3</h2>
      <Row className="mb-3 CreateRecipe-form-row-3">
        <InputGroup className="CreateRecipe-form-row-3-group" as={Col} md="3">
          <Form.Label className="CreateRecipe-form-row-3-group-label">Les étapes</Form.Label>
          <InputGroup.Text>
            Etape
            {' '}
            {allStepLocal.length + 1}
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            required
            className="CreateRecipe-form-row-3-group-input"
            type="textarea"
            name="step"
            id="step"
            placeholder="Ecrire une étape"
            value={oneStep}
            min={0}
            max={1000}
            onChange={(e) => { setOneStep(e.target.value); }}
          />
          <Button className="CreateRecipe-form-button" type="button" onClick={() => { addStep(); setOneStep(''); setStep(allStep.toString()); }}>&#x2B;</Button>
        </InputGroup>
      </Row>
      <Form.Check
        required
        label="Je valide mes étapes"
        feedback="You must agree before submitting."
        feedbackType="invalid"
        onChange={(e) => (e.target.checked ? setConfirmed(true) : setConfirmed(false))}
        onClick={() => { setStep(allStep.toString()); }}
      />
      <Row className="mb-3 CreateRecipe-form-row-3">
        {stepView()}
      </Row>
      <Button className="CreateRecipe-form-button" type="submit">Créer</Button>
    </section>
  );
}

export default StepThree;
