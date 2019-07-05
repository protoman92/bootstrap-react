import express from "express";
import { Model, Schema, SchemaType, SchemaTypeOpts } from "mongoose";

declare global {
  type MongoSchemaDefinition<T> = Readonly<
    { [K in keyof T]: SchemaTypeOpts<any> | Schema | SchemaType }
  >;

  type MongoModel = Model<Document, {}>;
  type Request = express.Request;
  type Response = express.Response;
  type Router = express.Router;
}
