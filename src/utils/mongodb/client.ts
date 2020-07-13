import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Db, ObjectID } from "mongodb";
import { TYPES } from "../../constants/types";
import { MongoDBConnection } from "./connection";

@provide(TYPES.MongoDBClient)
export class MongoDBClient {
  public db: any;

  constructor(
    @inject(TYPES.MongoDBConnection) private connection: MongoDBConnection
  ) {
    this.connection.getConnection(db => {
      this.db = db;
    });
  }

  public async find<T>(collection: string, filter: Object): Promise<T[]> {
    try {
      return await this.db.collection(collection).find(filter).toArray();
    } catch (err) {
      throw err;
    }
  }

  public async findOneById<T>(
    collection: string,
    objectId: string
  ): Promise<T | undefined> {
    try {
      return await this.db
        .collection(collection)
        .find({ _id: new ObjectID(objectId) })
        .limit(1)
        .next();
    } catch (err) {
      throw err;
    }
  }

  public async insert<T>(collection: string, model: T): Promise<T[]> {
    try {
      const insertOp = await this.db.collection(collection).insertOne(model);
      return insertOp.ops[0];
    } catch (err) {
      throw err;
    }
  }

  public async update<T>(
    collection: string,
    objectId: string,
    model: T
  ): Promise<any> {
    try {
      return await this.db
        .collection(collection)
        .updateOne({ _id: new ObjectID(objectId) }, { $set: model });
    } catch (err) {
      throw err;
    }
  }

  public async remove(collection: string, objectId: string): Promise<any> {
    try {
      return await this.db
        .collection(collection)
        .deleteOne({ _id: new ObjectID(objectId) });
    } catch (err) {
      throw err;
    }
  }
}
