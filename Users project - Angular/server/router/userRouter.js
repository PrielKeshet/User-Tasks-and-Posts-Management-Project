const BLL = require('../BLL/userBLL');
const express = require('express');
const router = express.Router();

// GetAllData
router.route('/').get(async (req, resp) => {
    const users = await BLL.GetData();
    resp.json(users);
})

router.route('/:id').get(async (req, resp) => {
    const id = req.params.id;
    const user = await BLL.GetById(id);
    resp.json(user);
})

router.route('/').post(async (req, resp) => {
    try {
        const obj = req.body;
        const result = await BLL.AddUser(obj);
        resp.status(201).json(result);
    }
    catch (error) {
        resp.status(500).json(error.message);
    }
})

router.route('/:id').put(async (req, resp) => {

    const id = req.params.id;
    const obj = req.body;
    const result = await BLL.UpdateUser(id, obj);
    resp.json(result);
})

router.route('/addTask/:id').put(async (req, resp) => {

    const id = req.params.id;
    const obj = req.body;
    const result = await BLL.AddTask(id, obj);
    resp.json(result);
})

router.route('/completeTask/:userId').put(async (req, resp) => {

    const userId = req.params.userId;
    const taskId = req.body;
    const result = await BLL.CompleteTask(userId, taskId);
    resp.json(result);
})

router.route('/addPost/:id').put(async (req, resp) => {

    const id = req.params.id;
    const obj = req.body;
    const result = await BLL.AddPost(id, obj);
    resp.json(result);
})



router.route('/:id').delete(async (req, resp) => {
    const id = req.params.id;
    const result = await BLL.DeleteUser(id);
    resp.json(result);
})

module.exports=router;

