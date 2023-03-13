import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
}) => {
    return (
        <Box m="30px auto">
            {/* BILLING FORM */}
            <Box>
                <Typography sx={{ mb: "15px" }} fontSize="18px">
                    Billing Information
                </Typography>
                <AddressForm
                    type="billingAddress"
                    values={values.billingAddress}
                    errors={errors} //errors from validationSchema
                    touched={touched} //determines if user 'touched' the field, if so touched will be true, otherwise it is false
                    handleBlur={handleBlur} //handles when user clicked on field and out of field
                    handleChange={handleChange} // on change, for example when user is typing 
                />
            </Box>
            <Box mb="20px">
                <FormControlLabel
                     control={
                        <Checkbox
                          defaultChecked
                          value={values.shippingAddress.isSameAddress}
                          onChange={() =>
                            setFieldValue(
                              "shippingAddress.isSameAddress",
                              !values.shippingAddress.isSameAddress
                            )
                          }
                        />
                      }
                    label="Same for Shipping Address"
                />
            </Box>
            {/*Shipping form */}
            {!values.shippingAddress.isSameAddress && (
                <Box>
                <Typography sx={{ mb: "15px" }} fontSize="18px">
                    Shipping Information
                </Typography>
                <AddressForm
                    type="shippingAddress"
                    values={values.shippingAddress}
                    errors={errors} 
                    touched={touched}
                    handleBlur={handleBlur} 
                    handleChange={handleChange}
                />
                </Box>
            )}
      </Box>

    );
};

export default Shipping;