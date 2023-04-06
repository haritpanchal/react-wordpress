import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { CHANGE_PASSWORD_API } from "../Endpoints";

const ChangePassword = () => {
  const email_address = atob(localStorage.getItem("token"));
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitMessage, setformSubmitMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const cancelCalback = () => {
    navigate("/admin/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      email_address: email_address,
      password: password,
      confirm_password: confirmPassword,
    };
    try {
      setIsLoading(true);
      let res = await fetch(CHANGE_PASSWORD_API, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let resJson = await res.json();
      setIsLoading(false);

      setformSubmitMessage(resJson.data.message);

      if (resJson.success === true) {
        navigate("/admin");
      } else {
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
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
              type="password"
              name="password"
              value={password}
              required
              fullWidth
              id="password"
              label="Password"
              autoFocus
              onChange={(event) => setpassword(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              autoComplete="family-name"
              onChange={(event) => setconfirmPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>{formSubmitMessage}</p>
          </Grid>
        </Grid>

        <Grid>
          <Button type="submit" variant="contained" color="success">
            Change
          </Button>

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

export default ChangePassword;
