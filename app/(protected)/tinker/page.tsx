import TestComponent from "@/features/tinker/components/TestComponent";

const mockItems = [
  {
    id: 'mock-item-001',
    value: 'value-001'
  },
  {
    id: 'mock-item-002',
    value: 'value-002'
  },
  {
    id: 'mock-item-003',
    value: 'value-003'
  },
]

export default function TestPage () {
    return (
        <TestComponent items={mockItems} />
    );
}