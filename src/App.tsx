import Header from "components/header/Header";
import Body from "components/body/Body";
import { Footer } from "components/footer/Footer";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Header title={"Binary Tree Parser"} />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
