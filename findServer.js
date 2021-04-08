const apiCall = require("./apiCall");
const validateUrl = require("./validateUrl");

/**
 * This function is the entrypoint,
 * accepts array of objects
 * @param {array} serverList
 * @property {url} //serverlist item field
 * @property {priority} //serverlist item field
 * @returns array item of available server with the lowest priority
 */
function findServer(serverList = []) {
  return new Promise(function (resolve, reject) {
    if (serverList.length === 0) {
      reject("At least 1 server is required");
    }

    const apiCallPromisesArr = [];

    serverList.forEach(function (serverItem) {
      if (serverItem.url && serverItem.priority) {
        if (typeof serverItem.priority !== "number" || serverItem.priority <= 0) {
          reject("Priority should be positive integer");
          return;
        }
        if (!validateUrl(serverItem.url)) {
          reject(`Url invalid ${serverItem.url}`);
          return;
        }
        
        apiCallPromisesArr.push(apiCall(serverItem));
      } else {
        reject("The object must have 'url' and 'priority fields'");
      }
    });

    Promise.all(apiCallPromisesArr).then(function (values) {
      // a.	Resolves with the online server that has the lowest priority number.
      // b.	Rejects with an error, if no Servers are online.
      const availableServers = values.filter(function (item) {
        if (item) {
          return item;
        }
      });

      if (availableServers.length > 0) {
        const prioritySortedServer = availableServers.sort(function (a, b) {
          return a.priority - b.priority;
        });
        const [lowestPriorityServer] = prioritySortedServer;
        resolve(lowestPriorityServer);
      } else {
        reject("No servers available");
      }
    });
  });
}

module.exports = findServer;
