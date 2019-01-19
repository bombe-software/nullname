import React, { Component } from 'react';
import empresaWhite from './../../assets/logo-name-light.png'
import './../../assets/footer.css';
class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer-foot has-background-black-ter  has-text-white ">
                    <div className="container">
                        <div className="columns padTop is-mobile">
                            <ul className="column has-text-centered">
                                <li className="footer-title">
                                    <a href="pagenotfound" className="footer-logo">
                                        <span className=""><img className="avatar" width="90px" src={empresaWhite} alt="empresa_white" /></span>
                                    </a>
                                </li>
                                <li>&nbsp;</li>
                                <li className="footer-social">
                                    <span className="icon is-medium"><i className="fab fa-facebook-f iconFooter"></i></span>
                                    <span className="icon is-medium"><i className="fab fa-twitter iconFooter"></i></span>
                                    <span className="icon is-medium"><i className="fab fa-instagram iconFooter"></i></span>
                                </li>
                            </ul>
                            <ul className="column">
                                <li className="footer-title is-uppercase has-text-weight-bold ">Comparar Carreras</li>
                                <li><a className="aFooter toggleadd" href="/pagenotfout">Compara carreras</a></li>
                            </ul>
                            <ul className="column is-hidden-tiny">
                                <li className="footer-title is-uppercase has-text-weight-bold">Test Vocacional</li>
                                <li><a className="aFooter toggleadd" href="/pagenotfout">Realiza el test</a></li>
                            </ul>

                            <ul className="column is-hidden-touch">
                                <li className="footer-title is-uppercase has-text-weight-bold">Mapa</li>
                                <li><a className="aFooter toggleadd" href="/pagenotfout" >Ver mapa</a></li>
                            </ul>
                            <ul className="column">
                                <li className="footer-title is-uppercase has-text-weight-bold">Datos importantes</li>
                                <li><a className="aFooter toggleadd" href="/pagenotfout">Descubrelos</a></li>
                            </ul>
                            <ul className="column is-hidden-touch">
                                <li className="footer-title is-uppercase has-text-weight-bold">Mas</li>
                                <li><a className="aFooter toggleadd" href="/pagenotfout" >Ayuda</a></li>
                                <li><a className="aFooter toggleadd" href="/pagenotfout" >Acerca de</a></li>
                                <li><a className="aFooter toggleadd" href="/pagenotfout" >Reportar bug</a></li>
                            </ul>
                        </div >
                    </div >
                    <div className="container has-text-centered">
                        &copy; 2019						-
                    <a className="aFooter" href="/pagenotfound"> Bombe Software</a>
                    </div>
                    <br />
                </footer >
                <div id="fb-root"></div>
            </div>
        );
    }
}
export default Footer;