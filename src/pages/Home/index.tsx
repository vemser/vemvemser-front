import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import Box from "@mui/system/Box";

export const Home = () => {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <Box>
        <Button variant="contained">Hello World</Button>
      </Box>
      <Box>Parte 2</Box>
    </Stack>
  );
};
