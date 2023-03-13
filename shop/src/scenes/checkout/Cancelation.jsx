import { Container, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Cancelation = () => {
  return (
    <Box m="90px auto" minHeight="calc(100vh - 380px)" display="grid" alignItems="center">
        <Container >
            <Alert severity="error">
                <AlertTitle>Something went wrong with your payment</AlertTitle>
                    Please try again
            </Alert>
        </Container>
    </Box>
  );
};

export default Cancelation;
