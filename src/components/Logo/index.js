import './styles.css'
import LogoImg from '../../assets/logo.svg'

function Logo({ onClick }) {
    return (
        <div className='logo' >
            <img
                onClick={onClick}
                src={LogoImg}
                alt="backgrond image"
            />
        </div>
    )
}

export default Logo