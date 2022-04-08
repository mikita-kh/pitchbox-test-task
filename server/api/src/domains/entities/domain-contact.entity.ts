import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Domain } from './domain.entity';

@Entity('domain_contact', { schema: 'pb_interview' })
export class DomainContact {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'first_name', nullable: true, length: 45 })
    firstName: string | null;

    @Column('varchar', { name: 'last_name', nullable: true, length: 45 })
    lastName: string | null;

    @Column('varchar', { name: 'email', nullable: true, length: 100 })
    email: string | null;

    @Column('tinyint', { name: 'confidence', nullable: true })
    confidence: number | null;

    @ManyToOne(() => Domain, (domain) => domain.contacts)
    @JoinColumn({ name: 'domain_id' })
    domain: Domain;
}
