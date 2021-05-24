import { QueryOptions } from 'mongoose';
import { EnforceDocument, FilterQuery, Model, Schema } from 'mongoose';

export interface PaginationResult<T> {
  result: Array<EnforceDocument<T, {}>>;
  totalCount: number;
  pages: number;
  page: number;
  pageSize: number;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

/**
 * A plugin which extends a schema with a `pagination` function that allows querying for data
 * using pages and page sizes.
 * @param schema The schema to be extended.
 */
export function pagination<T>(schema: Schema<T>) {
  schema.statics.paginate = async function <T>(
    this: Model<T>,
    { page, pageSize }: PaginationOptions,
    query: FilterQuery<T> = {},
    projection?: any,
    options?: QueryOptions,
  ): Promise<PaginationResult<T>> {
    if (page < 1) {
      throw new Error('page must be >= 1.');
    }

    if (pageSize < 1) {
      throw new Error('pageSize must be >= 1.');
    }

    const totalCount = await this.countDocuments(query);
    const docs = await this.find(query, projection, options)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      result: docs,
      totalCount,
      pages: Math.ceil(totalCount / pageSize),
      page,
      pageSize,
    };
  };
}
