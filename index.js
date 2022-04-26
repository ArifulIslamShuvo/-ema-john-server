const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//middleware 

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fqwbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const productCollection = client.db('emaJohn').collection('product')

    //http://localhost:5000/product
    app.get('/product', async (req, res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const product = await cursor.toArray();
        res.send(product)
    })

    //http://localhost:5000/productCount
    app.get('/productCount', async(req, res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const count = await cursor.count();
        res.send({count});
    })
  } finally {

  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('john is running and watong for ema');
});


app.listen(port, () => {
    console.log('jhon isrunning on port', port);
})