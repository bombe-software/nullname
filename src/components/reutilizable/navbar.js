import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div>
                <nav className="navbar is-transparent color-navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">
                            <img src="https://bulma.io/images/bulma-logo.png" alt="Logo" width="112" height="28" />
                        </Link>

                        <span className={this.state.isToggleOn ? 'navbar-burger burger is-active' : 'navbar-burger burger'} data-target="nav-demos-menu" onClick={this.handleClick}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </span>
                    </div>

                    <div className={this.state.isToggleOn ? 'navbar-menu is-active' : 'navbar-menu'}>
                        <div className="navbar-start">
                            <Link to="/comparador" className="navbar-item">Compara carreras</Link>
                            <Link to="/test" className="navbar-item">Test vocacional </Link>
                            <Link to="/mapa" className="navbar-item">Mapa </Link>
                            <Link to="/datos_importantes" className="navbar-item">Datos interesantes </Link>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <span className="navbar-link">Mas</span>
                                <div className="navbar-dropdown">
                                    <Link to="/ayuda" className="navbar-item">Ayuda </Link>
                                    <Link to="/acerca_de" className="navbar-item">Acerca de </Link>
                                    <hr className="navbar-divider" />
                                    <Link to="/reportar_bug" className="navbar-item">Reporta un problema</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;
