/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import entree from '../../../assets/entrees.png';
import plat from '../../../assets/plat.png';
import gateau from '../../../assets/gateau.png';
import AxiosPrivate from '../../../utils/AxiosPrivate';

function StepOneEdit({
  setPostImage,
  setTitle,
  setCategory,
  setPortions,
  portions,
  setDisplayOne,
  setDisplayTwo,
  setDisplayThree,
  setDisplayFour,
  displayOne,
  recipeToEdit,
}) {
  const [categories, setCategories] = useState([]);
  const img = [entree, plat, gateau];

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

  const defaultValueRecipe = () => {
    // eslint-disable-next-line array-callback-return, consistent-return
    categories.map((category) => {
      if (recipeToEdit.category.title === category.title) {
        setCategory(category.id);
        return category.id;
      }
    });
  };

  const categoryCheckButton = () => (
    categories.map((category) => (
      <div key={category.id}>
        <img src={img[categories.indexOf(category)]} alt="une entrée" />
        <Form.Check
          inline
          label={category.title}
          name="group1"
          type="radio"
          id={category.id}
          value={category.id}
        />
      </div>
    )));

  const getCategory = () => {
    AxiosPrivate.get('/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ picture: base64 });
  };
  return (
    <section className="CreateRecipe-1" style={{ display: `${displayOne}` }}>
      <h2 className="CreateRecipe-1-title">Etape 1</h2>
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
            defaultValue={recipeToEdit.title}
            onChange={(e) => { setTitle(e.target.value); }}
            readonly="readonly"
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
              setPortions(parseInt(e.target.value, 10));
            }}
            defaultValue={recipeToEdit.portions}
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
          setCategory(parseInt(event.target.value, 10));
        }}
        defaultValue={defaultValueRecipe()}
      >
        <Form.Label className="CreateRecipe-form-row-1-group-label-plat">
          Type de plat
        </Form.Label>
        <section className="CreateRecipe-form-row-1-group-check">
          {categoryCheckButton()}
        </section>
      </Form.Group>
      <Button className="CreateRecipe-button" type="button" onClick={() => { setDisplayOne('none'); setDisplayTwo(''); setDisplayThree('none'); setDisplayFour('none'); }}>Etape 2</Button>
    </section>
  );
}

export default StepOneEdit;
