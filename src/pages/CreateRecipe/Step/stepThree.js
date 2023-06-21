/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

function StepThree({ step, setStep }) {
  const [allStep, setAllStep] = useState('');
  const [allStepLocal, setAllStepLocal] = useState([]);
  const stepNumber = 1;
  const [oneStep, setOneStep] = useState('');
  console.log(allStep);
  console.log(step);
  const deleteStep = (id) => {
    allStepLocal.splice(id - 1, 1);
  };

  const stepView = () => {
    if (allStepLocal.length === 0) {
      return (
        "Il n'y a pas encore d'étapes pour cette recette. Elle doit être super rapide."
      );
    }
    return (
    // <InputGroup>
    //   <ListGroup>
    //     {numbers.map((number) => (

    //       <InputGroup.Item key={number}>
    //         Etape
    //         {' '}
    //         {number}

    //       </InputGroup.Item>

    //     ))}

      //   </ListGroup>
      allStepLocal.map((stepLocal) => {
        // eslint-disable-next-line no-param-reassign
        stepLocal.number = allStepLocal.indexOf(stepLocal) + 1;
        console.log(stepLocal.number);
        // setAllStep(`${allStep} Etape ${stepLocal.stepNumber} ${stepLocal.oneStep}`);
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
              }}
            >
              <img src="" alt="" />
            </Button>
          </InputGroup>
        );
      }));
    //     <ListGroup>
    //       {numbers.map((number) => (
    //         <Button
    //           className="CreateRecipe-button-step-delete"
    //           type="button"
    //           value={number}
    //           onClick={() => {
    //             deleteStep(number);
    //           }}
    //         >
    //           <img src="" alt="" />
    //         </Button>
    //       ))}

    //     </ListGroup>
    //   </InputGroup>

    // // </InputGroup>
    // );
  };

  const setAllStepInApi = () => {
    setAllStep(allStepLocal.map((number) => (
      `Etape ${number.number} ${number.oneStep}`
    )));
    setStep(allStep.toString());
  };

  const addStep = () => {
    const newSteplocal = {
      oneStep,
      number: stepNumber,
    };
    setAllStepLocal([...allStepLocal, newSteplocal]);
    setAllStep(`${allStep} Etape ${stepNumber} ${oneStep}`);
  };

  return (
    <section className="CreateRecipe-3">

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
            min={0}
            max={1000}
            onChange={(e) => { setOneStep(e.target.value); }}
          />
          <Button className="CreateRecipe-form-button" type="button" onClick={() => { addStep(); setOneStep(''); setAllStepInApi(); }}>&#x2B;</Button>
        </InputGroup>
      </Row>
      <Button className="CreateRecipe-form-button" type="button" onClick={() => { setAllStepInApi(); setStep(allStep.toString()); }}>&#x2B;</Button>
      <Row className="mb-3 CreateRecipe-form-row-3">
        {stepView()}
      </Row>
    </section>
  );
}

export default StepThree;
