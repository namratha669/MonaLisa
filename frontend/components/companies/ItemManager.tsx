"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Item } from "@/types/item";
import { Conflict } from "@/types/conflict";
import { getItemsForCompany, addItem, removeItem, getConflicts } from "@/lib/items";
import { ItemPill } from "./ItemPill";

interface ItemManagerProps {
  companyId: number;
}

export function ItemManager({ companyId }: ItemManagerProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const [itemsData, conflictsData] = await Promise.all([
      getItemsForCompany(companyId),
      getConflicts(),
    ]);
    setItems(itemsData);
    setConflicts(conflictsData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [companyId]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemName.trim()) return;
    await addItem(newItemName.trim(), companyId);
    setNewItemName("");
    await loadData();   // refresh both items AND conflicts, since adding an
                          // item might newly create a conflict
  }

  async function handleRemove(itemId: number) {
    await removeItem(itemId);
    await loadData();
  }

  // Quick lookup: for a given item name, find its conflict record if one exists.
  function findConflict(itemName: string): Conflict | undefined {
    return conflicts.find((c) => c.item_name === itemName);
  }

  if (loading) return <p className="text-xs text-ink-muted">Loading items...</p>;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <ItemPill
            key={item.id}
            itemId={item.id}
            itemName={item.name}
            currentCompanyId={companyId}
            conflict={findConflict(item.name)}
            onRemove={handleRemove}
          />
        ))}
        {items.length === 0 && (
          <p className="text-xs text-ink-muted">No items added yet.</p>
        )}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add item (e.g. Pizza)"
          className="bg-white/5 border border-border rounded-lg px-3 py-1.5 text-xs text-ink-primary placeholder:text-ink-muted outline-none focus:border-accent-purple/50 flex-1"
        />
        <button
          type="submit"
          className="flex items-center gap-1 text-xs text-accent-purple hover:text-accent-purple/80 px-2"
        >
          <Plus size={14} /> Add
        </button>
      </form>
    </div>
  );
}