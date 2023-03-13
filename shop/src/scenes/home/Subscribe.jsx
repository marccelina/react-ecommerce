import { Box, InputBase, Divider, Typography, IconButton, Container, Button } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik,  getIn } from "formik";
import * as Yup from "yup";
import { shades } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Subscribe = () => {
    const form = useRef();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit= (values, { resetForm }) => {   
        emailjs.sendForm('service_ejzf3za', 'template_auqzrls', form.current, 'TYXzlWhuDyX5Fn-l6')
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
            user_email: ""  
        },
        validationSchema: Yup.object({
            user_email: Yup.string().email("Invalid email address").required("Required")           
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
        
    const [email, setEmail] = useState("");

    return (
        <Box margin ="auto" padding="80px 0" textAlign="center" backgroundColor={shades.white[100]}>
            <Container>
                <IconButton>
                    <MarkEmailReadOutlinedIcon fontSize="large" />
                </IconButton>
                <Typography variant="h3">Subscribe To Our Newsletter</Typography>
                <Typography>
                    and be updated on our new products and discounts!
                </Typography>
                <Box
                    p="2px 4px"
                    m="15px auto"
                    width="50%"
                >
                    <form ref={form} onSubmit={formik.handleSubmit}>
                        <TextField
                                fullWidth
                                id="user_email"
                                type="text" 
                                name="user_email"
                                label="E-mail"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.user_email}
                                error={formattedError("user_email")}
                                helperText={formattedHelper("user_email")}
                            />
                        <Button
                            fullWidth
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{ mt: "10px", p: "10px", ":hover": { cursor: "pointer" } }}
                        > 
                            Subscribe
                        </Button>
                    </form>
                    {isSubmitting && (
                        <Box mt="10px">
                            <Alert severity="success">
                                    You should receive an email shortly
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
                </Box>
            </Container>
        </Box>
    )

}

export default Subscribe;