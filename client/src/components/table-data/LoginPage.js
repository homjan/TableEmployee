import React, { useState} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import AuthService from '../contexts/AuthService';

const LoginPage = ({}) => {
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors_login, setErrorsLogin] = useState("");
  const [errors_password, setErrorsPassword] = useState("");

  let navigate = useNavigate();

  function handleValidation() {
            
    let formIsValid = true;

    //Name
    if (!username) {
      formIsValid = false;
      setErrorsLogin( "Cannot be empty");
    }
    if (!password) {
      formIsValid = false;
      setErrorsPassword("Cannot be empty");
    }

    if (username.length>20 ) {
      formIsValid = false;
      setErrorsLogin("Login is not valid");
    }
    if (password.length>20) {
      formIsValid = false;
      setErrorsPassword("Password is not valid");
    }
    
    return formIsValid;
  }



  const onFormSubmit = e => {
   
    e.preventDefault();   
   
    AuthService.login(username, password).then(
      () => {
        setLoading(true);
        navigate("/");
        window.location.reload();
      },
      (error) => {
        setLoading(false);
        alert("wrong password or login");       
      }
    );
     
  };


  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 300 }}>
        <h2 className="text-center">Sign in</h2>
        <br></br> 

        <form 
      className="bottom-panel d-flex justify-content-center">    
          <h4 htmlFor='Employee'>Login
          
            <input
            type="text"
            placeholder="Заполните"
            name='Employee'
            className="form-control new-post-label justify-content-center"
            style={{width: '300px'}}
            onChange={e => {
              setLogin(e.target.value);
            }}
            value = {username}
            />
            <label style={{ color: "red" }}>{errors_login}</label>
          </h4>
      </form>

      <form 
      className="bottom-panel d-flex justify-content-center">    
          <h4 htmlFor='Employee'>Password
          
            <input
            type="text"
            placeholder="Заполните"
            name='Employee'
            className="form-control new-post-label justify-content-center"
            style={{width: '300px'}}
            onChange={e => {
              setPassword(e.target.value);
            }}
            value = {password}
            />
            <label style={{ color: "red" }}>{errors_password}</label>
          </h4>
      </form>

        <Link to="/" type="submit" style={{width: '100px'}}
        className="btn btn-primary m-2 "
        onClick={onFormSubmit}>            
              Sign in               
      </Link>

      </div>
    </div>
  );
};

export default LoginPage;