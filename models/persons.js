import { introspectionFromSchema } from "graphql"
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const schema = new mongoose.Schema({
    grade: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    campus: {
        type: String,
        required: true,
        minlength: 2
    },
    career: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        minlength: 8
    },
})

schema.plugin(uniqueValidator)

export default mongoose.model('Person', schema)
