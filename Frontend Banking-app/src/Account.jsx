import { useState,useEffect } from "react";
import axios from 'axios'


function Account(){

    const[accounts,setAccounts]=useState([]);
    const[newAccount,setnewAccount]=useState({accountHolderName:"",balance:""});

    const FetchAccounts=async ()=>{
        try{
        const response = await axios.get("http://localhost:8080/api/accounts")
        console.log("response from backend",response.data);
        setAccounts(response.data)
        }
        catch(error){
            console.error("Error Catching Error",error);
        }

        }
    
    useEffect(()=>{
        FetchAccounts();
    },[]);

    const HandleSubmit= async(e)=>{
        e.preventDefault();
        
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
        <form onSubmit={HandleSubmit}>
            <input
             type="text" 
             placeholder="Enter Your Name" 
            value={newAccount.accountHolderName} 
            onChange={(e)=>
            setnewAccount({...newAccount,accountHolderName:e.target.value})}
            />
            <input type="number" placeholder="Enter Your Balance" 
            value={newAccount.balance} 
            onChange={(e)=>
            setnewAccount({...newAccount,balance:e.target.value})}
            />
        <button type="Submit">Add Account</button>
        </form>
        <h1>Account List</h1>
        <div className="Container">
        {accounts.length==0 ? (<p>no accounts yet</p>):(
        <ul>
            {accounts.map((p)=>(
                
            <li key={p.id}>
                <strong>Name:{p.accountHolderName}</strong>
                Balance:{p.balance}
                &nbsp;
                <button onClick={()=>HandleDelete(p.id)}>Delete</button>
            </li>
        ))}

        </ul>
        )}
        </div>
        </>
    )
}

export default Account;