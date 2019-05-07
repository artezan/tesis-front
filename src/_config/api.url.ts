const apiUrl = 'https://black-box-api.herokuapp.com/api/v1/';
export const END_POINT_URL = 'https://black-box-api.herokuapp.com/';
// export const END_POINT_URL = 'http://localhost:3000/';
// const apiUrl = 'http://localhost:3000/api/v1/';
const general = 'general/';
const sumary = 'sumary/';
const users = 'users/';
const itemId = 'id/item/';
const file = 'files/';
const brain = 'brain/brain';

export const API_URL = {
    USERS_GET: apiUrl + users,
    GENRAL_TABLES: apiUrl + general,
    GENRAL_TABLES_SUMARY: apiUrl + general + sumary,
    GENRAL_TABLES_ITEM_ID: apiUrl + general + itemId,
    FILE_POST: apiUrl + file,
    BRAIN: apiUrl + general +  brain
};
