import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
	timestamps: false,
	tableName: 'Stories',
})

export class Stories extends Model {
	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	UUID!: string;
	
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	Name!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	Status!: string;
}