import { Container, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Confirmation = () => {
  return (
    <Box m="90px auto" minHeight="calc(100vh - 380px)" display="grid" alignItems="center">
      <Container >
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          You have successfully made an Order —
          <strong>Congrats on Making your Purchase</strong>
        </Alert>
      </Container>
    </Box>
  );
};

export default Confirmation;
