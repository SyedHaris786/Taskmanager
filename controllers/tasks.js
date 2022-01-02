
const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');


getAllTasks = asyncWrapper( async (req,res) => {
        const tasks = await Task.find({})
        res.status(201).json({ tasks })      
        
})

createTask = asyncWrapper( async (req,res) => {

const task = await Task.create(req.body)
res.status(201).json({ task })

})

getTask = asyncWrapper( async (req,res) => {
    
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID});
    
        if(!task){
        return res.status(404).json({msg:`No task with id : ${taskID}`})

    }

    res.status(200).json({ task })
    
})

updateTask = asyncWrapper( async (req,res) => {

    const { id:taskID } = req.params
    const task = await Task.findByIdAndUpdate({_id:taskID},req.body, {
       new:true,
        runValidators:true,
    }) 
    if(!task){
        return res.status(404).json({msg:`No task with id : ${taskID}`})
}
res.status(200).json({task})

})

deleteTask = asyncWrapper( async (req,res) => {
    
    const {id:taskID } = req.params;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task){
        return res.status(404).json({msg:`No task with id : ${taskID}`})
    }

    res.status(201).json({task})

})


module.exports = { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}