function Notifications({setPage}){

return(

<div>

<button style={backBtn} onClick={()=>setPage("dashboard")}>⬅ Back</button>

<h2 style={title}>Notifications</h2>

<p>Admin updates and alerts.</p>

</div>

)

}

const title={color:"gold"}

const backBtn={
marginBottom:"20px",
background:"gold",
border:"none",
padding:"6px 12px"
}

export default Notifications;
