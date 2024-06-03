import { RuleModel } from "./model"

export const getrules = (authorId:string) => {
    return RuleModel.find({author: authorId})
}

export const updateRules = (authorId: { _id: string }) => {
    return RuleModel.updateOne({ author: authorId }, { rules: { "key": ["value"] } })
}