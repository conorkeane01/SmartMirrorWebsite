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
      .post("http://localhost:8000/login", {
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
  }, [code]);

  useEffect(() => {
    if (refreshToken || !expiresIn) return
    const interval = setInterval(() => {
        axios
      .post("http://localhost:8000/refresh", {
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
