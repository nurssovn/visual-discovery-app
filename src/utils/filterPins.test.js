import { filterPins, canDeletePin } from './filterPins';

const mockPins = [
  { id: '1', title: 'Art Pin', category: 'art', image: 'url', savedBy: ['@alice'] },
  { id: '2', title: 'Car Photo', category: 'car', image: 'url', savedBy: [] },
  { id: '3', title: 'No Image', category: 'art', image: '', savedBy: [] },
  { id: '4', title: 'My Art', category: 'art', image: 'url', authorId: '@bob', savedBy: [] },
];

describe('filterPins', () => {
  it('filters by search term', () => {
    const result = filterPins(mockPins, { searchTerm: 'car' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Car Photo');
  });

  it('filters by category', () => {
    const result = filterPins(mockPins, { activeCategory: 'art' });
    expect(result.map((p) => p.id)).toEqual(['1', '4']);
  });

  it('filters saved pins for current user', () => {
    const result = filterPins(mockPins, { activeCategory: 'saved', username: '@alice' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});

describe('canDeletePin', () => {
  it('allows delete when no authorId', () => {
    expect(canDeletePin({ id: '1' }, '@alice')).toBe(true);
  });

  it('allows delete for author', () => {
    expect(canDeletePin({ authorId: '@bob' }, '@bob')).toBe(true);
  });

  it('denies delete for non-author', () => {
    expect(canDeletePin({ authorId: '@bob' }, '@alice')).toBe(false);
  });
});
