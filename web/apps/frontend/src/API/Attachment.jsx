import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    CPS_ATTACHMENTS_API_ENDPOINT,
    CPS_ATTACHMENT_API_ENDPOINT,
} from "../Constants/API";


export function getAttachmentListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);

    // The following code will generate the query parameters for the url based on the map.
    let aURL = CPS_ATTACHMENTS_API_ENDPOINT;
    filtersMap.forEach(
        (value, key) => {
            let decamelizedkey = decamelize(key)
            if (aURL.indexOf('?') > -1) {
                aURL += "&"+decamelizedkey+"="+value;
            } else {
                aURL += "?"+decamelizedkey+"="+value;
            }
        }
    )

    axios.get(aURL).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Bugfixes.
        // console.log("getAttachmentListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    item.issueCoverDate = DateTime.fromISO(item.issueCoverDate).toLocaleString(DateTime.DATETIME_MED);
                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    // console.log(item, index);
                }
            )
        }
        // console.log("getAttachmentListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postAttachmentCreateAPI(formdata, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);

    axios.post(CPS_ATTACHMENTS_API_ENDPOINT, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
    }).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getAttachmentDetailAPI(submissionID, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);
    axios.get(CPS_ATTACHMENT_API_ENDPOINT.replace("{id}", submissionID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function putAttachmentUpdateAPI(id, data, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);

    axios.put(CPS_ATTACHMENT_API_ENDPOINT.replace("{id}", id), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
    }).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function deleteAttachmentAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback, onUnauthorizedCallback) {
    const axios = getCustomAxios(onUnauthorizedCallback);
    axios.delete(CPS_ATTACHMENT_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}
