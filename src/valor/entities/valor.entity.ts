import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { SensorEntity } from "../../sensor/entities/sensor.entity";

@Entity({name: "valor"})
@Index('idx_sensor_fecha', ['sensor.id', 'fecha_hora_value']) // <-- esto crea el índice
export class ValorEntity extends BaseEntity {

    @Column({ length: 20 })
    value!: string;

    @Column()
    fecha_hora_value!: Date;

    @ManyToOne(() => SensorEntity, (sensor) => sensor.valores, { nullable: false })
    @JoinColumn({ name: "sensor_id"})
    sensor!: SensorEntity;

}