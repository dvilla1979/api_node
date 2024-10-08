import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { FrigorificoEntity } from '../../frigorifico/entities/frigorifico.entity';
import { CamaraEntity } from "../../camara/entities/camara.entity";
import { ValorEntity } from "../../valor/entities/valor.entity";
import { SensorColor, SensorDato, SensorType } from "../dto/sensor.dto";

@Entity({name: "sensor"})
export class SensorEntity extends BaseEntity {

    @Column()
    name_db!: string;

    @Column()
    name_front!: string;

    @Column({nullable: true})
    descripcion?: string;

    @Column({type: "enum", enum: SensorDato, nullable: false})
    tipo_dato!: SensorDato;

    @Column({type: "enum", enum: SensorType, nullable: false})
    tipo_sensor!: SensorType;

    @Column({type: "enum", enum: SensorColor, nullable: false})
    color_front!: SensorColor;

    @ManyToOne(() => FrigorificoEntity, (frigorifico) => frigorifico.sensors)
    @JoinColumn({ name: "frigorifico_id" })
    frigorifico!: FrigorificoEntity;

    @ManyToOne(() => CamaraEntity, (camara) => camara.sensors)
    @JoinColumn({ name: "camara_id" })
    camara!: CamaraEntity;

    @OneToMany(() => ValorEntity, (valor) => valor.sensor)
    valores!: ValorEntity[];

}