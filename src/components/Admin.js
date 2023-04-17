import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import * as ENDPOPOINTS from "../Endpoints";

function createData(dataKey, dataVal) {
  return { dataKey, dataVal };
}

export default function Admin() {
  const { changeProdileBadge } = useContext(Context);
  const email_address = atob(localStorage.getItem("token"));
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userFound, setuserFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState("");
  const [referalCode, setReferalCode] = useState("none");
  const [remainingUsers, setRemainingUsers] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = {
    email_address,
  };
  const rows = [
    createData(
      "Profile",
      <img
        width="100"
        height="100"
        alt="alt-text"
        src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
      />
    ),
    createData("First name", firstName),
    createData("Second Name", lastName),
    createData("Email", email),
    createData("Role", role),
    createData("Referal Code", referalCode),
    createData("Remaining use of referal code", remainingUsers),
  ];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const users = await fetch(ENDPOPOINTS.GET_USER_DETAILS, {
          method: "POST",
          body: JSON.stringify(data),
        });
        let resJson = await users.json();
        setIsLoading(false);
        if (resJson.success === true) {
          const { data } = resJson.data;
          setuserFound(true);
          setUserID(data.user_id);
          setFirstName(data.first_name);
          setLastName(data.second_name);
          setEmail(data.email);
          setRole(data.role);
          setReferalCode(data.teacher_referal_code);
          setRemainingUsers(data.number_of_account_purchase);
          changeProdileBadge(data.first_name + " " + data.second_name);
        }
      } catch {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const deletHandler = async () => {
    const data = {
      email_address: email_address,
    };
    try {
      setOpen(false);
      setIsDeleteLoading(true);
      let res = await fetch(ENDPOPOINTS.DELETE_USER, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let resJson = await res.json();

      if (resJson.success === true) {
        setIsDeleteLoading(false);
        await localStorage.removeItem("token");
        navigate("/");
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      {userFound && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows.map((row) => {
                  if (row.dataVal !== "") {
                    return (
                      <TableRow
                        key={row.dataKey}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.dataKey}
                        </TableCell>
                        <TableCell align="left">{row.dataVal}</TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={2} style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                navigate("/admin/edit/" + userID);
              }}
            >
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleClickOpen}>
              Delete
            </Button>
          </Stack>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"WARNING"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Once you delete your account there is no going back. <br />{" "}
                  Make sure you want to do this
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={deletHandler}
                  autoFocus
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {isDeleteLoading && (
            <Box sx={{ mt: "10px  " }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      )}
      {!userFound && navigate("/")}
    </>
  );
}
