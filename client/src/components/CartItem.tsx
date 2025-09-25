import React from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, name, price, imageUrl, quantity } = item;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && newQuantity <= 10) {
      updateQuantity(id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      updateQuantity(id, quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4 mb-4">
      <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-primary">{name}</h3>
        <p className="text-accent font-bold mt-1">R$ {price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={decrementQuantity}
          disabled={quantity <= 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </Button>
        
        <Input
          type="number"
          min="1"
          max="10"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-14 h-8 text-center p-0"
        />
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={incrementQuantity}
          disabled={quantity >= 10}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
      </div>
      
      <div className="text-right ml-2">
        <p className="font-bold">R$ {(price * quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-red-500 p-0 h-auto mt-1"
          onClick={() => removeFromCart(id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
