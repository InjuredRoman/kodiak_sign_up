import React, { Component } from 'react';
import './App.css';
import { Form, Field } from 'react-final-form';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.MyForm = this.MyForm.bind(this);
  }
  validate() {
    return true;
  }

  onSubmit(event) {
    return;
  }

  handleSubmit(event) {
    console.log(event);
    return;
  }
  MyForm() {
    return <Form
      onSubmit={this.onSubmit}
      validate={this.validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={this.handleSubmit}>
          <h2>Simple Default Input</h2>
          <div>
            <label>First Name</label>
            <Field name="firstName" component="input" placeholder="First Name" />
          </div>

          <h2>Render Function</h2>
          <Field
            name="bio"
            render={({ input, meta }) => (
              <div>
                <label>Bio</label>
                <textarea {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />

          <h2>Render Function as Children</h2>
          <Field name="phone">
            {({ input, meta }) => (
              <div>
                <label>Phone</label>
                <input type="text" {...input} placeholder="Phone" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>
        </form>
      )}
    />;
            }
  render() {
    var f = this.MyForm();
    return (
      <div>
        {f}
      </div>
    );
  }
}

export default App;
