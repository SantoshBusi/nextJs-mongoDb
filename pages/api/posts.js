import { MongoClient } from "mongodb";
import { ObjectId } from 'bson'; 

export default async function handler(req, res) {
  if (req.method === "POST") {
  const data = req.body;
  const client = await 
  MongoClient.connect(
    "mongodb+srv://SantoshB:12345@cluster0.mqj6emj.mongodb.net/my_db?retryWrites=true&w=majority");
  const db = client.db();
  const yourCollection = db.collection("db_1");
  const result = await yourCollection.insertOne(data);
  console.log(result);
  client.close();
  res.status(201).json({ message: "Data inserted successfully!" });
  }

  else if(req.method === "DELETE"){
    const data = req.body;
    const client = await 
    MongoClient.connect(
      "mongodb+srv://SantoshB:12345@cluster0.mqj6emj.mongodb.net/my_db?retryWrites=true&w=majority");
    const db = client.db();
    const yourCollection = db.collection("db_1");
    const result = await yourCollection.deleteMany({ fId:data.fId })
    console.log(result);
    client.close();
    res.status(201).json({ message: "Data deleted successfully!" });
  }
  else if(req.method === "PUT"){
    const data = req.body;
    const client = await 
    MongoClient.connect(
      "mongodb+srv://SantoshB:12345@cluster0.mqj6emj.mongodb.net/my_db?retryWrites=true&w=majority");
    const db = client.db();
    const yourCollection = db.collection("db_1");
    const result = await yourCollection.findOneAndReplace({fId:data.fId},{fId:data.fId,fields:data.fields,fieldValues:data.fieldValues})
    console.log(result);
    client.close();
    res.status(201).json({ message: "Data Updated successfully!" });
  }
}
