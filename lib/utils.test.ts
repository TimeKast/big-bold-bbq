import { describe, expect, it } from 'vitest';

import { cn, formatPhone } from './utils';

describe('formatPhone', () => {
  it('formats a valid E.164 US number as (NPA) NXX-XXXX', () => {
    expect(formatPhone('+17025550100')).toBe('(702) 555-0100');
  });

  it('returns the input unchanged when it does not match the expected shape', () => {
    expect(formatPhone('not-a-phone')).toBe('not-a-phone');
  });
});

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('text-firebrick', 'font-bold')).toBe('text-firebrick font-bold');
  });

  it('resolves conflicting Tailwind utilities in favor of the later one', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
