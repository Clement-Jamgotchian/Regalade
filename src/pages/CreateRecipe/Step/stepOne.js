/* eslint-disable react/prop-types */
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import entree from '../../../assets/entrees.png';
import plat from '../../../assets/plat.png';
import gateau from '../../../assets/gateau.png';

function StepOne({
  setPostImage,
  title,
  setTitle,
  setCategory,
  setPortions,
  portions,
  setDisplayOne,
  setDisplayTwo,
  setDisplayThree,
  displayOne,
}) {
  const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ picture: base64 });
  };
  return (
    <section className="CreateRecipe-1" style={{ display: `${displayOne}` }}>
      <h2>Etape 1</h2>
      <Row className="mb-3 CreateRecipe-form-row-1">
        <Form.Group className="CreateRecipe-form-row-1-group CreateRecipe-form-row-1-background-1" as={Col} md="4">
          <Form.Label className="CreateRecipe-form-row-1-group-label">Titre</Form.Label>
          <Form.Control
            required
            className="CreateRecipe-form-row-1-group-input"
            type="text"
            name="title"
            id="title"
            placeholder="Titre de la recette"
            value={title}
            onChange={(e) => { setTitle(e.target.value); }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-1">
        <Form.Group className="CreateRecipe-form-row-1-group CreateRecipe-form-row-1-background-2" as={Col} md="6">
          <Form.Label className="CreateRecipe-form-row-1-group-label">
            La photo de la recette
          </Form.Label>
          <Form.Control
            className="CreateRecipe-form-row-1-group-input"
            type="file"
            label="Image"
            name="myFile"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-1">
        <Form.Group className="CreateRecipe-form-row-1-portions" md="4">
          <Form.Label className="CreateRecipe-form-row-1-group-label">
            Nombre de personne
          </Form.Label>
          <Form.Range
            className="CreateRecipe-form-row-1-group-range"
            min={1}
            max={10}
            onChange={(e) => {
              setPortions((e.target.value));
            }}
            defaultValue={1}
          />
          <InputGroup.Text className="CreateRecipe-form-row-1-group-text">
            Pour
            {' '}
            { portions }
            {' '}
            personne(s)
          </InputGroup.Text>
        </Form.Group>
      </Row>
      <Form.Group
        key="inline-radio-one"
        className="mb-3"
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <Form.Label className="CreateRecipe-form-row-1-group-label-plat">
          Type de plat
        </Form.Label>
        <section className="CreateRecipe-form-row-1-group-check">
          <div>
            <img src={entree} alt="une entrée" />
            <Form.Check
              inline
              label="entrée"
              name="group1"
              type="radio"
              id="inline-radio-3"
              value={1}
            />
          </div>
          <div>
            <img src={plat} alt="une entrée" />
            <Form.Check
              inline
              label="plat"
              name="group1"
              type="radio"
              id="inline-radio-1"
              value={2}
            />
          </div>
          <div>
            <img src={gateau} alt="une entrée" />
            <Form.Check
              inline
              label="dessert"
              name="group1"
              type="radio"
              id="inline-radio-2"
              value={3}
            />
          </div>
        </section>
      </Form.Group>
      <Button className="CreateRecipe-form-button" type="button" onClick={() => { setDisplayOne('none'); setDisplayTwo(''); setDisplayThree('none'); }}>Etape 2</Button>
    </section>
  );
}

export default StepOne;
