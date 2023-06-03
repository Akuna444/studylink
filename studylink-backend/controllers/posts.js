import Posts from "../models/Post.js";
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Posts({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      university: user.university,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Posts.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//READ

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Posts.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Posts.find({ userId });
    ReadableStream.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//UPDATES

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Posts.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
