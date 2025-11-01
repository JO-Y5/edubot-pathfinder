/**
 * Simple A/B testing helper
 * Assigns users to group A or B and persists the choice in localStorage
 */
export function assignAB(): 'A' | 'B' {
  const key = 'ab_group';
  const stored = localStorage.getItem(key);
  
  if (stored === 'A' || stored === 'B') {
    return stored as 'A' | 'B';
  }
  
  const group = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(key, group);
  return group as 'A' | 'B';
}

/**
 * Get current A/B test group
 */
export function getABGroup(): 'A' | 'B' | null {
  const stored = localStorage.getItem('ab_group');
  return stored === 'A' || stored === 'B' ? stored : null;
}

/**
 * Clear A/B test assignment (for testing)
 */
export function clearABGroup(): void {
  localStorage.removeItem('ab_group');
}
