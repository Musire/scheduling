import dynamic from 'next/dynamic';

export const PANEL_REGISTRY: Record<string, React.ComponentType> = {
    'test-component': dynamic(() => import('./TestComponent'))
};