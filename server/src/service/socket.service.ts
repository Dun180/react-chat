import {InjectEntityModel} from "@midwayjs/typegoose";
import {Provide} from "@midwayjs/decorator";
import {Socket} from "../entity/socket";
import {ReturnModelType} from "@typegoose/typegoose";

@Provide()
export class SocketService {

  @InjectEntityModel(Socket)
  socketModel: ReturnModelType<typeof Socket>;

  async insert(socket: Socket) {
    return await this.socketModel.create(socket);
  }

  async deleteById(id: string) {
    return await this.socketModel.deleteOne({id: id}).exec();
  }

  async selectOne(id: string) {
    return await this.socketModel.findOne({id: id}).exec();
  }
}
