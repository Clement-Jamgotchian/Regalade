/* eslint-disable react/prop-types */
import { Button, Col, Form, Row } from 'react-bootstrap';

function StepOne({ setPostImage, title, setTitle, setCategory }) {
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
    <section className="CreateRecipe-1">
      <Row className="mb-3 CreateRecipe-form-row-1">
        <Form.Group className="CreateRecipe-form-row-1-group" as={Col} md="4">
          <Form.Label className="CreateRecipe-form-row-1-group-label">Titre</Form.Label>
          <Form.Control
            required
            className="CreateRecipe-form-row-1-group-input"
            type="text"
            name="title"
            id="title"
            placeholder="Titre de la recette"
            value={title}
            onChange={(e) => { setTitle(e.target.value); console.log(title); }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3 CreateRecipe-form-row-1">
        <Form.Group className="CreateRecipe-form-row-1-group" as={Col} md="6">
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
      <div
        key="inline-radio-one"
        className="mb-3"
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <Form.Label className="CreateRecipe-form-row-1-group-label">
          Type de plat
        </Form.Label>
        <Form.Check
          inline
          label="entrée"
          name="group1"
          type="radio"
          id="inline-radio-3"
        />
        <Form.Check
          inline
          label="plat"
          name="group1"
          type="radio"
          id="inline-radio-1"
        />
        <Form.Check
          inline
          label="dessert"
          name="group1"
          type="radio"
          id="inline-radio-2"
        />
      </div>
      <Button className="CreateRecipe-form-button" type="button">Etape 2</Button>
    </section>
  );
}

export default StepOne;
