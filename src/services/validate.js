import validation from 'validate.js'

export default function validate(fieldName, value) {
	const constraints = {
		title: {
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
