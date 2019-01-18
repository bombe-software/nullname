import React, { Component } from 'react';
import { Link } from "react-router-dom";
import laptop from './../assets/students.jpg';
import pencil from './../assets/pencil.png';
import mapa from './../assets/map.png';
import brain from './../assets/interesant.png';
import white from './../assets/white.png';
import './../assets/landing_page.css';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <section className="hero-image">
          <div className="degradado"></div>
          <div className="hero-text">
            <h1 className="is-size-1 has-text-weight-semibold">Busca información acerca de alguna carrera </h1>
            <br /><br />
            <h2 className="subtitle has-text-white has-text-weight-light">
              En Unitips estamos completamente comprometidos con la educación en México y la distribución del conocimiento.
            </h2>
          </div>
        </section>
        <section className="hero has-background-black-ter">
          <div className="hero-body">
            <div className="container">
              <div className="columns ">
                <div className="column is-5 is-offset-1">
                  <img src={white} alt="imagen" />
                </div>
                <div className="column is-5">
                  <p className="title has-text-white-ter ">
                    ¿Cómo me ayudará a informarme acerca de las universidades?
                                    </p>.
                                    <p className="subtitle has-text-white-ter ">
                    La plataforma le brindará información acerca de las universidades con su ubicación asi como sus respectivas carreras.
                                    </p>
                  <p className="subtitle has-text-white-ter ">
                    Contamos una base de datos en donde tenemos miles de materias registradas de las respectivas carreras
                                        de las universidades. <strong>¿Genial no?</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero">
          <div className="hero-body hero-body-hp-main is-danger">
            <div className="container">
              <div className="columns">
                <div className="column is-6">
                  <h1 className="title is-1 comparaPadUp has-text-left">
                    Comparador de carrera
                  </h1>
                  <h2 className="subtitle hp-subtitle has-text-left">
                    <br />
                    Compara las carreras de las diversidas carreras que existen, con el fin de ver las materias que
                    comparten y sus enfoques diferentes. Sin duda, <strong>una gran herramienta </strong>¿no lo crees?
                  </h2>
                  <Link to='comparador'>
                    <button className="button buttonGo is-medium is-danger">
                      ¡Comparar carreras!
                                        </button>
                  </Link>

                  <span className="help comparaPadBot">Por si te lo preguntabas: ¡Sí, es gratis! </span>
                </div>
                <div className="column is-6">
                  <img src={laptop} alt='imageload' />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section is-medium has-background-danger has-text-centered is-long-ish has-background-primary">
          <div className="container">
            <div className="columns is-centered ">
              <div className="column is-three-fifths ">
                <h1 className="title is-spaced is-size-2-desktop is-size-4-mobile has-text-white">Más módulos</h1>
                <h2 className="subtitle is-size-5-desktop has-text-white">Para comenzar, divimos nuestra plataforma en tres módulos
                                esenciales donde desplegaremos información. Cada uno retroalimenta la capacidad de diferenciar carreras 
                                de las universidades entre sí.</h2>
              </div>
            </div>
          </div>
        </section>
        <section className="section startups has-text-centered">
          <div className="container is-narrow">
            <div className="startup-grid">
              <div className="columns is-centered level">
                <div className="column level-item">
                  <div className="box"><h2 className="titleBox">Test Vocacional</h2><img className="logo" src={pencil} alt="imageload" />
                    <p>No sabes por donde empezar? Descubre el <strong>área profesional</strong> al que deberías pertenecer con este sencillo test</p>
                    <Link to='test'>
                      <button className="button is-danger buttonGo is-rounded">Ir ahora</button>
                    </Link>
                  </div>
                </div>
                <div className="column level-item">
                  <div className="box"><h2 className="titleBox">Mapa</h2><img className="logo" src={mapa} alt="imageload" />
                    <p>¿Tienes alguna idea de cómo y dónde es alguna universidad? Si no sabes, ubícalo fácilmente desde el mapa</p>
                    <Link to='mapa'>
                      <button className="button is-danger buttonGo is-rounded">Ir ahora</button>
                    </Link>
                  </div>
                </div>
                <div className="column level-item">
                  <div className="box"><h2 className="titleBox">Datos interesantes</h2><img className="logo" src={brain} alt="imageload" />
                    <p>¿Interesado en algunas estadísticas? Descubre algunos datos que te podrían dar una mejor claridad de algunas universidades</p>
                    <Link to='datos_importantes'>
                      <button className="button is-danger buttonGo is-rounded">Ir ahora</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LandingPage;
