import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
// Redux
import {
  Card,
  Typography,
  Box,
  Grid,
  Button,
  Container,
} from "@material-ui/core";

const SteamView = () => {
  const [data, setData] = useState(null);
  const [scrapeData, setScrapeData] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(scrapeData, "sss");

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
      setScrapeData(response.data.result);
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
      <Box display='flex'>
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
      <Box mt={2} mb={4}>
        <Typography>
          {scrapeData && (
            <>
              Steam spill med Norsk språk støtte. Velg dine favoritter. Dette
              blir lagret i din database
            </>
          )}
        </Typography>
      </Box>
      <Grid mt={4} container spacing={2}>
        {/* Images */}
          {scrapeData &&
            scrapeData.img.map((image, index) => (
							<Grid item md={1} xs={1}>
              <Box  key={index}>
                <Card>
                  
                    <img src={image} alt='game image' />
                 
                </Card>
              </Box>
        </Grid>
            ))}
          {/* Names */}
        {/* <Grid item md={6} xs={6}>
          {scrapeData &&
            scrapeData.game.map((item, index) => (
              <Card key={index}>
                <Container>
                  <Box mt={2} mb={2}>
                    <Typography>{item}</Typography>
                  </Box>
                </Container>
              </Card>
            ))}
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default SteamView;
