import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/notFound.scss";

const ComingSoon = () => { 

    let navigate = useNavigate(); 
    const handleReturn = () =>{ 
      let path = `/home`; 
      navigate(path);
    }
    const handleBack = () =>{ 
        let path = `/home`; 
        navigate(path);
      }

  return (
    <div>
      <Header />

        <div className="main">
          <h2>Coming soon..</h2><br/><br/>
          <button className="button return" onClick={handleReturn}>Return to home</button>
        </div>


      <Footer />
    </div>
  );
};

export default ComingSoon;