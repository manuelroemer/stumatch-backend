export type SortableFields<T> = keyof T;

const pattern = /([^\s:]+)(:(asc|desc))?/;

export function parseMongooseSortQuery<T>(input: string, sortableFields: Array<SortableFields<T>>) {
  const fragments = input.split(',');
  const sortQuery: any = fragments
    .map((fragment) => pattern.exec(fragment))
    .filter(Boolean)
    .map((matches) => {
      const fieldName = matches![1];
      const direction = matches![3] ?? 'asc';
      return { fieldName, direction };
    })
    .filter(({ fieldName }) => sortableFields.includes(fieldName as any))
    .reduce((sortQuery, { fieldName, direction }) => ({ ...sortQuery, [fieldName]: direction }), {});

  // Special handling for the ID for now.
  // Subject to change in the future (e.g. in favor of a generalized transformation for all fields).
  // For now, this is absolutely enough for our use case(s) though.
  if (sortQuery.id) {
    sortQuery._id = sortQuery.id;
    delete sortQuery.id;
  }

  return sortQuery;
}
