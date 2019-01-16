import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

class TestVocacional extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: []
    }
    this.handleChangeStep = this.handleChangeStep.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
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

  handleNextStep() {
    let { completed } = this.state;
    completed.push(this.state.activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  renderSection(num) {
    return (
      <div class="field column">
        <label class="label">{num}</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
        <button onClick={this.handleNextStep}>
          Siguiente
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
          <Step>
            <StepButton completed={this.getCompleted(0)}>
              Paso 1
                </StepButton>
          </Step>
          <Step>
            <StepButton completed={this.getCompleted(1)}>
              Paso 2
                </StepButton>
          </Step>
          <Step>
            <StepButton completed={this.getCompleted(2)}>
              Paso 3
                </StepButton>
          </Step>
        </Stepper>
        <div className='columns'>
          {this.renderSection(this.state.activeStep)}
        </div>
      </div>
    );
  }
}
export default TestVocacional;