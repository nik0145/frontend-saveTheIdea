import './App.css';
import Layout from "./layouts/default";
import Button from "@material-ui/core/Button";
function App() {
  return (
    <div className="App">
      <Layout>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </Layout>
    </div>
  );
}

export default App;
