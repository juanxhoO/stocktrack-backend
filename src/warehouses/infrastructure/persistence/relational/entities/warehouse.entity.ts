import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'warehouse',
})
export class WarehouseEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: true })
  address?: string | null;

  @Column({ type: String, nullable: true })
  phone?: string | null;

  @Column({ type: String, nullable: false })
  city: string;

  @Column({ type: String, nullable: false })
  state: string;

  @Column({ type: String, nullable: false })
  zipcode: string;

  @Column({ type: String, nullable: false })
  country: string;

  @Column({ type: Boolean, nullable: true, default: true })
  isActive?: boolean;

  @Column({ type: String, nullable: true })
  manager?: string | null;

  @Column({ type: Number, nullable: true })
  capacity?: number | null;

  @Column({ type: Boolean, nullable: true, default: false })
  hasClimateControl?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
