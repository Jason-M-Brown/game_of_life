import Title from "./Title"
import Logo from "./Logo"

import "./Header.css"

function Header() {
    return (
        <>
        <header className="header">
            <Logo></Logo>
            <Title></Title>
        </header>
        </>
    );
};

export default Header;