export function computePositionId(userKey: string, bookId: string): string {
  return 'user-key-' + userKey + '-book-id-' + bookId;
}
