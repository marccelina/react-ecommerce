import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { 
ShoppingBagOutlined,
MenuOutlined,
SearchOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import logo from "../../assets/logo.png"; 
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
    <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor={shades.neutral[100]}
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="2"
    >
        <Box
            width="80%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Box
                onClick={() => navigate("/")}
                sx={{'&:hover': {cursor: "pointer"}}}
                color={shades.secondary[500]}
            >
                <img 
                    src={logo} 
                    alt="Logo" 
                    height="auto" 
                    width="60px" 
                />
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                columnGap="10px"
                zIndex="3"
            >
                
                {isNonMobile && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        columnGap="10px"
                        zIndex="3"
                    >
                        <Box
                            onClick={() => navigate("/shop")}
                            sx={{'&:hover': {cursor: "pointer"}}}
                            color={shades.secondary[500]}
                        >
                            SHOP
                        </Box>
                        <Box
                            onClick={() => navigate("/about")}
                            sx={{'&:hover': {cursor: "pointer"}}}
                            color={shades.secondary[500]}
                        >
                            ABOUT
                        </Box>
                        <Box
                            onClick={() => navigate("/contact")}
                            sx={{'&:hover': {cursor: "pointer"}}}
                            color={shades.secondary[500]}
                        >
                            CONTACT
                        </Box>
                    </Box>
                )}
                <Badge
                    badgeContent={cart.length}
                    color="secondary"
                    invisible={cart.length === 0}
                    sx = {{
                        "& .MuiBadge-badge": {
                            right: 5,
                            top: 5,
                            padding: "0 4px",
                            height: "14px",
                            minWidth: "13px",
                        },
                    }}
                >
                    <IconButton 
                        onClick={() => dispatch(setIsCartOpen({}))}
                        sx = {{color: "#8b5cf6"}}>
                        <ShoppingBagOutlined />
                    </IconButton>
                </Badge>
                {!isNonMobile && (
                    <Box>
                        <IconButton 
                            onClick={() => setMobileMenuOpen(true)}
                            sx = {{color: "#8b5cf6"}}>
                            <MenuOutlined/>
                        </IconButton>
                    </Box>
                )}
                {mobileMenuOpen && !isNonMobile && (
                    <Box>
                        <Box
                            display={ "block" }
                            backgroundColor={shades.white[100]}
                            position="fixed"
                            zIndex={10}
                            width="100%"
                            height="100%"
                            left="0"
                            top="0"
                            overflow="auto"
                            >
                            <Box padding="30px" overflow="auto" height="100%">
                            
                                <Box mb="15px" display="flex" justifyContent="flex-end">
                                    <IconButton onClick={() => setMobileMenuOpen(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Box
                                    textAlign="center"
                                    zIndex="3"
                                >
                                    <Typography 
                                        variant="h3" 
                                        color={shades.secondary[500]}
                                        onClick={() => {
                                            navigate("/shop");
                                            setMobileMenuOpen(false);
                                        }}
                                        borderBottom="1px solid #fbdaeb"
                                        pb="30px"
                                        mb="30px"
                                    >
                                        SHOP
                                    </Typography>
                                    <Typography 
                                        variant="h3" 
                                        onClick={() => {
                                            navigate("/about");
                                            setMobileMenuOpen(false);
                                        }}
                                        color={shades.secondary[500]}
                                        borderBottom="1px solid #fbdaeb"
                                        mb="30px"
                                        pb="30px"
                                    >
                                        ABOUT
                                    </Typography>
                                    <Typography 
                                        variant="h3" 
                                        onClick={() => {
                                            navigate("/contact");
                                            setMobileMenuOpen(false);
                                        }}
                                        color={shades.secondary[500]}
                                    >
                                        CONTACT
                                    </Typography>
                                </Box>

                            
                        </Box>
                    </Box>
                </Box>
                )}
            </Box>
        </Box>
    </Box>
    );
};

export default Navbar;