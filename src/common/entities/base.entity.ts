import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @CreateDateColumn({ 
        type: 'timestamp',
        select: false
    })
    created_at: Date;

    @UpdateDateColumn({ 
        type: 'timestamp',
        select: false 
    })
    updated_at: Date;

    @DeleteDateColumn({ 
        type: 'timestamp', nullable: true,
        select: false 
    })
    deleted_at: Date | null;
}