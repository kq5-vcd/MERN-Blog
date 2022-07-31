import React from 'react'
import { Box, Typography } from "@mui/material"

function Home() {
  return (
    <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          backgroundColor="#FFFEFC"
        >
          <Typography variant="h2" padding={3} textAlign="center">
            Home Page
          </Typography>
        </Box>
  )
}

export default Home