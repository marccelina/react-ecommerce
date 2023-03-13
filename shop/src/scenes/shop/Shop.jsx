import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const Shop = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all"); //filter function
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() { //call backend to get information from strapi (get items)
        const items = await fetch(
            "http://localhost:1337/api/items?populate=image",
            { method: "GET"}
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }

    useEffect(() => {
        getItems();
    }, []);

    const onePieceItems = items.filter(
        (item) => item.attributes.category === "onePiece"
    );
    const topPieceItems = items.filter(
        (item) => item.attributes.category === "topPiece"
    );
    const bottomPieceItems = items.filter(
        (item) => item.attributes.category === "bottomPiece"
    );

    return (
    <Box margin="80px auto">
        <Container>
            <Typography variant="h3" textAlign="center">
                Our Products
            </Typography>
            <Tabs textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                    },
                }}
            >
                <Tab label="ALL" value="all" />
                <Tab label="ONE PIECES" value="onePiece" />
                <Tab label="BOTTOM PIECES" value="topPiece" />
                <Tab label="TOP PIECES" value="bottomPiece" />
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === "all" && items.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "onePiece" && onePieceItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "topPiece" && topPieceItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                {value === "bottomPiece" && bottomPieceItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}

            </Box>
        </Container>
    </Box>
    );

};

export default Shop;