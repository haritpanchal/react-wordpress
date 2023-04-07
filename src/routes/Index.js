import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { GET_ALL_USERS_API } from "../Endpoints";

export default function Index() {
  const [usersData, setUsersData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const users = await fetch(GET_ALL_USERS_API, {
          method: "POST",
        });

        let resJson = await users.json();
        setIsLoading(false);
        setUsersData(resJson);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }
  let usersList =
    usersData !== null && usersData.length > 0
      ? usersData.map((user) => (
          <TableRow
            key={user.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {user.id}
            </TableCell>
            <TableCell component="th" scope="row">
              {user.email}
            </TableCell>
            <TableCell component="th" scope="row">
              {user.first_name}
            </TableCell>
            <TableCell component="th" scope="row">
              {user.last_name}
            </TableCell>
          </TableRow>
        ))
      : "";

  return (
    <>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <h2>All users</h2>
        </Grid>
        <Grid>
          {!isError && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>UserID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{usersList}</TableBody>
              </Table>
            </TableContainer>
          )}
          {isError && (
            <Alert severity="warning" variant="filled">
              Something wrong!! Refresh the page or try again later.
            </Alert>
          )}
        </Grid>
      </Box>
    </>
  );
}
