import axios from 'axios';
const API_KEY = "46806668-35f52dba5a140225900df36e0";
const API_URL = 'https://pixabay.com/api/?';
const list = document.querySelector(".list");

const CONFIG = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientations: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 15,
  },
};

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}

