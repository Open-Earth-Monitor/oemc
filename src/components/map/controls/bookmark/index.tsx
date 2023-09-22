import { FC, useMemo, useState, useCallback, MouseEvent } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Cross2Icon } from '@radix-ui/react-icons';
import { flatten, compact, trimEnd } from 'lodash-es';
import { AiFillStar } from 'react-icons/ai';
import { useLocalStorage } from 'usehooks-ts';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const BookmarkControl: FC = () => {
  const [bookmarkList] = useLocalStorage('map-bookmarks', '');
  const [bookmarkName, setBookmarkName] = useState('');
  const [isInputVisible, setInputVisibility] = useState(false);

  const pathname = usePathname();
  const path = trimEnd(pathname, '/');
  const params = useSearchParams();
  const url = !!params.get('layers')
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}?layers=${params.get('layers')}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
  const handleSaveBookmark = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      localStorage.setItem(`BookmarkStorage-${bookmarkName}`, url);
    },
    [bookmarkName, url]
  );

  const handleRemoveBookmark = useCallback(
    ({ key }: { key: string }) => localStorage.removeItem(`BookmarkStorage-${key}`),
    []
  );

  const bookmarksList = useMemo<{ name: string; value: string }[]>(
    () =>
      flatten(
        Object.entries(localStorage).map((entry: string[]) =>
          compact(
            flatten(
              entry.map((item: string) => {
                if (item.includes('BookmarkStorage')) {
                  return {
                    name: entry[0],
                    value: entry[1],
                  };
                } else return null;
              })
            )
          )
        )
      ),
    []
  );

  return (
    <Sheet>
      <SheetTrigger className="rounded-sm bg-brand-500 p-1 hover:bg-gray-700 active:bg-gray-600 disabled:cursor-default disabled:opacity-5">
        <AiFillStar className={CONTROL_BUTTON_STYLES.default} />
      </SheetTrigger>
      <SheetContent className="top-[56px] bg-brand-150 bg-opacity-95 pl-10">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-secondary-500">Bookmarks</SheetTitle>
          <SheetDescription>
            {!bookmarkList.length && <p>No bookmarks yet.</p>}

            {isInputVisible && (
              <div>
                <div className="flex items-center">
                  <AiFillStar className="h-5 w-5 text-secondary-500" />
                  <input
                    type="text"
                    placeholder="Insert bookmark name..."
                    className="w-full border-none bg-transparent py-2.5 outline-none placeholder:bg-transparent"
                    onChange={(e) => setBookmarkName(e.target.value)}
                  />
                </div>
                <p className="py-4 pl-7">{url}</p>
                <div className="flex space-x-4 py-6">
                  <Button
                    type="submit"
                    onClick={(e) => handleSaveBookmark(e)}
                    className="flex w-full items-center"
                    disabled={!bookmarkName}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setInputVisibility(false)}
                    className="flex w-full items-center"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        {!isInputVisible && (
          <Button className="my-7 w-full" onClick={() => setInputVisibility(!isInputVisible)}>
            Bookmark current URL
          </Button>
        )}
        <ul className="text-secondary-600">
          {!!bookmarksList.length &&
            bookmarksList.map(({ name, value }) => (
              <li
                key={name}
                className="flex items-center justify-between border-b border-t border-dashed border-gray-50 py-2.5"
              >
                <span className="flex items-center space-x-2">
                  <AiFillStar className="h-5 w-5 text-secondary-500" />

                  <Link href={value}>{name}</Link>
                </span>
                <button type="button" onClick={() => handleRemoveBookmark({ key: name })}>
                  <Cross2Icon className="h-3 w-3 text-secondary-500" />
                </button>
              </li>
            ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default BookmarkControl;
