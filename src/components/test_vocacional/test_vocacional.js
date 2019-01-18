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
            areaProfesional: ""
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

    handleNextStep(values) {
        let is_error = false;
        question[this.state.activeStep].preguntas.forEach((o)=>{
            if(!values[o.pregunta]){
               is_error = true;
            }
        });
        if(!is_error){
            let { completed } = this.state;
            completed.push(this.state.activeStep);
            if (this.state.activeStep < question.length - 1) {
                this.setState({
                    activeStep: this.state.activeStep + 1
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

    renderSection(num) {
        return (
            <div className="column">
                <Form
                    onSubmit={this.onSubmit}
                    validate={values => {
                        const errors = {};
                        question[num].preguntas.forEach((o)=>{
                            if(!values[o.pregunta]){
                                errors[o.pregunta] = 'Porfavor seleccione una informacion';
                            }
                        });
                        return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} key={question[num].categoria}>
                            {question[num].preguntas.map((o) => {
                                return (
                                    <div  key={o.pregunta + question[num].categoria}>
                                        <Field name={o.pregunta}
                                            component={this.renderSelectField}
                                            label={o.pregunta}
                                            active={num===this.state.activeStep}
                                        >
                                            <option value={'default'}>Seleccione una opción</option>
                                            {o.respuestas.map((o) => {
                                                return (
                                                    <option key={o.respuesta + question[num].categoria} value={o.categoria}>
                                                        {o.respuesta}
                                                    </option>
                                                );
                                            })}
                                        </Field>
                                    </div>
                                );
                            })}
                            <button type="submit" disabled={submitting} className="button is-rounded is-danger" onClick={()=>this.handleNextStep(values)}>Siguiente</button>
                        </form>
                    )
                    }
                />
                < br /> <br />
            </div>
        );
    }

    render() {
        return (
            <div>
                <section className="hero is-link is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Test vocacional
                            </h1>
                            <h2 className="subtitle">
                                Descubre a que área profesional debes pertenecer con  tan sólo algunas cuantas preguntas.
                            </h2>
                        </div>
                    </div>
                </section>
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
                <div className='columns'>
                    <div className='column'></div>
                    {this.renderSection(this.state.activeStep)}
                    <div className='column'></div>
                </div>
            </div>
        );
    }
}
export default TestVocacional;