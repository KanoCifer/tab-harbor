'use strict';

(function attachListOrder(globalScope) {
  function normalizeOrderIds(orderIds) {
    if (!Array.isArray(orderIds)) return [];
    return orderIds.map(id => String(id)).filter(Boolean);
  }

  function reorderSubsetByIds(items, orderIds, includeItem) {
    if (!Array.isArray(items)) return [];

    const list = items.slice();
    const shouldInclude = typeof includeItem === 'function' ? includeItem : () => true;
    const subset = list.filter(shouldInclude);
    const normalizedOrder = normalizeOrderIds(orderIds);

    if (!subset.length || subset.length !== normalizedOrder.length) return list;

    const subsetMap = new Map(subset.map(item => [String(item.id), item]));
    if (subsetMap.size !== subset.length) return list;
    if (normalizedOrder.some(id => !subsetMap.has(id))) return list;

    let nextIndex = 0;
    return list.map(item => {
      if (!shouldInclude(item)) return item;
      const reorderedItem = subsetMap.get(normalizedOrder[nextIndex]);
      nextIndex += 1;
      return reorderedItem || item;
    });
  }

  const api = {
    normalizeOrderIds,
    reorderSubsetByIds,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  globalScope.TabOutListOrder = api;
})(typeof globalThis !== 'undefined' ? globalThis : window);
