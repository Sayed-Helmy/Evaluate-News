import React from "react";
import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import MainLanding from "./components/MainLanding";

const App = () => {
  return (
    <main className="main-app">
      <MainHeader />
      <MainLanding />
      <Footer />
    </main>
  );
};

export default App;
