function UpdateUser() {
   
    return (
        <>
            <div className="min-w-[50vw]  mx-auto">
                <form action="http://localhost:3000/update" method="post">
                    <div>
                        <h1>Image</h1>
                        <input type="text" name="newuserImage"  placeholder="Enter Your Image URL" />
                        <h1>PrevName:</h1>
                        <input type="text" name="prevUserName"  placeholder="Enter Name To Update" />
                        <h1>Updated Name:</h1>
                        <input type="text" name="userName"  placeholder="Enter Your  Name Here" />
                        <h1>Updated Email</h1>
                        <input type="text" name="userEmail"  placeholder="Enter Your Email Here" />

                    </div>
                    <div>
                        <h1>Updated Contact</h1>
                        <input type="text" name="userContact"  placeholder="Enter Your Contact" />
                        <h1>Updated Job</h1>
                        <input type="text" name="userJob"  placeholder="Enter Your Job Role" />
                        
                    </div>
                    <button className="bg-blue-800 text-white p-3 px-6 rounded-lg mt-2">Update</button>
                </form>
            </div>
        </>
    )
}
export default UpdateUser;