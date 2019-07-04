import { Schema, SchemaType, SchemaTypeOpts } from "mongoose";
import { UserModel } from "./mongo/user";

declare global {
  type MongoSchemaDefinition<T> = Readonly<
    { [K in keyof T]: SchemaTypeOpts<any> | Schema | SchemaType }
  >;

  namespace MongoModel {
    type User = typeof UserModel;
  }

  type Request = import("express").Request;
  type Response = import("express").Response;
}
