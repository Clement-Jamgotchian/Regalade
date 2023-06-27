/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

function StepFourEdit({
  setStep,
  setConfirmed,
  setDisplayOne,
  setDisplayTwo,
  setDisplayThree,
  setDisplayFour,
  displayFour,
  loading,
  recipeToEdit,
}) {
  const [allStep, setAllStep] = useState('');
  const [allStepLocal, setAllStepLocal] = useState([]);
  const stepNumber = allStepLocal.length + 1;
  const [oneStep, setOneStep] = useState('');
  // const [test, setTest] = useState([]);

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
    setAllStep(`${allStep} ÉTAPE ${stepNumber} ${oneStep}`);
  };

  const addStepEdit = () => {
    const regex = /ÉTAPE [0-9]* /g;
    const recipesStep = recipeToEdit.step.split(regex);
    // eslint-disable-next-line array-callback-return, consistent-return
    const retest = recipesStep.map((step) => {
      const newSteplocal = {
        oneStep: step,
        number: stepNumber + 1,
      };
      return newSteplocal;
    });

    // // eslint-disable-next-line array-callback-return
    // allStepLocal.map((stepLocal) => {
    //   // eslint-disable-next-line no-param-reassign
    //   stepLocal.number = allStepLocal.indexOf(stepLocal) + 1;
    // });
    setAllStepLocal(retest);
  };
  console.log(allStepLocal);
  function viewThree() {
    setDisplayOne('none'); setDisplayTwo('none'); setDisplayThree(''); setDisplayFour('none');
  }

  const stepView = () => {
    if (allStepLocal.length === 0) {
      return (
        "Il n'y a pas encore d'étapes pour cette recette. Elle doit être super rapide."
      );
    }
    return (

      allStepLocal.map((stepLocal) => {
        if (stepLocal.oneStep === '') {
          allStepLocal.splice(allStepLocal.indexOf(stepLocal), 1);
        }
        // eslint-disable-next-line no-param-reassign
        stepLocal.number = allStepLocal.indexOf(stepLocal) + 1;
        return (
          <Form.Group key={stepLocal.number} className="CreateRecipe-form-row-4-step">
            <Form.Text className="CreateRecipe-form-row-4-step-title">
              ÉTAPE
              {' '}
              {allStepLocal.indexOf(stepLocal) + 1}
            </Form.Text>
            <Form.Text className="CreateRecipe-form-row-4-step-text">{stepLocal.oneStep}</Form.Text>
            <Button
              className="CreateRecipe-form-row-4-delete"
              type="button"
              onClick={() => {
                deleteStep(stepLocal.number);
                setAllStepLocal([...allStepLocal]);
              }}
            >
              <img src="" alt="" />
            </Button>
          </Form.Group>
        );
      }));
  };

  const setAllStepInApi = () => {
    setAllStep(allStepLocal.map((stepLocal) => (`ÉTAPE ${stepLocal.number} ${stepLocal.oneStep}`)));
    setStep(allStep.toString());
  };

  useEffect(() => {
    addStepEdit();
  }, []);

  useEffect(() => {
    setAllStepInApi();
  }, [allStepLocal]);

  return (
    <section className="CreateRecipe-4" style={{ display: `${displayFour}` }}>
      <Button className="CreateRecipe-1-button" onClick={() => { viewThree(); }}>&#x2190;</Button>
      <h2 className="CreateRecipe-1-title">Etape 4</h2>
      <Row className="mb-3 CreateRecipe-form-row-3">
        <Form.Group className="CreateRecipe-form-row-4-group" as={Col} md="3">
          <Form.Label className="CreateRecipe-form-row-4-group-label">Les étapes</Form.Label>
          <InputGroup.Text className="CreateRecipe-form-row-4-group-text">
            ÉTAPE
            {' '}
            {allStepLocal.length + 1}
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            className="CreateRecipe-form-row-4-group-input"
            type="textarea"
            name="step"
            id="step"
            placeholder="Ecrire une étape"
            value={oneStep}
            min={0}
            max={1000}
            onChange={(e) => { setOneStep(e.target.value); }}
          />
          <Button className="CreateRecipe-form-row-4-group-button" type="button" onClick={() => { addStep(); setOneStep(''); setStep(allStep.toString()); }}>&#x2B; Ajouter cette étape</Button>
        </Form.Group>
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-4">
        {stepView()}
      </Row>
      <Form.Check
        className="mb-3 CreateRecipe-form-row-4-checked row"
        required
        label="Je valide mes étapes"
        feedback="You must agree before submitting."
        feedbackType="invalid"
        onChange={(e) => (e.target.checked ? setConfirmed(true) : setConfirmed(false))}
        onClick={() => { setStep(allStep.toString()); }}
      />
      <Button className="CreateRecipe-button" type="submit">Modifier</Button>
      <p>{loading === 'true' ? 'Recette dans les fourneaux, veuillez patienter ...' : ''}</p>
    </section>
  );
}

export default StepFourEdit;
