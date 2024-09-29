import {Link} from "react-router-dom";
function SideBar() {
    return (
        <div>
            <div className="my-8">
                <Link to="/overview"><h1>OverView</h1></Link>
            </div>
            <div className="my-8">
                <Link to="/people"><h1>People Directory</h1></Link>
            </div>
        </div>
    )
}
export default SideBar;