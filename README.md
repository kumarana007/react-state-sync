# react-state-sync

A lightweight, zero-dependency React hook for synchronizing state across browser tabs and local storage using the BroadcastChannel API.

## Features
- ⚡ **Zero Dependencies:** Pure React implementation with no external runtime bloat.
- 🔄 **Real-Time Cross-Tab Sync:** Synchronizes state instances across tabs with sub-millisecond event dispatch.
- 💾 **Persistent Fallback:** Graceful fallback to `localStorage` when offline or on legacy engines.

## Installation

```bash
npm install react-state-sync



import React from 'react';
import { useSharedState } from 'react-state-sync';

function Counter() {
  const [count, setCount] = useSharedState('app_counter', 0);

  return (
    <div>
      <p>Shared Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Across Tabs</button>
    </div>
  );
}
