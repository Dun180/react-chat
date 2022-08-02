import {Body, Controller, Inject, Post} from "@midwayjs/decorator";
import {Group} from "../entity/group";
import {GroupService} from "../service/group.service";

@Controller('/group')
export class GroupController {

  @Inject()
  groupService:GroupService;

  @Post('/add')
  async addGroup(@Body() group: Group){
    return this.groupService.insert(group)
  }

}
