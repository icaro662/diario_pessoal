import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['email'])
export class Usuario{


   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   nome: string;

   @Column()
   email: string;


   @Column()
   password: string;


}
