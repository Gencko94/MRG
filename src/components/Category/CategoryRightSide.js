import React from 'react';
import ContentLoader from 'react-content-loader';
import CategoryItemLoader from './CategoryItemLoader';
import CategoryProductItem from './CategoryProductItem';
import SortInfoPanel from './SortInfoPanel';
import VariantCategoryProductItem from './VariantCategoryProductItem';

export default function CategoryRightSide({
  products,
  productsLoading,
  categoryInfoLoading,
  handleSortBy,
}) {
  console.log(products);
  if (productsLoading || categoryInfoLoading) {
    return (
      <div className="py-2">
        <ContentLoader
          speed={2}
          viewBox="0 0 752 38"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="38" />
        </ContentLoader>
        <div className="search-page-items__grid py-2  min-h-screen">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return <CategoryItemLoader key={i} />;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="py-2">
      <SortInfoPanel handleSortBy={handleSortBy} />
      {products.length !== 0 && (
        <div className="category-page-items__grid py-2 ">
          {products.map(item => {
            return item.type === 'simple' ? (
              <CategoryProductItem key={item.id} item={item} />
            ) : (
              <VariantCategoryProductItem key={item.id} item={item} />
            );
          })}
        </div>
      )}
    </div>
  );
}
