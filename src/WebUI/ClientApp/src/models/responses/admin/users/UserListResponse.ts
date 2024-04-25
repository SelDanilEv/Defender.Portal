import { UserOnlyInfo } from "src/models/UserOnlyInfo";
import { PagedResultBase } from "src/models/base/PagedResultBase";


export default interface UserListResponse extends PagedResultBase{
  items: UserOnlyInfo[];
}

