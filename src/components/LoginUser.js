import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginUser() {
  const [userName, setuserName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [formSubmitMessage, setformSubmitMessage] = useState("");
  const [btnText, setbtnText] = useState("Sign In");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setformSubmitMessage("");
    event.preventDefault();
    const data = {
      username: userName,
      password: userPassword,
    };
    try {
      setbtnText("Loading...");
      setIsDisabled(true);
      let res = await fetch(
        "http://localhost/contribution/wp-json/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let resJson = await res.json();

      setformSubmitMessage(resJson.data.message);
      const token = resJson.data.data.id;
      if (resJson.success === true) {
        localStorage.setItem("token", token);
        setbtnText("Sign In");
        setIsDisabled(false);
        navigate("/admin");

        setuserName("");
        setuserPassword("");
      } else {
        setbtnText("Sign In");
        setIsDisabled(false);
        setformSubmitMessage("Something wrong");
      }
    } catch (err) {
      setIsError(true);
      setbtnText("Sign In");
      setIsDisabled(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {isError && (
        <Alert severity="warning" variant="filled">
          Something wrong!! Refresh the page or try again later.
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userName}
                  autoComplete="email"
                  onChange={(event) => setuserName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={userPassword}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => setuserPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <p>{formSubmitMessage}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isDisabled}
            >
              {btnText}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/forgot-password"}>Forgot password?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
