import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

function createData(firstName, lastName) {
  return { firstName, lastName };
}

export default function BasicTable() {
  const email_address = atob(localStorage.getItem("token"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userFound, setuserFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const data = {
    email_address,
  };
  const rows = [
    createData("First name", firstName),
    createData("Second Name", lastName),
    createData("Email", email),
  ];

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
        setFirstName(data.first_name);
        setLastName(data.second_name);
        setEmail(data.email);
        setuserFound(true);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userFound && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.firstName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!userFound && "User not found"}
    </>
  );
}
