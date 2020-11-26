import React, { useRef, useState } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import AuthService from '../services/auth-service';

const required = (value) => {
	if (!value)
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
};
const validateEmail = (value) => {
	if (!isEmail(value))
		return (
			<div className="alert alert-danger" role="alert">
				This is not a valid Email!
			</div>
		);
};
const validateUsername = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 3 and 20 characters
			</div>
		);
	}
};
const validatePassword = (value) => {
	if (value.length < 6 || value.length > 40) {
		return (
			<div className="alert alert-danger" role="alert">
				The username must be between 6 and 40 characters
			</div>
		);
	}
};

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [successful, setSuccessful] = useState(false);
	const form = useRef();
  const checkBtn = useRef();
  
	const onChangeUsername = (e) => {
		setUsername(e.target.value);
  };
  
	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};
  
  const onChangePassword = (e) => {
		setPassword(e.target.value);
	};
  
  const onRegisterClicked = (e) => {
		e.preventDefault();
		setMessage('');
		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
			AuthService.register(username, email, password).then(
				(response) => {
					setMessage(response.data.message);
					setSuccessful(true);
				},
				(error) => {
					const resMessage = error?.response?.data?.message || error.message || String(error);
					setMessage(resMessage);
					setSuccessful(false);
				}
			);
		} else {
			setMessage('death is all around us');
			setSuccessful(false);
		}
	};

	return (
		<div className="col-md-12">
			<div className="card card-container">
				<img
					src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
					alt="profile-img"
					className="profile-img-card"
				/>
				<Form onSubmit={onRegisterClicked} ref={form}>
					{!successful && (
						<div>
							<div className="form-group">
								<label htmlFor="username">Username</label>
								<Input
									type="text"
									className="form-control"
									name="username"
									value={username}
									onChange={onChangeUsername}
									validations={[required, validateUsername]}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<Input
									type="text"
									className="form-control"
									name="email"
									value={email}
									onChange={onChangeEmail}
									validations={[required, validateEmail]}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<Input
									type="password"
									className="form-control"
									name="password"
									value={password}
									onChange={onChangePassword}
									validations={[required, validatePassword]}
								/>
							</div>
							<div className="form-group">
								<button className="btn btn-primary btn-block">Sign Up</button>
							</div>
						</div>
					)}

					{message && (
						<div className="form-group">
							<div
								className={successful ? 'alert alert-success' : 'alert alert-danger'}
								role="alert"
							>
								{message}
							</div>
						</div>
					)}
					<CheckButton style={{ display: 'none' }} ref={checkBtn} />
				</Form>
			</div>
		</div>
	);
};

export default Register;
