module.exports = {
    apiLoginKey: '4puWq7L2sJ',
    transactionKey: '3Lc5436Yy4SDTsMp',
    PASSWORD_REGEX: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{2,19}$/, //a@1
    constFields: {
        US_DATE_FORMAT_REGEX: /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/, // MM/DD/YYYY
        API_BASE_URL: 'http://localhost:3005',
        UPLOAD_FILE_BASE_URL: 'http://localhost:3005/images/',
        DEFAULT_COUNTRY: 'US', // 7 days
        CONFIG_TOKEN_EXPIRES_IN: 7, // 7 days
        USER_TOKEN_EXPIRY: 7, // 7 days
        EXPIRY_TIME: 1440, // 1 day in minutes 1440
        PER_PAGE: 1000
    },
    apiAllowedMethod: [
        'POST', 'GET', 'PUT', 'OPTION', 'DELETE'
    ],
    statusCodes: {
        '200': 'OK',
        '201': 'Created',
        '400': 'Bad Request',
        '401': 'Unauthorized',
        '404': 'Not Found',
        '406': 'Not Acceptable',
        '422': 'Unprocessable Entity',
        '500': 'Internal Server Error'
    },
    level: ['easy', 'medium', 'hard'],
    Domain: ['Cognitive', 'Emotional', 'Literacy', 'Physical', 'Social'],
    Age: ['infant', 'toddler', 'preschool', 'school', 'any age'],
    apiResponseStatusCode: {
        404: 'Page not found', // The 404 error status code indicates that the REST API can’t map the client’s URI to a resource but may be available in the future. Subsequent requests by the client are permissible.
        500: 'Internal Server Error', // error from server end
        401: 'Unauthorized', // A 401 error response indicates that the client tried to operate on a protected resource without providing the proper authorization. It may have provided the wrong credentials or none at all.
        400: 'Bad Request', // 400 is the generic client-side error status, used when no other 4xx error code is appropriate.
        403: 'Forbidden', // A 403 error response indicates that the client’s request is formed correctly, but the REST API refuses to honor it.
        405: 'Method Not Allowed', // The API responds with a 405 error to indicate that the client tried to use an HTTP method that the resource does not allow.
        200: 'Success'
    },
    requestValidationMessage: {
        BAD_REQUEST: 'Invalid fields',
        TOKEN_MISSING: 'Token missing from header',
        REQUEST_FORBIDDEN: '403 Request Forbidden',
        SERVER_ERROR: 'Something went wrong',
        SUPER_ADMIN_API_KEY_MISSING: 'Api key missing from header',
        WEBSITE_API_KEY_MISSING: 'Api key missing from header',
        STATUS_INACTIVE: 'Account is inactive'
    },
    defaultResponseMessage: {
        CREATED: 'Created Successfully',
        FETCHED: 'Fetched Successfully',
        UPDATED: 'Updated Successfully',
        DELETED: 'Deleted Successfully',
        CHECKEDIN: 'Child CheckedIn Successfully',
        CHECKEDOUT: 'Child CheckedOut Successfully',
        ABSENT: 'Absent Mark Successfully',
        NOT_FOUND: 'Not Found',
        RESET: 'Attendance Reset Successfully',
        TOKEN_CREATED: 'Token generated Successfully',
        LEAVECANCELD: 'Leave Canceled Successfully ',
        LeaveAccepted: 'Leave Accepted Successfully',
        IMPORTED: 'Data Imported Successfully'
    },


    imageMessage: {
        IMAGE_CREATED: 'Image Created Successfully',
        IMAGE_FETCHED: 'Image Fetched Successfully',
        IMAGE_UPDATED: 'Image Updated Successfully',
        IMAGE_DELETED: 'Image Deleted Successfully',
        IMAGE_NOT_FOUND: 'Image Not Found'
    },
    userMessage: {
        PASSWORD_RESET_LINK: 'Password Reset Link Send Successfully',
        PASSWORD_RESEND_LINK: 'Password Resend Link Send Successfully',
        PASSWORD_SIGNUP_LINK: 'Change Password Link Send Successfully',
        SIGNUP_SUCCESS: 'Registered Success',
        LOGIN_SUCCESS: 'Login Success',
        UPDATE_SUCCESS: 'Update Success',
        DUPLICATE_EMAIL: 'User already exist with given email',
        NEW_PASSWORD: 'Token already used',
        USER_FETCHED: 'User Data Fetched Successfully',
        INVALID_PASSWORD: 'Incorrect Password',
        INVALID_CRED: 'Wrong email or password',
        PASSWORD_CHANGED: 'Password is changed',
        OLD_PASSWORD: 'Old password is not correct',
        NOT_SAME_PASS: 'New password cannot be same as old password',
        NOT_MATCHED: 'Password  does not match',
        CENTER_DUPLICATE_EMAIL: 'center already exist with given email'
    },
    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    },
}

