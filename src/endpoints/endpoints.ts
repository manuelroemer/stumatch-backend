/* eslint-disable @typescript-eslint/no-var-requires */
// Using `require()` instead of `import` for importing the endpoints is dirty, but honestly the
// easiest way resulting in the least amount of code.
// Using `import` and giving each of the imported endpoint functions a unique name is just
// unnecessarily overengineered given the below alternative.

export const endpoints = [
  require('./auth/token/post').default,

  require('./faculties/getAll').default,

  require('./status/get').default,

  require('./users/getAll').default,
  require('./users/get').default,
  require('./users/post').default,
  require('./users/notifications/getAll').default,
  require('./users/friendsListEntries/getAll').default,
  require('./users/chatGroups/getAll').default,
  require('./users/matchRequests/getAll').default,

  require('./posts/getAll').default,
  require('./posts/get').default,
  require('./posts/put').default,
  require('./posts/post').default,
  require('./posts/delete').default,

  require('./notifications/post').default,
  require('./notifications/put').default,
  require('./notifications/delete').default,

  require('./matchRequests/delete').default,
  require('./matchRequests/post').default,
  require('./matchRequests/acceptOrDecline/post').default,

  require('./friendsListEntries/delete').default,

  require('./chatGroups/get').default,
  require('./chatGroups/chatMessages/getAll').default,
  require('./chatGroups/chatMessages/post').default,

  require('./chatMessages/put').default,
  require('./chatMessages/delete').default,
];
