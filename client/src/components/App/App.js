import React, {useState, useEffect} from "react";
import './App.css';

import {BrowserRouter, Routes ,Route} from 'react-router-dom'

import Employees from "../table-data/Employees";
import AddEmplModal  from "../table-data/AddEmplData";
import  EditEmplModal from "../table-data/EditEmplData";
import LoginPage from "../table-data/LoginPage.js";

import UserService from "../contexts/UserService";

const App = ()=>  {

  /*  let today1 = new Date(2011, 1, 11, 0, 0, 0, 0)
    let today2 = new Date(2006, 2, 21, 0, 0, 0, 0)
    let today3 = new Date(2018, 5, 31, 0, 0, 0, 0)
    let today4 = new Date(2017, 5, 16, 0, 0, 0, 0)
    let today5 = new Date(2013, 2, 1, 0, 0, 0, 0)
    let today6 = new Date(2019, 10, 8, 0, 0, 0, 0)
    let today7 = new Date(2009, 11, 1, 0, 0, 0, 0)
    let today8 = new Date(2001, 5, 6, 0, 0, 0, 0)
    let today9 = new Date(2006, 6, 1, 0, 0, 0, 0)
    let today10 = new Date(2005, 7, 7, 0, 0, 0, 0)
    let today11 = new Date(2011, 8, 3, 0, 0, 0, 0)
    let today12 = new Date(2020, 5, 3, 0, 0, 0, 0)

    let birt = "1986-12-17";
    let upd = "2022-02-18 22:34:29.000";
*/
    let [Employees_t, refreshEmployees] = useState([
   /*   {
        Id: 1, Name: "IT", Email: "momo1@mail.com", Salary: 500, Birthday: birt, Lastmodifieddate: upd
    },
    {
       Id: 2, Name: "Salary", Email: "momo2@mail.com", Salary: 300, Birthday: today2, Lastmodifieddate: today4
    },
    {
      Id: 3, Name: "Research", Email: "momo3@mail.com", Salary: 5200, Birthday: upd, Lastmodifieddate: birt
    },*/
   /*      {
            userId: 1, name: "IT", email: "momo1@mail.com", salary: 500, birthday: today1, lastModifiedDate: today3
        },
        {
          userId: 2, name: "Salary", email: "momo2@mail.com", salary: 300, birthday: today2, lastModifiedDate: today4
        },
        {
          uuserId: 3, name: "Research", email: "momo3@mail.com", salary: 5200, birthday: today3, lastModifiedDate: today5
        },
        {
          userId: 4, name: "Cleaning", email: "momo4@mail.com", salary: 900, birthday:  today4, lastModifiedDate: today6
        },
        {
          userId: 5, name: "Managment", email: "momo5@mail.com", salary: 10, birthday: today5, lastModifiedDate: today7
        },
        {
          userId: 6, name: "Trainer", email: "momo6@mail.com", salary: 50, birthday: today6, lastModifiedDate: today8
        },
        {
          userId: 7, name: "IT-2", email: "momo7@mail.com", salary: 900, birthday:  today7, lastModifiedDate: today9
        },
        {
          userId: 8, name: "Trade", email: "momo8@mail.com", salary: 900, birthday: today8, lastModifiedDate: today10
        },
        {
         userId: 9, name: "IT-3", email: "momo9@mail.com", salary: 100, birthday:  today9, lastModifiedDate: today11
        },
        {
          userId: 10, name: "Workers", email: "momo10@mail.com", salary: 5000, birthday:  today10, lastModifiedDate: today12
        },
        {
          userId: 11, name: "IT-4", email: "momo11@mail.com", salary: 1000, birthday:  today11, lastModifiedDate: today1
        },
        {
          userId: 12, name: "Mages", email: "momo12@mail.com", salary: 1500, Birthday:  today12, LastModifiedDate: today2
        },*/
    ]); 

   let [maxId, refreshmaxId] = useState(Employees_t.length);

  function addItem(body){
    let {name, email, salary, birthday} = body
    const newItem = {
      name: name,
      email:email,
      salary: salary,  
      birthday: birthday,  
      lastModifiedDate: new Date()
  }

UserService.postEmployees(newItem)
.then(function (response) {
  console.log(response.data);
});

      refreshmaxId(maxId => maxId + 1);
     const newArr = [...Employees_t, newItem];
      refreshEmployees(newArr);  
  }

function findMaxID(){
  let max = 1;
  Employees_t.map(dep=>
  {if(dep.userId> max){
    max = dep.userId;
  }});

  return max;
 }
 
  function refreshDataList(){

   UserService.getEmployees()
    .then((response)=>{
    console.log(response.data);
    refreshEmployees(response.data);
    });
    console.log("success");  
    
    console.log(findMaxID());

  }

  useEffect(() => {    
    refreshDataList();  
    refreshmaxId(findMaxID());
 }, []);
 
 function EditData(id, body){
    let {index, name, email, salary, birthday} = body;
    let Id_new = Employees_t[0];
    const newItem = {
      userId: Employees_t[index].userId,
      name: name,
      email:email,
      salary: salary, 
      birthday: birthday,  
      lastModifiedDate: new Date()         
  }

   UserService.putEmployees(id, newItem);
  
  let newArr = [...Employees_t];
      newArr[index] = newItem;
  refreshEmployees(newArr);   

 //refreshDataList();
  }

 
  function DeleteData(id){

  UserService.deleteEmployees(id)
    .then(res=>res.json())
    .then((result)=>{  
      console.log(result);
    },(error)=>{    
    });
      let old_data = Employees_t;
      const index = old_data.findIndex(elem => elem.userId === id);
      const newArr = [...old_data.slice(0, index), ...old_data.slice(index+1)];

      refreshEmployees(newArr);  

 // refreshDataList();
  }


  function SortData(prop,asc){
   
     let sortedData=Employees_t.sort(function(a,b){
        if(asc){
            return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
        }
        else{
            return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
        }
    });
    console.log(sortedData);
    refreshEmployees(sortedData); 
  }


  return (   
 
      <BrowserRouter>
        <div className="App container">
          <Routes>
       
           <Route exact path="/" element={             

              <Employees
                Delete = {DeleteData}
                SortData = {SortData} 
                RefreshData = {refreshDataList}
                Employees_two={Employees_t}>
              </Employees>            
            }>           
            </Route>
     
            <Route path="/login" element={
              <LoginPage>
              </LoginPage>
              }>           
            </Route>
    
            <Route path="/addemployee" 
              element={
           
              <AddEmplModal
               onAdd = {addItem}></AddEmplModal>       
            
              }>
            </Route>
           
            <Route
              path=":Id" 
              element={
               
                  <EditEmplModal
              OnEdit = {EditData}
              Employees_two={Employees_t}>          
                  </EditEmplModal>
                }>
            </Route>
     
          </Routes>

        </div>
    
      </BrowserRouter>
 
  );
} 


export default App;
