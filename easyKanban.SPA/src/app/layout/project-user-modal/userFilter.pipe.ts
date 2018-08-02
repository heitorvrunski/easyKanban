import { Pipe, PipeTransform } from "../../../../node_modules/@angular/core";
import { UserInfo } from "../../_models/userinfo";

@Pipe({
    name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
    transform(users: UserInfo[], filter: string) {
        return users.filter((user) => {
            if (user.userName.toLowerCase().includes(filter.toLowerCase()) && filter != '')
                return user;
        })
    }
}