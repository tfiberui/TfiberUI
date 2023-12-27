import Header from "../components/Header/Header";
import Carousel from "../components/HomeCarousel/Carousel";
import CardSlider from "../components/HomeCard/CardSlider";
import Footer from "../components/Footer/Footer";
import NewForm from "../components/HomeForm/NewForm";
import "../scss/_common.scss";
//import Form_homepage from "../components/Form/Form_homepage";
import Form_Home from "../components/Form/Form_Home";


const Home = ({ telangana, department }) => {

  return (
    <div>
      <Header />
      <Carousel />
      <CardSlider />
      <Form_Home telangana={telangana} department={department} />
      <Footer />
    </div>
  );
};

export default Home;
