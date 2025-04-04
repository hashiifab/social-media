import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isClip, setIsClip] = useState(false);
  const [isAttachment, setIsAttachment] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [image, setImage] = useState(null);
  const [clip, setClip] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [audio, setAudio] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [mobileMenu, setMobileMenu] = useState(null);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    
    if (clip) {
      formData.append("clip", clip);
      formData.append("clipPath", clip.name);
    }
    
    if (attachment) {
      formData.append("attachment", attachment);
      formData.append("attachmentPath", attachment.name);
    }

    if (audio) {
      formData.append("audio", audio);
      formData.append("audioPath", audio.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setClip(null);
    setAttachment(null);
    setAudio(null);
    setPost("");
    setIsImage(false);
    setIsClip(false);
    setIsAttachment(false);
    setIsAudio(false);
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {isClip && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".mp4,.mov,.avi,.wmv"
            multiple={false}
            onDrop={(acceptedFiles) => setClip(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!clip ? (
                    <p>Add Video Clip Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{clip.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {clip && (
                  <IconButton
                    onClick={() => setClip(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {isAttachment && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".pdf,.doc,.docx,.xls,.xlsx,.txt"
            multiple={false}
            onDrop={(acceptedFiles) => setAttachment(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!attachment ? (
                    <p>Add Attachment Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{attachment.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {attachment && (
                  <IconButton
                    onClick={() => setAttachment(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {isAudio && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".mp3,.wav,.m4a"
            multiple={false}
            onDrop={(acceptedFiles) => setAudio(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!audio ? (
                    <p>Add Audio Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{audio.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {audio && (
                  <IconButton
                    onClick={() => setAudio(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={() => {
              setIsImage(!isImage);
              if (isClip) setIsClip(false);
              if (isAttachment) setIsAttachment(false);
              if (isAudio) setIsAudio(false);
            }}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={() => {
              setIsClip(!isClip);
              if (isImage) setIsImage(false);
              if (isAttachment) setIsAttachment(false);
              if (isAudio) setIsAudio(false);
            }}>
              <VideoLibraryOutlined sx={{ color: mediumMain }} />
              <Typography 
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Clip
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={() => {
              setIsAttachment(!isAttachment);
              if (isImage) setIsImage(false);
              if (isClip) setIsClip(false);
              if (isAudio) setIsAudio(false);
            }}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography 
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Attachment
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={() => {
              setIsAudio(!isAudio);
              if (isImage) setIsImage(false);
              if (isClip) setIsClip(false);
              if (isAttachment) setIsAttachment(false);
            }}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography 
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <Box sx={{ position: "relative" }}>
            <IconButton onClick={(e) => setMobileMenu(e.currentTarget)}>
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </IconButton>
            <Menu
              anchorEl={mobileMenu}
              open={Boolean(mobileMenu)}
              onClose={() => setMobileMenu(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={() => {
                setIsImage(!isImage);
                if (isClip) setIsClip(false);
                if (isAttachment) setIsAttachment(false);
                if (isAudio) setIsAudio(false);
                setMobileMenu(null);
              }}>
                <ImageOutlined sx={{ color: mediumMain, mr: 1 }} />
                <Typography>Image</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                setIsClip(!isClip);
                if (isImage) setIsImage(false);
                if (isAttachment) setIsAttachment(false);
                if (isAudio) setIsAudio(false);
                setMobileMenu(null);
              }}>
                <VideoLibraryOutlined sx={{ color: mediumMain, mr: 1 }} />
                <Typography>Clip</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                setIsAttachment(!isAttachment);
                if (isImage) setIsImage(false);
                if (isClip) setIsClip(false);
                if (isAudio) setIsAudio(false);
                setMobileMenu(null);
              }}>
                <AttachFileOutlined sx={{ color: mediumMain, mr: 1 }} />
                <Typography>Attachment</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                setIsAudio(!isAudio);
                if (isImage) setIsImage(false);
                if (isClip) setIsClip(false);
                if (isAttachment) setIsAttachment(false);
                setMobileMenu(null);
              }}>
                <MicOutlined sx={{ color: mediumMain, mr: 1 }} />
                <Typography>Audio</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
