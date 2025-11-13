import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Usuario } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';




@Injectable()
export class UsuarioService {


   constructor( @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService
   ) {}


   async create(createUserDto: CreateUsuarioDto): Promise<Usuario>{
       const {nome, email, password,} = createUserDto;


       const usuarioExists = await this.usuarioRepository.findOne({where: {email}});
       if(usuarioExists){
           throw new ConflictException('Este e-mail já está em uso.')
       }


       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);


       const usuario = this.usuarioRepository.create({
           nome,
           email,
           password: hashedPassword,
       });


       try {
           await this.usuarioRepository.save(usuario);
           return usuario;
       } catch (error){
           throw new InternalServerErrorException('Erro ao salvar o usuário.')
       }
   }
   async login(loginDto: CreateUsuarioDto): Promise<{access_token:string}>{
       const {email,password} = loginDto;


       const user = await this.usuarioRepository.findOne({where: {email}});


       if(!user){
           throw new UnauthorizedException('Credenciais inválidas');
       }


       const isPasswordMatching = await bcrypt.compare(password,user.password);


       if(!isPasswordMatching){
           throw new UnauthorizedException('Credenciais inválidas');
       }


       const payload = {
           sub: user.id,
           email: user.email
       };


       const accesstoken = await this.jwtService.signAsync(payload);


       return{
           access_token:accesstoken
       };
   }
}

