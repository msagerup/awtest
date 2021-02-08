import React, { useEffect, useState } from "react";

import axios from "axios";

import { Button} from "@material-ui/core";

export default function Steamlogin() {
  const [signInLink, setSignInLink] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:5000/api/auth/steam",
        });
        setSignInLink(response.data.redirectUrl);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  console.log(typeof signInLink);

  return (
    <>
      {signInLink && (
        <Button
          style={{ background: "#fcba03", padding: "10px 50px", color: "#111" }}
          // onClick={steamLogin}
        >
          <a href={signInLink}>Logg inn med Steam</a>
        </Button>
      )}
    </>
  );
}
