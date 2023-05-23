import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type PropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = (props: PropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const muiBtnStyle = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px',
    }



    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       id="outlined-basic"
                       label={error ? "Title is required" : "Type out smth..."}
                       variant="outlined"
                       size="small"
                       error={!!error}
            />
            <Button variant="contained" onClick={addTask} style={muiBtnStyle}>+</Button>
        </div>
    );
};

