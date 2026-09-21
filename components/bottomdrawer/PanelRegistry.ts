import dynamic from 'next/dynamic';

type PanelProps = {
  data?: any;
};

export const PANEL_REGISTRY: Record<string, React.ComponentType<PanelProps>> = {
    'requirement-details': dynamic(() => import('@/domains/requirements/components/RequirementDetails')),
    'area-details': dynamic(() => import("@/domains/areas/components/AreaDetails")),
    'role-details': dynamic(() => import("@/domains/roles/components/RoleDetails")),
    'user-details': dynamic(() => import('@/domains/users/components/UserDetails'))
};

