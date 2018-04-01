import validation from 'validate.js'

export default function validate(fieldName, value) {
	const constraints = {
		title: {
			presence: { allowEmpty: false, message: 'field is required.' }
		},
		firstName: {
			presence: { allowEmpty: false, message: 'field is required.' }
		},
		lastName: {
			presence: { allowEmpty: false, message: 'field is required.' }
		},
		email: {
			presence: { allowEmpty: false, message: 'field is required.' },
			format: {
				pattern: /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: 'Invalid email id'
			}
		},
		password: {
			presence: { allowEmpty: false, message: 'field is required.' },
			format: {
				pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,16}$/,
				message:
					'must be 8-16 characters long, consisting of A-Z letters and numbers.'
			}
		},
		confirmPassword: {
			presence: { allowEmpty: false, message: 'field is required.' },
			equality: 'password'
		},
		tel: function(value, attributes, attributeName, options, constraints) {
			if (!value.length) return null
			return {
				presence: { allowEmpty: true },
				format: {
					pattern: '^[0-9]{9,10}$',
					message: 'Invalid phone number'
				}
			}
		},
		name: {
			presence: { allowEmpty: false, message: 'field is required.' }
		},
		address: {
			presence: { allowEmpty: false, message: 'field is required.' }
		},
		postcode: {
			presence: { allowEmpty: false, message: 'field is required.' },
			format: {
				pattern: '^[0-9]{5}$',
				message: 'Invalid postcode.'
			}
		},
		phone: {
			presence: { allowEmpty: false, message: 'field is required.' },
			format: {
				pattern: '^[0-9]{9,10}$',
				message: 'Invalid phone number'
			}
		}
	}

	const formValues = {}
	const formFields = {}
	fieldName.forEach((field, index) => {
		formValues[field] = value[index]
		formFields[field] = constraints[field]
	})

	const result = validation(formValues, formFields)
	if (result) {
		return result[fieldName[fieldName.length - 1]][0]
	}
	return null
}
