// server.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

main();

async function main() {
   mongoose.connect("mongodb://localhost/newdb");

   app.use(express.json());
   app.use(express.static("public"));

   app.set("views", "views");
   app.set("view engine", "pug");
   app.use(cors());


   const chickenSchema = new mongoose.Schema({
      name: {type: String, required: true},
      age: {type: Number, required: true},
      color: {type: String, required: true},
   })

   const Chicken = mongoose.model("Chicken", chickenSchema);

   app.get("/api/chicken/:id", async function(req, res) {
      id = req.params.id;
      try {
         chicken = await Chicken.findById(id);
         if(chicken) {
            console.log(chicken);
            res.send(chicken);
         } else {
            res.status(404).send({"error": 404,
            "msg": "Chicken not found"});
         }
      } catch (error) {
            console.log(error);
            res.status(404).send({"error": 404,
            "msg": "Chicken not found"});
      }
   });

   app.post("/api/chicken", async function(req, res) {
      chicken = await Chicken.create(req.body);
      res.send({"id": chicken['_id'], "chicken":chicken});
   });

   app.put("/api/chicken/:id", async function(req,res) {
      newChicken = req.body;
      console.log(newChicken);
      id = req.params.id;
      chicken = await Chicken.findById(id);
      if(chicken) {
         // One way- get your object, make changes to that object and then save it back
         /*
         chicken['age'] = parseInt(newChicken['age']);
         await chicken.save();
         */
         // await Chicken.where({_id: id}).updateOne({$set: newChicken}).exec();
         await Chicken.updateOne({_id: id}, {$set: newChicken});
         chicken = await Chicken.findById(id);
         res.send({"id": id, "chicken":chicken});
      } else {
         res.status(404).send({"error": 404,
            "msg": "Chicken not found"});
      }
   });

   app.delete("/api/chicken/:id", async function(req, res) {
      id = req.params.id;
      chicken = await Chicken.findById(id);
      if(chicken) {
         try{
            await Chicken.deleteOne({_id: id});
            res.send({"message": `deleted chicken of id=${id}`, 
            "response_code":200});
         } catch (err) {
            console.error(err);
            res.status(500).send(err);
         }
      } else {
         res.status(404).send({"error": 404,
            "msg": "Chicken not found"});
      }
   });

   app.get("/api/chickens/:filter", async function(req,res) {
      const filter = JSON.parse(req.params.filter);
      console.log(filter);
      chickens;
      chickens = await Chicken.find(filter);
      res.send(chickens);
   });

   app.get("/api/chickens/", async function(req,res) {
      chickens = await Chicken.find();
      res.send(chickens);
   });

   
   app.get("/", function(req, res) {
      res.sendFile("index.html");
   });

   app.get("/chicken/:id", async function(req, res) {
      id = req.params.id;
      try {
         chicken = await Chicken.findById(id);
         if(chicken) {
            res.render("chicken", chicken);
         } else {
            res.status(404).send("Ain't no chicken with id: "+id);
         }
      } catch (err) {
         console.error(err);
         res.status(500).send("Something went wrong with the server. OOPS!");
      }
      
   });

   app.get("/chickens/", async function(req, res) {

   });



   app.listen(3000, function(){console.log("Listening on port 3000...")})
}
