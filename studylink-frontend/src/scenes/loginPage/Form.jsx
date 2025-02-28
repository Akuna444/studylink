import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress, // Import CircularProgress for the loading indicator
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import DropZone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  university: yup.string().required("required"),
  department: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  university: "",
  department: "",
  picture: "",
};

const initialValuesLogin = {
  email: "mulatu@gmail.com",
  password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
};

function Form() {
  const [pageType, setPageType] = useState("login");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  async function register(values, onSubmitProps) {
    setIsLoading(true); // Set loading to true
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    try {
      const savedUserResponse = await fetch(
        "https://studylink.onrender.com/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  }

  async function login(values, onSubmitProps) {
    setIsLoading(true); // Set loading to true
    try {
      const loggedInResponse = await fetch(
        "https://studylink.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!loggedInResponse.ok) {
        throw new Error("Invalid credential");
      }
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  }

  async function handleFormSubmit(values, onSubmitProps) {
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, minmax(0 1fr))"
            sx={{
              "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="University"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.university}
                  name="university"
                  error={Boolean(touched.university) && Boolean(errors.university)}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Department"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.department}
                  name="department"
                  error={Boolean(touched.department) && Boolean(errors.department)}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                >
                  <DropZone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </DropZone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              type="password"
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box>
            {/* Buttons */}
            <Button
              fullWidth
              type="submit"
              disabled={isLoading} // Disable the button when loading
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: isLoading ? palette.neutral.medium : palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: isLoading ? palette.background.alt : palette.primary.main,
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" /> // Show loading indicator
              ) : isLogin ? (
                "LOGIN"
              ) : (
                "REGISTER"
              )}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Register here..."
                : "Already have an account Login here..."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default Form;