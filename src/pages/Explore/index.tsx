import { useState } from 'react';
import { PageContainer } from '../../components/layout';
import { SearchBar } from './components/SearchBar';
import { BlogList } from './components/BlogList';
import { BookmarkToggle } from './components/BookmarkToggle';

export function Explore() {
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Explore Articles</h1>
          <BookmarkToggle 
            active={showBookmarked} 
            onChange={setShowBookmarked} 
          />
        </div>

        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          className="mb-8"
        />

        <BlogList 
          searchTerm={searchTerm}
          showBookmarked={showBookmarked}
        />
      </div>
    </PageContainer>
  );
}