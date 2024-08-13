import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { FrigorificoEntity } from "../../frigorifico/entities/frigorifico.entity";
import { SensorEntity } from "../../sensor/entities/sensor.entity";

@Entity({name: "camara"})
export class CamaraEntity extends BaseEntity {

    @Column()
    name!: string;

    @ManyToOne(() => FrigorificoEntity, (frigorifico) => frigorifico.camaras)
    @JoinColumn({ name: "frigorifico_id" })
    frigorifico!: FrigorificoEntity;

    @OneToMany(() => SensorEntity, (sensor) => sensor.camara)
    sensors!: SensorEntity[];

}