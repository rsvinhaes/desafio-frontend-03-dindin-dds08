import './styles.css'



function Input({ text, type, labelStyle, inputStyle, value, onchange }) {

    return (
        <div className="form-container-login" >
            <label className={labelStyle} >{text}</label>
            <input className={inputStyle} type={type} value={value} onChange={onchange} />
        </div>
    )
}

export default Input