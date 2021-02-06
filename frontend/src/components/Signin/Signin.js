import React from 'react';

const server = 'https://guarded-reef-10826.herokuapp.com/signin/';

class Signin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch(server, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                } else {
                    alert('Username or password is incorrect');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div action="sign-up_submit" method="get" acceptCharset="utf-8">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent w-100 measure" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange} />
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
                            onClick={this.onSubmitSignIn}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                    </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;