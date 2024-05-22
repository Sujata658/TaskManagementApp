import { Comment } from "routes/v1/Comments/model"
import { User } from "../../routes/v1/Users/model"
import CustomError  from "../../utils/Error"
import { messages } from "../../utils/Messages"
import { Auth } from "routes/v1/Auth/types"
import { Task } from "routes/v1/Tasks/model"

const InputValidation = {
    validateid(id: string) {
        if (!id) {
            throw new CustomError(messages.validation.param_missing, 400);
        }
        if (id.length !== 24) {
            throw new CustomError(messages.validation.id_missing, 400)
        }

    },
    validateUser(user: User) {
        if (!user.name || !user.email || !user.password) {
            throw new CustomError(messages.user.validation.missing_data, 400);
        }
        const isEmailValid = this.validateEmail(user.email);
        if (!isEmailValid) {
            throw new CustomError(messages.validation.invalid_email, 400);
        }
        const isPasswordValid = this.validatePassword(user.password);
        if (!isPasswordValid) {
            throw new CustomError(messages.validation.invalid_password, 400);
        }

        return true;

    },

    validateTask(task: Task) {
        if (!task.description || !task.title ||  !task.priority || !task.duedate ) {
            throw new CustomError(messages.task.validation.missing_data, 400)
        }

        
    },
    validateComment(comment: Comment) {
        if (!comment.content) {
            throw new CustomError(messages.comment.validation.missing_data, 400)
        }
    },

    validateEmail(email: string) {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return reg.test(email);
    },
    validatePassword(password: string) {
        // <li>At least 8 characters long.</li>
        //         <li>Contains at least one lowercase letter.</li>
        //         <li>Contains at least one uppercase letter.</li>
        //         <li>Contains at least one digit.</li>
        //         <li>Contains at least one special character among @$!%*?&.</li>
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
        return reg.test(password);
    },
    validateAuth(auth: Auth) {
        if (!auth.email || !auth.password) {
            throw new CustomError(messages.user.validation.missing_data, 400);
        }

        const isEmailValid = this.validateEmail(auth.email);
        if (!isEmailValid) {
            throw new CustomError(messages.validation.invalid_email, 400);
        }

        const isPasswordValid = this.validatePassword(auth.password);
        if (!isPasswordValid) {
            throw new CustomError(messages.validation.invalid_password, 400);
        }

        return true;
    }
}

export default InputValidation
