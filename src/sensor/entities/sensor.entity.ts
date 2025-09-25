import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
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

    //Esta columna si es true el valor se almacena en la tabla online y 
    // en la tabla de historicos en la base de datos cada vez que se lee un nuevo valor
    @Column({default:true})
    historico!: boolean;

    @Column({nullable: true})
    descripcion?: string;

    @Column({type: "enum", enum: SensorDato, nullable: false})
    tipo_dato!: SensorDato;

    @Column({type: "enum", enum: SensorType, nullable: false})
    tipo_sensor!: SensorType;

    //Representa el color de las curvas de los graficos
    @Column({type: "enum", enum: SensorColor, nullable: false})
    color_front!: SensorColor;

    @Column({default: 20.0})
    max_grafico!: number;

    @Column({default: -10.0})
    min_grafico!: number;

    //Esta colomuna es interna y solo se utiliza para ordenar la lista para devolver las consultas
    @Index()
    @Column({default: "A"})
    orden!: string;
    
    //Son los valores que toman los sensores y SOLO se actualiza con el SCADA
    @Column({ nullable: true })
    value!: string;

    //Es la fecha y hora en la que se actualizan los valores y SOLO se actualiza con el SCADA
    @Column({ nullable: true })
    fecha_hora_value!: Date;

    //Esta Columna es el color de fondo para cuando el sensor es un estado
    //Representa un color en cadena hexadecimal, por ejemplo #FFFFFF es blanco
    //Solo se actualiza con el SCADA
    @Column({nullable: true, default: "#FFFFFF"})
    color_fondo?: string;

    //Esta Columna es el color de fuente para cuando el sensor es un estado
    //Representa un color en cadena hexadecimal, por ejemplo #000000 es negro
    //Solo se actualiza con el SCADA
    @Column({nullable: true, default: "#000000"})
    color_fuente?: string;

    @ManyToOne(() => FrigorificoEntity, (frigorifico) => frigorifico.sensors)
    @JoinColumn({ name: "frigorifico_id" })
    frigorifico!: FrigorificoEntity;

    @ManyToOne(() => CamaraEntity, (camara) => camara.sensors)
    @JoinColumn({ name: "camara_id" })
    camara!: CamaraEntity;

    @OneToMany(() => ValorEntity, (valor) => valor.sensor)
    valores!: ValorEntity[];

}