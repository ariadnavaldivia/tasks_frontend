import Link from "next/link";

const Header = ()=>{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand mb-0 h1" href="/" >Task Manager</Link>
        </nav>
    )
}

export default Header;