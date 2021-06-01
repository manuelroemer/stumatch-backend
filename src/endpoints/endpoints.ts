/* eslint-disable @typescript-eslint/no-var-requires */
// Using `require()` instead of `import` for importing the endpoints is dirty, but honestly the
// easiest way resulting in the least amount of code.
// Using `import` and giving each of the imported endpoint functions a unique name is just
// unnecessarily overengineered given the below alternative.

export const endpoints = [
  require('./auth/token/post').default,

  require('./status/get').default,

  require('./users/getAll').default,
  require('./users/get').default,
  require('./users/notifications/getAll').default,
  require('./users/friendsListEntries/getAll').default,

  require('./posts/getAll').default,
  require('./posts/get').default,
  require('./posts/put').default,
  require('./posts/post').default,
  require('./posts/delete').default,

  require('./notifications/put').default,
  require('./notifications/delete').default,

  require('./friendsListEntries/delete').default,
];
