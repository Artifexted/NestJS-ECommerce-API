import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class registerUserDTO {
    /**
     * Nombre del usuario. Mínimo 3 caracteres. Máximo 80 caracteres.
     * @example Agustin
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
        message: 'Name must contain only letters and spaces.',
    })
    name: string;

    /**
     * eMail del usuario. Debe ser un email válido.
     * @example agustin@mail.com
     */
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    /**
     * Contraseña para el usuario. Mínimo 8 caracteres, máximo 15 caracteres. Debe incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (e.g., !@#$%^&*).
     * @example 'Nitsuga@123'
     */
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @MaxLength(15, { message: 'Password must be at most 15 characters long.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (e.g., !@#$%^&*).',
    }
    )
    password: string;

    /**
     * Confirmación de la contraseña. Debe coincidir con la contraseña anterior.
     * @example 'Nitsuga@123'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    /**
     * Dirección del usuario. Mínimo 3 caracteres, máximo 80 caracteres.
     * @example 'Av. Siempreviva 742'
     */
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\s,.-]+$/, {
        message: 'Address must contain only letters, numbers, spaces, commas, periods, and hyphens.',
    })
    address: string;

    /**
     * Número de teléfono del usuario.
     * @example 3411234567
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * País de residencia del usuario. Mínimo 5 caracteres, máximo 20 caracteres.
     * @example 'Argentina'
     */
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s-]+$/, {
        message: 'Country name must contain only letters, spaces, and hyphens.',
    })
    country: string;

    /**
     * Indicador de si el usuario es administrador. Este campo no es obligatorio.
     * @example false
     */
    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean;

    /**
     * Ciudad de residencia del usuario. Mínimo 3 caracteres, máximo 80 caracteres.
     * @example 'Rosario'
     */
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @Matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s-]+$/, {
        message: 'City must contain only letters, spaces, and hyphens.',
    })
    city: string;
}

export class LoginUserDTO extends PickType(registerUserDTO, [
    'email',
    'password'
]) { }
