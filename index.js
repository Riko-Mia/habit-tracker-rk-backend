const express= require("express")
const cors= require("cors")
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000

// password - bKQ500FObvyRIIgW
// user name - rikomia722_db_user

// const uri = "mongodb+srv://rikomia722_db_user:bKQ500FObvyRIIgW@habit-tracker-rk.sqzykjy.mongodb.net/?appName=habit-tracker-rk"
const uri = "mongodb+srv://rikomia722_db_user:bKQ500FObvyRIIgW@habit-tracker-rk.sqzykjy.mongodb.net/?appName=habit-tracker-rk"

app.use(cors())
app.use(express.json())




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});







app.get("/", (req,res) =>{
    res.send("sssssssssssssssssssssssssssssss")
})



async function run() {
    try{
        await client.connect()

        const db = client.db("habit-tracker")
        const habitsCollection  = db.collection("habits");
        const habitsUsers = db.collection("users")


        app.post("/users", async(req, res) =>{
            const newUser = req.body;
            const result = await habitsUsers.insertOne(newUser)
            res.send(result)
        })



        app.get("/habits", async (req,res)=>{
            const cursor = habitsCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get("/habits/:id", async (req,res)=>{
            const id =req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await habitsCollection.findOne(query)
            res.send(result)
        })



        app.post("/habits", async(req, res) =>{
            const newHabit = req.body;
            const result = await habitsCollection.insertOne(newHabit)
            res.send(result)
        })


        app.delete("/habits/:id", async (req, res) =>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await habitsCollection.deleteOne(query)
            res.send(result)
        })


        app.patch("/habits/:id", async (req, res) =>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}

            const update = {
                $set:{
                    name: habitsCollection.name,
                    catagory: habitsCollection.catagory,
                }
            }
            const result = await habitsCollection.updateOne(query, update)
            res.send(result)
        })








        await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!"); 
    }
    finally{

    }
}
run().catch(console.dir);



app.listen(port, ()=>{
    console.log(`Habit tracker server in running port: ${port}`)
})