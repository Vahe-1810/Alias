import i18n from 'src/locales/i18n';
import en_words from 'src/mocks/words-mock/en_words';
import hy_words from 'src/mocks/words-mock/hy_words';
import ru_words from 'src/mocks/words-mock/ru_words';
import { Languages } from 'types';

const randomInt = (n: number) => Math.floor(Math.random() * n);

const map = new Map();

const getRandomWord = (count: number) => {
  const currentLn = i18n.language as Languages;
  const result = [];
  let id: NodeJS.Timeout;
  const dict = {
    ru: [...ru_words],
    hy: [...hy_words],
    en: [...en_words],
  }[currentLn];

  const randomWord = () => {
    id && clearTimeout(id);

    const index = (function ranIndex() {
      const ranInt = randomInt(dict.length);

      if (map.has(ranInt)) ranIndex();
      else map.set(ranInt, false);

      return ranInt;
    })();

    id = setTimeout(() => {
      map.clear();
    }, 30000);

    return dict[index];
  };

  for (let i = 0; i < count; i++) {
    result.push(randomWord());
  }

  return result;
};

export default getRandomWord;
