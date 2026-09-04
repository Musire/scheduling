import dynamic from 'next/dynamic';

export const PANEL_REGISTRY: Record<string, React.ComponentType> = {
    'test-component': dynamic(() => import('./TestComponent')),
    'create-schedule': dynamic(() => import('@/forms/CreateScheduleForm')),
    'create-shift': dynamic(() => import('@/forms/CreateShiftForm'))
};