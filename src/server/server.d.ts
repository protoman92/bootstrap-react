import { Schema, SchemaType, SchemaTypeOpts } from "mongoose";

declare global {
  type MongoSchemaDefinition<T> = Readonly<
    { [K in keyof T]: SchemaTypeOpts<any> | Schema | SchemaType }
  >;

  type Request = import("express").Request;
  type Response = import("express").Response;
}
