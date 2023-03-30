import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
	timestamps: false,
	tableName: 'Tasks',
})

export class Tasks extends Model {
	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	UUID!: string;

	@Column({
		type: DataType.UUID,
		allowNull: false
	})
	StoryUUID!: string;
	
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	Name!: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	Estimate!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	Status!: string;
}