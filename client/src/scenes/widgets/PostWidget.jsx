import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  PictureAsPdfOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, Button, TextField } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts, removePost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  clipPath,
  attachmentPath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
        
        if (response.ok) {
          // Gunakan reducer removePost untuk menghapus postingan dari state
          dispatch(removePost({ postId }));
        } else {
          console.error("Gagal menghapus postingan");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      {clipPath && (
        <video
          width="100%"
          height="auto"
          controls
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${clipPath}`}
        />
      )}
      {attachmentPath && (
        <Box
          sx={{
            mt: "0.75rem",
            p: "1rem",
            backgroundColor: palette.background.alt,
            borderRadius: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}
        >
          <FlexBetween>
            <Typography color={main} fontWeight="500">
              Attachment: {attachmentPath}
            </Typography>
            <a 
              href={`http://localhost:3001/assets/${attachmentPath}`} 
              download
              style={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                Download
              </Button>
            </a>
          </FlexBetween>
          
          {/* Preview for PDF files */}
          {attachmentPath.toLowerCase().endsWith(".pdf") && (
            <Box sx={{ width: "100%", overflow: "hidden", borderRadius: "0.5rem", border: `1px solid ${palette.neutral.light}`, p: "1rem" }}>
              <FlexBetween>
                <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <PictureAsPdfOutlined sx={{ color: "#f40f02", fontSize: "2rem" }} />
                  <Typography color={main} fontWeight="500">
                    {attachmentPath.split("/").pop()}
                  </Typography>
                </Box>
                <a 
                  href={`http://localhost:3001/assets/${attachmentPath}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { backgroundColor: palette.primary.dark },
                      borderRadius: "3rem",
                    }}
                  >
                   View PDF
                  </Button>
                </a>
              </FlexBetween>
            </Box>
          )}
          
          {/* Preview for image files that aren't handled by picturePath */}
          {attachmentPath.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/) && (
            <Box sx={{ width: "100%", overflow: "hidden", borderRadius: "0.5rem" }}>
              <img
                src={`http://localhost:3001/assets/${attachmentPath}`}
                alt={attachmentPath}
                style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
              />
            </Box>
          )}
          
          {/* For other file types, show an icon or message */}
          {!attachmentPath.toLowerCase().endsWith(".pdf") && 
           !attachmentPath.toLowerCase().match(/\.(jpeg|jpg|png|gif)$/) && 
           !attachmentPath.toLowerCase().match(/\.(mp4|mov|avi|wmv)$/) && (
            <Box sx={{ p: "1rem", textAlign: "center", border: `1px solid ${palette.neutral.light}`, borderRadius: "0.5rem" }}>
              <Typography color={main}>
                File preview tidak tersedia. Klik download untuk melihat file.
              </Typography>
            </Box>
          )}
        </Box>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="0.5rem">
          {postUserId === loggedInUserId && (
            <IconButton onClick={deletePost} sx={{ color: palette.neutral.medium }}>
              <DeleteOutlined />
            </IconButton>
          )}
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
          <Box display="flex" gap="1rem" alignItems="center" mt="0.5rem">
            <TextField
              fullWidth
              variant="standard"
              placeholder="Tulis komentar..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.5rem 2rem",
              }}
            />
            <Button
              disabled={!comment}
              onClick={async () => {
                const response = await fetch(
                  `http://localhost:3001/posts/${postId}/comment`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: loggedInUserId, comment }),
                  }
                );
                const updatedPost = await response.json();
                dispatch(setPost({ post: updatedPost }));
                setComment("");
              }}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                "&:hover": { backgroundColor: palette.primary.dark },
              }}
            >
              Kirim
            </Button>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
