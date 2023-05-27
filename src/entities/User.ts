import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity('users')
export class User {
	@PrimaryColumn()
	id: string

	@Column({ type: 'text' })
	name: string

	@Column({ type: 'text', unique: true })
	email: string

	@Column({ type: 'text' })
	password: string

	constructor(){
		if(this.id == null || this.id == undefined){
			this.id = uuid()
		}
	}
	fromDTO(data: {name: string, email: string, password: string}){
		this.name = data.name
		this.email = data.email
		this.password = data.password
	}
}