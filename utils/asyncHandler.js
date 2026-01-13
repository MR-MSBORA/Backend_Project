// FIRST METHOD

//WHY IT IS WRITTEN
/*
we have to communicate with database for many things, now whenever i talk to database
instead of writting the connectionDB code with try-catch, i can create a utlity 
which can be called wherever and whenever it wll be required. so it will
remove unnecessary overhead.
*/ 


const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};



export {asyncHandler}


//SECOND METHOD

    // const asyncHandler = (fn) => async(req,res,next) => {
    //     try {
    //         await fn(req,res,next)
    //     } catch (error) {
    //         res.status(error.code || 500).json({
    //             success: false,
    //             message: error.message
    //         })
    //     }
    // }