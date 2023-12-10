import styled from "styled-components";
import Note from "./note";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { getRandomHexColor } from "../utils";
import AddIcon from '@mui/icons-material/Add';

const Container = styled.div`

    height: fit-content;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

`;

const AddNote = styled.div`

    flex-grow: 1;
    min-height: 300px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    color: white;
    background: rgba(0, 0, 0, 0.17);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(0, 0, 0, 1);


    & svg{

        color: black;
    }

`;
function Home(){

    const [Notes, setNotes] = useState([]);


    function addNote() {

        const newNotes = [...Notes];
        newNotes.push({

            id: uuid(),
            title: "New Note",
            note: "...",
            color: getRandomHexColor(),
        })
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    function deleteNote(note){

        const newNotes = [...Notes];
        const index = newNotes.findIndex((element) => element.id === note.id);
        newNotes.splice(index, 1);
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes))

    }

    useEffect(()=>{

        const notes = localStorage.getItem("notes");
        if(notes)
        {
            setNotes(JSON.parse(notes));

        }
        else{

            setNotes([]);
        }

    },[]);
    return(

        <Container>
            {Notes.map((note)=>(<Note myNote={note} deleteNote={deleteNote}/>))}
            <AddNote onClick={addNote}> <AddIcon/> </AddNote>
        </Container>
    );
}
export default Home;