import { useEffect, useState } from "react";
import axios from "axios";

function OverView() {
    const [user, setUser] = useState('');
    useEffect(() => {
        showUser();
    }, []);

    async function showUser() {
        const res = await axios.get("http://localhost:3000/overview", { withCredentials: true });
        const newUser = res.data.msg;
        setUser(newUser);

    }

    async function clearCookies(){
        const res = await axios.get("http://localhost:3000/logout",{withCredentials:true});
        alert("Logged Out");
    }
   
    return (
        <div className="min-w-[80vw] text-center mx-auto">
            
            {user === 'failed' ?
                <div>
                    <form action="http://localhost:3000/login" method="post">
                        <input type="text" name="username" placeholder="enter your username"  className="mx-4 border border-gray-500"/>
                        <input type="text" name="password" placeholder="enter admin as password" className="mx-4 border border-gray-500" />
                        <button className="bg-blue-800 py-2 px-4 rounded-xl text-white">Login</button>
                    </form>
                </div> :
                <div>
                   <h1 className="text-2xl  font-mono ">Welcome To The Profile {user}! </h1> 
                   <h1  className="text-2xl  font-mono ">Now You Have Access to The Data</h1>
                   <button onClick={clearCookies} className="bg-red-500 text-white px-4 py-2 rounded-xl my-4">Log Out</button>
                </div>

            }

        </div>
    )
}
export default OverView;