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

function createData(firstName, lastName) {
  return { firstName, lastName };
}

export default function Admin() {
  const email_address = atob(localStorage.getItem("token"));
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userFound, setuserFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        console.log(data);
        setuserFound(true);
        setUserID(data.user_id);
        setFirstName(data.first_name);
        setLastName(data.second_name);
        setEmail(data.email);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userFound && (
        <div>
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
                  </TableRow>
                ))}
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
            <Button variant="contained" color="error">
              Delete
            </Button>
          </Stack>
        </div>
      )}
      {!userFound && "User not found"}
    </>
  );
}
