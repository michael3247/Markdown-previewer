import React from "react"
import placeholder from "./placeholder";
import Showdown from "showdown"

export default function Editor(props){


    const [title, setTitle] = React.useState("");

    function handleTitle(event){
        
       props.setNote((prev) => {
            const arr = [];
           for(let i = 0; i < prev.length; i++){
            if(props.selected === prev[i].id){
                arr.unshift({...prev[i], title:event.target.value })
            }
            else{
                arr.push(prev[i])
            }
           }
           return arr;
       })
       

    
    }
    React.useEffect(() => {
        for(let i = 0; i < props.note.length; i++){
            if(props.selected === props.note[i].id){

                setTitle(props.note[i].title)
            }
       }
       }, [props.note, props.selected])


    const [preview, setPreview] = React.useState(false);

    function handlePreview(){
        setPreview((prev) => !prev)
    }

    const [current, setCurrent] = React.useState("")

    function handleNote(event){
        props.setNote((prev) => {

            const arr = [];
            for(let i = 0; i < prev.length; i++){
            if(props.selected === prev[i].id){
                arr.unshift({...prev[i], note:event.target.value })
            }
            else{
                arr.push(prev[i])
            }
           }
           return arr;
        })
    }

    React.useEffect(() => {
            for(let i = 0; i < props.note.length; i++){
                if(props.selected === props.note[i].id){
                    setCurrent(props.note[i].note)
                }
            }
    }, [props.note, props.selected])


    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    const convertMarkdownToHtml = (markdownString) => {
        return new Promise((resolve) => {
          resolve(converter.makeHtml(markdownString));
        });
      };

    const [previewHtml, setPreviewHtml] = React.useState("")

    convertMarkdownToHtml(current).then((convertedHtml) => {
        setPreviewHtml(convertedHtml); // Assuming you have a state variable for preview HTML
      });


    function changeTheme(){
        props.setTheme(prev => !prev)
    }
    
    return(
        <div className={`editor ${props.theme && "editor-d"}`}>

            <div className={`nav ${props.theme && "nav-d"}`}>

                <input 
                className={`title ${props.theme && "title-d"}`} 
                placeholder="Input Title" 
                defaultValue={title}
                onChange={handleTitle}/>

                <button onClick={handlePreview}>Preview</button>

                <div className={`theme ${props.theme && "theme-d"}`}>
                    <div onClick={changeTheme}></div>
                </div>
            </div>
            <div className={`text-area ${props.theme && "text-area-d"}`}>
                { preview 
                ? (
                    <div className={`preview ${props.theme && "preview-d"}`} dangerouslySetInnerHTML={{ __html: previewHtml }} />
                  )
                :<textarea placeholder={placeholder} onChange={handleNote} defaultValue ={current}></textarea>
                }
            </div>
        </div>
    )
}