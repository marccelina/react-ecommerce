import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all"); //filter function
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() { //call backend to get information from strapi (get products)
        const items = await fetch(
            "http://localhost:1337/api/items?populate=image",
            { method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }

    useEffect(() => {
        getItems();
    }, []) 

    const featuredItems = items.filter(
        (item) => item.attributes.featured
    );
    

    return (
    <Box margin="auto"  padding="80px 0">
        <Container>
            <Typography variant="h3" textAlign="center">
                Our Featured <b>Products</b>
            </Typography>
            <Box
                margin="20px auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {featuredItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
            </Box>
            <Typography
                align= "center"
                fontSize="16px"
                onClick={() => navigate("/shop")}
                sx={{'&:hover': {cursor: "pointer", textDecoration: "underline"}}}
                color={shades.secondary[500]}
            >
                Show All
            </Typography>   
        </Container>
    </Box>
    );

};

export default ShoppingList;