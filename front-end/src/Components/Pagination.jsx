function Pagination(props){
    const{totalPages,paginate} = props;
    let pageNumbers  = [];
    for(let i=1; i<=totalPages; i++){
        pageNumbers.push(i);
    }
    return(
        <div className="text-center p-2">
        {
            pageNumbers.map((number,id)=>(
                <button key={id} onClick={()=>paginate(number)} className="p-2 px-6 mx-4 text-white  rounded-xl bg-blue-800">{number}</button>
            ))
        }
        </div>
    )
}
export default Pagination;