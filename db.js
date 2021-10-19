const mongoose = require("mongoose");
 
const url = `mongodb://8PWxywffi3tcpmkn:8PWxywffi3tcpmkn@cluster0-shard-00-00.vboal.mongodb.net:27017,cluster0-shard-00-01.vboal.mongodb.net:27017,cluster0-shard-00-02.vboal.mongodb.net:27017/project1?ssl=true&replicaSet=atlas-tux114-shard-0&authSource=admin&retryWrites=true&w=majority`;
 
const connectionParams = {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
};
mongoose
   .connect(url, connectionParams)
   .then(() => {
       console.log("Connected to database ");
   })
   .catch((err) => {
       console.error(`Error connecting to the database. \n${err}`);
   });
