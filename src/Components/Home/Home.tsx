import ResponsiveAppBar from "../Navbar/NavBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FetchCalculateHook } from "../Hooks/FetchCalculateHook";
const Home = () => {
    const {EmiValues} = FetchCalculateHook();
    console.log(EmiValues);
  return (
    <>
      <ResponsiveAppBar />
      <div className="home_container">
        <div style={{ fontSize: "40px" }}>Loan Calculator Dashboard</div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Loan Amount"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Interest Rate(%)"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Terms(yrs)"
            variant="outlined"
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">CALCULATE</Button>
        </Stack>
      </div>
    </>
  );
};

export default Home;
