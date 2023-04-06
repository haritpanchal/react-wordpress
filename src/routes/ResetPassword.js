import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const ResetPassword = () => {
  const email_address = localStorage.getItem("email");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitMessage, setformSubmitMessage] = useState("");

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
      let res = await fetch(
        "http://localhost/contribution/wp-json/user/resetPassword",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let resJson = await res.json();
      setIsLoading(false);

      setformSubmitMessage(resJson.data.message);

      if (resJson.success === true) {
        localStorage.removeItem("email");
        navigate("/login");
      }
    } catch (err) {}
  };

  return (
    <div>
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
            Save
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

export default ResetPassword;
