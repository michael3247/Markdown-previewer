import React from "react"

export default function Sidebar(props){

    function bin(id){
        props.setNote((prev) => {
            let update = prev.filter((value) => {
                return value.id !== id
            })
            return update;
        })
    }

    function select(id){
        props.setSelected(id)    
    }

   const list =  props.note.map((value) => {
        return (
        <div key= {value.id} className={`script ${props.selected === value.id && "selected"} ${props.theme && "script-d"} ${props.selected === value.id && props.theme && "selected-d"}`} onClick={() =>select(value.id)}>
            <span>{value.title === "" ? "Untitled" : value.title}</span>
            <span className="bin" onClick={() => bin(value.id)}>🗑️</span>
        </div>
        )
   })


    return(
        <div className={`sideBar ${props.theme && "sideBar-d"}`}>
            <div className={`add ${props.theme && "add-d"}`}>
                <button onClick={props.newNote}>+</button>
            </div>
            <div className="scripts" >
                {list}
            </div>
        </div>
    )
}