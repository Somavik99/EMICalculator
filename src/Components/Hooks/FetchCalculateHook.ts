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
const [Emi, setEmi] = useState([]);
  useEffect(() => {
    const  cancelToken =  axios.CancelToken.source();
    const fetchEmiApi = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/804a83fa4d1d35310c87b414/latest/USD`,
        {
          cancelToken:  cancelToken.token,
        }
        );
        const EmiData = response.data;
        setEmi(EmiData);
        // console.log(EmiData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred");
        }
      } finally {
        console.log("API call completed");
      }
    };
    fetchEmiApi();
    return ()=>{
      cancelToken.cancel('Operation canceled by the user.');
    }
  }, []);

  return { EmiValues,Emi,setEmiValues };
};
