import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
  setCart,
} from "../../state";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import cartEmpty from "../../assets/cart-empty.png";
import useMediaQuery from "@mui/material/useMediaQuery";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //retrieves cart state after refreshing page
  useEffect(() => {
    const cartFromStorage = JSON.parse(localStorage.getItem('CART_CONTENT'));
    dispatch(setCart(cartFromStorage));
  }, [])

  useEffect(() => {
    localStorage.setItem('CART_CONTENT', JSON.stringify(cart))
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width={isNonMobile ? "max(400px, 30%)" : "100%"}
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width={isNonMobile ? "130px" : "100px"}
                      height="auto"
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.shortDescription}</Typography>

                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">
                        ${item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box m="20px 0">
            {cart.length > 0 && (
              <div>
                <FlexBox m="20px 0">
                  <Typography fontWeight="bold">SUBTOTAL</Typography>
                  <Typography fontWeight="bold">${totalPrice}</Typography>
                </FlexBox>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{
                    padding: "20px 40px",
                    m: "20px 0",
                    ":hover": { cursor: "pointer" }
                  }}
                  onClick={() => {
                    navigate("/checkout");
                    dispatch(setIsCartOpen({}));
                  }}
                >
                  CHECKOUT
                </Button>
              </div>
            )}
            {cart.length === 0 && (
               <Box display ="flex" flexDirection="column" alignItems="center">
                <img 
                  src={cartEmpty} 
                  alt="Logo" 
                  height="auto" 
                  width="60px" 
                />
                <Typography fontWeight="bold" mt="10px">Your cart is empty</Typography>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{
                    padding: "20px 40px",
                    m: "20px 0",
                    ":hover": { cursor: "pointer" }
                  }}
                  onClick={() => {
                    navigate("/shop");
                    dispatch(setIsCartOpen({}));
                  }}
                >
                  SEE OUR PRODUCTS
                </Button>
            </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;