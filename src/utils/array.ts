import chunk from 'lodash/chunk';

export const generateChunks = <T>(
  array: T[],
  { chunkSize, maxChunks }: { chunkSize?: number; maxChunks: number }
): T[][] => {
  if (chunkSize) return chunk(array, chunkSize);

  if (maxChunks) {
    const expectedChunkSize = array.length / maxChunks;
    const chunks = chunk(array, expectedChunkSize);

    const lastChunk = chunks[chunks.length - 1];
    if (lastChunk.length < expectedChunkSize) {
      lastChunk.forEach((item, index) => chunks[index].push(item));
    }

    return chunks.slice(0, -1);
  }

  return [array];
};
