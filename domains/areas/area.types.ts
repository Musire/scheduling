

export type AreaWithRoles = {
    name: string;
    id: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    roles: {
        name: string;
        id: string;
    }[];
    _count: {
        roles: number;
    };
}


