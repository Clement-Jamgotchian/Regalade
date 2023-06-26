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
  const reduceComments = (acc, cur, idx) => {
    const groupIndex = Math.floor(idx / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    return acc;
  };

  return (
    <div>
      <h3>
        {commentsNumber}
        {' '}
        Commentaires
      </h3>
      <Carousel activeIndex={index} onSelect={handleSelect} touch className="CommentsCarousel desktop">
        {comments.reduce(reduceComments, []).map((comment, idx) => (
          <Carousel.Item key={idx}>
            <Stack
              direction="horizontal"
              className="h-100 justify-content-start align-items-start"
              gap={3}
            >
              {comment.map((el) => (
                <Card className="CommentsCarousel--card" key={el.user.nickname + el.rating} sm={12} md={6} lg={4}>
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

      <Carousel activeIndex={index} onSelect={handleSelect} touch className="CommentsCarousel mobile">
        {comments.map((comment, idx) => (
          <Carousel.Item key={idx}>
            <Stack
              direction="horizontal"
              className="h-100 justify-content-start align-items-start"
              gap={3}
            >
              <Card className="CommentsCarousel--card" sm={12} md={6} lg={4}>
                <Card.Title>
                  {comment.user.nickname}
                </Card.Title>
                <Card.Title>
                  {getStars(comment.rating)}
                </Card.Title>
                <Card.Body>
                  <p>{comment.content}</p>
                </Card.Body>
              </Card>
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
      name: PropTypes.string,
    }),
  })).isRequired,
};

export default CommentsCarousel;
