import './Navbar.css'

const Navbar = () => {


    return (
        <nav>
            <div className='switch'>
                <i className="bi bi-brightness-high"></i>
                <label >
                    <input type="checkbox" className='check-switch' hidden/>
                    <span className='slider'></span>
                </label>
                <i className="bi bi-moon-stars"></i>
            </div>
        </nav>
    )

} 

export default Navbar;