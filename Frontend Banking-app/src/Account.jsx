import { useState,useEffect } from "react";
import axios from 'axios'
import './Style.css'


function Account(){

    const[accounts,setAccounts]=useState([]);
    const[newAccount,setnewAccount]=useState({accountHolderName:"",balance:""});

    const FetchAccounts=async ()=>{
        try{
        const response = await axios.get("http://localhost:8080/api/accounts")
        setAccounts(response.data)
        }
        catch(error){
            console.error("Error Catching Error",error);
        }

        }
    
    useEffect(()=>{
        FetchAccounts();
    },[]);
    const nameRegex = /^[A-Za-z]+$/;

    const HandleSubmit= async(e)=>{
        e.preventDefault();
        if (!newAccount.accountHolderName.trim() || newAccount.balance === "") {
           alert("Please fill in both fields before submitting.");
           return;
          }
        if(!nameRegex.test(newAccount.accountHolderName)){
            alert("Names should be alphabet");
            return;
        }
        try{
           await axios.post("http://localhost:8080/api/accounts",newAccount)
            setnewAccount({accountHolderName:"",balance:""})
            FetchAccounts();
        }
        catch(error){
            console.error("Failed to add new Account",error);
        }
        }
    const HandleDelete=async (id)=>{
        const ConfirmDelete=window.confirm("Are you sure want to delete your account?");
        if(!ConfirmDelete) return;
        try{
        await axios.delete(`http://localhost:8080/api/accounts/${id}/delete`);
        FetchAccounts();
        }
        catch(error){
                console.error("Failed to delete Accounts",error);
            }
        }
    
     return(
        <>
        <p>Create a new Account</p>
        <section  className="form">
        <form onSubmit={HandleSubmit}>
            <input
             type="text" 
             placeholder="Enter Your Name" 
             value={newAccount.accountHolderName} 
             onChange={(e)=>
             setnewAccount({...newAccount,accountHolderName:e.target.value})}
            />
            <input type="number"
             placeholder="Enter Your Balance" 
             value={newAccount.balance} 
             onChange={(e)=>
             setnewAccount({...newAccount,balance:e.target.value})}
            />
        <button type="submit">Add Account</button>
        </form>
        </section>
        <h1>Account List</h1>
        <div className="Container">
        {accounts.length==0 ? (<p>no accounts yet</p>):(
        <ul>
            {accounts.map((p)=>(
                
            <li key={p.id} className="block">
               <p><strong>Name:{p.accountHolderName}</strong></p>
               <p>Balance:{p.balance}</p>
                &nbsp;
                <p><button onClick={()=>HandleDelete(p.id)}>Delete</button></p>
            </li>
        ))}

        </ul>
        )}
        </div>
        </>
    )
}

export default Account;