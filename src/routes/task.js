const express=require("express")
const router=express.Router()
const{veryfiToken}=require("../middleware/authVerifyMiddleware")

const{createTask,deleteTask,updateTask,taskListBystatus,taskListCount
}=require("../controllers/task")



router.post("/createTask",veryfiToken,createTask)
router.delete("/deleteTask/:id",veryfiToken,deleteTask)
router.get("/updateTask/:id/:status",veryfiToken,updateTask)
router.get("/taskListBystatus/:status",veryfiToken,taskListBystatus)
router.get("/taskListCount",veryfiToken,taskListCount)




module.exports=router
