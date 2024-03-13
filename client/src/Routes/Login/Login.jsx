import "./Login.style.css";
import '@fontsource/inter';
import { useState } from "react";
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';



const Login = () => {

    const [emailValue, setEmailValue] = useState("");
    const [psswdValue, setPsswdValue] = useState("");


    const handleLogin = (evt) => {
        const servedPort = process.env.REACT_APP_SERVED_PORT
        const loginposturl = `http://localhost:${servedPort}/auth/login`
        let body = { "username": emailValue, "password": psswdValue };
        postData(loginposturl, body).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
    }

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const handleTextFieldInput = (evt) => {
        let value = evt.target.value
        switch (evt.target.name) {
            case "email":
                setEmailValue(value);
                break;
            case "password":
                setPsswdValue(value);
                break;
            default:
                console.log("unset testfield name case in login form")
        }

    }

    const sheetstyle = {
        width: 300,
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
    };
    return (
        <CssVarsProvider>
            <Sheet sx={sheetstyle} variant="outlined">
                <div>
                    <Typography level="h4" component="h1">
                        Welcome!
                    </Typography>
                    <Typography level="body-sm">Sign in to continue.</Typography>
                </div>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        // html input attribute
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        onChange={handleTextFieldInput}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={handleTextFieldInput}
                    />
                </FormControl>
                <Button onClick={handleLogin} sx={{ mt: 1 /* margin top */ }}>
                    Log in
                </Button>
                <Typography
                    endDecorator={<Link href="/sign-up">Sign up</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Don't have an account?
                </Typography>
            </Sheet>
        </CssVarsProvider>
    )
}

export default Login