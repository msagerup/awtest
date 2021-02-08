import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

// Redux
import { Typography, Box, Button, Container } from "@material-ui/core";

const SteamView = () => {
  const [data, setData] = useState(null);
  const [scrapeData, setScrapeData] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/api/auth/me",
        });

        setData(response);
      } catch (error) {
        setData(error.response);
      }
    }
    fetchData();
  }, []);

  
  // scrape

  const steamScrape = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/api/scrape/steam",
      });
      setLoading(false);
      setScrapeData(response);
      console.log(response);
    } catch (error) {
      setScrapeData(error.response);
    }
  };

  if (data && data.status === 403) {
    return (
      <>
        <Typography variant='h2' style={{ color: "white" }}>
          {data.data.message}
        </Typography>
        <a href={data.data.redirectUrl}>
          <Typography>Vennligst logg inn </Typography>
        </a>
      </>
    );
  }

  return (
    <Container maxWidth={false} style={{ color: "white" }}>
			<Box display="flex">
      {data && (
        <Box>
          <img src={data.data.message.avatar.small} alt='avatar' />
        </Box>
      )}
			<Box ml={2}>
      <Typography>{data && data.data.message.username}</Typography>
			</Box>
			</Box>

      <Box mt={2}>
        <Button
          onClick={steamScrape}
          variant='contained'
          color='primary'
          disabled={loading}
          startIcon={loading && <CircularProgress size={15} />}
        >
         <Typography>Scrape Steam</Typography>
        </Button>
      </Box>
      <Box><Typography>{scrapeData && <>Done, sjekk console.</>}</Typography></Box>
    </Container>
  );
};

export default SteamView;
