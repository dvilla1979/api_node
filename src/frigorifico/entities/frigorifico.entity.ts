import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { CamaraEntity } from "../../camara/entities/camara.entity";
import { SensorEntity } from "../../sensor/entities/sensor.entity";

@Entity({name: "frigorigico"})
export class FrigorificoEntity extends BaseEntity {

    @Column()
    name!: string;

    @ManyToMany(() => UserEntity, (user) => user.frigorifico)
    users!: UserEntity[];

    @OneToMany(() => CamaraEntity, (camara) => camara.frigorifico)
    camaras!: CamaraEntity[];

    @OneToMany(() => SensorEntity, (sensor) => sensor.frigorifico)
    sensors!: SensorEntity[];


}