import React, { Component } from 'react';

class FormularioGenerico extends Component {
  constructor(props) {
    super(props);
  }

  renderTextField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <TextField hintText={label}
        floatingLabelText={label}
        errorText={touched && error}

        {...input}
        {...custom}
      />
    );
  }


  renderTextArea({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <TextField
        floatingLabelText={label}
        errorText={touched && error}
        multiLine={true}
        rows={4}
        rowsMax={4}
        {...input}
        {...custom}
      />
    );
  }


  renderPasswordField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <PasswordField hintText={""}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  }

  renderCheckbox({ input, label }) {
    return (
      <Checkbox label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}

      />

    );
  }

  renderRadioGroup({ input, ...rest }) {
    return (
      <RadioButtonGroup {...input} {...rest}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)} />
    );
  }

  renderDateField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <DatePicker
        floatingLabelText={label}
        errorText={touched && error}
        {...custom}

        onChange={(event, value) => input.onChange(value)}
      />

    );
  }
  renderSelectField({ input, label, meta: { touched, error }, children, ...custom }) {
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom} />
    );
  }
}

export default FormularioGenerico;