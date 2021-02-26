import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
// https://stackoverflow.com/questions/42862028/react-router-v4-with-multiple-layouts
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer link="github" title="Footer" />
    </>
  );
};
export default Layout;