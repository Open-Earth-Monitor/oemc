import { isArray } from 'lodash-es';

type Publication = {
  title: string | null;
  url: string | null;
};

export function getValidPublications(publications: Publication[]): Publication[] | null {
  if (!publications || !publications.length || !isArray(publications)) return [];
  return publications?.filter(
    (publication) => publication.title !== null && publication.url !== null
  );
}
