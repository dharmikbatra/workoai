const catchAsync = require("../utils/catchAsync")

exports.getOne = Model => async (req,res,next) => {
    const doc = await Model.findById(req.params.userId)
    if (doc){
        res.status(200).json({
            status:'success',
            data:{doc}
        })
    }else{
        res.status(404).json({
            status:"Not found!",
            data:'No user with this ID'
        })
    }
}


exports.getAll = Model => catchAsync(async (req,res,next) =>{
    const docs = await Model.find()
    res.status(200).json({
        status:'success',
        data:{docs}
    })
})