export const httpResponse = (statusCode: number, body: any): any => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Credentials': true
        }
    };
};
