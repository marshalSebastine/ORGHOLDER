import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { getRolesOfOrg, postData } from "../../utils/request.utils";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";




const defaultTheme = createTheme();

export default function SignUp() {

    const [userRoles, setRoles] = useState(null);
    const [orgName, setOrgName] = useState("");

    const [signUpProgress, setSignUpProgress] = useState(false);
    const [orgFetchProgress, setOrgProgress] = useState(false);
    // for org prompt
    const [verifiedOrg, setVerifiedOrd] = useState("");
    const [orgErmessage, setOrgErmessage] = useState("");

    const [ermessage, setErmessage] = useState("");


    const navigate = useNavigate();
    const handleCompanyNameInput = (e) => {
        setOrgName(e.target.value);
    }
    const sheetstyle = {
        width: 300,
        maxHeight: "95vh",
        boxSizing: "border-box",
        mx: 'auto', // margin left & right
        my: '16em', // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
    };
    const handleOrgNameSubmission = (e) => {
        setOrgProgress(true);
        getRolesOfOrg(orgName).then((resp) => {
            setOrgProgress(false);
            console.log("response at meaning", resp, resp.status)
            if (resp.status === 200) {
                console.log("setting roles", resp.roles, orgName)
                setRoles(resp.roles);
                setVerifiedOrd(orgName);
            } else {
                console.error(resp)
                if (!resp.message) resp.message = "some error occured"
                setOrgErmessage(resp.message)
            }
        }).catch((er) => {
            console.log("er in fetch role", er);
        })
    }
    const handleSubmit = (event) => {
        setSignUpProgress(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = { "user" : {
            mailId: data.get('email'),
            password: data.get('password'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            fullName: data.get('fullName'),
            role: data.get('role'),
            organisationName: verifiedOrg,
        }
        };
        console.log("user data formed", user)
        const signupUrl = "/auth/signup"
        postData(signupUrl, user).then(res => {
            setSignUpProgress(false);
            console.log(res);
            if (res.status === 200) {
                alert("User Creation Success....")
                navigate("/login")
            } else {
                if (!res.message) res.message = "some error occured!"
                setErmessage(res.message)
            }
        }).catch(er => {
            console.error("err in signup post", er);
        })
    };


    if (verifiedOrg === "") {
        return (
            <FormControl sx={sheetstyle}>
                <FormLabel>Enter your Organisation name.</FormLabel>
                <Input
                    // html input attribute
                    name="organisation"
                    placeholder="organisation name"
                    onChange={handleCompanyNameInput}
                />
                {(orgErmessage !== "") && <Typography sx={{ color: "red" }} level="body-sm">{orgErmessage}</Typography>}
                <Button loading={orgFetchProgress} onClick={handleOrgNameSubmission} sx={{ mt: 1 /* margin top */ }}>
                    Verify
                </Button>
            </FormControl>
        )
    } else {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="FullName"
                                        name="fullName"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <select required name="role" id="role" label="role" style={{width: "100px", height: "60px"}}>
                                        {
                                            userRoles.map((role,i) => {
                                                return(<option key={i} value={role}>{role}</option>)
                                            })
                                        }
                                    </select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {(ermessage !== "") && <Typography sx={{ color: "red" }} level="body-sm">{ermessage}</Typography>}
                                </Grid>
                            </Grid>
                            <Button
                                loading = {signUpProgress}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }


}