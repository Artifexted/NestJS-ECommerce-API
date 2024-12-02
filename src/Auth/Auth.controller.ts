import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { LoginUserDTO, registerUserDTO } from './dto/auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201, example: {
      name: "Agustin",
      email: "agustin@mail.com",
      address: "Av. Siempreviva 742",
      phone: "3411234567",
      country: "Argentina",
      city: "Rosario",
      id: "0e5c9848-65c2-4d04-b620-d110efc51388"
    }
  })
  @ApiResponse({
    status: 400, example: {
      message: [
        "country must be shorter than or equal to 20 characters",
        "country must be longer than or equal to 5 characters",
        "country must be a string"
      ],
      error: "Bad Request",
      statusCode: 400
    }
  })
  @ApiResponse({
    status: 409, example: {
      message: "User already registered.",
      error: "Conflict",
      statusCode: 409
    }
  })
  signUp(@Body() registerData: registerUserDTO) {
    const { confirmPassword, ...userWithoutConfirmPass } = registerData;

    return this.authService.signUp(userWithoutConfirmPass);
  }

  @HttpCode(200)
  @Post('signin')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200, example: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlNWM5ODQ4LTY1YzItNGQwNC1iNjIwLWQxMTBlZmM1MTM4OCIsImVtYWlsIjoiYWd1c3RpbkBtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjIyMTg2MywiZXhwIjoxNzMyMjI1NDYzfQ.ND_nC9fWEDWalJq3aMJwoKsK3UNl7t7PzJg1aJSr7sQ",
      message: "User logged successfully."
    }
  })
  @ApiResponse({
    status: 400, example: {
      message: "Invalid credentials.",
      error: "Bad Request",
      statusCode: 400
    }
  })
  signIn(@Body() loginData: LoginUserDTO) {
    return this.authService.signIn(loginData.email, loginData.password);
  }
}
