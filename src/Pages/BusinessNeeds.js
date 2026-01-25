import React from "react";
import { useNavigate } from "react-router-dom";

const BusinessNeedsExact = () => {
  const navigate = useNavigate();
  
  // Updated products array with correct images
  const products = [
    { 
      name: "Prescription Pads", 
      price: "From ₹750/-",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/prescription/prescription-153-600x800.webp"
    },
    { 
      name: "Bill Books", 
      price: "From ₹750/-",
      image: "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp"
    },
    { 
      name: "Letterheads", 
      price: "From ₹600/-",
      image: "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-letterheads.webp"
    },
    { 
      name: "Cash Receipts", 
      price: "From ₹750/-",
      image: "https://cdn.printshoppy.com/image/cache/catalog/product-image/stationery/receipt/receipt-116-600x600.webp"
    },
    { 
      name: "Notepad", 
      price: "From ₹750/-",
      image: "https://rendering.mcp.cimpress.com/v2/vp/preview?category=gal6&format=auto&quality=95&instructions_uri=https%3A%2F%2Finstructions.documents.cimpress.io%2Fv3%2Finstructions%3Apreview%3FignoreProjection%3Dtrue%26documentUri%3Dhttps%253A%252F%252Fdesign-specifications.design.vpsvc.com%252Fv2%252FrenderDocuments%252Fproducts%252FPRD-VSYISJHX%252F19%252Ftemplates%252Fs5b932ab0-0c75-4d0d-bd7d-4a6a50c8c814%253Av1..40b5a4b7-35e9-41e0-afbc-de1956a133e7%253Fculture%253Den-us%2526useFakeFamily%253Dfalse%2526requester%253Dgallery-content-query%2526optionSelections%25255Bbackside%25255D%253DCardboard%2526optionSelections%25255Bsize%25255D%253D4%2522%2Bx%2B5.5%2522%2526optionSelections%25255BProduct%2BOrientation%25255D%253DVertical&merchant_metadata=s5b932ab0-0c75-4d0d-bd7d-4a6a50c8c814%3Av1..40b5a4b7-35e9-41e0-afbc-de1956a133e7&scene=https%3A%2F%2Fcdn.scenes.documents.cimpress.io%2Fv3%2Fscenes%3Agenerate%3Fdata%3DrY%252FBasMwEET%252FZc7CSGlSgr6hlEJ6Kzko1mKL2pKR1iSp0b8XyabtpfTSyzIzaGefFlyd5R768eEo0JPreoY%252B7vYCaQgMvWAyHUErgdGk9xLwfSJocHQjchZog2e61bepNzZci2rDEGIREVoKdHVe6jTQ6iCzgPHdQDWyLrHx7WqS%252Byiikaq0TzHYua3tGyqUakd800Ltm11N0nxJHA3TD8zn4AlZrLgVzHOYY4J%252BW9AOIZGF5jiTQGIT%252BSU4X6%252FdoCEbdajN9%252FWMLG77cpjjibqRPK9d270n5%252Bk1QIC8%252Fb1rMzmLvxeVbI7%252FsfnFn8%252F5nHP%252BBA%253D%253D&width=1236&showerr=true&bgcolor=f3f3f3"
    },
      { 
      name: "Booklets", 
      price: "From ₹750/-",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_2.0,f_auto,q_auto:good,w_700/legacy_dam/en-us/S001930558/NPIB52613-Self-Cover-Booklets-ProductTile-1534x1534-Luxa"
    },  { 
      name: "Bookmarks", 
      price: "From ₹750/-",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_2.0,f_auto,q_auto:good,w_700/legacy_dam/en-us/S001922929/NPIB-17095-High&Tight-Bookmarks-Overview-Tile-001"
    },  { 
      name: "Brochures", 
      price: "From ₹750/-",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_2.0,f_auto,q_auto:good,w_700/legacy_dam/en-us/S001899639/NPIB48388-Brochure-ProductTile-001"
    },  { 
      name: "Calendars", 
      price: "From ₹750/-",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_2.0,f_auto,q_auto:good,w_700/legacy_dam/en-us/S001687534/NPIB-9928-Desk-Calendars-Overview-Tile-001?cb=b173c34825b70012e75b1bed69d6997774dfb407"
    },  { 
      name: "Catalogs", 
      price: "From ₹750/-",
      image: "https://rendering.mcp.cimpress.com/v2/vp/preview?category=gal6&format=auto&quality=95&instructions_uri=https%3A%2F%2Finstructions.documents.cimpress.io%2Fv3%2Finstructions%3Apreview%3FignoreProjection%3Dtrue%26documentUri%3Dhttps%253A%252F%252Fdesign-specifications.design.vpsvc.com%252Fv2%252FrenderDocuments%252Fproducts%252FPRD-VSYISJHX%252F19%252Ftemplates%252Fs5b932ab0-0c75-4d0d-bd7d-4a6a50c8c814%253Av1..40b5a4b7-35e9-41e0-afbc-de1956a133e7%253Fculture%253Den-us%2526useFakeFamily%253Dfalse%2526requester%253Dgallery-content-query%2526optionSelections%25255Bbackside%25255D%253DCardboard%2526optionSelections%25255Bsize%25255D%253D4%2522%2Bx%2B5.5%2522%2526optionSelections%25255BProduct%2BOrientation%25255D%253DVertical&merchant_metadata=s5b932ab0-0c75-4d0d-bd7d-4a6a50c8c814%3Av1..40b5a4b7-35e9-41e0-afbc-de1956a133e7&scene=https%3A%2F%2Fcdn.scenes.documents.cimpress.io%2Fv3%2Fscenes%3Agenerate%3Fdata%3DrY%252FBasMwEET%252FZc7CSGlSgr6hlEJ6Kzko1mKL2pKR1iSp0b8XyabtpfTSyzIzaGefFlyd5R768eEo0JPreoY%252B7vYCaQgMvWAyHUErgdGk9xLwfSJocHQjchZog2e61bepNzZci2rDEGIREVoKdHVe6jTQ6iCzgPHdQDWyLrHx7WqS%252Byiikaq0TzHYua3tGyqUakd800Ltm11N0nxJHA3TD8zn4AlZrLgVzHOYY4J%252BW9AOIZGF5jiTQGIT%252BSU4X6%252FdoCEbdajN9%252FWMLG77cpjjibqRPK9d270n5%252Bk1QIC8%252Fb1rMzmLvxeVbI7%252FsfnFn8%252F5nHP%252BBA%253D%253D&width=1236&showerr=true&bgcolor=f3f3f3"
    },
      { 
      name: "Flyers", 
      price: "From ₹750/-",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_2.0,f_auto,q_auto:good,w_700/legacy_dam/en-us/S001754398/NPIB19462-Flyers-Overview-tile"
    },  { 
      name: "Gift Vouchers", 
      price: "From ₹750/-",
      image: "https://rendering.mcp.cimpress.com/v2/vp/preview?category=gal6&format=auto&quality=95&instructions_uri=https%3A%2F%2Finstructions.documents.cimpress.io%2Fv3%2Finstructions%3Apreview%3FignoreProjection%3DFalse%26documentUri%3Dhttps%253A%252F%252Fdesign-specifications.design.vpsvc.com%252Fv2%252FrenderDocuments%252Fproducts%252FPRD-B6JFP6KC%252F30%252Ftemplates%252Fc3426482..d7374301-c641-4b32-9adf-160a2b6c7eaf%253Fculture%253Den-us%2526useFakeFamily%253Dfalse%2526requester%253Dgallery-content-query%2526optionSelections%25255BSize%25255D%253D5.5%2522%2520x%25204%2522%2526optionSelections%25255BFold%25255D%253DFolded%2526optionSelections%25255BTrim%25255D%253DStandard%2526optionSelections%25255BPaper%2520Stock%25255D%253DStandard%2520Matte%2520-%2520271gsm%2520%25252814pt%252529%2520Uncoated%2526optionSelections%25255BFoil%2520Color%25255D%253DNone%2526optionSelections%25255BBackside%25255D%253DColor%2526optionSelections%25255BProduct%2520Orientation%25255D%253DHorizontal&merchant_metadata=c3426482..d7374301-c641-4b32-9adf-160a2b6c7eaf&scene=https%3A%2F%2Fcdn.scenes.documents.cimpress.io%2Fv3%2Fassets%2Fbebc5826-74f0-4241-a92a-9e1d658cdf1e%2Fcontent&width=412&showerr=true&bgcolor=f3f3f3"
    },  { 
      name: "Magazines", 
      price: "From ₹750/-",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_60,w_500/legacy_dam/en-us/S001911374/NPIB10452-Perfect-Bound-Booklet-overview"
    },  { 
      name: "Pocket Folders", 
      price: "From ₹750/-",
      image: "https://rendering.mcp.cimpress.com/v2/vp/preview?category=gal6&format=auto&quality=95&instructions_uri=https%3A%2F%2Finstructions.documents.cimpress.io%2Fv3%2Finstructions%3Apreview%3FignoreProjection%3DFalse%26documentUri%3Dhttps%253A%252F%252Fdesign-specifications.design.vpsvc.com%252Fv2%252FrenderDocuments%252Fproducts%252FPRD-ZMIEC1QY%252F45%252Ftemplates%252Fc4575276..2ead5eae-f732-4e0a-afcc-ad45d0a989e7%253Fculture%253Den-us%2526useFakeFamily%253Dfalse%2526requester%253Dgallery-content-query%2526optionSelections%25255BSize%25255D%253D9%2522%2520x%252012%2522%2526optionSelections%25255BPaper%2520Thickness%25255D%253DStandard%2526optionSelections%25255BPaper%2520Stock%25255D%253DGlossy%2526optionSelections%25255BPaper%2520Finish%25255D%253DNone%2526optionSelections%25255BBackside%25255D%253DBlank&merchant_metadata=c4575276..2ead5eae-f732-4e0a-afcc-ad45d0a989e7&scene=https%3A%2F%2Fcdn.scenes.documents.cimpress.io%2Fv3%2Fassets%2F13b04e90-c484-4b7b-9406-d64125a186f2%2Fcontent&width=412&showerr=true&bgcolor=f3f3f3"
    },
      { 
      name: "Door Hangers", 
      price: "From ₹750/-",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,q_60,w_500/legacy_dam/en-us/S001759393/NPIB23301-Door-Hangers-PDP-Overview-tile"
    },
    { 
      name: "Envelopes", 
      price: "From ₹900/-",
      image: "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-envelopes.webp"
    },
    { 
      name: "Visiting Cards", 
      price: "₹399/- ₹299/-",
      image: "https://design-api.digitalroom.com/getTemplatePreview/d435ab739c0d091605f846d9238235c7?template_id=19640&preview_profile_code=hybrid500&page_no=1&theme_id=2233&stage_id=0&size_id=0"
    },
    { 
      name: "Pen & Keychain", 
      price: "₹599/- ₹399/-",
      image: "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp"
    },
    { 
      name: "Metal Pens", 
      price: "From ₹175/- Each*",
      image: "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp"
    },
    { 
      name: "Name Pencils", 
      price: "From ₹149/- Each Pack*",
      image: "https://cdn.printshoppy.com/image/catalog/v9/webp/home-page/regular/home-page-office-stationery-prescription-pads.webp"
    }
  ];

  const handleProductClick = (productName) => {
    if (productName === "Bill Books") {
      navigate("/billbooks");
    } else if (productName === "Envelopes") {
      navigate("/envelopes");
    } else if (productName === "Letterheads") {
      navigate("/letterheads");
    } else if (productName === "Visiting Cards") {
      navigate("/visitingcards");
    } else if (productName === "Prescription Pads") {
      navigate("/prescriptionpads");
    } else if (productName === "Cash Receipts") {
      navigate("/receipts");
    }
    // Add other product navigations here if needed
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          BUSINESS NEEDS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="group"
              onClick={() => handleProductClick(product.name)}
            >
              {/* Card with exact PrintShoppy image style */}
              <div className={`bg-white rounded-2xl p-5 border border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 ${
                product.name === "Envelopes" || product.name === "Bill Books" || product.name === "Letterheads" || product.name === "Visiting Cards" || product.name === "Prescription Pads" || product.name === "Cash Receipts" ? "cursor-pointer hover:border-blue-500" : ""
              }`}>
                
                {/* Image container like PrintShoppy */}
                <div className="mb-4 h-56 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl overflow-hidden relative">
                  {/* Main image with exact positioning */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Gradient overlay corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-200 to-transparent opacity-30 rounded-br-full"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-200 to-transparent opacity-30 rounded-tl-full"></div>
                </div>

                {/* Product info */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {product.price}
                  </div>
                </div>

                {/* Hover effect indicator */}
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessNeedsExact;