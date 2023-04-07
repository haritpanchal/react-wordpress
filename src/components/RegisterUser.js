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
import { REGISTER_API } from "../Endpoints";

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

export default function RegisterUser() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [formSubmitMessage, setformSubmitMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [bnText, setBtnText] = useState("Sign Up");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setformSubmitMessage("");
    event.preventDefault();

    const data = {
      first_name: firstName,
      second_name: lastName,
      email_address: userEmail,
      password: userPassword,
    };
    try {
      setBtnText("Loading...");
      setIsDisabled(true);
      let res = await fetch(REGISTER_API, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let resJson = await res.json();

      setformSubmitMessage(resJson.data.message);
      setIsDisabled(false);
      setBtnText("Sign Up");
      if (resJson.success === true) {
        setfirstName("");
        setlastName("");
        setuserEmail("");
        setuserPassword("");

        setTimeout(() => navigate("/"), 1000);
      } else {
        setformSubmitMessage(resJson.data.message);
      }
    } catch (err) {
      setIsDisabled(false);
      setIsError(true);
      setBtnText("Sign Up");
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => setfirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  autoComplete="family-name"
                  onChange={(event) => setlastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userEmail}
                  autoComplete="email"
                  onChange={(event) => setuserEmail(event.target.value)}
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
              {bnText}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
