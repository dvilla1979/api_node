import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { FrigorificoEntity } from '../../frigorifico/entities/frigorifico.entity';
import { RoleType } from "../dto/user.dto";

@Entity({name: "users"})
export class UserEntity extends BaseEntity {

    @Column()
    username!: string;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @Column({select: false})
    password!: string;

    @Column({nullable: true})
    jobPositions?: string;

    @Column()
    numberPhone!: number;     

    @Column({type: "enum", enum: RoleType, nullable: false})
    role!: RoleType;

    @ManyToMany(() => FrigorificoEntity, (frigorifico) => frigorifico.users)
    @JoinTable()
    frigorifico!: FrigorificoEntity[];

}