const request = require("request");

/**
 * Calls the api with provided url.
 * @param {object} serverObj
 * @property {string} serverObj.url
 * @property {number} serverObj.priority
 * @returns promise
 * @resolves with serverObj if the status code is between 200 - 299.
 * @resolves null if the status code is not between 200 - 299 or if the server is unavailable.
 */
module.exports = function apiCall(serverObj) {
  return new Promise(function (resolve, reject) {
    request({ url: serverObj.url, timeout: 5000, method: "get" }, function (error, response) {
      if (response && response.statusCode >= 200 && response.statusCode <= 299) {
        resolve(serverObj);
        return;
      }
      resolve(null);
    });
  });
}
