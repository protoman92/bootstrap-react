import express from "express";
import { Document, Model, Schema, SchemaType, SchemaTypeOpts } from "mongoose";
import "../../global";

declare global {
  type MongoSchemaDefinition<T> = Readonly<
    { [K in keyof T]: SchemaTypeOpts<any> | Schema | SchemaType }
  >;

  type MongoModel = Model<Document, {}>;
  type Router = express.Router;
  type RequestHandler = express.RequestHandler;
}
