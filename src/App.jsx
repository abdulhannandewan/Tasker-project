import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/TaskBoard";


const App = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <TaskBoard />
      </div>

      <Footer />
    </>
  );
};

export default App;
