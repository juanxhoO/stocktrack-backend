import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

@Entity({
  name: 'inventory',
})
export class InventoryEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({ type: String, nullable: false })
  name: string | null;

  @Column({ type: String, nullable: true })
  description: string | null;

  @Column({ type: String, nullable: true })
  type: string | null;

  @Column({ type: String, nullable: true })
  reference: string | null;

  @ManyToOne(() => ProductEntity, (product) => product.inventories)
  product: ProductEntity;

  @Column({ type: Number, nullable: true })
  quantity: number | null;

  @Column({ type: String, nullable: true })
  notes: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
