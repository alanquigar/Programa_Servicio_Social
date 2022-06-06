import mongoose from "mongoose";
import persons from "./models/persons.js";

const MONGODB_URI = `mongodb+srv://AlanQuigar:QUGA68529@cluster0.fbh5m.mongodb.net/alumnos?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log('Connected to mongoDb')
}).catch(error => {
    console.error('error', error.message)
})