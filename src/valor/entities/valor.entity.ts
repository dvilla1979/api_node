import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { SensorEntity } from "../../sensor/entities/sensor.entity";

@Entity({name: "valor"})
//@Index('idx_sensor_fecha', ['sensor.id', 'fecha_hora_value']) // <-- esto crea el índice
@Index("idx_sensor_fecha", ["sensor_id", "fecha_hora_value"])
export class ValorEntity /*extends BaseEntity */{

    @PrimaryColumn({ name: "sensor_id", type: "string" })
    sensor_id!: string;

    @PrimaryColumn()
    fecha_hora_value!: Date;

    @Column({ length: 20 })
    value!: string;

    @ManyToOne(() => SensorEntity, (sensor) => sensor.valores, { nullable: false })
    @JoinColumn({ name: "sensor_id"})
    sensor!: SensorEntity;

}