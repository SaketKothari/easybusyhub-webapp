function Sidebar() {
  return (
    <div className="absolute z-40 bg-amazon_blue-light text-white border-2 border-gray-500 w-40 -mt-2">
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">Prime Video</p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">
        Easybusyhub Business
      </p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">Today's Deals</p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">Electronics</p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">Food & Grocery</p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">Prime</p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">Buy Again</p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">Shopper ToolKit</p>
      <p className="p-2 hover:bg-amazon_blue cursor-pointer">
        Health & Personal Care
      </p>
    </div>
  );
}

export default Sidebar;
