import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik,  getIn } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, Container } from "@mui/material";
import { shades } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const Contact = () => {
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
      
    const form = useRef();
    
    const onSubmit= (values, { resetForm }) => {   
        emailjs.sendForm('service_ejzf3za', 'template_7o42kcm', form.current, 'TYXzlWhuDyX5Fn-l6')
        .then((result) => {
            setIsSubmitting(true);
            resetForm();
        
        }, (error) => {
            setIsError(true);
            resetForm();
        });
    };

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            message: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            message: Yup.string().required("Required"),
        }),
        onSubmit   
    });

    const formattedError = (field) =>
    Boolean(
        getIn(formik.touched, field) &&
        getIn(formik.errors, field)
    );

    const formattedHelper = (field) =>
        getIn(formik.touched, field) && getIn(formik.errors, field);

    const isNonMobile = useMediaQuery("(min-width:600px)");

  
    return (       
        <Box m="100px auto" minHeight="calc(100vh - 380px)" display="grid" alignItems="center">
            <Container>
                <Typography sx={{ mb: "15px" }} variant="h3">
                    Contact Us
                </Typography>
                <form ref={form} onSubmit={formik.handleSubmit}>
                    <Box 
                    display="grid"
                    gap="15px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                    >
                        <TextField
                            fullWidth
                            id="fullName"
                            type="text" 
                            name="fullName"
                            label="Full Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            error={formattedError("fullName")}
                            helperText={formattedHelper("fullName")}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            type="text" 
                            name="email"
                            label="E-mail"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formattedError("email")}
                            helperText={formattedHelper("email")}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            multiline      
                            rows={10}
                            id="message"
                            type="text" 
                            name="message"
                            label="Message"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                            error={formattedError("message")}
                            helperText={formattedHelper("message")}
                            sx={{ gridColumn: "span 4" }}
                        />
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
                            gridColumn: "span 4",
                            }}
                        > 
                            Send
                        </Button>
                    </Box>
                </form>
                {isSubmitting && (
                    <Box mt="30px">
                        <Alert severity="success">
                            <AlertTitle>Form submitted successfully</AlertTitle>
                                We will get back to you as soon as possible
                        </Alert>
                    </Box>
                )}
                {isError && (
                    <Box mt="10px">
                        <Alert severity="error">
                            Something went wrong, please try again
                        </Alert>
                    </Box>
                )}
            </Container>
        </Box>
    );
  };

  export default Contact;