import './styles.css'


function Button({ text, name, navigate, onSubmit }) {
    return (
        <div className='btn' >
            <button className={name} onClick={navigate} onSubmit={onSubmit} >{text}</button>
        </div>
    )
}

export default Button