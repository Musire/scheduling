import dynamic from 'next/dynamic';

type PanelProps = {
  data?: any;
};

export const PANEL_REGISTRY: Record<string, React.ComponentType<PanelProps>> = {
    'create-shift': dynamic(() => import('@/domains/shifts/components/CreateShiftForm')),
    'requirement-details': dynamic(() => import('@/domains/requirements/components/RequirementDetails')),
    'user-details': dynamic(() => import('@/domains/users/components/UserDetails'))
};

