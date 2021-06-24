const jwt = localStorage.getItem("jwt");
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }
  getInitialCards() {
    const jwt = localStorage.getItem("jwt");
    console.log(this._baseUrl)
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
      .then(this._checkResponse)
  };

  getUserInfo() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  addCard(cardTitle, cardPhoto) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: cardTitle,
        link: cardPhoto
      })
    })
      .then(this._checkResponse)

  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        credentials: 'include',
        headers: this._headers
      })
        .then(this._checkResponse)
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        credentials: 'include',
        headers: this._headers
      })
        .then(this._checkResponse)
    }

  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)

  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponse)

  }

  changeAvatar(link) {
    console.log(link)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse)
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.surikovmesto.students.nomoredomains.club',
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',
    'Authorization': `Bearer ${jwt}`,
  }
});
export default api
