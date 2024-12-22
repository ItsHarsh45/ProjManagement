import * as React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <div className="space-y-4">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex gap-2 border-b border-gray-200">
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  parentValue?: string;
  onValueChange?: (value: string) => void;
}

export function TabsTrigger({ value, children, parentValue, onValueChange }: TabsTriggerProps) {
  const isActive = parentValue === value;

  return (
    <button
      onClick={() => onValueChange?.(value)}
      className={`px-4 py-2 font-medium transition-colors relative ${
        isActive 
          ? 'text-indigo-600 border-b-2 border-indigo-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  parentValue?: string;
}

export function TabsContent({ value, children, parentValue }: TabsContentProps) {
  if (parentValue !== value) return null;

  return (
    <div className="py-4">
      {children}
    </div>
  );
}