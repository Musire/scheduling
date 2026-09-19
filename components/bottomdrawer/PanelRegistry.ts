import dynamic from 'next/dynamic';

type PanelProps = {
  data?: any;
};

export const PANEL_REGISTRY: Record<string, React.ComponentType<PanelProps>> = {
    'create-shift': dynamic(() => import('@/domains/shifts/components/CreateShiftForm')),
    'user-details': dynamic(() => import('@/domains/users/components/UserDetails'))
};

