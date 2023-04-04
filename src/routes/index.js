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

export default function Index() {
  const [usersData, setUsersData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const users = await fetch(
        "http://localhost/contribution/wp-json/auth/getAllUsers",
        {
          method: "POST",
        }
      );
      let resJson = await users.json();
      setIsLoading(false);
      setUsersData(resJson);
    })();
  }, []);

  if(isLoading){
    return <CircularProgress/>
  }

  let usersList =
    usersData.length > 0
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
              {!isLoading && <TableBody>{usersList}</TableBody>}
            </Table>
          </TableContainer>
        </Grid>
      </Box>
    </>
  );
}
