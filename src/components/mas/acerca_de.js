import React, { Component } from 'react';

class AcercaDe extends Component {
    render() {
        return (
            <div>
                <section className="hero is-link has-background-link is-medium">
                    <div className="hero-body">
                        <div className="container has-text-centered ">
                            <h1 className="title">
                                ACERCA DE NOSOTROS
      </h1>
                            <hr />
                            <h2 className="subtitle">
                                En Unitips estamos completamente comprometidos con la educación en México y la distribución del conocimiento.
      </h2>
                        </div>
                    </div>
                </section>

                <div className="box">
                    <article className="media">
                        <div className="media-left">
                            <img src=".../assets/laptop.jpg" alt="Laptop" />
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
        </p>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <span className="level-item" aria-label="reply">
                                        <span className="icon is-small">
                                            <i className="fas fa-reply" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                    <span className="level-item" aria-label="retweet">
                                        <span className="icon is-small">
                                            <i className="fas fa-retweet" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                    <span className="level-item" aria-label="like">
                                        <span className="icon is-small">
                                            <i className="fas fa-heart" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}
export default AcercaDe;
