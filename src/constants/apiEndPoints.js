export const BACKEND_URL = 'http://localhost:8000/';

export const GET_EVENTS = {
  url: 'api/events',
  method: 'get',
};

export const GET_THEMES= {
  url: 'api/themes',
  method: 'get',
};

export const SAVE_THEME= {
  url: 'api/themes',
  method: 'put',
};



export const GET_EVENT_BY_ID = (id) => ({
  url: `api/events/${id}`,
  method: 'get',
});
export const UPDATE_REGISTER = (id) => ({
  url: `api/events/${id}`,
  method: 'patch',
});

export const UPDATE_BOOKMARK = (id) => ({
  url: `api/events/${id}`,
  method: 'patch',
});
