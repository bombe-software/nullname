import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox'

class GenericForm extends Component {

  renderTextField({ input: { value, name, onChange }, label, meta, ...rest }) {
    return (
      <TextField
        {...rest}
        label={label}
        name={name}
        helperText={meta.touched ? meta.error : undefined}
        error={meta.error && meta.touched}
        onChange={onChange}
        fullWidth
        value={value}
      />
    );
  }

  renderCheckbox({ input: { checked, value, name, onChange }, label, meta, ...rest }) {
    return (
      <Checkbox
        {...rest}
        name={name}
        onChange={onChange}
        error={meta.error && meta.touched}
        checked={!!checked}
        value={value}
      />
    );
  }

  renderRadioGroup({ input: { checked, value, name, onChange }, children, label, meta, ...rest }) {
    return (
      <RadioGroup
        {...rest}
        children={children}
        name={name}
        onChange={onChange}
        value={value}
      />
    );
  }

  renderSelectField({ input: { name, value, onChange }, label, meta, children, ...rest }) {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control has-icons-right">
          <div className={"select is-fullwidth" + (meta.error && meta.touched ? " is-danger" : '')}>
            <select
              {...rest}
              name={name}
              onChange={onChange}
              value={value}
            >
              {children}
            </select>
          </div>
        </div>
        {meta.error && meta.touched ? <p className="help is-danger">{meta.error}</p> : ''}
      </div>
    );
  }
  renderAreaText({ input: { name, onChange, value }, meta, ...rest }) {
    return (
      <TextField
        {...rest}
        name={name}
        multiline
        helperText={meta.touched ? meta.error : undefined}
        error={meta.error && meta.touched}
        onChange={onChange}
        value={value}
      />
    );
  }

/**
* Es una forma de capturar cualquier error en la clase 
* y que este no crashe el programa, ayuda con la depuracion
* de errores
* @method componentDidCatch
* @const info Es más informacion acerca del error
* @const error Es el titulo del error
*/
componentDidCatch(error, info) {
  console.log("Error: " + error);
  console.log("Info: " + info);
}

render() {
  return (
    <div>

    </div>
  );
  }
}

export default GenericForm;