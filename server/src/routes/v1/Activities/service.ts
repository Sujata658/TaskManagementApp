import { ActivityModel } from "./model";

const ActivitiesService = {
    async getActivities(user:string) {
        const activities = await ActivityModel.find({
            author: user,
        });
        return activities;
    },
};
export default ActivitiesService;