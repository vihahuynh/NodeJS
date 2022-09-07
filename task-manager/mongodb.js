// CRUD create read update delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL =
  "mongodb+srv://nemo-admin:<pw>@cluster0.7qy3g.mongodb.net/?retryWrites=true&w=majority";
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

    db.collection("tasks").insertMany(
      [
        { description: "A", completed: true },
        { description: "B", completed: false },
        { description: "C", completed: true },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks");
        }

        console.log(result.ops);
      }
    );
  }
);
