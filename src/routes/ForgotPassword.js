import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitMessage, setformSubmitMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const cancelCalback = () => {
    navigate("/login/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      email_address: emailAddress,
    };
    try {
      setIsLoading(true);
      setLoadingState(true);
      let res = await fetch(
        "http://localhost/contribution/wp-json/user/forgotPassword",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let resJson = await res.json();
      setIsLoading(false);
      setLoadingState(false);

      setformSubmitMessage(resJson.data.message);

      if (resJson.success === true) {
        localStorage.setItem("email", emailAddress);
        setTimeout(() => {
          navigate("/confirm-otp");
        }, 2000);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      setLoadingState(false);
    }
  };
  return (
    <div>
      {isError && (
        <Alert severity="warning" variant="filled">
          Something wrong!! Refresh the page or try again later.
        </Alert>
      )}
      <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              type="email_address"
              name="email_address"
              value={emailAddress}
              required
              fullWidth
              id="email_address"
              label="Enter Email"
              autoFocus
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>{formSubmitMessage}</p>
          </Grid>
        </Grid>

        <Grid>
          <LoadingButton
            loadingIndicator="Sending…"
            type="submit"
            variant="contained"
            color="success"
            loading={loadingState}
          >
            Send OTP
          </LoadingButton>

          <Button
            type="button"
            variant="outlined"
            sx={{ ml: "10px" }}
            onClick={cancelCalback}
          >
            Cancel
          </Button>
        </Grid>
        {isLoading && (
          <Box sx={{ mt: "10px  " }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ForgotPassword;
