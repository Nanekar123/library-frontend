import {useNavigate} from "react-router-dom";
import "../styles/admin.css";

function SuccessPage(){

const navigate = useNavigate();

return(

<div className="admin-container">

<h1 className="admin-title">
✅ Action Completed Successfully
</h1>

<button className="submitBtn"
onClick={()=>navigate("/admin-dashboard")}>
Back to Dashboard
</button>

</div>

);

}

export default SuccessPage;