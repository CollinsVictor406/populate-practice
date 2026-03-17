const connectDB = require('./db/mongodb');
const dotenv = require('dotenv');
const notFound = require('./not-found');
dotenv.config();
const express = require('express');
const app = express();
const PORT =  3000;


app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message:"Welcome to the Blog API"})
});
app.use(notFound);

connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
