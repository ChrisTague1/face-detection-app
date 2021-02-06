import React from 'react';

const server = 'https://guarded-reef-10826.herokuapp.com/register/'

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    registerIsValid = () => {
        const { name, email, password } = this.state;
        let valid = true;

        if (name.length <= 2 || email.length <= 6 || password.length <= 2) valid = false;
        if (!email.includes('@') || !email.includes(".com")) valid = false;
        // Google javascript regexp to see how to do this in a really cool way

        return valid;
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onRegister = () => {
        const { name, email, password } = this.state;
        if (this.registerIsValid()) {
            fetch(server, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    } 
                })
        } else {
            alert("Invalid registration information");
        }
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div action="sign-up_submit" method="get" acceptCharset="utf-8">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" htmlFor="email-address">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent w-100 measure" 
                                    type="text" 
                                    name="name"  
                                    id="name" 
                                    onChange={this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent w-100 measure" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address" 
                                    onChange={this.onEmailChange}/>
                            </div>
                            
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent" 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                    <div className="mt3">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                            type="submit" 
                            value="Submit" 
                            onClick={this.onRegister}
                        />
                    </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;