import React, { useState } from 'react';

interface DraggableItem {
  id: number;
  content: string;
}

export default function DragAndDrop() {
  const [items, setItems] = useState<DraggableItem[]>([
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
    { id: 4, content: 'Item 4' }
  ]);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);

  const handleDragStart = (item: DraggableItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    if (!draggedItem) return;

    const newItems = [...items];
    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    const targetIndex = items.findIndex(item => item.id === targetId);

    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setItems(newItems);
    setDraggedItem(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium mb-4">Drag and Drop Practice</h3>
      
      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(item.id)}
            className="p-4 bg-gray-100 rounded cursor-move hover:bg-gray-200 transition-colors"
            data-testid={`draggable-item-${item.id}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}