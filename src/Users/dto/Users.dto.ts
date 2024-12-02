import { PartialType } from "@nestjs/swagger";
import { registerUserDTO } from "src/Auth/dto/auth.dto";

export class updateUserDTO extends PartialType(registerUserDTO) {}
