import { Schema, SchemaOptions } from 'mongoose';
import { v4 as uuid } from 'uuid';

/**
 * Properties shared by every object stored in the server's DB.
 */
export interface DbObject {
  id?: string;
  readonly createdOn?: Date;
  readonly modifiedOn?: Date;
}

const dbObjectSchemaDefinition = {
  _id: { type: String, default: uuid },
};

const dbObjectSchemaOptions: SchemaOptions = {
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'modifiedOn',
  },
  toObject: { transform: transformStripDbProps },
  toJSON: { transform: transformStripDbProps },
};

// Reason for this transformation function:
// In the API endpoints, we frequently return plain DB objects using `toObject`.
// Without this transformation function, we'd return unnecessary, DB specific props.
function transformStripDbProps(_doc: any, ret: any) {
  const result = { id: ret._id, ...ret };
  delete result._id;
  delete result.__v;
  return result;
}

/**
 * Creates a new `mongoose` schema based on the default `DbObject` structure used by the app.
 * @param definition The schema definition. This definition is enhanced with the `DbObject` definition.
 * @param options Optional schema options.
 */
export function createDbObjectSchema<T extends DbObject>(definition?: object, options?: SchemaOptions) {
  const finalDefinition = { ...dbObjectSchemaDefinition, ...definition };
  const finalOptions = { ...dbObjectSchemaOptions, ...options };
  return new Schema<T>(finalDefinition, finalOptions);
}
