import User from "../models/User";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFiends = friends.map(
      ({ _id, firsName, lastName, department, university, picturePath }) => {
        return { _id, firsName, lastName, department, university, picturePath };
      }
    );

    res.status(200).json(formattedFiends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE

export const addRemoveFriend = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    const user = await User.findById(id);
    const friend = User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friend = user.friends.filter((id) => id !== friendId);
      friend.friend = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFiends = friends.map(
      ({ _id, firsName, lastName, department, university, picturePath }) => {
        return { _id, firsName, lastName, department, university, picturePath };
      }
    );
    res.status(200).json(formattedFiends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
