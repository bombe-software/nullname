import React from 'react';
import { graphql } from 'react-apollo';
import comentario from './../../mutations/enviar_comentario';
import GenericForm from './../reutilizable/formulario_generico';
import { Form, Field } from 'react-final-form';
import Button from "@material-ui/core/Button";
import Rating from 'react-rating';

class EnviarComentario extends GenericForm {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            select: "Seleccione una opcion",
            open: false,
            value: 0,
            error: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async onSubmit(values) {
        if (!this.state.value) {
            this.setState({ error: "Valore la plataforma :)" });
        }
        else {
            this.props.mutate({
                variables: {
                    comentario: values.comentario,
                    estrellas: this.state.value
                }
            }).then(()=>{
                this.props.history.push("./")
            });
        }
    }

    handleChange(value) {
        this.setState({
            value
        })
    }
    render() {
        return (
            <div>
                <section className="hero is-link is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Enviar un comentario </h1>
                            <h2 className="subtitle">¿Quiere enviarnos alguna sugerencia, comentario o alguna duda? Haganos saberlo  </h2>
                        </div>
                    </div>
                </section>
                <div className="columns">
                    <div className="column">
                    </div>
                    <div className="column">
                        <section>
                            <Form
                                onSubmit={this.onSubmit}
                                initialValues={this.state.data}
                                validate={values => {
                                    const errors = {};
                                    if (!values.comentario) {
                                        errors.comentario = "Llene este campo"
                                    }
                                    return errors;
                                }}
                                render={({ handleSubmit, pristine, invalid }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <span>
                                                <Field
                                                    name="comentario"
                                                    rows="6"
                                                    label="Comentario"
                                                    component={this.renderAreaText}
                                                    placeholder="Cuentenos que piensa de la plataforma"
                                                />
                                            </span>
                                        </div>
                                        <br />
                                        <div>
                                            <span>
                                                <Rating {...this.props}
                                                    onChange={this.handleChange}
                                                    initialRating={this.state.value}
                                                    emptySymbol="far fa-star"
                                                    fullSymbol="fas fa-star"
                                                    fractions={2}
                                                />
                                                <code>
                                                    {this.state.error}
                                                </code>
                                            </span>
                                        </div>
                                        <Button type="submit" variant="contained" color="secondary" >
                                            Enviar
                                        </Button>
                                    </form>
                                )}
                            />
                        </section>
                    </div>
                    <div className="column">
                    </div>
                </div>
            </div>
        );
    }
}
export default graphql(comentario)(EnviarComentario);