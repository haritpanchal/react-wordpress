import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";

const ConfirmOTP = () => {
  const emailAddress = localStorage.getItem("email");
  const [isLoading, setIsLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [formSubmitMessage, setformSubmitMessage] = useState("");
  const [resendButton, setResendButton] = useState(false);
  const navigate = useNavigate();

  const resendOTPCallback = async (e) => {
    e.preventDefault();

    const data = {
      email_address: emailAddress,
    };
    try {
      setIsLoading(true);
      let res = await fetch(
        "http://localhost/contribution/wp-json/user/forgotPassword",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let resJson = await res.json();
      setIsLoading(false);
      setformSubmitMessage(resJson.data.message);
      setResendButton(false);
      setOTP("");
      if (resJson.success === true) {
        console.log(resJson);
        setTimeout(() => {
          navigate("/confirm-otp");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      email_address: emailAddress,
      otp: OTP,
    };
    try {
      setIsLoading(true);
      let res = await fetch(
        "http://localhost/contribution/wp-json/user/confirmOTP",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let resJson = await res.json();
      setIsLoading(false);

      setformSubmitMessage(resJson.data.message);

      if (resJson.success === true) {
        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      } else {
        setResendButton(resJson.data.resend);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              type="text"
              name="confirm_otp"
              value={OTP}
              required
              fullWidth
              id="confirm_otp"
              label="Enter OTP"
              autoFocus
              onChange={(event) => setOTP(event.target.value)}
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
          >
            Confirm
          </LoadingButton>
          {resendButton && (
            <Button
              type="button"
              variant="outlined"
              sx={{ ml: "10px" }}
              onClick={resendOTPCallback}
            >
              Resend OTP
            </Button>
          )}
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

export default ConfirmOTP;
