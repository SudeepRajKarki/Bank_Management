import { useState,useEffect } from "react";
import axios from 'axios'
import './Style.css'


function Account(){

    const[accounts,setAccounts]=useState([]);
    const[newAccount,setnewAccount]=useState({accountHolderName:"",balance:""});
    const[amounts,setamounts] =useState({});


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

    const HandleDeposit = async(id)=>{
        const amt =parseFloat(amounts[id]);
        if(isNaN(amt) || amt < 0){
            alert("please enter a valid amount");
            return;
        }
        try{
           await axios.put(`http://localhost:8080/api/accounts/${id}/deposit`,{
                amount:amt });
            FetchAccounts();
            setamounts({...amounts , [id]:""});
        }
        catch(error){
            console.log("Deposit Failed");
        }
    }
    const HandleWithdraw =async(id)=>{
        const amt = parseFloat(amounts[id]);
        const account = accounts.find((a)=> a.id===id);

        if(isNaN(amt) || amt <= 0){
            alert("Enter a valid number");
            return;
        }
        if(amt > account.balance){
            alert("Enter the valid amount that can be withdrawn");
            return;
        }
        try{
            await axios.put(`http://localhost:8080/api/accounts/${id}/withdraw`,{
                amount:amt
            });
            FetchAccounts();
            setamounts({...amounts,[id]:""});
        }
        catch(error){
            console.error("Withdraw Failed",error);
        }

    }
    
     return(
        <>
        <p className="cre">Create a new Account</p>
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
               <input
               type="number"
               placeholder="Enter amount to withdraw/deposit"
               onChange={(e)=>
                setamounts({...amounts,[p.id]:e.target.value})
               }

               />
                &nbsp;
                <button className="button delete-btn" onClick={()=>HandleDelete(p.id)}>Delete</button>
                &nbsp;
                <button className="button deposit-btn" onClick={()=>HandleDeposit(p.id)}>Deposit</button>
                &nbsp;
                <button className="button withdraw-btn" onClick={()=>HandleWithdraw(p.id)}>Withdraw</button>

            </li>
        ))}

        </ul>
        )}
        </div>
        </>
    )
}

export default Account;