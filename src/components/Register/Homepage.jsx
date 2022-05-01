import React  from "react";
import "./Homepage.css";
// import {  useNavigate } from "react-router-dom";
const Homepage = () => {
  

  // if (window.performance) {
  //   console.info("window.performance works fine on this browser");
  // }
  // console.info(performance.performance.getEntriesByType("navigation"));
  // if (performance.getEntriesByType("navigation") == performance.getEntriesByType("navigation").TYPE_RELOAD) {
  //   console.info( "This page is reloaded" );
  // } else {
  //   console.info( "This page is not reloaded");
  // }


  let data=window.performance.getEntriesByType("navigation")[0].type;
  if(data === "reload"){
    window.location = "/";
  }


  return (
    <>
      <div className="container_successfull">
        <div className="image_home_left"></div>
        <div className="image_home_right">
          <div className="registration">
            <span className="text">Registration successful!!</span>
            <span className="paragraph">
              <br></br>

              <div>
                For seat confirmation, please deposit Registration fee ₹200 on
                registration desks at Back Block/CSIT Block or Basic IT Lab, 3rd
                floor, CSIT<br></br> <b>OR</b><br></br> Pay online at UPI ID-<br></br> 9696469589@paytm(Yash
                Jaiswal) <br></br><b>Also mention your Name and Student Number in optional
                message/add a note to verify payment.</b><br></br> Confirmation mail will be
                sent within 24 hours of your payment.
              </div>
              {/* <br></br> */}
              <br></br>
              {/* <br></br> */}
              {/* <br></br> */}

              <b>Greetings Team CSI</b>
            </span>
            <span className="success_image"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
