import ResponsiveAppBar from "../Navbar/NavBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FetchCalculateHook } from "../Hooks/FetchCalculateHook";
import { useState } from "react";
const Home = () => {
  const { EmiValues, setEmiValues, Emi } = FetchCalculateHook();
  const [emiResult,setEmiResult] = useState<string | null>(null)
  console.log(Emi);

  const HandleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmiValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
let emi;
  const CalculateEMIValue = () => {
    const { loanAmount, interestRate, Terms } = EmiValues;
    const principal = loanAmount;
    const rate = interestRate;
    const time = Terms * 12; // Convert years to months
    const monthlyRate = rate / (12 * 100); // Convert annual rate to monthly and percentage to decimal
     emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) /
      (Math.pow(1 + monthlyRate, time) - 1);
    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;
    const result = {
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
    setEmiResult(result.emi)
    console.log("EMI:", result.emi);
  };

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
            name="loanAmount"
            type="number"
            value={EmiValues.loanAmount}
            onChange={HandleDataChange}
          />
          <TextField
            id="outlined-basic"
            label="Interest Rate(%)"
            variant="outlined"
            name="interestRate"
            type="number"
            onChange={HandleDataChange}
            value={EmiValues.interestRate}
          />
          <TextField
            id="outlined-basic"
            label="Terms(yrs)"
            variant="outlined"
            name="Terms"
            type="number"
            onChange={HandleDataChange}
            value={EmiValues.Terms}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={CalculateEMIValue}>
            CALCULATE
          </Button>
        </Stack>
      </div>
      <section>
        <p style={{marginLeft:"25%",fontSize:"30px"}}>Monthly EMI: <span>${emiResult}</span></p>
        
      </section>
    </>
  );
};

export default Home;
