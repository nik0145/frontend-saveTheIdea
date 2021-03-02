import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link as UILink } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));
const Footer = (props) => {
  const classes = useStyles();

  const { link, title } = props;
  return (
      <Container maxWidth="lg" className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {link}
        </Typography>
        <Box align="center">
          <UILink align="center" href="link">
            Github
          </UILink>
        </Box>
      </Container>
  );
};

export default Footer;

Footer.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};
