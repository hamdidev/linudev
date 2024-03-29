import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    likes: {
      type: Array,
      default: [],
    },
    numOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Create a model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
