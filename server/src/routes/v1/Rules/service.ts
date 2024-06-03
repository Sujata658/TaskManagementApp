import { getrules, updateRules } from "./repository"


const RuleServices = {
    async getRules(authorId:string) {
        return getrules(authorId)
    },
    async updateRules(authorId: { _id: string }) {
        return updateRules
    }
}

export default RuleServices
