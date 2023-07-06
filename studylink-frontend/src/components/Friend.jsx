import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Friend = ({ friendId, name, subtitle, userPicturePath, department }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();

  const { _id, friends } = useSelector((state) => state.user);

  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  console.log(friends);
  const isFriend = friends.find((friend) => friend._id === friendId);
  // const isFriend = true;

  const patchFriend = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://studylink.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    setIsLoading(false);
    dispatch(setFriends({ friends: data }));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />
            <Box
              onClick={() => {
                navigate(`/profile/${friendId}`);
                navigate(0);
              }}
            >
              <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {subtitle}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {department}
              </Typography>
            </Box>
          </FlexBetween>
          <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        </FlexBetween>
      )}
    </>
  );
};

export default Friend;
