class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Произошла ошибка: ${response.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  register(data) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  login(data) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  checkToken(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: { ...this._headers, "Authorization" : `Bearer ${token}`},
    });
  }
}

const auth = new Auth({
  baseUrl: "https://api.mikhail.students.nomoredomainsrocks.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
export default auth;