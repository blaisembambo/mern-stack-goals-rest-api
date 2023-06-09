const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const Goal = require('../models/goalModel')

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {

      const goals = await Goal.find({ user: req.user.id });
      res.status(200).json(goals);
})

//@desc Set goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler( async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('body not sent')
  }

  const goal = await Goal.create({
    user:req.user.id,
    text:req.body.text
  })
  res.status(200).json(goal);
});

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    if (goal.user.toString() == req.user.id) {
      const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedGoal);
    } else {
      res.status(401);
      throw new Error("not authorized");
    }

});


//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
