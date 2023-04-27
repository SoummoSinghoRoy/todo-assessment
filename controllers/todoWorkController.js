const User = require('../model/User');
const ToDo_Work = require('../model/ToDo_Work');
const { resourceError, serverError } = require('../utils/error');
const todoWorkCreateValidation = require('../validator/todo_work/todoWorkCreateValidatior');

exports.todoWorksController = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id})
    const todo_work = await ToDo_Work.find({user: user._id})
                                          .populate("user")

    if(todo_work.length !== 0) {
      res.status(200).json({
        todo_work,
        totalWork: todo_work.length,
        user
      })
    }else {
      resourceError(res, "Works empty!")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.todoWorkCreateController = async (req, res) => {
  const { work_description, deadline } = req.body;
  const validation = todoWorkCreateValidation({ work_description, deadline })
  if (!validation.isValid) {
    return res.status(400).json(validation.error)
  }

  try {
    const user = await User.findOne({_id: req.user._id})

    const addWork = new ToDo_Work({
      work_description, deadline, user: user._id
    })
    const todo_work = await addWork.save()

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {"todo_work": todo_work._id},
      },
    )

    res.status(200).json({
      msg: "Work created successfully",
      todo_work,
    })
  } catch (error) {
    serverError(res, error)
  }
}

exports.todoWorkEditController = async (req, res) => {
  const { work_description, deadline, status } = req.body;
  const { todoId } = req.params;
  const user = await User.findOne({_id: req.user._id})
  const todo_work = await ToDo_Work.findOne({user: user._id, _id: todoId})

  const validation = todoWorkCreateValidation({ work_description, deadline })
  if (!validation.isValid) {
    return res.status(400).json(validation.error)
  }

  try {
    if(todo_work) {
      const addTodo_work = { work_description, deadline, status }
      const updatedToDo_work = await ToDo_Work.findOneAndUpdate(
        { _id: todo_work._id },
        { $set: addTodo_work },
        { new: true }
      )
      res.status(200).json({
        msg: "Work updated successfully",
        updatedToDo_work
      })
    }else {
      resourceError(res, "Work not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.todoWorkDeleteController = async (req, res) => {
  const { todoId } = req.params;
  const user = await User.findOne({_id: req.user._id})
  const todo_work = await ToDo_Work.findOne({user: user._id, _id: todoId})

  try {
    if(todo_work) {
      const deletedWork = await ToDo_Work.findOneAndDelete({_id: todo_work._id})

      await User.findOneAndUpdate(
        { _id: req.user._id },
        { 
          $pull: {"todo_work": deletedWork._id},
        }
      )
      res.status(200).json({
        Message: "Work successfully deleted",
        deletedWork
      })
    }else {
      resourceError(res, "Work not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}