'use client';

import DrawerTemplate from "./DrawerTemplate";

export default function TestComponent () {
    
    const handleDelete = () => {
        console.log('this is a test delete function')
    }
    const handleEdit = () => {
        console.log('this is a test edit function')
    }
    return (
        <DrawerTemplate
            onDelete={handleDelete}
            onEdit={handleEdit}
        >
            <p className="">this is a test component</p>
        </DrawerTemplate>
    );
}