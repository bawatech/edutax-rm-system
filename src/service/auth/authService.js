import { postRequest, postFormdata, getRequest } from "../axios";
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

    // addTaxfile = async (payload) => {
    //     return await postFormdata('user/upload-documents', payload);
    // }
    addTaxfile = async (payload) => {
        return await postFormdata('user/add-taxfile', payload);
    }
    getTaxfileDetails = async (id) => {
        return await getRequest(`user/taxfile-details/${id}`);
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

}

const instance = new authService();

export default instance;