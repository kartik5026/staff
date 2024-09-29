function AddMember() {
   
    return (
        <>
            <div className="min-w-[50vw]  mx-auto">
                <form action="http://localhost:3000/newUser" method="post">
                    <div>
                        <h1>Image</h1>
                        <input type="text" name="newuserImage"  placeholder="Enter Your Image URL" />
                        <h1>Name:</h1>
                        <input type="text" name="userName"  placeholder="Enter Your  Name Here" />
                        <h1>Email</h1>
                        <input type="text" name="userEmail"  placeholder="Enter Your Email Here" />

                    </div>
                    <div>
                        <h1>Contact</h1>
                        <input type="text" name="userContact"  placeholder="Enter Your Contact" />
                        <h1>Job</h1>
                        <input type="text" name="userJob"  placeholder="Enter Your Job Role" />
                        
                    </div>
                    <button className="bg-blue-800 text-white p-3 px-6 rounded-lg mt-2">Add</button>
                </form>
            </div>
        </>
    )
}
export default AddMember;