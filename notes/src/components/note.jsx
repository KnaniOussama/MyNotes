import styled from "styled-components";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from "react";

const Container = styled.div`

    flex-grow: 1;
    background-color: ${props=> props.color};
    min-height: 300px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 5px;
    color: white;
    border-radius: 16px;
    overflow: hidden;

`;
const Wrapper = styled.div`

    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`;
const Title = styled.input`

    height: 100%;
    width: fit-content;
    background: none;
    outline: none;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;


`;
const Content = styled.textarea`

    height: 80%;
    width: 100%;
    background: none;
    color: white;
    outline: none;
    border: 1px solid white;
    resize: none;
`;

function Note(props){

    const [note, setNote] = useState(props.myNote);

    const [noteText, setNoteText] = useState(note.note);
    const [noteTitle, setNoteTitle] = useState(note.title);
    const [change, setChange] = useState(false);

    useEffect(()=>{

        if(noteText !== note.note || noteTitle !== note.title) setChange(true);
        if(noteText === note.note && noteTitle === note.title) setChange(false);

    },[noteText, noteTitle]);

    useEffect(()=>{

        setNoteText(note.note);
        setNoteTitle(note.title);
        setChange(false);

    },[note])
    useEffect(()=>{
        setNote(props.myNote);
    },[props.myNote])

    function handleSaveNote(){

        const newNote = {

            id: note.id,
            title: noteTitle,
            note: noteText,
            color: note.color,
        }
        setNote(newNote);
        const savedNotes = JSON.parse(localStorage.getItem('notes'));
        const index = savedNotes.findIndex((element) => element.id === note.id);
        const newArray = savedNotes.map((element, i) => (i === index ? newNote : element));
        localStorage.setItem('notes', JSON.stringify(newArray));
        setChange(false);
    }

    return(
    <Container color = {note.color} >
        <Wrapper>
            <div onClick={()=>{props.deleteNote(note)}}><DeleteForeverIcon color="error"/></div>
            <Title value={noteTitle} onChange={(e) =>{setNoteTitle(e.target.value)}}/>
            {change ? <div onClick={handleSaveNote}><CheckIcon/></div> : <div></div>}
        </Wrapper>
        <Content value={noteText} onChange={(e)=> {setNoteText(e.target.value)}}></Content>
    </Container>
    )
}


export default Note;