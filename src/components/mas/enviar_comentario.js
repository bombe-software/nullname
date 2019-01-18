import React from 'react';
import GenericForm from './../reutilizable/formulario_generico';
import { Form, Field } from 'react-final-form';
import Button from "@material-ui/core/Button";

class EnviarComentario extends GenericForm {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            select: "Seleccione una opcion",
            open: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(values) {
        console.log("Submit succesfully");
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

                                    if (!values.nombre) {
                                        errors.nombre = "Ingrese su nombre";
                                    }

                                    if (!values.partido) {
                                        errors.partido = "Seleccione el partido";
                                    }
                                    if (!values.radio) {
                                        errors.radiobutton = "Seleccione el partido";
                                    }
                                    if (!values.area) {
                                        errors.area = "Llene este campo";
                                    }
                                    return errors;
                                }}
                                render={({ handleSubmit, pristine, invalid }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <span>
                                                <Field
                                                    name="area"
                                                    rows="6"
                                                    label="Comentario"
                                                    component={this.renderAreaText}
                                                    placeholder="Cuentenos que piensa de la plataforma"
                                                />
                                            </span>
                                        </div>
                                        <br />
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
export default EnviarComentario;