const catchError = require('../utils/catchError');
const User = require('../models/User');


// obtener todos los usarios
const getAll = catchError(async(req, res) => {
    const  users = await User.findAll()
    return res.json(users)
});

//crear un usuario
const create = catchError(async(req, res) => {
    const user = req.body
    const createUser = await User.create(user)
    return res.status(201).json(createUser)
});

// obtener usuario por id

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const user = await User.findByPk(id)
    if(!user) return res.status(404).json({message: "user not found"})
    return res.json(user)
});

//eliminar un usuario
const remove = catchError(async(req, res)=>{
    const {id} = req.params
    const removeUser = await User.destroy({where: {id}});
    if(!removeUser) return res.status(404).json({message: "user not found"});

    return res.sendStatus(204);

});

// actualizar users

const update = catchError(async(req, res)=>{
    const {id} = req.params;
    const user = req.body;

    const updateUser = await User.update(user, {where: {id}, returning: true})
    if(updateUser[0] === 0) return res.status(404).json({message: "user not found"});

    return res.json(updateUser[1][0]);
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};