import { BASE_URL } from "./environment";

export function makeServiceCall(params) {
    console.log("[serviceRequests] >> [makeServiceCall] >> params >>" + JSON.stringify(params));
    let serviceURL = BASE_URL + params.apiName;

    fetch(serviceURL)
        .then(data1 => {
            return data1.json();
        })
        .then(successResponse => {
            return params.successCallback(successResponse)
        })
        .catch(failureResponse => {
            return params.failureCallback(failureResponse)
        })
};