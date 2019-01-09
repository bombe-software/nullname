import React, { Component } from 'react';

class AcercaDe extends Component {
    render() {
        return (
            <div>
                <section class="hero is-link has-background-link is-medium">
                    <div class="hero-body">
                        <div class="container has-text-centered ">
                            <h1 class="title">
                                ACERCA DE NOSOTROS
      </h1>
                            <hr />
                            <h2 class="subtitle">
                                En Unitips estamos completamente comprometidos con la educación en México y la distribución del conocimiento.
      </h2>
                        </div>
                    </div>
                </section>

                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <img src=".../assets/laptop.jpg" alt="Laptop" />
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
        </p>
                            </div>
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <a class="level-item" aria-label="reply">
                                        <span class="icon is-small">
                                            <i class="fas fa-reply" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a class="level-item" aria-label="retweet">
                                        <span class="icon is-small">
                                            <i class="fas fa-retweet" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a class="level-item" aria-label="like">
                                        <span class="icon is-small">
                                            <i class="fas fa-heart" aria-hidden="true"></i>
                                        </span>
                                    </a>
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
