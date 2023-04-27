const todoWorkCreateValidation = (todo) => {
  let error= {};

  if(!todo.work_description) {
    error.work_description = `Work description can't be empty`
  }
  if(!todo.deadline) {
    error.deadline = `Must add deadline date`
  }

  return {
    error,
    isValid: Object.keys(error).length === 0
  }
}

module.exports = todoWorkCreateValidation;