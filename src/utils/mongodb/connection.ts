import { Db, MongoClient } from "mongodb";
import { TYPES } from "../../constants/types";
import { environment } from "../../environment/environment";
import { provideSingleton } from "../ioc/provide-singleton";

@provideSingleton(TYPES.MongoDBConnection)
export class MongoDBConnection {
  private _isConnected: boolean = false;
  private _db: Db;

  public getConnection(result: (connection: Db) => void) {
    if (this._isConnected) {
      return result(this._db);
    } else {
      this.connect().then(() => {
        return result(this._db);
      });
    }
  }

  private async connect() {
    try {
      const client = await MongoClient.connect(environment.MONGO_CONNECTION, {
        useUnifiedTopology: true
      });
      this._db = client.db();
      this._isConnected = true;
    } catch (err) {
      throw err;
    }
  }
}
