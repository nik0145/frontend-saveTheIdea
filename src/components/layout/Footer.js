import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
const Footer = (props) => {
  const { link, title } = props;
  return (
    <>
      <Container maxWidth="lg">
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
      </Container>
    </>
  );
};

export default Footer;

Footer.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};