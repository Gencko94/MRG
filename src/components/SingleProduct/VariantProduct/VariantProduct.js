import React from 'react';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';
import VariantImageZoom from './VariantImageZoom';
import VariantMiddleSection from './VariantMiddleSection';
import VariantRightSection from './VariantRightSection';

export default function VariantProduct({
  data,
  reviews,
  reviewsLoading,
  setSideMenuOpen,
  setDetailsTab,
}) {
  const { addToCartMutation, addToWishListMutation } = React.useContext(
    CartAndWishlistProvider
  );
  const { deliveryCountry } = React.useContext(DataProvider);
  const { userId } = React.useContext(AuthProvider);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [itemInCart, setItemInCart] = React.useState(false);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(false);

  const [selectedVariation, setSelectedVariant] = React.useState(() => {
    return Object.keys(data.new_variation_addons)[0];
  });
  const [selectedOption, setSelectedOption] = React.useState(() => {
    let keys = {};
    Object.keys(data.new_variation_addons).forEach(variation => {
      keys[variation] = 0;
    });
    return keys;
  });
  const handleAddToCart = async quantity => {
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: data.id, quantity };
        await addToCartMutation({ newItem, userId, deliveryCountry });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        console.clear();

        console.log(error.response);
        if (error.response.data.message === 'Item founded on the Cart') {
          setItemInCart(true);
        }
        setAddToCartButtonLoading(false);
      }
    } else {
    }
  };
  const handleAddToWishList = async () => {
    setAddToWishListButtonLoading(true);
    try {
      await addToWishListMutation({ id: data.id, userId });
      setAddToWishListButtonLoading(false);
      setItemInWishList(true);
    } catch (error) {
      console.clear();
      if (error.response.data.message === 'Item founded on the Wishlist') {
        setItemInWishList(true);
      }
      setAddToWishListButtonLoading(false);
      console.log(error.response);
    }
  };

  return (
    <div className="single-product__container-desktop">
      <div>
        <VariantImageZoom
          data={data}
          selectedVariation={selectedVariation}
          selectedOption={selectedOption}
        />
      </div>

      <VariantMiddleSection
        selectedVariation={selectedVariation}
        data={data}
        deliveryCountry={deliveryCountry}
        setSelectedVariant={setSelectedVariant}
        reviewsLoading={reviewsLoading}
        ratingCount={reviews?.ratingCount}
        averageRating={reviews?.averageRating}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setDetailsTab={setDetailsTab}
      />
      <VariantRightSection
        handleAddToCart={handleAddToCart}
        handleAddToWishList={handleAddToWishList}
        addToCartButtonLoading={addToCartButtonLoading}
        addToWishListButtonLoading={addToWishListButtonLoading}
        itemInCart={itemInCart}
        itemInWishList={itemInWishList}
        userId={userId}
      />
    </div>
  );
}