import { createTheme } from "@mui/material/styles";

export const shades = {
    primary: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
    },

    secondary: {
        100: "#e8defd",
        200: "#d1befb",
        300: "#b99dfa",
        400: "#a27df8",
        500: "#8b5cf6",
        600: "#6f4ac5",
        700: "#533794",
        800: "#382562",
        900: "#1c1231"
    },

    neutral: {
        100: "#fbdaeb",
        200: "#f7b6d6",
        300: "#f491c2",
        400: "#f06dad",
        500: "#ec4899",
        600: "#bd3a7a",
        700: "#8e2b5c",
        800: "#5e1d3d",
        900: "#2f0e1f"
    },

    white: {
        100: "#fafafb",
        200: "#f5f5f7",
        300: "#eff1f3",
        400: "#eaecef",
        500: "#e5e7eb",
        600: "#b7b9bc",
        700: "#898b8d",
        800: "#5c5c5e",
        900: "#2e2e2f"
},
};

export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500]
        },
        secondary: {
            main: shades.secondary[500]
        },
        neutral: {
            dark: shades.neutral[700],
            main: shades.neutral[500],
            light: shades.neutral[100]
        }
    },
    typography: {
        fontFamily: ['Dosis','sans-serif'].join(","),
        fontSize: 11,
        h1: {
            fontSize: 48,
        },
        h2: {
            fontSize: 36,
        },
        h3: {
            fontSize: 26,
        },
        h4: {
            fontSize: 18,
        },
    },
});