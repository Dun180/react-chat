import { prop } from '@typegoose/typegoose'
import { EntityModel} from "@midwayjs/typegoose";

@EntityModel()
export class User {

  public _id?: string;

  @prop()
  public username?: string;

  @prop()
  public password?: string;

  @prop()
  public name?: string;

}
