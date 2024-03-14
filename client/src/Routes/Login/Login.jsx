import "./Login.style.css";
import '@fontsource/inter';
import { useState } from "react";
import { CssVarsProvider } from '@mui/joy/styles';
import { postData } from "../../utils/request.utils";
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useContext } from "react";
import { UserDispatchContext } from "../../Reducers/userReducer";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [emailValue, setEmailValue] = useState("");
    const [psswdValue, setPsswdValue] = useState("");
    const navigate = useNavigate();
    const [logingProgress, setLoginProgress] = useState(false);
    const [ermessage, setErmessage] = useState("");

    const userDispatch = useContext(UserDispatchContext);

    const handleLogin = (evt) => {
        const servedPort = process.env.REACT_APP_SERVED_PORT
        const loginposturl = `http://localhost:${servedPort}/auth/login`
        let body = { "username": emailValue, "password": psswdValue };
        setLoginProgress(true);
        postData(loginposturl, body).then((resp) => {
            setLoginProgress(false);
            if(resp.status === 200) {
                resp.json().then((data) => {
                    userDispatch({type: "setuser", user: data.user})
                    navigate("/dashboard");
                })
            } else {
                resp.json().then( resp => {setErmessage(resp.message)})
            }
        });
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
                <Button loading={logingProgress} onClick={handleLogin} sx={{ mt: 1 /* margin top */ }}>
                    Log in
                </Button>
                {(ermessage !== "") && <Typography sx={{color: "red"}} level="body-sm">{ermessage}</Typography>}
                <Typography
                    endDecorator={<Link href="/signup">Sign up</Link>}
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