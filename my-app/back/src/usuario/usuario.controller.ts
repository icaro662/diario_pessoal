import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';
import { HttpCode, HttpStatus } from '@nestjs/common';


@Controller('usuario')
export class UsuarioController {


   constructor(private readonly usuarioService: UsuarioService){}


   @Post('registro')
   async create(@Body() createUsuarioDto: CreateUsuarioDto){
       return this.usuarioService.create(createUsuarioDto);
   }
   @HttpCode(HttpStatus.OK)
   @Post('login')
   async login(@Body() loginDto:CreateUsuarioDto){
       return this.usuarioService.login(loginDto);
   }
}
