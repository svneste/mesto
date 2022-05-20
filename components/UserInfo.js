export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
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
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.description;
  }
}
