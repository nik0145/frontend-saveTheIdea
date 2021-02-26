import './App.css';
import Layout from "./layouts/default";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
function App() {
  return (
    <div className="App">
      <Layout>
        <Container maxWidth="sm" component="main">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Сохрани идею
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At alias
            delectus dolore blanditiis voluptate consequuntur quo fugit
            asperiores suscipit assumenda exercitationem, magnam itaque omnis
            hic magni. Mollitia similique error tenetur?
          </Typography>
        </Container>
        <Box textAlign="center">
          <Button
            style={{ margin: "0 auto" }}
            variant="contained"
            color="primary"
            disableElevation
          >
            Hello World
          </Button>
        </Box>
      </Layout>
    </div>
  );
}

export default App;
