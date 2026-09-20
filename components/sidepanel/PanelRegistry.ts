import dynamic from 'next/dynamic';

export type PanelProps = {
  data?: any;
};


export const PANEL_REGISTRY: Record<string, React.ComponentType<PanelProps>> = {
    'test-component': dynamic(() => import('./TestComponent')),
    'create-shift': dynamic(() => import('@/domains/shifts/components/CreateShiftForm')),
    'update-user': dynamic(() => import ('@/domains/users/components/UpdateUserForm')),
    'create-requirement': dynamic(() => import("@/domains/requirements/components/CreateRequirementForm")),
    'update-requirement': dynamic(() => import('@/domains/requirements/components/UpdateRequirementForm') )
};