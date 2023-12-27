import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../scss/terms.scss";

const Terms = () => {

  return (
    <div>
      <Header />
       
        <div className="terms_container">
            <div className="heading_title">
                <h3>Terms of Use</h3>
            </div>

            <div className="terms_holder">
                <h4>Terms and Conditions</h4><br/>
                <p>
                    This website is designed, developed and maintained by T-Fiber, IT, Electronics & Communication Department, Government of Telangana.
                </p>
                <p>
                    Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department(s) and/or other source(s), and to obtain appropriate professional advice.
                </p>
                <p>
                    Under no circumstances will this Department be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this website.
                </p>
                <p>
                    These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the jurisdiction of the courts of India.
                </p>
                <p>
                    The information posted on this website could include hypertext links or pointers to information created and maintained by non-Government/private organizations. IT, Electronics & Communication Department is providing these links and pointers solely for your information and convenience. When you select a link to an external website, you are leaving the IT, Electronics & Communication Department website and are subject to the privacy and security policies of the owners/sponsors of the external website.
                </p>
                <p>
                    IT, Electronics & Communication Department, does not guarantee the availability of such linked pages at all times.
                    IT, Electronics & Communication Department, cannot authorize use of copyrighted materials contained in linked websites. Users are advised to request such authorization from the owner of the linked website.

                    IT, Electronics & Communication Department, does not guarantee that linked websites comply with Indian Government Web Guidelines.
                </p>
            </div>


            <div className="terms_holder">
                <h4>Privacy Policy</h4><br/>
                <p>
                    This website does not automatically capture any specific personal information from the user, such as name, phone number or e-mail address, that allows us to identify a user individually when they visit this website.
                </p>
                <p>
                    If this website requests the user to provide personal information, it shall be used only for the stated purpose and it shall NOT be shared with any other department organisation (public/private). Adequate security measures will be taken to protect user’s personal information.
                </p>
                <p>
                    We do not sell or share any personally identifiable information to any third party (public/private). Any information provided to this website will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction.
                </p>
                <p>
                    We gather certain information about the User, such as Internet protocol (IP) addresses, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected.
                </p>
                <p>
                    If at any time you believe the principles referred to in this privacy statement have not been followed, or have any other comments on these principles, please notify the webmaster through the contact us page.
                </p>
                <p>
                    This site may contain links to non-Government sites whose data protection and privacy practices may differ from ours. We are not responsible for the content and privacy practices of these other websites and encourage user to consult the privacy notices of those sites.
                </p>
                    <br/>
                    <h5>Use of Cookies:</h5><br/>

                <p>
                    A cookie is a piece of software code that an internet website sends to your browser when you access information at that site. A cookie is stored as a simple text file on your computer or mobile device by a website’s server and only that server will be able to retrieve or read the contents of that cookie. Cookies let you navigate between pages efficiently as they store your preferences, and generally improve your experience of a website.
                </p>
                <p>
                    We may use the following types of cookies on this website:
                </p>
                <p>
                    Analytics cookies for anonymously remembering your computer or mobile device when you visit our website to keep track of browsing patterns.
                    Service cookies for helping us to make our website work efficiently, remembering registration and login details if any, settings preferences, and keeping track of the pages you view.
                    Non-persistent cookies a.k.a per-session cookies. Per-session cookies serve technical purposes, like providing seamless navigation through this website. These cookies do not collect personal information on users and they are deleted as soon as you leave our website. The cookies do not permanently record data and they are not stored on your computer’s hard drive. The cookies are stored in memory and are only available during an active browser session. Again, once you close your browser, the cookie disappears.    
                </p>
            </div>


            <div className="terms_holder">
                <h4>Hyperlinking Policy</h4><br/>
                <p>
                    You may find links to other websites and portals on this website. These links have been placed for your convenience. We are not responsible for the contents and reliability of the linked websites and do not necessarily endorse the views expressed in them. The mere presence of the link or its listing on this website should not be assumed as endorsement of any kind. We cannot guarantee that these links will work all the time and we have no control over the availability of the linked pages.
                </p>

                    <br/>
                    <h5>Linking to this website</h5>                
                <p>
                    We do not object to you linking directly to the information that is hosted on this website and no prior permission is required for the same. However, we would like you to inform us about any links provided to this website so that you can be informed of any changes or updations therein. Also, we do not permit our pages to be loaded into frames on your site.
                </p>
            </div>


            <div className="terms_holder">
                <h4>Copyright Policy</h4><br/>
                <p>
                    Material featured on this may be reproduced free of charge. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a misleading context. Wherever the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material shall not extend to any material which is identified as being copyright of a third party. Authorization to reproduce such material must be obtained from the departments / copyright holders concerned.
                </p>
            </div>

            
        </div> 

      <Footer />
    </div>
  );
};

export default Terms;