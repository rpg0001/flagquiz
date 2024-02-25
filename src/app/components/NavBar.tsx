import Link from "next/link";
import React from "react";

export default function NavBar() {
    return (
        <nav className="navbar">
            <Link href="/"><h1 className="m-0 text-white">Flag Quiz</h1></Link>
            <Link className="navbar-link" href="/">Home</Link>
            <Link className="navbar-link" href="all-countries">All countries</Link>
        </nav>
    )
}