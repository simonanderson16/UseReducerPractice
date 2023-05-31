import React, { useReducer, useState } from 'react'

export default function NotesApp() {

    const initialState = {notes: []};

    const [count, setCount] = useState(0);

    function reducer (state, action) {
        switch(action.type) {
            case "add":
                setCount(count+1);
                return {
                    ...state,
                    notes: [
                      ...state.notes,
                      { id: count, message: action.payload },
                    ],
                  };
                break;
            case "delete":
                return {
                    ...state,
                    notes: state.notes.filter((note) => note.id !== action.payload),
                };
                break;
            case "clear":
                return {
                    ...state,
                    notes: [],
                  };
                break;
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const [message, setMessage] = useState('');

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h1>Notes App</h1>
          <input type='text' placeholder='add a new note' onChange={(e) => setMessage(e.target.value)}></input>
          <button onClick={() => dispatch({type:"add", payload: message})}>Submit</button>
          <br></br>
          <button onClick={() => dispatch({type:"clear"})}>Clear Notes</button>
          {state.notes.map((note, index) => (
            <div style={{border: '1px solid black', margin:'10px', padding:'10px'}}>
              <p key={index}>{note.message}</p>
              <button onClick={() => dispatch({type:'delete', payload:note.id})}>Delete</button>
            </div>
          ))}
        </div>
      );
}
