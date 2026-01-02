import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";

import { addToBasket } from "../slices/basketSlice";
import { formatCurrency } from "../utils/currencyFormatter";

const MIN_RATING = 1;
const MAX_RATING = 5;

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function Product({
  id,
  title,
  price,
  description,
  category,
  image,
}: ProductProps) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [hasPrime, setHasPrime] = useState(true);

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  function addItemToBasket() {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    // Sending the product via an action to the redux store (= basket "slice")
    dispatch(addToBasket(product));

    toast.success(
      <>
        <span className="font-bold">Added to basket!</span>
        <br />
        {product.title.slice(0, 30)}
        {product.title.length > 30 ? "…" : ""}
      </>,
      {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 20,
        progress: undefined,
      }
    );
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 growing-hover">
      <p className="absolute top-2 right-3 text-sm italic text-gray-400">
        {category}
      </p>

      <img
        alt="product-img"
        src={image}
        width={200}
        height={200}
        style={{ objectFit: "contain" }}
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill(null)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <div className="text-xs my-2 line-clamp-2">{description}</div>

      <div className="mb-5">{formatCurrency(price * 71, "INR")}</div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            loading="lazy"
            className="mt-2 mb-2 w-12"
            src="/primeLogo.png"
            alt="Prime-logo"
          />
          <div className="text-xs text-gray-500">FREE Next-day Delivery</div>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to basket
      </button>
    </div>
  );
}

export default Product;
