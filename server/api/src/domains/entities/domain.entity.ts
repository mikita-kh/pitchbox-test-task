import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DomainContact } from './domain-contact.entity';
import { UrlList } from '../../url-lists/entities/url-list.entity';

@Entity('domain', { schema: 'pb_interview' })
export class Domain {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'domain_name', length: 255 })
    domainName: string;

    @OneToMany(() => DomainContact, (contact) => contact.domain)
    contacts: DomainContact[];

    @ManyToMany(() => UrlList, (urlList) => urlList.domains)
    urlLists: UrlList[];
}
