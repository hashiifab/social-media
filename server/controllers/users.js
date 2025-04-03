import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    // Increment viewedProfile count
    user.viewedProfile = (user.viewedProfile || 0) + 1;
    await user.save();
    
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* GET SOCIAL PROFILES */
export const getSocialProfiles = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user.socialProfiles || {
      twitter: { username: "", url: "" },
      linkedin: { username: "", url: "" }
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE SOCIAL PROFILES */
export const updateSocialProfiles = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, username, url } = req.body;
    
    const user = await User.findById(id);
    if (!user.socialProfiles) {
      user.socialProfiles = {
        twitter: { username: "", url: "" },
        linkedin: { username: "", url: "" }
      };
    }
    
    user.socialProfiles[platform] = { username, url };
    await user.save();
    
    res.status(200).json(user.socialProfiles);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
