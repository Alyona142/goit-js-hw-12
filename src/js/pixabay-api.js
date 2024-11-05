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


export async function getGalleryData(queryValue, page) {
  try {
    fetchLoader();
    CONFIG.params.q = queryValue;
    CONFIG.params.page = page;
    const response = await axios.get(API_URL, CONFIG);
    return response.images;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
   
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${images}`,
        MESSAGES_BG_COLORS.orange
      );
    } else if (error.request) {
 
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${error.request}`,
        MESSAGES_BG_COLORS.orange
      );
    } else {
  
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${error.message}`,
        MESSAGES_BG_COLORS.orange
      );
    }
  }
}
