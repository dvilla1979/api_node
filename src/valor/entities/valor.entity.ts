import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { SensorEntity } from "../../sensor/entities/sensor.entity";

@Entity({name: "valor"})
export class ValorEntity extends BaseEntity {

    @Column()
    value!: string;

    @Column()
    fecha_hora_value!: Date;

    @ManyToOne(() => SensorEntity, (sensor) => sensor.valores, { nullable: false })
    @JoinColumn({ name: "sensor_id"})
    sensor!: SensorEntity;

}