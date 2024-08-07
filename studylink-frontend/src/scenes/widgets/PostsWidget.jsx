import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    setIsLoading(true);
    const response = await fetch("https://studylink.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setIsLoading(false);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://studylink.onrender.com/posts/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            university,
            department,
            picturePath,
            filePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              university={university}
              department={department}
              picturePath={picturePath}
              filePath={filePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
