const findServer = require("./findServer");

const example_ds = [
  {
    url: "https://doesNotExist.kratikal.com",
    priority: 1,
  },
  {
    url: "https://kratikal.com",
    priority: 7,
  },
  {
    url: "https://offline.kratikal.com",
    priority: 2,
  },
  {
    url: "https://google.com/",
    priority: 4,
  },
  {
    url: "https://yahoo.com",
    priority: 2,
  }
];

findServer(example_ds)
  .then((lowestPriorityServer) => {
    console.log(lowestPriorityServer);
  })
  .catch((e) => {
    console.log(e);
  });
