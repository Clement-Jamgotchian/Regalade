/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
// FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// Function to obtain total recipe duration in hours and minutes
export function getTotalDuration(cookingDuration, setupDuration) {
  const totalDuration = cookingDuration + setupDuration;
  const hours = Math.floor(totalDuration / 60);
  // If minutes < 10, we add a 0 before
  const minutes = `0${totalDuration % 60}`.slice(-2);
  // If 0 hour, we show only minutes
  const totalDurationLabel = hours === 0 ? `${minutes}min` : `${hours}h${minutes}`;
  return totalDurationLabel;
}

// Function to obtain label of difficulty range
export function getDifficultyLabel(difficulty) {
  const difficultyLabels = ['Facile', 'Moyen', 'Difficile'];
  return difficultyLabels[difficulty - 1];
}

// Function to show fill stars depends on rating
// faStar : filled star
// faStarHalfStroke : half-filled star
// farStart : empty star
export function getStars(starsRating) {
  const stars = [];
  // For each integer, we show a full star
  for (let i = 1; i <= 5; i++) {
    if (i <= starsRating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
      // If rating is decimal, we show a half-filled star
      if (
        /^[0-4]+.[1-9]+$/.test(starsRating) && Math.floor(starsRating) === i
      ) {
        stars.push(<FontAwesomeIcon key="half" icon={faStarHalfStroke} />);
        i++;
        // We show other empty stars to have a total of 5 stars
      }
    } else if (i >= Math.ceil(starsRating) && i <= 5) {
      stars.push(<FontAwesomeIcon key={i} icon={farStar} />);
    }
  }
  return stars;
}
