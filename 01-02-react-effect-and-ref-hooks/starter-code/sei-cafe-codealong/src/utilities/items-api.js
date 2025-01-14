import { getToken } from './users-service';

const BASE_URL = '/api/items';

export function getAll() {
  return sendRequest(BASE_URL);
}

// This function is never actually used in SEI CAFE, it's
// only provided here to remind you to follow RESTful routing, etc.
export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
// The sendRequest function remains unchanged, thus it would be a good candidate to be put within its own module to be more DRY - an excellent practice exercise for when you have time!


/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}