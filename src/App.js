import React from "react"
import Split from "react-split"
import {nanoid} from "nanoid"
import Sidebar from "./components/sidebar"
import Editor from "./components/editor"
import "./style.scss"


export default function App() {

    const [note, setNote]= React.useState(JSON.parse(localStorage.getItem("note")) || [])

    const check = note.length > 0 ? note[0].id : null;
    
    const [selected, setSelected] = React.useState(check);

    const [theme, setTheme] = React.useState(true)

    function newNote(){
        const newNote = {
            id: nanoid(),
            note: "",
            title: ""
            
        }
        setNote((prev) => {
           return note.length > 0 ? 
           [newNote, ...prev]
            : [newNote]
        })

        setSelected(newNote.id)
    }


    React.useEffect(() => {
        setSelected(check);
    }, []);

    React.useEffect(() => {
        localStorage.setItem("note", JSON.stringify(note))
        
    }, [note])


   return(
    <div className="body">
        {
            note.length > 0 
            ? 
            <Split 
            sizes ={[30, 70]}
            direction="horizontal"
            className="split"
            cursor="col-resize">

              <Sidebar note = {note} 
              newNote={newNote}
              setNote = {setNote} 
              setSelected ={setSelected}
              selected = {selected} 
              theme = {theme}/>

              <Editor note = {note} 
              setNote = {setNote} 
              selected = {selected}
              theme = {theme}
              setTheme = {setTheme}
              />

            </Split>
            :
            <div className="no-note">
                <p>Inbox Empty 📪</p>
                <button onClick={newNote}>Create new script</button>
            </div>
             
        }

    </div>
   )
}
