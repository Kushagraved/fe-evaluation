export const BACKEND_URL = 'http://localhost:8000/';

export const GET_EVENTS = {
  url: 'api/events',
  method: 'get',
};

export const UPDATE_BOOKMARK = (id) => ({
  url: `api/events/${id}`,
  method: 'patch',
});