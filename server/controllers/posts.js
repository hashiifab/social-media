import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    const { userId, description } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID diperlukan!" });
    }

    let picturePath = null;
    let clipPath = null;
    let attachmentPath = null;
    let audioPath = null;
    
    if (req.files) {
      if (req.files.picture) {
        picturePath = req.files.picture[0].originalname;
      }
      if (req.files.clip) {
        clipPath = req.files.clip[0].originalname;
      }
      if (req.files.attachment) {
        attachmentPath = req.files.attachment[0].originalname;
      }
      if (req.files.audio) {
        audioPath = req.files.audio[0].originalname;
      }
    } else if (req.file) {
      // Backward compatibility for single file upload
      picturePath = req.file.originalname;
    }
    
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      clipPath,
      attachmentPath,
      audioPath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: "Ukuran file terlalu besar! Maksimal 10MB." });
      }
      return res.status(400).json({ message: `Error upload file: ${err.message}` });
    }
    res.status(500).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post tidak ditemukan" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const newComment = `${user.firstName} ${user.lastName}: ${comment}`;
    post.comments.push(newComment);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
