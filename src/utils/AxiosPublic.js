import axios from 'axios';

export const AxiosPublic = axios.create({
  baseURL: 'https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosPublic;
