import React, { useEffect, useState } from 'react'
import "./Nav.css"

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {                                   // this useEffect provides the functionality for the navbar only showing the black background color once the user has scrolled on the 'Y' axis 100 ticks from the top
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);                       // condition is true at 100 ticks and greater
            } else handleShow(false);                   // condition is false at 99 ticks and below
        });
        return () => {
            window.removeEventListener("scroll", null);       // once the condition is called it wont be called over and over again
        };
    }, []) 

    return (
        <div className={`nav ${show && "nav__black"}`}> {/* The class nav__black is only added to the div when the condition 'show' is true */}
            <img
                className='nav__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158'
                alt='Netflix Logo' />
            <img
                className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
                alt='Avatar Logo'
            />
        </div>
    )
}

export default Nav