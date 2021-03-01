import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as UILink } from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            SaveTheIdea
          </Typography>
          <nav>
            <UILink
              component={Link}
              variant="button"
              color="textPrimary"
              to="/"
              className={classes.link}
            >
              Страница
            </UILink>
            <UILink
              variant="button"
              component={Link}
              color="textPrimary"
              to="/"
              className={classes.link}
            >
              Страница
            </UILink>
            <UILink
              variant="button"
              component={Link}
              color="textPrimary"
              to="/"
              className={classes.link}
            >
              Страница
            </UILink>
          </nav>

          <Button
            to="/login"
            component={Link}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Вход
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
