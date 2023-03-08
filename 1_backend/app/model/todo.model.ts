import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
	timestamps: false,
	tableName: 'Todos',
})

export class Todos extends Model {
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
	Description!: string
}