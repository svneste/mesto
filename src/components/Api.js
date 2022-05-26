export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkSuccessRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Запрос отработал с ошибкой - ${res.status}`);
  }

  // Получаем карточки с сервера

  getAllCards() {
   return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkSuccessRequest);
  }

  // Получаем информацию о пользователе

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkSuccessRequest);
  }

// Редактируем данные пользователя на сервере

  editUserProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
    })
      }).then(this._checkSuccessRequest);
  }

  // Добавление новой карточки на сервер

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
    })
    }).then(this._checkSuccessRequest);
  }

  // Удаление карточки с сервера

  removeMyCard(_id) {
    return fetch (`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkSuccessRequest);
  }

  // Добавление/снятие лайка

  addLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkSuccessRequest);
  }

  deleteLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkSuccessRequest);
  }

  // Изменение аватара
  changeAvatarUser(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
    })
    }).then(this._checkSuccessRequest);
  }
}
