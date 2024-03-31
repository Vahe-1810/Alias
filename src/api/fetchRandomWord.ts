import { Languages } from 'types';
import { WORDS_URL } from '@env';

export async function fetchRandomWord(ln: Languages, count: number): Promise<string[]> {
  try {
    const query = new URLSearchParams({ limit: count.toString(), ln: ln });
    console.log(WORDS_URL, query);
    const response = await fetch(`${WORDS_URL}${query}`);
    return await response.json();
  } catch (error) {
    console.warn('Error:', error);
    return [];
  }
}
