import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type PropsType = {
    isDone: boolean,
    callBack: (changeEvent: boolean) => void
}

export const SuperCheckBox: React.FC<PropsType> = ({isDone, callBack}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return (
        <Checkbox onChange={onChangeHandler} checked={isDone}/>
    );
};
