import { api } from "../configs/AxiosConfig";
import Urls from "../configs/ApiUrls";

const MealsApis = {
    checkIsMealPlanDone: async () => {
        try{
            const response = await api.get(Urls.mealEndpoint.checkIsMealPlanDone);
            
            if(response.data.success === true){
                const message = response.data.payload;
                return { "message" : message.isMealPlanDone }
            }
        } catch (err) {
            const message = err.response.data.error.message;
            return { "message" : message }
        }
    }
}

export default MealsApis;