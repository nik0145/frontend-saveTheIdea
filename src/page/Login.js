import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import LOGIN_MUTATION from "../queries/auth/login";
import { AUTH_TOKEN } from "../constants";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Login = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onLogin] = useMutation(LOGIN_MUTATION);
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const onHandleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      let {
        data: { login },
      } = await onLogin({
        variables: {
          identifier: email,
          password: password,
        },
      });
      localStorage.setItem(AUTH_TOKEN, login.jwt);
      localStorage.setItem("user", JSON.stringify(login.user));
      history.push("/dashboard");
    } catch (error) {
      error.graphQLErrors.forEach((err) => {
        err.extensions.exception.data.message[0].messages.forEach(
          ({ message }) => {
            enqueueSnackbar(message, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }
        );
      });
    }
  };
  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("destoyed");
    };
  }, [enqueueSnackbar]);
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon />*/}</Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form onSubmit={onHandleLogin} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Имя пользователя"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
          {/* 
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            />
            */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!validateForm()}
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          {/* 
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
             */}
        </form>
      </div>
    </Container>
  );
};
export default Login;
