import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Domain } from '../../domains/entities/domain.entity';

@Entity('url_list', { schema: 'pb_interview' })
export class UrlList {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('timestamp', {
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('varchar', { name: 'name', nullable: true, length: 45 })
    name: string | null;

    @ManyToMany(() => Domain, (d) => d.urlLists, { cascade: true })
    @JoinTable({
        name: 'list_domain',
        joinColumn: {
            name: 'url_list_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'domain_id',
            referencedColumnName: 'id',
        },
    })
    domains: Domain[];
}
