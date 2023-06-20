/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Card, Carousel, Stack } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getStars } from '../../../utils/formatRecipeData';
import './CommentsCarousel.scss';

function CommentsCarousel({ comments }) {
  const [index, setIndex] = useState(0);
  const commentsNumber = comments.length;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Helper function to group every 3 recipe to a new array
  const reduceRecipes = (acc, cur, idx) => {
    const groupIndex = Math.floor(idx / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };

  return (
    <div>
      <h3>
        {commentsNumber}
        {' '}
        Commentaires
      </h3>
      <Carousel activeIndex={index} onSelect={handleSelect} touch className="CommentsCarousel">
        {comments.reduce(reduceRecipes, []).map((comment, idx) => (
          <Carousel.Item key={idx}>
            <Stack
              direction="horizontal"
              className="h-100 justify-content-start align-items-start"
              gap={3}
            >
              {comment.map((el) => (
                <Card className="CommentsCarousel--card" key={el.user.nickname + el.rating}>
                  <Card.Title>
                    {el.user.nickname}
                  </Card.Title>
                  <Card.Title>
                    {getStars(el.rating)}
                  </Card.Title>
                  <Card.Body>
                    <p>{el.content}</p>
                  </Card.Body>
                </Card>
              ))}
            </Stack>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

CommentsCarousel.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    rating: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
};

export default CommentsCarousel;
