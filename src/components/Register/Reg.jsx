import React, { useEffect, useState } from "react";
import "./Reg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Reg() {
  const [Name, setName] = useState("");
  const [Rollno, setRollno] = useState("");
  const [Contactno, setContactno] = useState("");
  const [Email, setEmail] = useState("");
  const [Branch, setBranch] = useState("");
  const [Year, setYear] = useState("");
  const [Gender, setGender] = useState("");
  const [Residence, setResidence] = useState("");
  const Navigate = useNavigate();
  const [flag, setFlag] = useState(0);

  var checkStatus = false;
  var checkStatusAll = false;
  const [formErrors, setFormErrors] = useState({});
  const [formErrorsEmail, setFormErrorsEmail] = useState({});
  const [formErrorsName, setformErrorsName] = useState({});
  const [formErrorsRoll, setformErrorsRoll] = useState({});
  const [formErrorsContactno, setformErrorsContactno] = useState({});
  const [formErrorsBranch, setformErrorsBranch] = useState({});
  const [formErrorsYear, setformErrorsYear] = useState({});
  const [formErrorsGender, setformErrorsGender] = useState({});
  const [formErrorsResidence, setformErrorsResidence] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formdata);
    }
  }, [
    formErrors,
    formErrorsGender,
    formErrorsResidence,
    formErrorsYear,
    formErrorsBranch,
    formErrorsContactno,
    formErrorsRoll,
    formErrorsEmail,
    isSubmit,
  ]);

  const handleFocusEmail = (e) => {
    setFocused(true);
    setFormErrorsEmail(validateEmail(Email));
    setFormErrors(validateEmail(Email));
  };

  const handleFocusName = (e) => {
    setFocused(true);
    setformErrorsName(validateName(Name));
  };

  const handleFocusRoll = (e) => {
    setFocused(true);
    setformErrorsRoll(validateRoll(Rollno));
  };

  const handleFocusContactno = (e) => {
    setFocused(true);
    setformErrorsContactno(validateContactno(Contactno));
  };

  const handleFocusBranch = (e) => {
    setFocused(true);
    setformErrorsBranch(validateBranch(Branch));
  };

  const handleFocusYear = (e) => {
    setFocused(true);
    setformErrorsYear(validateYear(Year));
  };

  const handleFocusGender = (e) => {
    setFocused(true);
    setformErrorsGender(validateGender(Gender));
  };
  const handleFocusResidence = (e) => {
    setFocused(true);
    setformErrorsResidence(validateResidence(Residence));
  };

  function onChangeCaptcha(value) {
    // const captcha_value = value;
    // console.log(captcha_value);
    if (flag === 0 && value) {
      setFlag(1);
    } else if (flag === 0) {
      window.alert("Captcha Required!!!");
    }
    
  }
  const submit = async (e) => {
    e.preventDefault();
    setformErrorsName(validateName(Name));
    setFormErrorsEmail(validateEmail(Email));
    setformErrorsContactno(validateContactno(Contactno));
    setformErrorsRoll(validateRoll(Rollno));
    setformErrorsResidence(validateResidence(Residence));
    setformErrorsBranch(validateBranch(Branch));
    setformErrorsYear(validateYear(Year));
    setformErrorsGender(validateGender(Gender));
    setIsSubmit(true);
    
    
    

 
    if (
      Name &&
      Rollno &&
      Contactno &&
      Email &&
      Branch &&
      Year &&
      Gender &&
      Residence &&
      flag === 1
    ) {
      const newEntry = {
        Name: Name,
        Rollno: String(Rollno),
        Contactno: Number(Contactno),
        Email: Email,
        Branch: Branch,
        Year: Number(Year),
        Gender: Gender,
        Residence: Residence,
      };
      if (checkStatus === true && checkStatusAll === true) {
        // console.log(newEntry);
      }
      // const token = await reRef.current.executeAsync();

      axios
        .post(
          "https://nameless-citadel-14148.herokuapp.com/api/users/register",
          newEntry
        )
        .then((res) => {
          // console.log(res.data);
          if (res.status === 200) {
            if (flag === 1) {
              Navigate("/confirm");
            } else {
              window.alert("captcha Required!!!");
            }
          }
        })
        .catch((err) => {
          console.log(err);

          window.alert("Invalid Credentials or user already exists!!!");
        });

      // axios
      //   .post("https://nameless-citadel-14148.herokuapp.com/api/users/captcha",ReCAPTCHA)
      //   .then((resp) => {
      //     console.log(resp.data);
      //   })
    } else if ( !( Name &&
      Rollno &&
        Contactno &&
        Email &&
        Branch &&
        Year &&
        Gender &&
        Residence) &&
        flag === 0) {
        window.alert("Enter Data in all Fields!!!");
      } else if(flag===0) {
        window.alert("Captcha Required!!!");
      }
  };
  

  const validateEmail = (value) => {
    const errors = {};
    let regex = new RegExp("^[a-z]{2,}[0-9]{2,}@[akgec]{5}[.][ac]{2}[.][in]{2}$");

    if (!value) {
      errors.Email = "Email is required!";
    } else if (!regex.test(value)) {
      errors.Email = "Enter your college email!";
    } else {
      checkStatus = true;
    }
    return errors;
  };
  const validateName = (value) => {
    const errors = {};
    let regex = new RegExp("^[A-Za-z ]{3,29}$");
    // let regexi = new RegExp("^[A-Za-z]{3,29}$");
    if (!value) {
      errors.Name = "Name is required!";
    }
    else if (!regex.test(value)) {
      errors.Name = "Name should only include alphabets";
    }
   
    // else if (!regexi.test(value)) {
    //   errors.Name = "Name should be minimum of 3 charachters and maximum of 29";
    // }
    else {
      checkStatusAll = true;
    }
    return errors;
  };
  const validateRoll = (value) => {
    const errors = {};
    let regex = new RegExp("^[0-9D-d]+$");
    let regexi = new RegExp("^[0-9D-d]{7,7}$");
    if (!value) {
      errors.Rollno = "Student number is required!";
    } else if (!regex.test(value)) {
      errors.Rollno =
        "Student number should be numeric or can contain a letter D";
    } else if (!regexi.test(value)) {
      errors.Rollno = "Length of student should be of 7 digits";
    } else {
      checkStatusAll = true;
    }
    return errors;
  };

  // contact number validation

  const validateContactno = (value) => {
    const errors = {};
    // let regex = new RegExp("^[0-9]$");
    let regexi = new RegExp("^[0-9]{10}$");
    if (!value) {
      errors.Contactno = "Contact  number is required!";
    } else if (!regexi.test(value)) {
      errors.Contactno =
        "Contact  number should only be numeric and of 10 digits";
    }
    // else if (!regexi.test(value)) {
    //   errors.Contactno = "Contact  number should be of 10 digits";
    // }
    else {
      checkStatusAll = true;
    }
    return errors;
  };

  const validateBranch = (value) => {
    const errors = {};
    if (!value) {
      errors.Branch = "Branch is required!";
    }else if(value ===" "){
      errors.Branch = "select a branch";
    }
     else {
      checkStatusAll = true;
    }
    return errors;
  };

  const validateGender = (value) => {
    const errors = {};
    if (!value) {
      errors.Gender = "Gender is required!";
    } else if(value ===" "){
      errors.Gender = "must be male,female or other";
    }
    else {
      checkStatusAll = true;
    }
    return errors;
  };
  const validateResidence = (value) => {
    const errors = {};
    if (!value) {
      errors.Residence = "Residence is required!";
    }
    else if(value ===" "){
      errors.Residence = "must be hosteler or day-scholar";
    } else {
      checkStatusAll = true;
    }
    return errors;
  };


  const validateYear = (value) => {
    const errors = {};
    if (!value) {
      errors.Year = "Year is Required!";
    }
    else if(value ===" "){
      errors.Year = "select year";
    } else {
      checkStatusAll = true;
    }
    return errors;
  };

  return (
    <>
      <div className="form_container">
        <div className="image_left"></div>
        <div className="image_right">
          <div className="heading">
            <span className="left_heading hey">Hey!</span>
            <span className="left_heading "> Get Yourself Registered</span>
          </div>
          <form className="input">
            <div className="input_container">
              <input
                required="required"
                type="text"
                className="input_field"
                placeholder="Name"
                name="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleFocusName}
                focused={focused.toString()}
              />
              <span className="error_msg">{formErrorsName.Name}</span>
            </div>
            <div className="input_container">
              <input
                type="text"
                className="input_field"
                placeholder="Student No."
                name="Rollno"
                value={Rollno}
                onChange={(e) => setRollno(e.target.value)}
                onBlur={handleFocusRoll}
                focused={focused.toString()}
              />

              <span className="error_msg">{formErrorsRoll.Rollno}</span>
            </div>
            <div className="input_container">
              <input
                type="text"
                className="input_field"
                placeholder="Contact No."
                name="Contactno"
                value={Contactno}
                onChange={(e) => setContactno(e.target.value)}
                onBlur={handleFocusContactno}
                focused={focused.toString()}
              />

              <span className="error_msg">{formErrorsContactno.Contactno}</span>
            </div>
            <div className="input_container">
              <input
                type="email"
                className="input_field emailinp"
                placeholder="Email: xyz@akgec.ac.in"
                name="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleFocusEmail}
                focused={focused.toString()}
              />

              <span className="error_msg">{formErrorsEmail.Email}</span>
            </div>
            <div className="input_container">
              <select
                className=" input_field"
                id="Branch"
                name="Branch"
                value={Branch}
                onChange={(e) => setBranch(e.target.value)}
                onBlur={handleFocusBranch}
                focused={focused.toString()}
              >
                <option value=" ">Branch</option>
                <option>CSE</option>
                <option>CSE(DS)</option>
                <option>CSE(AI&ML)</option>
                <option>CS</option>
                <option>CS&IT</option>
                <option>IT</option>
                <option>ECE</option>
                <option>EN</option>
                <option>ME</option>
                <option>CIVIL</option>
              </select>

              <span className="error_msg">{formErrorsBranch.Branch}</span>
            </div>
            <div className="input_container">
              <select
                className="input_field"
                name="Gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                onBlur={handleFocusGender}
                focused={focused.toString()}
              >
                <option value=" ">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>
              </select>

              <span className="error_msg">{formErrorsGender.Gender}</span>
            </div>
            <div className="input_container">
              <select
                className="input_field "
                name="Year"
                value={Year}
                onChange={(e) => setYear(e.target.value)}
                onBlur={handleFocusYear}
                focused={focused.toString()}
              >
                <option value=" ">Year</option>
                {/* <option value="1">1</option> */}
                <option value="2">2</option>
              </select>

              <span className="error_msg">{formErrorsYear.Year}</span>
            </div>
            <div className="input_container">
              <select
                className="input_field"
                name="Residence"
                value={Residence}
                onChange={(e) => setResidence(e.target.value)}
                onBlur={handleFocusResidence}
                focused={focused.toString()}
              >
                <option value=" ">Residence</option>
                <option value="Hosteler">Hosteler</option>
                <option value="Day-Scholar">Day-Scholar</option>
                {/* <option value="other">Other</option> */}
              </select>

              <span className="error_msg">{formErrorsResidence.Residence}</span>
            </div>
            {/* <div className=" input_container">
              <div className="justify">
                <div className="radio">
                  <span className="radio_text">Hosteler</span>
                  <input
                    type="radio"
                    className="form-check-input bg-blue"
                    
                    name="Residence"
                    required
                    value="Hosteler"
                    onChange={(e) => setResidence(e.target.value)}
                  />
                </div>
                <div className="radio">
                  <span className="radio_text">Day-Scholar</span>
                  <input
                    type="radio"
                    className="form-check-input bg-blue "
                    
                    name="Residence"
                    required
                    value="Day-Scholar"
                    onChange={(e) => setResidence(e.target.value)}
                  />
                </div>
              </div>
            </div> */}
            <div className="input_container">
              <ReCAPTCHA
                className="captcha"
                sitekey="6LfUUagfAAAAAI4U5j4Vf7hWcuRflo8B5gXhTzuR"
                onChange={onChangeCaptcha}
              />
            </div>

            <div className="input_container">
              <button
                type="button"
                className="btn input_field"
                onClick={submit}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Reg;