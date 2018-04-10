import validation from 'validate.js'

export default function validate(fieldName, value) {
	const constraints = {
		title: {
			presence: { allowEmpty: false, message: 'field is required.' }
		},
		name: {
			presence: { allowEmpty: false, message: 'field is required.' }
		},
		rating: {
			presence: { allowEmpty: false, message: 'field is required.' },
			numericality: {
				onlyInteger: true,
				greaterThan: 0,
				lessThanOrEqualTo: 5
			}
		},
		contentMessage: {
			presence: { allowEmpty: false },
			length: { minimum: 1, message: 'must be at least one content' }
		},
		description: {
			presence: { allowEmpty: false, message: 'field is required.' }
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
