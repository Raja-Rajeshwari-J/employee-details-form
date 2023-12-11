const { putEmp, getEmp, deleteEmp } = require("./user.service");
module.exports = {
    putEmpDetails: (request, response) =>{
        putEmp(request.body, (err, results) =>{
            if(err){
                console.log(err);
                return response.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return response.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    getEmpDetails: (request, response) =>{
        getEmp(request.body, (err, results) =>{
            if(err){
                console.log(err);
                return response.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return response.status(200).json({
                success: 1,
                data: results,
                message: "Successfully retrived",
            });
        });
    },

    deleteEmpDetails: (request, response) =>{
        const id = request.params.id;
        deleteEmp(id, (err, results) =>{
            if(err){
                console.log(err);
                return response.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }
            return response.status(200).json({
                success: 1,
                message: "Details deleted successfully",
            });
        });
    }
};