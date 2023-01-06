const Result = require("../model/resultModel")

exports.createResult = async (req , res , next) =>{
      await Result.create(req.body)
      res.send({success:true , message: "result published succesfull"})
}

exports.getPeroid = async (req , res , next) =>{
      const peroid = await Result.find()
      const lastPeroid = peroid[peroid.length - 1]
      res.send({success: true, peroid: lastPeroid.peroid + 1})
}

exports.getAllResult = async (req , res , next) =>{
      const result = await Result.find()
       res.send({success: true , result})
}