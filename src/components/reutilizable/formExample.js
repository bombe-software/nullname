import React from 'react';
import GenericForm from './../reutilizable/formulario_generico';
import { Form, Field } from 'react-final-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FormExample extends GenericForm {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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
                            <h1 className="title">
                                Ejemplo de formulario</h1>

                        </div>
                    </div>
                </section>
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
                            errors.area = "Complete el area box";
                        }
                        return errors;
                    }}
                    render={({ handleSubmit, pristine, invalid }) => (
                        <form onSubmit={handleSubmit}>
                            <h3>Form Example</h3>
                            <div>
                                <label>TextField</label>
                                <Field
                                    name="nombre"
                                    label="Nombre de Usuario"
                                    component={this.renderTextField}
                                />
                            </div>
                            <div>
                                <label>Checkbox</label>
                                <Field
                                    name="checkbox"
                                    label="Checkbox"
                                    component={this.renderCheckbox}
                                    type="checkbox"
                                    value="ketchup"
                                />
                            </div>
                            <div>
                                <label>RadioButton</label>
                                <Field
                                    name="radio"
                                    component={this.renderRadioGroup}
                                    type="radiogroup"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="disabled" disabled control={<Radio />} label="Disabel" />
                                </Field>

                            </div>
                            <div>
                                <label>Area Text</label>
                                <Field
                                    name="area"
                                    rows="5"
                                    component={this.renderAreaText}
                                    placeholder="Describa como es que soy pro"
                                />
                            </div>
                            <div>
                                <label>Select</label>
                                <FormControl >
                                    <InputLabel htmlFor="demo-controlled-open-select">Seleccione una opcion</InputLabel>
                                    <Field name="partido"
                                        label="Partido"
                                        component={this.renderSelectField}
                                        inputProps={{
                                            name: 'age',
                                            id: 'demo-controlled-open-select',
                                        }}
                                    >
                                        <MenuItem value="partido1" key="partido1">MenuItem 1</MenuItem>
                                        <MenuItem value="partido2" key="partido2">MenuItem 2</MenuItem>
                                    </Field>
                                </FormControl>
                            </div>
                            <Button type="submit" variant="contained" color="primary" >
                                Enviar
              </Button>
                        </form>
                    )}
                />
            </div>
        );
    }
}
export default FormExample;