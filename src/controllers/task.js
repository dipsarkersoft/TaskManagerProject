const {createTaskServices,deleteTaskServices,
    updateTaskServices,taskListBystatusServices,taskListCountServices

}=require("../services/taskServices")



exports.createTask=async (req,res)=>{

    try{
        const email=req.email
        const{title,description,status}=req.body

        const body={
            email,title,description,status
              }
              const result=await createTaskServices(body)
        res.status(200).json({
            status:"sucess",
            data:result
        })

    }
    catch (e) {
        res.status(400).json({
            status:"failed",
            data:e.message
        })

    }
}


exports.deleteTask=async (req,res)=>{

    try{
        const id=req.params.id
        const result=await deleteTaskServices(id)
        res.status(200).json({
            status:"sucess",
            data:result
        })
   }


   catch (e) {
       res.status(400).json({
           status:"failed",
           message:e.message
       })

}

}


exports.updateTask=async(req,res)=>{

    try{
        const id=req.params.id
        const status=req.params.status
        const query={_id:id}
        const body={ status:status
        }
        const result=await updateTaskServices(query, body)

        res.status(200).json({
            status:"sucess",
            data:result

        })

    }
    catch (e) {

        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}

exports.taskListBystatus=async(req,res)=>{

    try{
        const email=req.email
        const status=req.params.status

        const result=await taskListBystatusServices({email,status})

        res.status(200).json({
            status:"sucess",
            data:result

        })

    }
    catch (e) {

        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}

exports.taskListCount=async(req,res)=>{

    try{
        const email=req.email

        const result=await taskListCountServices(email)

        res.status(200).json({
            status:"sucess",
            data:result

        })

    }
    catch (e) {

        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}