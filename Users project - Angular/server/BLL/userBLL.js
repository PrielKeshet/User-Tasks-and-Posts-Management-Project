const User = require('../models/userSchema');


// GetAll
const GetData = () => {
    return User.find({});
}

const GetById = (id) => {
    return User.find({ _id: id });
}

const AddUser = async (obj) => {
    const user = new User(obj);
    await user.save();
    return "created";
}

const UpdateUser = async (id, obj) => {
    await User.findByIdAndUpdate(id, obj);
    return 'updated';
}

const AddTask = async (id, task) =>
{
    await User.findByIdAndUpdate(id, { $push: { Tasks: task } });
        return 'updated';
}
const AddPost = async (id, post) =>
{
    await User.findByIdAndUpdate(id, { $push: { Posts: post } });
        return 'updated';
}

const CompleteTask = async (userId, taskId) =>
{
    await User.updateOne({_id : userId, "Tasks._id" : taskId["id"] },
     { $set : {"Tasks.$.Completed" : true}});
        return 'updated';
}

const DeleteUser = async (id) => {
    await User.findByIdAndDelete(id);
    return 'deleted';
}

module.exports = {
    GetData,
    GetById,
    AddUser,
    UpdateUser,
    AddTask,
    AddPost,
    CompleteTask,
    DeleteUser
};