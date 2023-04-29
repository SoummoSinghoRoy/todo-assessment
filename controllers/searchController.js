const ToDo_Work = require('../model/ToDo_Work');
const { resourceError, serverError } = require('../utils/error');

exports.searchResultController = async (req, res) => {
  const { searchterm } = req.params;
  try {
    const todo_work = await ToDo_Work.find({
      $text: {$search: searchterm}
    })
    if(todo_work.length !== 0) {
      res.status(200).json({
        todo_work,
        searchterm,
        totalItems: todo_work.length
      })
    }else {
     resourceError(res, "Works item empty!")
    }
  } catch (error) {
    serverError(res, error)
  }
}