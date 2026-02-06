import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  //GET NOTES FROM DATABASE
  function fetchNotes(){
      axios.get("http://localhost:3000/api/notes")
      .then((res)=>{
        setNotes(res.data.notes)
      })
  }

   useEffect(()=>{
      fetchNotes()
   },[])

   // CREATING NOTES BY USER IN DATABASE AS WELL AS FRONTEND
   const handleSubmit = (e) =>{
    e.preventDefault()
    const {title,description} = e.target.elements;
    console.log(title.value,description.value);
    axios.post("http://localhost:3000/api/notes",{
        title:title.value,
        description:description.value
      })
      .then((res)=>{
        console.log(res.data);
        fetchNotes();
        title.value = "";
        description.value = "";
        
      })
   }

  // DELETE A PARTICULAR NOTE FROM DATABASE AS WELL AS FRONTEND
   const deleteNote = (id) =>{
      axios.delete(`http://localhost:3000/api/notes/${id}`)
      .then((res)=>{
        console.log(res.data);
        fetchNotes();
      })
   }


     // OPEN UPDATE DIALOG
  const openUpdateDialog = (note) => {
    setSelectedNoteId(note._id);     // kis note ka update
    setTitle(note.title);            // input pre-fill
    setDescription(note.description);
    setIsOpen(true);                 // dialog open
  }

   //PATCH UPDATE : UPDATE THE NOTE 
   const updateNote = (e) =>{
    e.preventDefault()

    axios.patch(`http://localhost:3000/api/notes/${selectedNoteId}`,{
      title,
      description
    })
    .then(()=>{
    
      fetchNotes();
      setIsOpen(false);
    })
   }



  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder='Enter Title'/>
      <input name="description" type="text" placeholder='Enter Description' />
      <button>Create Note</button>
    </form>

    <div className="notes">
        {
          notes.map((note, index) => {

            return (
              <div key={index} className="note">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <div id="note-buttons">
                  <button onClick={()=>deleteNote(note._id)}>Delete</button>
                  <button onClick={()=>openUpdateDialog(note)}>Update</button>
                </div>
              </div>
            )
          })
        }
    </div>

    {/* updatenotebox */}
      {isOpen && (
        <form className="update-dialog" onSubmit={updateNote}>
          <input
            type="text"
            value={title || ""}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Update title"
          />

          <input
            type="text"
            value={description || ""}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Update description"
          />

          <button type="submit">Update Note</button>
          <button type="button" onClick={()=>setIsOpen(false)}>Cancel</button>
        </form>
      )}
    </>
  )
}

export default App