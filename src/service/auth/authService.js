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
        return await putRequest('auth/update-password', payload);
    }


    
    // addTaxfile = async (payload) => {
    //     return await postFormdata('user/upload-documents', payload);
    // }
    addTaxfile = async (payload) => {
        return await postFormdata('user/taxfile', payload);
    }
    getTaxfileList = async (payload) => {
        return await getRequest('user/taxfile', payload);
    }
    getTaxfileDetails = async (id) => {
        return await getRequest(`user/taxfile/${id}`);
    }
    updateTaxfile = async (payload) => {
        return await putRequest('user/taxfile', payload);
    }



    addClientMessage = async (payload) => {
        return await postRequest('user/message', payload);
    }
    getClientMessages = async (id) => {
        return await getRequest(`user/message/${id}`);
    }



    updateProfile = async (payload) => {
        return await putRequest('user/profile', payload);
    }
    getProfile = async (payload) => {
        return await getRequest('user/profile', payload);
    }


    sendSpouseInvitation = async (payload) => {
        return await postRequest('user/send-invitation', payload);
    }
    // acceptSpouseInvitation = async (token) => {
    //     return await getRequest(`user/accept-invitation/${token}`);
    // }
    getSpouse = async (payload) => {
        return await getRequest('user/spouse', payload);
    }


    getMaritalStatus = async (id = null) => {
        return await getRequest(`user/marital-status`);
    }
    getProvinces = async (id = null) => {
        return await getRequest(`user/provinces`);
    }
    getDocumentTypes = async (id = null) => {
        return await getRequest(`user/document-types`);
    }

}

const instance = new authService();

export default instance;