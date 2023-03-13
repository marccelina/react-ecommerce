import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel, Container, Typography} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import Summary from "./Summary";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import cartEmpty from "../../assets/cart-empty.png";
import loading from "../../assets/loading.png";

const stripePromise = loadStripe(
  "pk_test_51Mgo5pDvQ7SY4oP45ziZyO8J91L91xtSRelMK5FmSNQNVluJ9R6ZLweH08YCU6DZ7sqvHv2D0skgIVtgUJ6WjZzX00PXjeB7zT"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const isThirdStep = activeStep === 2;
  const navigate = useNavigate();
  

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isThirdStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      customerName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
      address: [
        values.billingAddress.country, 
        values.billingAddress.street1, 
        values.billingAddress.street2, 
        values.billingAddress.city,
        values.billingAddress.zipCode 
      ].join(" "),
      phone: values.phoneNumber,
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box m="100px auto" minHeight="calc(100vh - 380px)" display="grid" alignItems="center">
      {cart.length > 0 && (
        <Container>
          <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
            <Step>
              <StepLabel>Billing</StepLabel>
            </Step>
            <Step>
              <StepLabel>Contact Info</StepLabel>
            </Step>
            <Step>
              <StepLabel>Place Order</StepLabel>
            </Step>
          </Stepper>
          <Box>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema[activeStep]}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  {isFirstStep && (
                    <Shipping
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {isSecondStep && (
                    <Payment
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {isThirdStep && (
                    <Summary
                      values={values}
                    />
                  )}

                  {(isFirstStep || isSecondStep || isThirdStep) ? (
                    <Box display="flex" justifyContent="space-between" gap="50px">
                      {!isFirstStep && (
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          sx={{
                            backgroundColor: shades.primary[200],
                            boxShadow: "none",
                            color: "white",
                            borderRadius: 0,
                            padding: "15px 40px",
                          }}
                          onClick={() => setActiveStep(activeStep - 1)}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                          backgroundColor: shades.primary[400],
                          boxShadow: "none",
                          color: "white",
                          borderRadius: 0,
                          padding: "15px 40px",
                        }}
                      >
                        {(isFirstStep || isSecondStep) && "Next"}
                        {isThirdStep && "Place order"}
                      </Button>
                      
                    </Box>
                  ) :
                    <Box m="50px 0" display ="flex" flexDirection="column" alignItems="center">
                      <Typography variant="h3" m="20px 0">
                        Please wait, you will be soon redirected to the payment page shortly.
                      </Typography>
                      <img 
                        src={loading} 
                        alt="Logo" 
                        height="auto" 
                        width="80px" 
                      />  
                    </Box>
                  }
                </form>
              )}
            </Formik>
          </Box>
        </Container>
      )}
      {cart.length === 0 && (
        <Box>
          <Container>
            <Box display ="flex" flexDirection="column" alignItems="center">
              <img 
                src={cartEmpty} 
                alt="Logo" 
                height="auto" 
                width="80px" 
              />
              <Typography fontWeight="bold" mt="10px">Your cart is empty</Typography>
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
                  navigate("/shop");
                }}
              >
                SEE OUR PRODUCTS
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required").min(2, 'too short'),
      lastName: yup.string().required("required").min(2, 'too short'),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      zipCode: yup.string().required("required").matches(/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/, "invalid zip code"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().email("Invalid email address").required("required"),
    phoneNumber: yup.string().required("required").matches(/[0-9]{8}/, "invalid telephone number"),
  }),
];

export default Checkout;