import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Pagination from "./Pagination";


function People() {

    const [users, setUsers] = useState([]);
    const [totalUsers,setTotalUsers] = useState(100);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = currentPage*itemsPerPage;
    const firstIndex = lastIndex-itemsPerPage;
    const items = users.slice(firstIndex,lastIndex);
    const totalPages = Math.ceil(totalUsers/itemsPerPage);
    function paginate(number){
        setCurrentPage(number);
    }

    useEffect(() => {
        fetchDataFromtBackEnd();
    }, [])

    async function fetchDataFromtBackEnd() {
        const res = await axios.get("http://localhost:3000/getData",{withCredentials:true});
        const userData = res.data;
        const msg = userData.message;
        console.log(userData);
        console.log(msg);
        if(msg === 'failed'){
           setUsers([msg]);
        }
        else{
        setTotalUsers(userData.length);
        setUsers(userData);
        }
        

    }
    
    if(users[0]==='failed'){
        return(
            <>
                <h1 className="text-red-600 font-thin text-3xl">Access Denied You Need  Admin Access Please Login</h1>

            </>
        )
    }

    async function deleteUser(username){
        alert("User Deleted"+username);
        const res = await axios.post("http://localhost:3000/delete",{username});

    }

    async function handleChange(e){
        const val = e.target.value;
        const res = await axios.post("http://localhost:3000/search",{val});
        const foundUsers =await res.data;
        console.log(foundUsers.length);
        if(foundUsers.length>0){
            setUsers(foundUsers);
        }
       

    }

    return (
        <div>
        <div className="flex justify-between">
            <div>
                <h1 className="text-lg">Team Members </h1>
            </div>
            <div>
            <input type="text" name="username" onChange={(e)=>handleChange(e)} placeholder="Search" className="p-2 mr-3 border border-gray-300"></input>
            <Link to={"/addNewMember"}><button className="bg-blue-800 text-white  p-2 px-6 rounded-lg">+Add Member</button></Link>
            </div>
        </div>
        <div className="text-center mt-4 max-h-[60vh] overflow-auto ">
        
            <table className="text-center mx-auto min-w-[80vw] ">
                <thead>
                    <tr >
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Edit</th>
                        
                        
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        items.map((user, id) => (
                            
                            <tr key={id} className=" bg-gray-200">

                                <td><img src={user.userImage} className="w-28 h-20 rounded-full " alt="Not Found"></img></td>
                                <td> <h1 className="p-4">{user.first_name}</h1></td>
                                <td> <h1 className="p-4">{user.job}</h1></td>
                                <td> <h1 className="p-4"> {user.email}</h1></td>
                                <td> <h1 className="p-4">{user.contact}</h1></td>
                                <td className="flex  my-[50%]">
                                <Link to={"/update"} className="px-5"><CiEdit /></Link>
                                <button className="px-5" onClick={()=>deleteUser(user.first_name)}><MdDelete /></button>
                                </td>
                                

                            </tr>
                            


                        ))
                    }

                </tbody>
                
            </table>
            
        </div>
        <Pagination totalPages={totalPages} paginate={paginate}/>
        </div>
        
    )
}
export default People;