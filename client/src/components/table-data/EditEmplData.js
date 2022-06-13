import React, {useState} from 'react';
import {Link} from "react-router-dom"; 
import {useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

   
const EditEmplModal = ({OnEdit, Employees_two})=>{   
    const { Id } = useParams();
    const [fields, refreshfields] = useState({});
    const [errors, refresherrors] = useState({});

    const index = Employees_two.findIndex(checkIdElement);
   
    function checkIdElement(num){
      return num.userId===parseInt(Id, 10);
    }
    console.log(Id);
    let redactBirthday;
    if(typeof Employees_two[index].birthday==='string'){
     
      redactBirthday = new Date(Employees_two[index].birthday);
     }else{
      redactBirthday =  Employees_two[index].birthday;
     }  
    

    const [birthday_field, refreshbirthday] = useState(redactBirthday);

    let counter=0;
        
    function reset_old(){
      let fieldsr = fields;      
     
      fieldsr["name"] = Employees_two[index].name;
      fieldsr["email"] = Employees_two[index].email;
      fieldsr["salary"] = Employees_two[index].salary;

      refreshfields(fieldsr);
   
    }
      
    function handleChange (field, e) {
      if(counter<1){
        reset_old();       
      }

      let fieldsn = fields;
      fieldsn[field] = e.target.value;   

      refreshfields(fieldsn);
      counter++;     
    }

    function handleDateChange(dat){
      if(counter<1){
        reset_old();
       
      }
      refreshbirthday( dat);
      counter++;
    }

    function onDate( ) {  
      let fieldsn = fields;
      fieldsn["birthday"] = birthday_field;
      refreshfields(fieldsn);
    }

    function onIndex(){
      let fieldsn = fields;
      fieldsn["index"] = index;
      refreshfields(fieldsn);
    }

    let handleSubmit = (e)=>{
     
      if(counter<1){
        reset_old();     
      }
        onDate();
        onIndex();
        e.preventDefault();   
    
        if (handleValidation()) {      
        OnEdit(Employees_two[index].userId, fields);
        alert("Записано");

        }else{
        }  
    }

    function handleValidation() {
        let fields_new = fields;
        let errors_new = {};
        let formIsValid = true;
    
        //Имя
        if (!fields_new["name"]) {
          formIsValid = false;
          errors_new["name"] = "Cannot be empty";
        }
    
        if (typeof fields_new["name"] !== "undefined") {
          if (!fields_new["name"].match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors_new["name"] = "Only letters";
          }
        }
        //Email
        if (!fields_new["email"]) {
          formIsValid = false;
          errors_new["email"] = "Cannot be empty";
        }
    
        if (typeof fields_new["email"] !== "undefined") {
          let lastAtPos = fields_new["email"].lastIndexOf("@");
          let lastDotPos = fields_new["email"].lastIndexOf(".");    
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              fields_new["email"].indexOf("@@") === -1 &&
              lastDotPos > 2 &&
              fields_new["email"].length - lastDotPos > 2
            )
          ) {
            formIsValid = false;
            errors_new["email"] = "Email is not valid";
          }
        }
           //Продажи
           if (!fields_new["salary"]) {
            formIsValid = false;
            errors_new["salary"] = "Cannot be empty";
          }

          if (typeof fields_new["salary"] !== "undefined") {
            if (isNaN( fields_new["salary"])) {
              formIsValid = false;
              errors_new["salary"] = "Only numbers";
            }
          }

          if(fields_new["salary"]<0){            
              formIsValid = false;
              errors_new["salary"] = "Salary is not valid";
            
          }
               //День рожденья
        if (!fields_new["birthday"]) {
          formIsValid = false;
          errors_new["birthday"] = "Cannot be empty";
        }
        if (!(fields_new["birthday"] instanceof Date)) {
          formIsValid = false;
          errors_new["birthday"] = "Birthday is not valid";
        }
        refresherrors(errors_new);
            
        return formIsValid;
      }

//Нарисовать фрагмент с label и input
    function form_single_input(tag_field, old_data){     
    return (
      <form 
        className="bottom-panel d-flex justify-content-center">              
          <h4 htmlFor='Employee'>{tag_field} employee 
             
          <input
              type="text"
              style={{width: '500px'}}
              placeholder="Заполните" required
              className="form-control new-post-label"    
              onChange={
                handleChange.bind(this, tag_field)  }
              defaultValue={old_data}
             
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
                onChange={(date) => handleDateChange( date)}
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
      <h2 className="d-flex justify-content-center m-3"> Редактировать сотрудника</h2> 
      <br></br> 

      {form_single_input("name", Employees_two[index].name)}
      {form_single_input("email", Employees_two[index].email)}
      {form_single_input("salary", Employees_two[index].salary)}
      {form_date_input("birthday")}

      <br></br> 

      <div>
        <form 
          className="bottom-panel d-flex justify-content-center"
        >
        <button
          type="submit"
          className="btn btn-primary m-2 "                
          onClick={handleSubmit}>
            Edit Employee
        </button>

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

export default EditEmplModal;