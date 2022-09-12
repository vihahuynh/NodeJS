// CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID, ObjectId } = require("mongodb")



const connectionURL =
  "mongodb+srv://nemo-admin:Anhduy2507@cluster0.7qy3g.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    console.log("Connected successfully!");
    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Nemo",
    //     birthYear: 1997,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Damian",
    //       birthYear: 1997,
    //     },
    //     {
    //       name: "Zelda",
    //       birthYear: 1997,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert users");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     { description: "A", completed: true },
    //     { description: "B", completed: false },
    //     { description: "C", completed: true },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks");
    //     }

    //     console.log(result.ops);
    //   }
    // )

    // const id = new ObjectID()
    // const time = id.getTimestamp()

    // console.log("id: ", id, " - time: ", time)


    // db.collection("users").insertOne(
    //   {
    //     _id: id,
    //     name: "Nhi Nhu",
    //     birthYear: 1997,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").findOne({ name: "Nemo" }, (error, user) => {
    //   if (error) {
    //     return console.log("Unable to fetch.")
    //   }
    //   if (!user) {
    //     return console.log("No user found.")
    //   }
    //   return console.log(user)
    // })

    // db.collection("users").findOne({ _id: new ObjectId("6318b0acbc116f438472c3e0") }, (error, user) => {
    //   if (error) {
    //     return console.log("Unable to fetch.")
    //   }
    //   if (!user) {
    //     return console.log("No user found.")
    //   }
    //   return console.log(user)
    // })

    db.collection("users").find({ name: "Nemo" }).toArray((error, users) => {
      if (error) {
        return console.log("Unable to fetch.")
      }
      if (!users.length) {
        return console.log("No user found.")
      }
      return console.log(users)
    })
  }
);
