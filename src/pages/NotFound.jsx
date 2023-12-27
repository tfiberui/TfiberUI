import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/notFound.scss";
import 'collapsible-react-component/dist/index.css'

const NotFound = () => { 

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
        <h2>A <span>404</span> error occured, Page not found, check the URL and try again.</h2><br/><br/>
        <button className="button return" onClick={handleReturn}>Return to home</button>
        <button className="button back" onClick={handleBack}>Go Back</button>
        {/* <h3><a href="/home">Return to home</a>&nbsp;|&nbsp;<a href="javascript:history.back()">Go Back</a></h3> */}
        </div>


      <Footer />
    </div>
  );
};

export default NotFound;