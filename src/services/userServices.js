const users=require("../models/userModel")


exports.createUserServices=async (Body)=>{
    return  users.create(Body)

}

exports.UserLogInServices=async (body)=>{
    return  users.aggregate([
        { $match:body },
        {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}
    ])

}
exports.updateProfileServices=async ({email},body)=>{
    return users.updateOne(email,body)
}



exports.userDetailServices=async (email)=>{
    return users.aggregate([
        {
            $match:{email}
        }
        ,{$project:
                {_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}
         }
         ])

}
