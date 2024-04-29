//This code checks the spotify api for authentication
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const router = useRouter();

  useEffect(() => {
    axios
      .post("http://34.239.36.76:8000/login", { //Call to the backend to check log in details are correct
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        //cosnole.log(res.data);
        window.history.pushState({}, null, '/music')
      })
      .catch(() => {
       // window.location = "/music";
        router.push("/music");
      });
  }, [code, router]);

  useEffect(() => {
    if (refreshToken || !expiresIn) return  //check to see if refresh token is expired
    const interval = setInterval(() => {
        axios
      .post("http://34.239.36.76:8000/refresh", {  //call backend to refresh tokens
        refreshToken,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
        //cosnole.log(res.data);
      })
      .catch(() => {
       // window.location = "/music";
        router.push("/music");
      })
    }, (expiresIn - 60) * 1000 )

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken;
}

