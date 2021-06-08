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
import { useSnackbar } from 'notistack';
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
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  //https://stackoverflow.com/questions/63386996/unable-to-use-a-hook-in-a-component
  const onHandleLogin = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;

    fetch(`${process.env.REACT_APP_API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.jwt) {
          const { jwt, user } = data;
          localStorage.setItem("token", jwt);
          localStorage.setItem("user", JSON.stringify(user));
          history.push("/dashboard");
        }
      })
      .catch((e) => {
        console.log("An error occurred:", e);
      });
  };
  useEffect(() => {
    console.log("mounted");
    setInterval(() => {
      enqueueSnackbar("ekekek", { variant: "error" });
    }, 1000);

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
