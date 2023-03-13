import { useTheme } from "@emotion/react";
import { Box, Typography, Container } from "@mui/material";
import { shades } from "../../theme";
import strapi from "../../assets/strapi.png";
import stripe from "../../assets/stripe.png";
import emailjs from "../../assets/emailjs.png";

const Footer = () => {
    const {
        palette: {neutral},
    } = useTheme();

    return (
        <Box p ="40px 0" backgroundColor={neutral.light}>
            <Container>
            <Box
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap="40px 15px"
            >
                <Box width="50%">
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb="30px"
                    color={shades.secondary[500]}
                >
                    SHOP
                </Typography>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat
                </div>
                </Box>

                <Box display="flex" flexDirection="column" gap="20px">
                <Typography variant="h4" fontWeight="bold" mb="10px">
                    Technologies
                </Typography>
                <a target="_blank" href="https://strapi.io/">
                    <img 
                        src={strapi} 
                        alt="Strapi logo" 
                        width="70px"
                    />
                </a>
                <a target="_blank" href="https://stripe.com/">
                    <img 
                        src={stripe} 
                        alt="Stripe logo" 
                        width="70px"
                    />
                </a>
                <a target="_blank" href="https://www.emailjs.com/">
                    <img 
                        src={emailjs} 
                        alt="EmailJS logo" 
                        width="30px"
                    />
                </a>
                </Box>
                <Box>
                <Typography variant="h4" fontWeight="bold" mb="30px">
                    Copyright
                </Typography>
                <Typography mb="30px">
                    Marcelina Choszcz
                </Typography>
                <a href="mailto:marcelina.choszcz@gmail.com">
                    <Typography mb="30px"  color={shades.secondary[500]} sx={{ wordWrap: "break-word" }}>
                        marcelina.choszcz@gmail.com
                    </Typography> 
                </a>
                <a href="tel:+48662340565">
                    <Typography mb="30px" color={shades.secondary[500]}>+48662340565</Typography>
                </a>
                </Box>
            </Box>
            </Container>
        </Box>
    )

}

export default Footer;