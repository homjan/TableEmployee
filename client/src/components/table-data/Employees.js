import React, {useState, useEffect}  from "react";
import {useNavigate, Link } from "react-router-dom"; 
import "react-datepicker/dist/react-datepicker.css";

import AuthService from "../contexts/AuthService";

const Employees = ({Delete, SortData,RefreshData, Employees_two})=> {
    
    const [currentPage, refreshcurrentPage] = useState(1);
    const EmployeesPerPage = 10;
    const currentUser = AuthService.getCurrentUser();
 
    let navigate = useNavigate();
        //Logic page
        const indexOfLastEmployee2 = 1 * EmployeesPerPage;
        const indexOfFirstEmployee2 = indexOfLastEmployee2 - EmployeesPerPage;     
        const currentEmployees_first = Employees_two.slice(indexOfFirstEmployee2, indexOfLastEmployee2);

        //Рассчитать текущие значения таблицы на странице
        function calculateCurrentEmployees(){          
            const indexOfLastEmployee = currentPage * EmployeesPerPage;
            const indexOfFirstEmployee = indexOfLastEmployee - EmployeesPerPage;          
          return Employees_two.slice(indexOfFirstEmployee, indexOfLastEmployee);   
        }
     
     let [currentEmployees, refreshcurrentEmployees] = useState(currentEmployees_first);


    useEffect(() => {    
       refreshcurrentEmployees(calculateCurrentEmployees);   
    }, [Employees_two]);
   
    useEffect(() => {    
        refreshcurrentEmployees(calculateCurrentEmployees);    
    }, [currentPage]);
 
    function handleClick(event) {
        refreshcurrentPage(Number(event.target.id));      
    }    

    function refreshList(){
       RefreshData();
      
      }

      //Нарисовать номера страниц внизу
   function renderNumbers(){
        const pageNumbers = [];
        const max = Math.ceil(Employees_two.length / EmployeesPerPage);
        let flagg= true;
        for (let i = 1; i <= max; i++) {
            if(i===1 || i===max || i===currentPage || i===(currentPage+1) 
            || i===(currentPage-1)|| i===(currentPage+2) || i===(currentPage-2))
            {
                pageNumbers.push(i);
                flagg=true;
            }
            else{
                if(flagg){
                pageNumbers.push("...");
                flagg=false;
            }
            }           
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if(Number.isInteger( number)){
        return (         
          <a
            key={number}
            id={number}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
            
          >           
             [{number}]     
          </a>
        );
      }
      else{
        return (         
            <span
              key={number}
              id={number}
              onClick={handleClick}
            >           
               {number}    
            </span>
          )
      }});     
      return renderPageNumbers

    }

   function OnDelete(id){   
        Delete(id);
        refreshcurrentEmployees(calculateCurrentEmployees());    
    }

   function sortResult(prop,asc){
       SortData(prop,asc);          
       refreshcurrentEmployees( calculateCurrentEmployees());  
    }
    

   function onLogOut(){
    //   auth.setAuthData(null);
       AuthService.logout();
       navigate('/login');
    }

    //Нарисовать надпись со стрелочками и сортировкой
   function filterChosenData(name_field){  
        return(
            <div className="d-flex flex-row">   
            <label className="mt-2">  {name_field}</label>
            <button type="button" className="btn btn-light"
            onClick={()=>sortResult(name_field, true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>sortResult(name_field, false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
        )
    }

    function redate(info){
        const result = new Date(info);
        return result;
     
      }

   function getRenderTime(today){

         let today1;
      let today2;
         if(typeof today === 'string'){
          today1 = redate(today);
       }else{
            today2 = today.toString();
            today1 = redate(today2);
       }    

        const date1 = today1.toLocaleDateString();
        return date1;
    }
           
        return (
            
        <div>                       
            <button
                variant="primary"
                type="button"    
                className='float-end'      
                onClick={onLogOut}
                >
            Log out
            </button>
 <h1 className="d-flex justify-content-center m-3"> Список сотрудников</h1>  

                <Link   
                    className='btn btn-primary m-2 float-end' 
                    variant='primary'
                    to="/addemployee">
                    Add Employee
                 </Link>   

            <table className="table table-striped">
           
            <thead>
            <tr>               
                <th>    
                    {filterChosenData("name")}                                  
                </th>
                <th>    
                    {filterChosenData("email")}                                  
                </th>
                 <th>    
                    {filterChosenData("birthday")}                                  
                </th>
                <th>    
                    {filterChosenData("salary")}                                  
                </th>
                <th>    
                    {filterChosenData("lastModifiedDate")}                                  
                </th>
                <th>
                    Options
                </th>
            </tr>
            </thead>
            <tbody>
                {currentEmployees.map(dep=>
                    <tr key={dep.userId}>                      
                        <td>{dep.name}</td>
                        <td>{dep.email}</td>
                        <td>{getRenderTime( dep.birthday)}</td>
                        <td>{dep.salary}</td>
                        <td>{getRenderTime( dep.lastModifiedDate)}</td>
                        

                        <td className="d-grid gap-2 d-md-block">
                        <Link type="button"  
                        style={{width: '110px'}}
                        className="btn btn-primary me-md-4"                       
                        to={`/${dep.userId}`}
                        key={dep.userId}>
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square rounded float-left" viewBox="0 0 16 16" >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                           
                            </svg>
                              Edit   
                        </Link>
        
                        <button type="button"
                        style={{width: '110px'}}
                        className="btn btn-danger "
                        onClick={()=>OnDelete(dep.userId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                            Delete
                        </button>
                            
                        </td>
                    </tr>
                    )}
            </tbody>
            </table>

        <tr id="page-numbers">
        <td> {renderNumbers()} </td>
        </tr>

        <button
                variant="primary"
                type="button"    
                className='float-end'      
                onClick={refreshList}
                >
            Refresh
            </button>
        </div>  
        );    
}

export default Employees;