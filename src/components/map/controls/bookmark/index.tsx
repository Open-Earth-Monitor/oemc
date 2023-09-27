import { FC, useMemo, useState, useCallback, MouseEvent, useEffect } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Cross2Icon } from '@radix-ui/react-icons';
import { flatten, compact, trimEnd } from 'lodash-es';
import { AiFillStar } from 'react-icons/ai';

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
  const [bookmarkName, setBookmarkName] = useState('');
  const [localStorageEntries, setLocalStorageEntries] = useState(Object.entries(localStorage));
  const [bookmarksUpdate, setBookmarksUpdate] = useState(false);
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
      setBookmarksUpdate(true);
      setInputVisibility(false);
      setBookmarkName('');
    },
    [bookmarkName, url]
  );
  useEffect(() => {
    if (bookmarksUpdate) {
      setLocalStorageEntries(Object.entries(localStorage));
      setTimeout(() => setBookmarksUpdate(false), 1000);
    }
  }, [bookmarksUpdate]);

  const handleRemoveBookmark = ({ key }: { key: string }) => {
    localStorage.removeItem(`${key}`);
    setBookmarksUpdate(true);
  };

  const bookmarksList = useMemo<{ name: string; value: string }[]>(
    () =>
      flatten(
        localStorageEntries.map((entry: string[]) =>
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
    [localStorageEntries]
  );

  return (
    <Sheet>
      <SheetTrigger className="rounded-sm bg-brand-500 p-1 hover:bg-opacity-80 active:bg-opacity-80 disabled:cursor-default disabled:opacity-5">
        <AiFillStar className={CONTROL_BUTTON_STYLES.default} />
      </SheetTrigger>
      <SheetContent className="relative flex h-full flex-col bg-brand-500 bg-opacity-[0.9] pl-10">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-secondary-500">Bookmarks</SheetTitle>
          <SheetDescription className="scroll-y-auto">
            {!bookmarksList.length && <p>No bookmarks yet.</p>}

            {isInputVisible && (
              <div>
                <div className="flex items-center">
                  <AiFillStar className="h-5 w-5 text-secondary-500" />
                  <input
                    type="text"
                    value={bookmarkName}
                    placeholder="Insert bookmark name..."
                    className="w-full border-none bg-transparent py-2.5 outline-none placeholder:bg-transparent"
                    onChange={(e) => setBookmarkName(e.target.value)}
                    autoFocus={true}
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
        <div className="relative h-full overflow-y-auto">
          <ul className="after:content relative h-full flex-1 overflow-y-auto text-secondary-600">
            {!!bookmarksList.length &&
              bookmarksList.map(({ name, value }) => (
                <li
                  key={name}
                  className="border-t-0.5 flex items-center justify-between border-b border-t-[0.5px] border-dashed border-brand-50 py-2.5"
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookmarkControl;
