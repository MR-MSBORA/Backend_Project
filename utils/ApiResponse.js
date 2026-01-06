class ApiResponse {
    constructor( 
        statusCode,
        dat,
        message="Success"
    ){
        this.statuscode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400

    }
} 