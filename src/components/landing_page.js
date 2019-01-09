import React, { Component } from 'react';
import './../assets/landing_page.css';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <section className="hero-image">
          <div className="degradado"></div>
          <div className="hero-text">
            <h1 className="is-size-1 has-text-weight-semibold">Busca informacion acerca de alguna carrera </h1>
            <br/><br/>
            <h2 className="subtitle has-text-white has-text-weight-light">
                                En Unitips estamos completamente comprometidos con la educación en México y la distribución del conocimiento.
      </h2>
          </div>
        </section>

      </div>
    );
  }
}

export default LandingPage;
