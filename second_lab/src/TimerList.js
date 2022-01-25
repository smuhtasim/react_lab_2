import React, {useState, useContext} from 'react';
import Timer from './Components/Timer'
import { TimerContext } from './Context/TimerContext';

export default function TimerList(){
    const {timerContext, setTimerContext: setTimerValue} = useContext(TimerContext)
    const [addButton, setAddButton] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })
    const changeAddButtonStatus = () => {
        setAddButton(!addButton)
    }
    const FormDataChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(e.target.value)
    }
    const createTimerOnClick = () => {
        changeAddButtonStatus()
        setTimerValue([...timerContext, {title: formData.title, body: formData.body, secs: 0}])
        setFormData({
            title: "",
            body: ""
        })
    }
    const cancelTimerOnClick = () => {
        changeAddButtonStatus()
    }
    return(
        <div>
            {timerContext.map(timer => <div> 
                <Timer timer = {{...timer}} />
                <hr/>
            </div>)}
        {!addButton && <div>

            <button onClick = {changeAddButtonStatus}><p>add</p></button>
        </div>}
        {addButton && <div>
            <form>
                <label>Title</label>
                <textarea name = {"title"} value = {formData.title} onChange = {FormDataChange}></textarea>
                <label>Body</label>
                <textarea name = {"body"} value = {formData.body} onChange = {FormDataChange}></textarea>
                <button onClick = {createTimerOnClick}>Create</button>
                <button onClick = {cancelTimerOnClick}>Cancel</button>
            </form>
        </div>}
        </div>


    )

}