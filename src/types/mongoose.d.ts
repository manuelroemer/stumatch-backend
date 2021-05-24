import { PaginationOptions, PaginationResult } from '../db/plugins/pagination';

declare module 'mongoose' {
  interface Model<T> {
    // Custom plugins defined/used in this project.

    /**
     * Runs the specified query and paginates the result according to the given options.
     * @param options The pagination options.
     * @param query An optional query.
     */
    paginate(options: PaginationOptions, query?: FilterQuery<T>): Promise<PaginationResult<T>>;
  }
}
