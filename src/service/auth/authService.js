import { postRequest, postFormdata, getRequest, putRequest } from "../axios";
/**
 * Api call
 */
class authService {

    signUp = async (payload) => {
        return await postRequest('auth/sign-up', payload);
    }

    login = async (payload) => {
        return await postRequest('auth/login', payload);
    }

    logout = async () => {
        return await postRequest('auth/logout');
    }

    // addTaxfile = async (payload) => {
    //     return await postFormdata('user/upload-documents', payload);
    // }
    addTaxfile = async (payload) => {
        return await postFormdata('user/add-taxfile', payload);
    }
    getTaxfileList = async (payload) => {
        return await getRequest('user/taxfile', payload);
    }
    getTaxfileDetails = async (id) => {
        return await getRequest(`user/taxfile/${id}`);
    }

    verifyEmail = async (payload) => {
        return await postRequest('auth/verify-email', payload);
    }

    forgotPassword = async (payload) => {
        return await postRequest('auth/forgot-password', payload);
    }

    setNewPassword = async (payload) => {
        return await postRequest('auth/new-password', payload);
    }

    updatePassword = async (payload) => {
        return await postRequest('auth/update-password', payload);
    }

    updateProfile = async (payload) => {
        return await putRequest('user/profile', payload);
    }

    getProfile = async (payload) => {
        return await getRequest('user/profile', payload);
    }

    addClientMessage = async (payload) => {
        // console.log("authservice payload", payload);
        return await postRequest('user/add-client-message', payload);
    }

    getClientMessages = async (id) => {
        return await getRequest(`user/get-client-messages/${id}`);
    }


    ////////////////////////
    //ROUTES FOR MASTERS //START HERE
    ////////////////////////
    getMaritalStatus = async (id=null) => {
        return await getRequest(`user/get-marital-status`);
    }

    getProvinces = async (id=null) => {
        return await getRequest(`user/get-provinces`,id);
    }

    getDocumentTypes = async (id) => {
        return await getRequest(`user/get-document-types`);
    }

}

const instance = new authService();

export default instance;