import React from 'react';
import GenericForm from './../reutilizable/formulario_generico';
import { Form, Field } from 'react-final-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";

class ReportarBug extends GenericForm {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            select:"Seleccione una opcion",
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
                            <h1 className="title">Reportar bug </h1>
                            <h2 className="subtitle">¿Encontraste un bug? Repórtelo para que nosotros lo arreglemos. </h2>
                        </div>
                    </div>
                </section>
                <div className="columns">
                    <div className="column is-one-quarter">
                    </div>
                    <div className="column is-half is-centered">
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
                                            <Field
                                                name="nombre"
                                                label="Su nombre"
                                                component={this.renderTextField}
                                            />
                                        </div>
                                        <div>
                                            <label>Tipo de error</label>
                                            <FormControl >
                                                <InputLabel htmlFor="demo-controlled-open-select">Seleccione una opcion</InputLabel>
                                                <Field name="partido"
                                                    label="Partido"
                                                    component={this.renderSelectField}
                                                    inputProps={{
                                                        name: 'select',
                                                        id: 'demo-controlled-open-select',
                                                    }}
                                                >
                                                    <MenuItem value="funcionamiento" key="funcionamiento">Funcionamiento</MenuItem>
                                                    <MenuItem value="no_carga" key="no_carga">No carga</MenuItem>
                                                    <MenuItem value="gramatica" key="gramatica">Gramatica</MenuItem>
                                                </Field>
                                            </FormControl>
                                        </div>
                                        <div>
                                         
                                            <span>
                                                <Field
                                                    name="area"
                                                    rows="6"
                                                    component={this.renderAreaText}
                                                    placeholder="Describa el error que ha encontrado"
                                                />
                                            </span>
                                        </div>
                                                    <br/>
                                        <Button type="submit" variant="contained" color="secondary" >
                                            Enviar
              </Button>
                                    </form>
                                )}
                            />
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default ReportarBug;