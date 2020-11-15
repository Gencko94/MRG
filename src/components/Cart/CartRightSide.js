import React from 'react';
import { useIntl } from 'react-intl';
import RecentlyViewedVertical from '../RecentlyViewedVertical';
import FeaturedItemsVertical from './FeaturedItemsVertical';
import CartRightSideLoader from './loaders/CartRightSideLoader';

export default function CartRightSide({
  isLoading,
  data,
  setCheckOutModalOpen,
}) {
  const resolvePlural = () => {
    switch (data.cartItems.length) {
      case 1:
        return formatMessage({ id: 'one-item' });

      case 2:
        return formatMessage({ id: 'two-items' });

      case data.cartItems.length > 10:
        return formatMessage({ id: 'one-items' });
      default:
        return formatMessage({ id: 'multiple-items' });
    }
  };
  const { formatMessage, locale } = useIntl();
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  return (
    <div
      className="font-semibold overflow-hidden  sticky top-0"
      style={{ top: '134px' }}
    >
      {isLoading && <CartRightSideLoader locale={locale} />}
      {!isLoading && data.cartItems.length !== 0 && (
        <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
          <div className="mb-1 ">
            <div className="rounded border w-full flex  overflow-hidden">
              <input
                type="text"
                placeholder={formatMessage({ id: 'cart-enter-code-or-coupon' })}
                className="flex-1 placeholder-gray-700 text-xs p-1"
              />
              <button className="bg-main-color text-main-text px-2 py-1 text-xs">
                {formatMessage({ id: 'cart-code-button' })}
              </button>
            </div>
          </div>
          <div className="font-semibold mb-1 text-sm flex items-center">
            <h1 className="flex-1">
              {formatMessage({ id: 'cart-delivery-cost' })}
            </h1>
            <h1>{formatMessage({ id: 'cart-free' })}</h1>
          </div>
          <div className=" font-semibold flex mb-1 text-sm ">
            <h1>{formatMessage({ id: 'cart-total' })}</h1>
            <h1 className="mx-1 whitespace-no-wrap flex-1">
              (
              {locale === 'ar'
                ? data.cartItems.length > 2 && data.cartItems.length
                : `${data.cartItems.length} `}
              {resolvePlural()})
            </h1>
            <h1>{data.cartTotal}</h1> KD
          </div>
          <div className=" font-semibold flex mb-2 text-sm ">
            <h1 className="flex-1">{formatMessage({ id: 'subtotal' })}</h1>
            <h1>{data.cartTotal}</h1> KD
          </div>
          <button
            onClick={() => setCheckOutModalOpen(true)}
            className={`${
              data.cartItems.length === 0
                ? 'cursor-not-allowed bg-gray-600'
                : 'bg-green-600'
            } p-1 rounded text-gray-100 `}
            disabled={data.cartItems.length === 0}
          >
            {formatMessage({ id: 'checkout' })}
          </button>
        </div>
      )}

      {visitedItems.length > 4 ? (
        <RecentlyViewedVertical visitedItems={visitedItems} />
      ) : (
        <FeaturedItemsVertical />
      )}
    </div>
  );
}