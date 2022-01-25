import React, { useContext, useState } from "react";
import { TimerContext } from "../Context/TimerContext";

export default function Timer({ timer }) {
    const { timerContext, setTimerContext } = useContext(TimerContext);
    const [secs, setSecs] = useState(timer.secs)
    const [intervalId, setInterValId] = useState(null)
    const [editButton, setEditButton] = useState(false);
    const [startButton, setStartButton] = useState(false);
    const [timerData, setTimerData] = useState({
        title: timer.title,
        body: timer.body,
        secs: timer.secs,
    });

    const { title, body: body } = timerData;
    const ConvertTime = (totalSeconds) => {
        let hour = Math.floor(totalSeconds / 3600);
        let minute = Math.floor((totalSeconds % 3600) / 60);
        let second = Math.ceil((totalSeconds % 3600) % 60);

        let timerObject = {
            h: hour,
            m: minute,
            s: second,
        };
        return timerObject;
    };
    const onChangeFormData = (e) => {
        setTimerData({ ...timerData, [e.target.name]: e.target.value });
    };
    const onClickEditButton = () => {
        setStartButton(false);
        setEditButton(true);
    };
    const onClickDoneButton = () => {
        setEditButton(false);
    };
    const onClickDeleteButton = () => {
        setTimerContext(timerContext.filter((t) => t.title !== timer.title));
    };
    const onClickStartButton = () => {
        setStartButton(true);
        if(!timerData.intervalId){
            let intervalId = setInterval(() => {
                setSecs(prev => prev + 1)
            }, 1000);
            console.log(intervalId)
            setInterValId(intervalId)
        }
    };
    const onClickStopButton = () => {
        setStartButton(false);
        console.log(intervalId)
        clearInterval(intervalId);
        setInterValId(null)
    };

    return (
        <div>
            {!editButton && (
                <div>
                    <p>Title: {title}</p>
                    <p>body: {body}</p>
                    <p>Hour: {ConvertTime(secs).h}</p>
                    <p>Minutes: {ConvertTime(secs).m}</p>
                    <p>Seconds: {ConvertTime(secs).s}</p>
                    {!startButton && (
                        <div>
                            <button onClick={onClickStartButton}>
                                <p>Start </p>
                            </button>
                            <button onClick={onClickEditButton}>
                                <p>Edit</p>
                            </button>
                            <button onClick={onClickDeleteButton}>
                                <p>Delete</p>
                            </button>
                        </div>
                    )}
                    {startButton && (
                        <button onClick={onClickStopButton}>
                            <p>Stop</p>
                        </button>
                    )}
                </div>
            )}
            {editButton && (
                <div>
                    <form>
                        <label> Title </label>
                        <textarea
                            name="title"
                            value={timerData.title}
                            onChange={onChangeFormData}
                        ></textarea>
                        <label> Body </label>
                        <textarea
                            name="body"
                            value={timerData.body}
                            onChange={onChangeFormData}
                        ></textarea>
                        <button onClick={onClickDoneButton}>
                            <p>Complete</p>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}