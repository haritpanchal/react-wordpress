import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/index";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { userId } = useParams();
  const { changeProdileBadge } = useContext(Context);
  const email_address = atob(localStorage.getItem("token"));
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userFound, setuserFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitMessage, setformSubmitMessage] = useState("");

  const navigate = useNavigate();
  const data = {
    email_address,
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const users = await fetch(
        "http://localhost/contribution/wp-json/user/getDetails",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let resJson = await users.json();
      setIsLoading(false);
      if (resJson.success === true) {
        const { data } = resJson.data;
        setuserFound(true);
        setUserID(data.user_id);
        setFirstName(data.first_name);
        setLastName(data.second_name);
        setuserEmail(data.email);
        changeProdileBadge(data.first_name + " " + data.second_name);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const cancelCalback = () => {
    navigate("/admin/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("submit");

    const data = {
      first_name: firstName,
      second_name: lastName,
      email_address: userEmail,
    };
    try {
      let res = await fetch(
        "http://localhost/contribution/wp-json/user/updateDetails",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      let resJson = await res.json();

      setformSubmitMessage(resJson.data.message);

      if (resJson.success === true) {
        // setFirstName("");
        // setLastName("");
        console.log(resJson);
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };
  return (
    <div>
      <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
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
              onChange={(event) => setFirstName(event.target.value)}
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
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              disabled
              label="Email Address"
              name="email"
              value={userEmail}
              autoComplete="email"
              onChange={(event) => setuserEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>{formSubmitMessage}</p>
          </Grid>
        </Grid>

        <Grid>
          <Button type="submit" variant="contained">
            Update
          </Button>

          <Button
            type="button"
            variant=""
            sx={{ ml: "10px" }}
            onClick={cancelCalback}
          >
            Cancel
          </Button>
        </Grid>
      </Box>
    </div>
  );
}

export default EditProfile;
