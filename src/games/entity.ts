// src/pages/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Game extends BaseEntity {
    
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string
 @Column('text', {nullable:true})
  color: string

  @Column('json', {nullable:true,default: [['o','o','o'],['o','o','o'],['o','o','o']]})
  board: string[][]
}