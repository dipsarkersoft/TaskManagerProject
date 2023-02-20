const taskModel=require("../models/taskModel")

exports.createTaskServices=async(body)=>{
     return taskModel.create(body)

}

exports.deleteTaskServices=async(id)=>{
     return taskModel.deleteOne({_id: id})

}

exports.updateTaskServices=async(query,body)=>{
     return taskModel.updateOne(query,body)

}

exports.taskListBystatusServices=async({email,status})=>{
     return taskModel.aggregate([
          {$match:{status:status,email:email}},
          {$project:{_id:1,title:1,description:1,status:1,email:1,
                    createdAt:{
               $dateToString:{
                    date:"$createdAt",
                    format:`%d-%m-%Y`
               }
                    }}}
     ])
}

exports.taskListCountServices=async(email)=>{

     return taskModel.aggregate([
          {$match:{email:email}},
          {$group:{_id:"$status",sum:{$count:{}}}}
  ])
}