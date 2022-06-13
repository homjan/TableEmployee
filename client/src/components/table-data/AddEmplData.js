import React,{useState} from 'react';
import {useNavigate, Link } from "react-router-dom"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEmplModal = ({onAdd}) =>  {
  
  const [fields, refreshfields] = useState({});
  const [errors, refresherrors] = useState({});
       
  const [birthday_field, refreshbirthday_field] = useState(new Date());
    
  let navigate = useNavigate();
       
    function onValueChange(field, e) {
      let fieldst = fields;
      fieldst[field] = e.target.value;
      refreshfields(fieldst); 
    }

    function onDate( ) {  
      let fieldsn = fields;
      fieldsn["birthday"] = birthday_field; 
      refreshfields(fieldsn); 
    }
    
    function handleSubmit(event){
      onDate();
      event.preventDefault();
      if (handleValidation()) {
        onAdd(fields); 
        navigate('/');
        } else {           
        }               
    }

    function handleValidation() {
        let fields2 = fields;        
        let errors = {};
        let formIsValid = true;
    
        //Name
        if (!fields2["name"]) {
          formIsValid = false;
          errors["name"] = "Cannot be empty";
        }
    
        if (typeof fields2["name"] !== "undefined") {
          if (!fields2["name"].match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["name"] = "Only letters";
          }
        }
         //Email
         if (!fields2["email"]) {
          formIsValid = false;
          errors["email"] = "Cannot be empty";
        }
    
        if (typeof fields2["email"] !== "undefined") {
          let lastAtPos = fields2["email"].lastIndexOf("@");
          let lastDotPos = fields2["email"].lastIndexOf(".");
    
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              fields2["email"].indexOf("@@") === -1 &&
              lastDotPos > 2 &&
              fields2["email"].length - lastDotPos > 2
            )
          ) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
          }
        }

          //Salary
        if (!fields2["salary"]) {
            formIsValid = false;
            errors["salary"] = "Cannot be empty";
        }

        if (typeof fields2["salary"] !== "undefined") {
            if (!fields2["salary"].match(/^[0-9.,]+$/)) {
              formIsValid = false;
              errors["salary"] = "Only numbers";
            }
        }

        if(fields2["salary"]<0){            
              formIsValid = false;
              errors["salary"] = "Salary is not valid";            
        }

           //Birthday
        if (!fields2["birthday"]) {
          formIsValid = false;
          errors["birthday"] = "Cannot be empty";
        }
        if (!(fields2["birthday"] instanceof Date)) {
          formIsValid = false;
          errors["birthday"] = "Birthday is not valid";
        }
                
      refresherrors(errors);
        return formIsValid;
      }


      //Нарисовать фрагмент с label и input
    function  form_single_input(tag_field){
      return (
        <form 
        className="bottom-panel d-flex justify-content-center">    
            <h4 htmlFor='Employee'>{tag_field} employee 
            
              <input
              type="text"
              placeholder="Заполните"
              name='Employee'
              className="form-control new-post-label justify-content-center"
              style={{width: '500px'}}
              onChange={onValueChange.bind(this, tag_field)}
              value = {fields[tag_field]}
              />
              <label style={{ color: "red" }}>{errors[tag_field]}</label>
            </h4>
        </form>
        )
      }

      //Нарисовать фрагмент с label и DatePicker
      function form_date_input(tag_field){
       return (
          <form 
          className="bottom-panel d-flex justify-content-center">    
              <h4 htmlFor='Employee'>{tag_field} employee 
              <DatePicker 
                todayButton={"Today"}
                dateFormat="d MMM yyyy"              
                onChange={(date) =>refreshbirthday_field(date)}
                selected = {birthday_field}
                className="form-control new-post-label justify-content-center"
            
              />
              <label style={{ color: "red" }}>{errors[tag_field]}</label>             
          </h4>
      </form>
        )
      }        

    return (
      <div className="container">
        <h2 className="d-flex justify-content-center m-3"> Добавить сотрудника</h2> 
        <br></br> 
        
        {form_single_input("name")}
        {form_single_input("email")}
        {form_single_input("salary")}
        {form_date_input("birthday")}

      <div>
      <br></br>         

      <form 
        className="bottom-panel d-flex justify-content-center"
      >
     <Link to="/" type="submit"
        className="btn btn-primary m-2 "
        onClick={handleSubmit}>            
               Add Employee                
      </Link>

      <Link
          type="danger"
          className="btn btn-danger m-2 float-end"
          to="/"> 
             Close
      </Link>
      </form>
      </div>
    </div>
  )
}

export default AddEmplModal;