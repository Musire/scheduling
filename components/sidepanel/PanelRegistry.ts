import dynamic from 'next/dynamic';

export type PanelProps = {
  data?: any;
};


export const PANEL_REGISTRY: Record<string, React.ComponentType<PanelProps>> = {
    'test-component': dynamic(() => import('./TestComponent')),
    'create-shift': dynamic(() => import('@/domains/shifts/components/CreateShiftForm')),
    'update-shift': dynamic(() => import('@/domains/shifts/components/UpdateShiftForm')),
    'create-user': dynamic(() => import ('@/domains/users/components/CreateUserForm')),
    'update-user': dynamic(() => import ('@/domains/users/components/UpdateUserForm')),
    'create-role': dynamic(() => import ('@/domains/areas/components/CreateRoleForm')),
    'update-role': dynamic(() => import ('@/domains/areas/components/CreateRoleForm')),
    'create-area': dynamic(() => import ('@/domains/areas/components/CreateAreaForm')),
    'update-area': dynamic(() => import ('@/domains/areas/components/UpdateAreaForm')),
    'create-requirement': dynamic(() => import("@/domains/requirements/components/CreateRequirementForm")),
    'update-requirement': dynamic(() => import('@/domains/requirements/components/UpdateRequirementForm') )
};