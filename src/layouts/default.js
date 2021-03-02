import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { makeStyles } from "@material-ui/core/styles";
// https://stackoverflow.com/questions/42862028/react-router-v4-with-multiple-layouts
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: "auto",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    },
  }));
const Layout = ({ children }) => {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <main>{children}</main>
      <Footer link="https://github.com/nik0145" title="Nikolay Tyurin" />
    </div>
  );
};
export default Layout;