import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFound from "../../assets/404.png";

const NoPage = () => {

    const navigate = useNavigate();

    return (
        <Box margin ="100px auto" minHeight="calc(100vh - 380px)" display="grid" alignItems="center">
            <Container>
                <Box display ="flex" flexDirection="column" alignItems="center">
                <img 
                    src={NotFound} 
                    alt="Logo" 
                    height="auto" 
                    width="100px" 
                />
                <Typography fontWeight="bold" mt="10px">This site doesn't exist</Typography>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{
                    padding: "20px 40px",
                    m: "20px 0",
                    width: "50%",
                    ":hover": { cursor: "pointer" }
                    }}
                    onClick={() => {
                    navigate("/");
                    }}
                >
                    GO BACK TO MAIN SITE
                </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default NoPage;