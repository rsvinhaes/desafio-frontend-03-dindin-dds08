import './styles.css'



function Option({ value, name, currentId }) {

    return (
        <  >
            <option className='option' value=""></option>
            <option selected={value === currentId} className='option' value={value}>{name}</option>
        </>


    )
}

export default Option