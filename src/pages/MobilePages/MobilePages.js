import './MobilePages.scss';
import { Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipes from '../../components/Recipes/Recipes';
import AxiosPublic from '../../utils/AxiosPublic';

function MobilePages() {
  const [pageCount, setPageCount] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const linkAPI = useSelector((state) => state.profil.link);
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const pageRequest = pageNumber > 0 ? `page=${pageNumber}` : '';
  const baseUrl = `/${linkAPI}`;
  const request = `?${pageRequest}`;

  const getRecipes = async () => {
    AxiosPublic
      .get(baseUrl + request)
      .then((response) => {
        setRecipes(response.data.recipes);
        setPageCount(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Recipes recipes={recipes} />
      <Pagination pageCount={pageCount} />
    </>
  );
}

export default MobilePages;
