import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import question from './preguntas.json';
import _ from "lodash";
import { Form, Field } from "react-final-form";
import FormularioGenerico from './../reutilizable/formulario_generico';

class TestVocacional extends FormularioGenerico {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            completed: [],
            contadorSubmit: 1,
            contador: 0,
            areaProfesional: "",
            is_touched: false
        }
        this.handleChangeStep = this.handleChangeStep.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getCompleted(num) {
        let bool = false;
        this.state.completed.forEach(element => {
            if (num === element) {
                bool = true;
            }
        });
        return bool;
    }

    handleChangeStep(activeStep) {
        this.setState({ activeStep });
    }

    handleNextStep(values, reset) {
        let is_error = false;
        question[this.state.activeStep].preguntas.forEach((o) => {
            if (!values[o.pregunta]) {
                is_error = true;
                this.setState({
                    is_touched: true
                });
            }
        });
        if (!is_error) {
            let { completed } = this.state;
            completed.push(this.state.activeStep);
            if (this.state.activeStep < question.length - 1) {
                this.setState({
                    activeStep: this.state.activeStep + 1,
                    is_touched: false
                });
            }
        }
    }
    async onSubmit(values) {
        this.setState({ contadorSubmit: this.state.contadorSubmit + 1 });
        if (this.state.contadorSubmit === question.length) {
            let contador = 0;
            let areaProfesional = "";
            Object.values(_.groupBy(Object.values(values), (object) => {
                return object
            })).map((object) => {
                if (object.length > contador) {
                    contador = object.length;
                    areaProfesional = object[0];
                }
                return true;
            })
            this.props.history.push({
                pathname: '/resultado_test',
                state: { resultado: { areaProfesional } }
            })
        }
    }

    render() {
        return (
            <div>
                <div className="hero is-danger is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title has-text-centered">
                                Test vocacional
                            </h1>
                            <h2 className="subtitle has-text-centered">
                                Descubre a que área profesional debes pertenecer con  tan sólo algunas cuantas preguntas.
                            </h2>
                        </div>
                    </div>
                </div>
                <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
                    {question.map((o, i) => {
                        return (
                            <Step key={o.categoria}>
                                <StepButton completed={this.getCompleted(i)}>
                                    {o.categoria}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className='container'>
                    <div className="section">
                        <div className="columns is-mobile">
                        <div className="column is-centered is-8-desktop is-offset-2-desktop">
                        <Form
                            onSubmit={this.onSubmit}
                            validate={values => {
                                const errors = {};
                                if(this.state.is_touched){
                                    question[this.state.activeStep].preguntas.forEach((o) => {
                                        if (!values[o.pregunta]) {
                                            errors[o.pregunta] = 'Porfavor seleccione una informacion';
                                        }
                                    }); 
                                }
                                return errors;
                            }}
                            render={({ handleSubmit, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit}>
                                    {question.map((obj, i)=> {
                                        return obj.preguntas.map(o => {
                                            return (
                                                <div style={this.state.activeStep === i  ? {} : {display: 'none'}} key={o.pregunta + question[i].categoria}>
                                                    <Field name={o.pregunta}
                                                        component={this.renderSelectField}
                                                        label={o.pregunta}
                                                    >
                                                        <option value={'default'}>Seleccione una opción</option>
                                                        {o.respuestas.map((o) => {
                                                            return (
                                                                <option key={o.respuesta + question[i].categoria} value={o.categoria}>
                                                                    {o.respuesta}
                                                                </option>
                                                            );
                                                        })}
                                                    </Field>
                                                    <br />
                                                </div>
                                            );
                                        })
                                    })}
                                    <br />
                                    <div className="level">
                                        <div className="level-item has-text-centered">
                                        <button type="submit" disabled={submitting} className="button is-rounded is-link is-medium" onClick={() => this.handleNextStep(values)}>Siguiente</button>
                                        </div>
                                    </div>
                                </form>
                            )
                            }
                        />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default TestVocacional;