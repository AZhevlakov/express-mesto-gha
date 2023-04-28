const urlRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9.]{2,255}\.[a-z]{2,11}([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+)#?$/;
const passwordRegExp = /^[a-zA-Z0-9]{8,30}$/;

module.exports = {
  urlRegExp,
  passwordRegExp,
};
