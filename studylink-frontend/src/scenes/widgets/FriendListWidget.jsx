import { Box, Typography, useTheme } from "@mui/material";

import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const friends = user.friends;

  const getFriends = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://studylink.onrender.com/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="45"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {friends.length > 0 ? (
            <Box display="flex" flexDirection="column" gap="1.5rem">
              {friends.map((friend) => (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.university}
                  department={friend.department}
                  userPicturePath={friend.picturePath}
                />
              ))}
            </Box>
          ) : (
            <p>No friends</p>
          )}{" "}
        </>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
