import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });

const ConnectDatabase = () => {
  client.connect()
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));
};

export const db = client.db();

export default ConnectDatabase;