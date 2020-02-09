import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {

    //Check for the header; if undefined, throw an error
    const authHeader = req.get('Authorization') 

    if (!authHeader) {
        const error = new Error('Not Authenticated.')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1]
    let decodedToken
    
    try {
        //Secret must be same secret used in assigning the token
        decodedToken = jwt.verify(token, 'somesupersecretstringcheckoutthedocsfordoingthisright')
    } catch (err) {
        err.statusCode = 500
        throw err
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated')
        error.statusCode = 401
        throw error
    }

    /*
        If we make it to here, then we know that we have a valid 
        token and we were able to decode it.
    */

    req.userId = decodedToken.userId
    next()
}