export const log = (message) => {
  message && console.log(message, new Date().toUTCString());
};

export const error = (message) => {
  message && console.log(message, new Date().toUTCString());
};
