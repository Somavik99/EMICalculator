import { useEffect, useState } from "react";
import axios from "axios";

interface EmiStats {
  loanAmount: number;
  interestRate: number;
  Terms: number;
}
export const FetchCalculateHook = () => {
  const [EmiValues, setEmiValues] = useState<EmiStats>({
    loanAmount: 100000,
    interestRate: 8.4,
    Terms: 5.5,
  });
  const fetchEmiApi = async () => {
    try {
      const responsse = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/EUR/GBP`
      );
      const EmiData = responsse.data
      console.log(EmiData);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("API call completed");
    }
  };

  useEffect(()=>{
    fetchEmiApi()
  },[])
};
