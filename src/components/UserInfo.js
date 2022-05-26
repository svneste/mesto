export default class UserInfo {
  constructor(selectorName, selectorJob, userAvatar) {
    this._name = document.querySelector(selectorName);
    this._job = document.querySelector(selectorJob);
    this._avatar = document.querySelector(userAvatar);
  }

  //возвращаем объект с данными пользователя
  getUserInfo = () => {
    this._data = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return this._data;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, about) {
    this._name.textContent = name;
    this._job.textContent = about;

  }

  setAvatarUser(avatarLink) {
    this._avatar.style.backgroundImage  = `url('${avatarLink}')`;
  }
}
