import { postRequest } from "../axios";
/**
 * Api call
 */
class authService {

    signUp = async (payload) => {
        return await postRequest('auth/sign-up', payload);
    }

    getLogin = async (payload) => {
        return await postRequest('auth/login', payload);
    }
}

const instance = new authService();

export default instance;