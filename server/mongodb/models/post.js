import mongoose from 'mongoose';

//creating schema
const Post = new mongoose.Schema({
    name: {type: String, required: true},
    prompt: {type: String, required: true},
    photo: {type: String, required: true},
});

//creating model
const PostSchema = mongoose.model('Post', Post)

//exporting schema
export default PostSchema;