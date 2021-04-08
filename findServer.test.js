const findServer = require("./findServer");

test("gets lowest priority server", async () => {
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
      url: "https://google.com",
      priority: 4,
    },
  ];

  await expect(findServer(example_ds)).resolves.toStrictEqual(example_ds[3]);
});

test("If provided array is empty", async () => {
  const example_ds = [];
  await expect(findServer(example_ds)).rejects.toMatch('At least 1 server is required');
});

test("If url is incorrect", async () => {
  const example_ds = [
    {
      url: "https:/google.com",
      priority: 4,
    },
  ];
  await expect(findServer(example_ds)).rejects.toMatch('Url invalid https:/google.com');
});

test("If priority has invalid value", async () => {
  const example_ds = [
    {
      url: "https://google.com",
      priority: -1,
    },
  ];
  await expect(findServer(example_ds)).rejects.toMatch('Priority should be positive integer');
});

test("If doesn't have priority or url field", async () => {
  const example_ds = [
    {
      url: "https://google.com",
      priority: 1,
    },
    {

    }
  ];
  await expect(findServer(example_ds)).rejects.toMatch("The object must have 'url' and 'priority fields'");
});
