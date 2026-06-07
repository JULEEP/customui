// CanvasEditor.jsx - Complete with Working Crop Feature + Image Adjustments + Perfect Circle Shape + Enhanced Text Shadow with Color + Full Color Picker + ALIGNMENT FEATURE (Without old align buttons) + LIST FEATURE
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { 
  FiUpload, FiType, FiSquare, FiLayers, FiGrid, FiZoomIn, FiZoomOut, 
  FiSave, FiTrash2, FiCopy, FiArrowUp, FiArrowDown,
  FiAlignLeft, FiAlignCenter, FiAlignRight, FiBold, FiItalic,
  FiUnderline, FiImage, FiSliders, FiMonitor, FiX, 
  FiPlay, FiEye, FiScissors, FiCrop,
  FiEdit2, FiXCircle, FiLock, FiUnlock, FiLink, FiMove, FiRotateCw,
  FiBox, FiAlignJustify, FiGlobe, FiScissors as FiRemoveBg,
  FiHeart, FiStar, FiSun, FiMoon, FiRefreshCw, FiMaximize2, FiMinimize2,
  FiMaximize, FiMinimize, FiCircle as FiCircleIcon, FiCheckCircle, FiArrowLeft, FiList
} from 'react-icons/fi';
import { MdAnimation, MdOpacity, MdColorLens, MdFormatLineSpacing, MdTextFields, 
  MdBlurOn, MdBorderAll, MdTransform, MdPhotoSizeSelectLarge, 
  MdPhotoSizeSelectSmall, MdAspectRatio } from 'react-icons/md';

const FONTS = ["Arial","Georgia","Impact","Courier New","Verdana","Times New Roman","Comic Sans MS","Trebuchet MS","Tahoma","Palatino","Poppins","Roboto","Open Sans"];
const FILTERS_LIST = [
  { name: "Normal", value: "" },
  { name: "Grayscale", value: "grayscale(100%)" },
  { name: "Sepia", value: "sepia(100%)" },
  { name: "Warm", value: "sepia(40%) saturate(150%)" },
  { name: "Cool", value: "hue-rotate(180deg) saturate(120%)" },
  { name: "Vintage", value: "sepia(60%) contrast(90%) brightness(90%)" },
  { name: "Bright", value: "brightness(130%) saturate(120%)" },
  { name: "High Contrast", value: "contrast(160%)" },
];
const CANVAS_SIZES = [
  { label: "Square 1:1", w: 1080, h: 1080 },
  { label: "Portrait 4:5", w: 1080, h: 1350 },
  { label: "Landscape 16:9", w: 1920, h: 1080 },
  { label: "Story 9:16", w: 1080, h: 1920 },
  { label: "A4 Portrait", w: 2480, h: 3508 },
  { label: "A4 Landscape", w: 3508, h: 2480 },
];
const COLOR_PRESETS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#FFB347", "#87CEEB", "#FF69B4", "#20B2AA"];

let idCounter = 1;
const uid = () => `el_${++idCounter}_${Date.now()}`;
const ACCENT = "#6366f1";
const HANDLE_R = 5;
const API_BASE_URL = "https://designback.onrender.com";
const REMOVEBG_API_KEY = "3BJpMwescxP8egWn8CKzc8Sp";

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('data:')) return imagePath;
  const cleanPath = imagePath.replace(/\\/g, '/');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  return `${API_BASE_URL}/${normalizedPath}`;
};

const MOCK_FLEX_DATA = {
  _id: "mock_flex_001",
  companyName: "My Business Pvt Ltd",
  companyAddress: "123 Business Street, Downtown",
  companyEmail: "info@mybusiness.com",
  companyPhone: "+91 9876543210",
  flexTitle: "FLEX BOOK",
  pointsTitle: "Our Services",
  message: "Thank you for your business!",
  points: [
    { id: 1, text: "सिलाई सेटर - Ladies Suit, Blouse", x: 400, y: 384 },
    { id: 2, text: "बच्चों के कपड़े", x: 400, y: 408 },
    { id: 3, text: "Ladies Dress Designing", x: 400, y: 432 },
    { id: 4, text: "Beauty Parlour + Mehandi", x: 400, y: 456 },
  ],
  textStyles: {
    companyName: { fontSize: 24, fontWeight: "bold", color: "#000000", x: 400, y: 60, show: true },
    companyAddress: { fontSize: 12, color: "#666666", x: 400, y: 100, show: true },
    companyEmail: { fontSize: 12, color: "#666666", x: 400, y: 130, show: true },
    companyPhone: { fontSize: 14, fontWeight: "bold", color: "#3b82f6", x: 400, y: 160, show: true },
    flexTitle: { fontSize: 32, fontWeight: "bold", color: "#3b82f6", x: 400, y: 240, underline: true, show: true },
    pointsTitle: { fontSize: 20, fontWeight: "bold", color: "#3b82f6", x: 400, y: 340, show: true },
    message: { fontSize: 12, color: "#999999", x: 400, y: 650, italic: true, show: true },
  },
  logoSettings: { x: 50, y: 40, width: 100, height: 80, show: true },
  design: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#3b82f6",
    fontFamily: "Poppins",
    border: true,
    showPoints: true,
  },
  canvasSize: { width: 800, height: 800 },
  templateImage: null,
};

export default function CanvasEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeFeature, setActiveFeature] = useState(null);
  const [editingTextId, setEditingTextId] = useState(null);
  const [editingTextValue, setEditingTextValue] = useState("");
  const textInputRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [selectedShapeForImage, setSelectedShapeForImage] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationStart, setRotationStart] = useState({ angle: 0, startAngle: 0 });
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgGradient, setBgGradient] = useState(null);
  const [tempGradientColors, setTempGradientColors] = useState(["#FF6B6B", "#4ECDC4"]);
  const [tempGradientType, setTempGradientType] = useState("linear");
  const [showGradientOption, setShowGradientOption] = useState(false);
  
  // Crop related state
  const [isCropping, setIsCropping] = useState(false);
  const [cropElementId, setCropElementId] = useState(null);
  const [cropStart, setCropStart] = useState(null);
  const [cropSelection, setCropSelection] = useState(null);
  const [originalImageElement, setOriginalImageElement] = useState(null);

  // Image adjustment state
  const [imageSizeAdjust, setImageSizeAdjust] = useState(100);
  const [imageShapeAdjust, setImageShapeAdjust] = useState("original");

  // Shadow popup state
  const [isShadowCustomMode, setIsShadowCustomMode] = useState(false);
  
  // Text shadow state - detailed
  const [shadowOpacity, setShadowOpacity] = useState(50);
  const [shadowAngle, setShadowAngle] = useState(45);
  const [shadowBlur, setShadowBlur] = useState(4);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowDistance, setShadowDistance] = useState(4);
  
  // Position popup align checkboxes state
  const [alignChecks, setAlignChecks] = useState({
    left: false, middle: false, right: false,
    top: false, center: false, bottom: false, core: false
  });
  
  // List popup state
  const [listType, setListType] = useState("bullets");
  const [bulletStyle, setBulletStyle] = useState("•");
  const [numberStyle, setNumberStyle] = useState("1.");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (editingTextId && textInputRef.current) {
      textInputRef.current.focus();
      const length = editingTextValue.length;
      textInputRef.current.setSelectionRange(length, length);
    }
  }, [editingTextId]);

  const [panel, setPanel] = useState(null);
  const [elements, setElements] = useState([]);
  const [selId, setSelId] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgImage, setBgImage] = useState(null);
  const [bgOpacity, setBgOpacity] = useState(100);
  const [filterPreset, setFilterPreset] = useState("");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 800 });
  const [canvasZoom, setCanvasZoom] = useState(0.55);
  const [showGrid, setShowGrid] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const [showBleed, setShowBleed] = useState(false);
  const [showFolds, setShowFolds] = useState(false);
  const [designTitle, setDesignTitle] = useState("My Design");
  const [history, setHistory] = useState([[]]);
  const [hIdx, setHIdx] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [productType, setProductType] = useState(null);

  const [tText, setTText] = useState("Your Text Here");
  const [tFont, setTFont] = useState("Poppins");
  const [tSize, setTSize] = useState(40);
  const [tColor, setTColor] = useState("#000000");
  const [tGradientColors, setTGradientColors] = useState(["#FF6B6B", "#4ECDC4"]);
  const [tGradientType, setTGradientType] = useState("linear");
  const [tUseGradient, setTUseGradient] = useState(false);
  const [tBold, setTBold] = useState(false);
  const [tItalic, setTItalic] = useState(false);
  const [tUnderline, setTUnderline] = useState(false);
  const [tAlign, setTAlign] = useState("left");

  const [sFill, setSFill] = useState("#6366f1");
  const [sStroke, setSStroke] = useState("#000000");
  const [sStrokeW, setSStrokeW] = useState(2);
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [blurEnabled, setBlurEnabled] = useState(false);
  const [borderRadius, setBorderRadius] = useState(0);

  const canvasAreaRef = useRef(null);
  const copyStyleRef = useRef(null);
  const interactRef = useRef({ type: null });
  const lastClickRef = useRef({ id: null, time: 0 });

  const uploadBgRef = useRef(null);
  const uploadImgRef = useRef(null);

  // Helper function to update text shadow
  const updateTextShadow = (opacity, angle, blur, color, distance) => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * distance;
    const y = Math.sin(rad) * distance;
    const opacityNum = opacity / 100;
    const r = parseInt(color.slice(1,3), 16);
    const g = parseInt(color.slice(3,5), 16);
    const b = parseInt(color.slice(5,7), 16);
    const shadowString = `${x}px ${y}px ${blur}px rgba(${r}, ${g}, ${b}, ${opacityNum})`;
    commitSel({ textShadow: shadowString });
  };

  // Start crop
  const startCrop = (elementId, element) => {
    if (!element || element.type !== "image") {
      toast.error("Please select an image to crop");
      return;
    }
    
    setCropElementId(elementId);
    setOriginalImageElement(element);
    setCropSelection(null);
    setCropStart(null);
    setIsCropping(true);
    setActiveFeature(null);
  };

  const handleCropMouseDown = (e) => {
    if (!isCropping) return;
    e.preventDefault();
    e.stopPropagation();
    
    const rect = canvasAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    const canvasX = (clientX - rect.left) / canvasZoom;
    const canvasY = (clientY - rect.top) / canvasZoom;
    
    const element = elements.find(el => el.id === cropElementId);
    if (!element) return;
    
    if (canvasX >= element.x && canvasX <= element.x + element.w &&
        canvasY >= element.y && canvasY <= element.y + element.h) {
      setCropStart({ x: canvasX, y: canvasY });
      setCropSelection({ x: canvasX, y: canvasY, w: 0, h: 0 });
    }
  };

  const handleCropMouseMove = (e) => {
    if (!isCropping || !cropStart) return;
    e.preventDefault();
    e.stopPropagation();
    
    const rect = canvasAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const element = elements.find(el => el.id === cropElementId);
    if (!element) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    const currentX = (clientX - rect.left) / canvasZoom;
    const currentY = (clientY - rect.top) / canvasZoom;
    
    let x = Math.min(cropStart.x, currentX);
    let y = Math.min(cropStart.y, currentY);
    let w = Math.abs(currentX - cropStart.x);
    let h = Math.abs(currentY - cropStart.y);
    
    x = Math.max(element.x, Math.min(x, element.x + element.w));
    y = Math.max(element.y, Math.min(y, element.y + element.h));
    w = Math.min(w, element.x + element.w - x);
    h = Math.min(h, element.y + element.h - y);
    
    setCropSelection({ x, y, w, h });
  };

  const handleCropMouseUp = () => {
    if (!isCropping || !cropStart) {
      setCropStart(null);
      return;
    }
    
    if (cropSelection && cropSelection.w > 5 && cropSelection.h > 5) {
      applyCrop();
    } else {
      cancelCrop();
      toast.error("Please drag to select an area to crop");
    }
  };

  const applyCrop = () => {
    if (!cropElementId || !cropSelection || !originalImageElement) {
      toast.error("Cannot apply crop");
      cancelCrop();
      return;
    }
    
    const element = originalImageElement;
    const selection = cropSelection;
    
    if (selection.w < 5 || selection.h < 5) {
      toast.error("Please select a valid crop area");
      return;
    }
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const scaleX = img.width / element.w;
      const scaleY = img.height / element.h;
      
      const srcX = (selection.x - element.x) * scaleX;
      const srcY = (selection.y - element.y) * scaleY;
      const srcW = selection.w * scaleX;
      const srcH = selection.h * scaleY;
      
      const actualSrcX = Math.max(0, Math.min(srcX, img.width));
      const actualSrcY = Math.max(0, Math.min(srcY, img.height));
      const actualSrcW = Math.min(srcW, img.width - actualSrcX);
      const actualSrcH = Math.min(srcH, img.height - actualSrcY);
      
      if (actualSrcW <= 0 || actualSrcH <= 0) {
        toast.error("Invalid crop area");
        cancelCrop();
        return;
      }
      
      canvas.width = actualSrcW;
      canvas.height = actualSrcH;
      
      ctx.drawImage(img, actualSrcX, actualSrcY, actualSrcW, actualSrcH, 0, 0, actualSrcW, actualSrcH);
      
      const croppedImageUrl = canvas.toDataURL('image/png');
      
      setElements(prev => prev.map(el => {
        if (el.id === cropElementId) {
          return {
            ...el,
            src: croppedImageUrl,
            w: selection.w,
            h: selection.h,
            x: selection.x,
            y: selection.y
          };
        }
        return el;
      }));
      
      toast.success("Image cropped successfully!");
      cancelCrop();
      
      setTimeout(() => {
        setElements(prev => {
          pushHistory(prev);
          return prev;
        });
      }, 100);
    };
    
    img.onerror = () => {
      toast.error("Failed to load image for cropping");
      cancelCrop();
    };
    
    img.src = element.src;
  };

  const cancelCrop = () => {
    setIsCropping(false);
    setCropElementId(null);
    setCropSelection(null);
    setCropStart(null);
    setOriginalImageElement(null);
  };

  // Adjust image size (enlarge/shrink)
  const adjustImageSize = (value) => {
    if (!selEl || selEl.type !== "image") return;
    const newSize = Math.max(20, Math.min(300, value));
    setImageSizeAdjust(newSize);
    const aspectRatio = selEl.w / selEl.h;
    commitSel({ 
      w: newSize, 
      h: newSize / aspectRatio 
    });
  };

  // Adjust image shape/aspect ratio
  const adjustImageShape = (shape) => {
    if (!selEl || selEl.type !== "image") return;
    setImageShapeAdjust(shape);
    
    let newW = selEl.w;
    let newH = selEl.h;
    
    switch(shape) {
      case "square":
        newW = Math.min(selEl.w, selEl.h);
        newH = newW;
        break;
      case "portrait":
        newW = selEl.w;
        newH = selEl.w * 1.414;
        break;
      case "landscape":
        newW = selEl.h * 1.414;
        newH = selEl.h;
        break;
      case "circle":
        commitSel({ borderRadius: 999 });
        return;
      case "original":
        const originalImg = new Image();
        originalImg.src = selEl.src;
        originalImg.onload = () => {
          const aspect = originalImg.width / originalImg.height;
          commitSel({ w: selEl.w, h: selEl.w / aspect });
        };
        return;
      default:
        return;
    }
    
    commitSel({ w: newW, h: newH });
  };

  const pushHistory = useCallback((els) => {
    setHistory(h => {
      const sliced = h.slice(0, hIdx + 1);
      return [...sliced, JSON.parse(JSON.stringify(els))];
    });
    setHIdx(i => i + 1);
  }, [hIdx]);

  const commitElements = useCallback((els) => {
    setElements(els);
    pushHistory(els);
  }, [pushHistory]);

  const undo = () => {
    if (hIdx <= 0) return;
    const ni = hIdx - 1;
    setHIdx(ni);
    setElements(JSON.parse(JSON.stringify(history[ni])));
    setSelId(null);
    setEditingTextId(null);
    setActiveFeature(null);
  };

  const redo = () => {
    if (hIdx >= history.length - 1) return;
    const ni = hIdx + 1;
    setHIdx(ni);
    setElements(JSON.parse(JSON.stringify(history[ni])));
    setSelId(null);
    setEditingTextId(null);
    setActiveFeature(null);
  };

  const getTextDimensions = (text, fontSize, fontFamily) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    return { width: metrics.width, height: fontSize * 1.3 };
  };

  const createElementsFromData = useCallback((data, customerData = {}) => {
    const newElements = [];
    const canvasW = data.canvasSize?.width || 800;
    const canvasH = data.canvasSize?.height || 800;

    setCanvasSize({ w: canvasW, h: canvasH });
    if (data.design?.backgroundColor) setBgColor(data.design.backgroundColor);
    
    const bgImgUrl = data.templateImage || data.previewImage;
    if (bgImgUrl) setBgImage(getFullImageUrl(bgImgUrl));

    const addTextElement = (text, style, defaultX, defaultY, defaultFontSize, label, align = "center") => {
      if (!text) return;
      const fontSize = style?.fontSize || defaultFontSize;
      const dimensions = getTextDimensions(text, fontSize, data.design?.fontFamily || "Poppins");
      const estimatedWidth = Math.min(dimensions.width + 30, canvasW - 60);
      let x = style?.x || defaultX;
      let y = style?.y || defaultY;
      if (align === "center") x = x - (estimatedWidth / 2);
      else if (align === "right") x = x - estimatedWidth;

      newElements.push({
        id: uid(), type: "text", text,
        x: Math.max(10, Math.min(x, canvasW - estimatedWidth - 10)),
        y: y - (fontSize / 2), w: estimatedWidth, h: fontSize * 1.6,
        fontSize, fontFamily: data.design?.fontFamily || "Poppins",
        color: style?.color || data.design?.textColor || "#000000",
        useGradient: false,
        gradientColors: ["#FF6B6B", "#4ECDC4"],
        gradientType: "linear",
        bold: style?.fontWeight === "bold", italic: style?.italic || false,
        underline: style?.underline || false, align,
        opacity: 100, rotation: 0, animation: "none", scale: 1,
        lineHeight: 1.3, letterSpacing: 0, textBackground: "transparent", textShadow: "none",
        textOutline: "none", outlineWidth: 0, outlineColor: "#000000",
        shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 },
        _label: label
      });
    };

    addTextElement(customerData.companyName || data.companyName, data.textStyles?.companyName, 400, 60, 24, "Company Name", "center");
    addTextElement(customerData.address || data.companyAddress, data.textStyles?.companyAddress, 400, 100, 12, "Company Address", "center");
    addTextElement(customerData.email || data.companyEmail, data.textStyles?.companyEmail, 400, 130, 12, "Company Email", "center");
    addTextElement(customerData.mobile || data.companyPhone, data.textStyles?.companyPhone, 400, 160, 14, "Company Phone", "center");
    addTextElement(data.flexTitle, data.textStyles?.flexTitle, 400, 250, 32, "Flex Title", "center");
    addTextElement(data.pointsTitle, data.textStyles?.pointsTitle, 400, 350, 20, "Points Title", "center");
    addTextElement(data.message, data.textStyles?.message, 400, 660, 12, "Message", "center");

    if (data.points && data.points.length > 0 && data.design?.showPoints !== false) {
      data.points.forEach((point, idx) => {
        const fontSize = 14;
        const text = `✓ ${point.text}`;
        const dimensions = getTextDimensions(text, fontSize, data.design?.fontFamily || "Poppins");
        const estimatedWidth = Math.min(dimensions.width + 30, canvasW - 60);
        newElements.push({
          id: uid(), type: "text", text,
          x: (point.x || 400) - 20,
          y: (point.y || (390 + idx * 32)) - (fontSize / 2),
          w: estimatedWidth, h: fontSize * 1.6,
          fontSize, fontFamily: data.design?.fontFamily || "Poppins",
          color: data.design?.textColor || "#333333",
          useGradient: false,
          gradientColors: ["#FF6B6B", "#4ECDC4"],
          gradientType: "linear",
          bold: false, italic: false, underline: false, align: "left",
          opacity: 100, rotation: 0, animation: "none", scale: 1,
          lineHeight: 1.3, letterSpacing: 0, textBackground: "transparent", textShadow: "none",
          textOutline: "none", outlineWidth: 0, outlineColor: "#000000",
          shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 },
          _label: `Point ${idx + 1}`
        });
      });
    }

    const logoSrc = customerData.logo
      ? (typeof customerData.logo === "string" ? getFullImageUrl(customerData.logo) : URL.createObjectURL(customerData.logo))
      : (data.logo ? getFullImageUrl(data.logo) : null);

    if (logoSrc && data.logoSettings?.show !== false) {
      const ls = data.logoSettings || {};
      newElements.push({
        id: uid(), type: "image", src: logoSrc,
        x: ls.x || 50, y: ls.y || 40, w: ls.width || 100, h: ls.height || 80,
        opacity: 100, rotation: 0, flip: false, animation: "none", scale: 1, borderRadius: 0,
        shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 }, blur: 0,
        _label: "Logo"
      });
    }

    if (data.design?.border) {
      newElements.push({
        id: uid(), type: "shape", shape: "rect",
        x: 10, y: 10, w: canvasW - 20, h: canvasH - 20,
        fill: "transparent", stroke: data.design?.accentColor || ACCENT,
        strokeW: 3, opacity: 100, rotation: 0, borderRadius: 0,
        shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 },
        _label: "Border"
      });
    }

    return newElements;
  }, []);

  const loadFlexBook = useCallback(async (flexBookId, customerData = {}) => {
    setIsLoadingData(true);
    const timeoutId = setTimeout(() => {
      const mockElements = createElementsFromData(MOCK_FLEX_DATA, customerData);
      setElements(mockElements);
      setHistory([[...mockElements]]);
      setHIdx(0);
      setProductType("flexbook");
      setDesignTitle(`${customerData.companyName || "Demo"} - Flex Book`);
      setIsLoadingData(false);
      toast.success("Demo data loaded! Double-click any text to edit.");
    }, 3000);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/flexbook/${flexBookId}`);
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.success && result.data) {
        const newElements = createElementsFromData(result.data, customerData);
        setElements(newElements);
        setHistory([[...newElements]]);
        setHIdx(0);
        setProductType("flexbook");
        setDesignTitle(`${customerData.companyName || result.data.companyName || "Flex Book"} - Flex Book`);
        toast.success("Flex Book loaded!");
      } else throw new Error("Invalid API response");
    } catch (err) {
      clearTimeout(timeoutId);
      const mockElements = createElementsFromData(MOCK_FLEX_DATA, customerData);
      setElements(mockElements);
      setHistory([[...mockElements]]);
      setHIdx(0);
      setProductType("flexbook");
      setDesignTitle(`${customerData.companyName || "Demo"} - Flex Book`);
      toast.success("Demo data loaded! Double-click any text to edit.");
    } finally {
      setIsLoadingData(false);
    }
  }, [createElementsFromData]);

  useEffect(() => {
    const init = async () => {
      const stateData = location.state?.flexBookData;
      const source = stateData || (() => { try { return JSON.parse(localStorage.getItem('flexBookDesignData')); } catch { return null; } })();
      if (source?.flexBookId) {
        await loadFlexBook(source.flexBookId, {
          companyName: source.companyName, address: source.address,
          mobile: source.mobile, email: source.email, logo: source.logo,
        });
      } else {
        const mockElements = createElementsFromData(MOCK_FLEX_DATA, {});
        setElements(mockElements);
        setHistory([[...mockElements]]);
        setHIdx(0);
        setProductType("flexbook");
        setDesignTitle("My Business - Flex Book");
        setIsLoadingData(false);
      }
    };
    init();
  }, [loadFlexBook, createElementsFromData]);

  const selEl = elements.find(e => e.id === selId) || null;
  const commitSel = (props) => commitElements(elements.map(e => e.id === selId ? { ...e, ...props } : e));

  const removeBackgroundFromCanvas = async () => {
    setIsRemovingBg(true);
    const toastId = toast.loading("Removing background...");
    
    try {
      let imageUrl = null;
      let targetElement = null;
      
      if (selEl && (selEl.type === "image" || (selEl.type === "shape" && selEl.imageSrc))) {
        targetElement = selEl;
        imageUrl = selEl.type === "image" ? selEl.src : selEl.imageSrc;
      } else {
        const imageElement = elements.find(el => el.type === "image");
        if (imageElement) {
          targetElement = imageElement;
          imageUrl = imageElement.src;
        } else {
          const shapeWithImage = elements.find(el => el.type === "shape" && el.imageSrc);
          if (shapeWithImage) {
            targetElement = shapeWithImage;
            imageUrl = shapeWithImage.imageSrc;
          }
        }
      }
      
      if (!imageUrl && bgImage) {
        imageUrl = bgImage;
        targetElement = { type: "background", id: "bg" };
      }
      
      if (!imageUrl) {
        toast.error("No image found! Please upload an image first.", { id: toastId });
        setIsRemovingBg(false);
        return;
      }
      
      let imageBlob;
      if (imageUrl.startsWith('data:')) {
        const response = await fetch(imageUrl);
        imageBlob = await response.blob();
      } else if (imageUrl.startsWith('http')) {
        const response = await fetch(imageUrl);
        imageBlob = await response.blob();
      } else {
        toast.error("Invalid image source", { id: toastId });
        setIsRemovingBg(false);
        return;
      }
      
      const formData = new FormData();
      formData.append('image_file', imageBlob, 'image.png');
      formData.append('size', 'auto');
      
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: { 'X-Api-Key': REMOVEBG_API_KEY, 'Content-Type': 'multipart/form-data' },
        responseType: 'arraybuffer',
      });
      
      const uint8Array = new Uint8Array(response.data);
      let binaryString = '';
      for (let i = 0; i < uint8Array.length; i++) binaryString += String.fromCharCode(uint8Array[i]);
      const base64 = btoa(binaryString);
      const dataUrl = `data:image/png;base64,${base64}`;
      
      if (targetElement.type === "background" || targetElement.id === "bg") {
        setBgImage(dataUrl);
        toast.success("Background image processed!", { id: toastId });
      } else if (targetElement.type === "image") {
        setElements(prev => prev.map(el => el.id === targetElement.id ? { ...el, src: dataUrl } : el));
        toast.success("Background removed from image!", { id: toastId });
      } else if (targetElement.type === "shape") {
        setElements(prev => prev.map(el => el.id === targetElement.id ? { ...el, imageSrc: dataUrl } : el));
        toast.success("Background removed from shape image!", { id: toastId });
      }
    } catch (error) {
      console.error("Background removal error:", error);
      toast.error(error.message || "Failed to remove background", { id: toastId });
    } finally {
      setIsRemovingBg(false);
    }
  };

  const alignElement = (position) => {
    if (!selEl) return;
    const newProps = {};
    if (position === "center") {
      newProps.x = (canvasSize.w - (selEl.w || 100)) / 2;
      newProps.y = (canvasSize.h - (selEl.h || 100)) / 2;
    } else if (position === "horizontal") {
      newProps.x = (canvasSize.w - (selEl.w || 100)) / 2;
    } else if (position === "vertical") {
      newProps.y = (canvasSize.h - (selEl.h || 100)) / 2;
    }
    commitSel(newProps);
    toast.success(`Aligned ${position}`);
  };

  const applyGradientBg = (type, colors) => {
    setBgGradient({ type, colors });
  };

  const getBgStyle = () => {
    if (bgGradient) {
      const { type, colors } = bgGradient;
      if (type === "linear") return `linear-gradient(135deg, ${colors.join(", ")})`;
      if (type === "radial") return `radial-gradient(circle, ${colors.join(", ")})`;
    }
    return bgColor;
  };

  const getXY = (e) => {
    const rect = canvasAreaRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) / canvasZoom, y: (clientY - rect.top) / canvasZoom };
  };

  const getCenter = (el) => ({ x: el.x + (el.w || el.size || 80) / 2, y: el.y + (el.h || el.size || 80) / 2 });

  const hitTest = (x, y) => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (el._label === "Border") continue;
      const elW = el.w || el.size || 80;
      const elH = el.h || el.size || 80;
      if (x >= el.x && x <= el.x + elW && y >= el.y && y <= el.y + elH) return el;
    }
    return null;
  };

  const HANDLES = ["nw","n","ne","e","se","s","sw","w"];
  const getHPos = (el, h) => {
    const w = el.w || el.size || 80;
    const hi = el.h || el.size || 80;
    return {
      nw: { x: el.x, y: el.y }, n: { x: el.x + w/2, y: el.y }, ne: { x: el.x + w, y: el.y },
      e: { x: el.x + w, y: el.y + hi/2 }, se: { x: el.x + w, y: el.y + hi },
      s: { x: el.x + w/2, y: el.y + hi }, sw: { x: el.x, y: el.y + hi }, w: { x: el.x, y: el.y + hi/2 },
    }[h];
  };

  const hitHandle = (x, y, el) => {
    const hs = HANDLE_R * 2 / canvasZoom;
    for (const h of HANDLES) {
      const p = getHPos(el, h);
      if (Math.abs(x - p.x) <= hs && Math.abs(y - p.y) <= hs) return h;
    }
    return null;
  };

  const hitRotateHandle = (x, y, el) => {
    const center = getCenter(el);
    const handlePos = { x: center.x, y: el.y - 25 };
    const hs = 15 / canvasZoom;
    return Math.abs(x - handlePos.x) <= hs && Math.abs(y - handlePos.y) <= hs;
  };

  const startInlineEdit = (id, currentText) => {
    if (isLocked) { toast.error("Element is locked! Unlock to edit."); return; }
    setEditingTextId(id);
    setEditingTextValue(currentText);
    setActiveFeature(null);
    setPanel(null);
  };

  const updateTextContent = (id, newText) => {
    if (!newText || newText.trim() === "") return;
    setElements(prev => prev.map(el => {
      if (el.id === id && el.type === "text") {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `${el.italic ? "italic " : ""}${el.bold ? "bold " : ""}${el.fontSize}px ${el.fontFamily}`;
        const metrics = ctx.measureText(newText);
        const newWidth = Math.min(metrics.width + 40, canvasSize.w - 40);
        return { ...el, text: newText, w: Math.max(newWidth, 50) };
      }
      return el;
    }));
  };

  const finishInlineEdit = () => {
    if (editingTextId && editingTextValue.trim() !== "") {
      updateTextContent(editingTextId, editingTextValue);
      setTimeout(() => pushHistory(elements), 0);
    }
    setEditingTextId(null);
    setEditingTextValue("");
  };

  const handleTextKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); finishInlineEdit(); }
    else if (e.key === 'Escape') { setEditingTextId(null); setEditingTextValue(""); }
  };

  const onPointerDown = (e) => {
    if (isCropping) return;
    
    e.preventDefault();
    const { x, y } = getXY(e);
    
    if (selEl && !isLocked) {
      if (hitRotateHandle(x, y, selEl)) {
        const center = getCenter(selEl);
        const angle = Math.atan2(y - center.y, x - center.x) * 180 / Math.PI;
        setIsRotating(true);
        setRotationStart({ angle: selEl.rotation || 0, startAngle: angle });
        return;
      }
      const h = hitHandle(x, y, selEl);
      if (h) {
        interactRef.current = { type: "resize", id: selEl.id, handle: h, startX: x, startY: y, origEl: { ...selEl } };
        return;
      }
    }
    
    const hit = hitTest(x, y);
    if (hit) {
      const now = Date.now();
      const isDoubleClick = (now - lastClickRef.current.time) < 300 && lastClickRef.current.id === hit.id;
      lastClickRef.current = { id: hit.id, time: now };
      
      setSelId(hit.id);
      
      if (isDoubleClick && hit.type === "text" && !isLocked) {
        startInlineEdit(hit.id, hit.text);
      }
      
      if (!isLocked && !isDoubleClick) {
        interactRef.current = { type: "move", id: hit.id, startX: x, startY: y, origEl: { ...hit } };
      }
    } else {
      if (!editingTextId) { setSelId(null); setActiveFeature(null); setPanel(null); }
      interactRef.current = { type: null };
    }
  };

  const onPointerMove = (e) => {
    if (isLocked || isCropping) return;
    const { x, y } = getXY(e);
    if (isRotating && selEl) {
      const center = getCenter(selEl);
      const currentAngle = Math.atan2(y - center.y, x - center.x) * 180 / Math.PI;
      let deltaAngle = currentAngle - rotationStart.startAngle;
      let newRotation = (rotationStart.angle + deltaAngle) % 360;
      if (newRotation < 0) newRotation += 360;
      setElements(prev => prev.map(el => el.id === selEl.id ? { ...el, rotation: newRotation } : el));
      return;
    }
    const ia = interactRef.current;
    if (!ia.type) return;
    const dx = x - ia.startX, dy = y - ia.startY;
    if (ia.type === "move") {
      setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: ia.origEl.x + dx, y: ia.origEl.y + dy }));
    } else if (ia.type === "resize") {
      const orig = ia.origEl;
      let nx = orig.x, ny = orig.y;
      let nw = orig.w || orig.size || 80, nh = orig.h || orig.size || 80;
      const h = ia.handle;
      if (h.includes("e")) nw = Math.max(40, orig.w + dx);
      if (h.includes("s")) nh = Math.max(30, orig.h + dy);
      if (h.includes("w")) { nx = orig.x + dx; nw = Math.max(40, orig.w - dx); }
      if (h.includes("n")) { ny = orig.y + dy; nh = Math.max(30, orig.h - dy); }
      setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, w: nw, h: nh }));
    }
  };

  const onPointerUp = () => {
    if (isRotating) { pushHistory(elements); setIsRotating(false); }
    if (interactRef.current.type) pushHistory(elements);
    interactRef.current = { type: null };
  };

  const copyStyle = () => {
    if (selEl && selEl.type === "text") {
      copyStyleRef.current = {
        fontFamily: selEl.fontFamily, fontSize: selEl.fontSize, color: selEl.color,
        useGradient: selEl.useGradient, gradientColors: selEl.gradientColors, gradientType: selEl.gradientType,
        bold: selEl.bold, italic: selEl.italic, underline: selEl.underline, align: selEl.align,
        lineHeight: selEl.lineHeight, letterSpacing: selEl.letterSpacing,
        textBackground: selEl.textBackground, textShadow: selEl.textShadow,
        textOutline: selEl.textOutline, outlineWidth: selEl.outlineWidth, outlineColor: selEl.outlineColor
      };
      toast.success("Style copied!");
    } else toast.error("Select a text element first");
  };

  const pasteStyle = () => {
    if (selEl && selEl.type === "text" && copyStyleRef.current) {
      commitSel(copyStyleRef.current);
      toast.success("Style applied!");
    } else if (!selEl) toast.error("Select a text element to paste style");
    else if (selEl.type !== "text") toast.error("Style can only be pasted on text elements");
  };

  const addImageEl = (src, iw, ih) => {
    const scale = Math.min(300/iw, 300/ih, 1);
    const el = { id: uid(), type: "image", src, x: 100, y: 100, w: iw*scale, h: ih*scale, opacity: 100, rotation: 0, flip: false, animation: "none", scale: 1, borderRadius: 0, blur: 0, shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 } };
    commitElements([...elements, el]);
    setSelId(el.id);
  };

  const handleBgUpload = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setBgImage(ev.target.result);
    r.readAsDataURL(f);
    e.target.value = "";
  };

  const handleAddImage = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      const img = new Image();
      img.onload = () => addImageEl(ev.target.result, img.naturalWidth, img.naturalHeight);
      img.src = ev.target.result;
    };
    r.readAsDataURL(f);
    e.target.value = "";
  };

  const addText = () => {
    const dimensions = getTextDimensions(tText, tSize, tFont);
    const el = {
      id: uid(), type: "text", text: tText, x: 100, y: 100,
      w: dimensions.width + 30, h: tSize * 1.6,
      fontSize: tSize, fontFamily: tFont, color: tColor,
      useGradient: false, gradientColors: tGradientColors, gradientType: tGradientType,
      bold: tBold, italic: tItalic, underline: tUnderline, align: tAlign,
      opacity: 100, rotation: 0, animation: "none", scale: 1,
      lineHeight: 1.3, letterSpacing: 0, textBackground: "transparent", textShadow: "none",
      textOutline: "none", outlineWidth: 0, outlineColor: "#000000",
      shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 }
    };
    commitElements([...elements, el]);
    setSelId(el.id);
    setActiveFeature(null);
  };

  // Circle shape - perfect gol round shape with equal width and height
  const addShape = (shape) => {
    if (shape === "image-rect" || shape === "image-circle") {
      setSelectedShapeForImage(shape === "image-rect" ? "rect" : "circle");
      setShowImageUploader(true);
      return;
    }
    
    let shapeWidth = 140;
    let shapeHeight = 140;
    let shapeBorderRadius = 0;
    
    if (shape === "circle") {
      shapeHeight = shapeWidth;
      shapeBorderRadius = 999;
    }
    
    const el = { 
      id: uid(), type: "shape", shape, 
      x: 200, y: 200, 
      w: shapeWidth, h: shapeHeight, 
      fill: sFill, stroke: sStroke, strokeW: sStrokeW, 
      opacity: 100, rotation: 0, 
      borderRadius: shapeBorderRadius,
      imageSrc: null, imageScale: 1, imagePosition: { x: 0, y: 0 },
      shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 }, 
      blur: 0
    };
    commitElements([...elements, el]);
    setSelId(el.id);
    setActiveFeature(null);
  };

  const handleShapeImageUpload = (e, shapeId) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      setElements(prev => prev.map(el => 
        el.id === shapeId ? { ...el, imageSrc: ev.target.result, fill: "transparent" } : el
      ));
    };
    r.readAsDataURL(f);
    e.target.value = "";
  };

  const updateShapeImage = (shapeId, updates) => {
    setElements(prev => prev.map(el => el.id === shapeId ? { ...el, ...updates } : el));
  };

  const deleteEl = () => {
    if (!selId) return;
    if (isLocked) { toast.error("Element is locked! Unlock to delete."); return; }
    commitElements(elements.filter(e => e.id !== selId));
    setSelId(null);
    setEditingTextId(null);
    setActiveFeature(null);
  };

  const duplicateEl = () => {
    if (!selEl) return;
    if (isLocked) { toast.error("Element is locked! Unlock to duplicate."); return; }
    const copy = { ...JSON.parse(JSON.stringify(selEl)), id: uid(), x: selEl.x + 30, y: selEl.y + 30 };
    commitElements([...elements, copy]);
    setSelId(copy.id);
  };

  const layerUp = () => {
    const i = elements.findIndex(e => e.id === selId);
    if (i < elements.length - 1) { const a = [...elements]; [a[i], a[i+1]] = [a[i+1], a[i]]; commitElements(a); }
  };

  const layerDown = () => {
    const i = elements.findIndex(e => e.id === selId);
    if (i > 0) { const a = [...elements]; [a[i], a[i-1]] = [a[i-1], a[i]]; commitElements(a); }
  };

  const flipElement = () => {
    if (selEl && selEl.type === "image") commitSel({ flip: !selEl.flip });
    else toast.error("Select an image to flip");
  };

  const exportPNG = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = getBgStyle();
    ctx.fillRect(0, 0, canvasSize.w, canvasSize.h);
    const loadImg = src => new Promise(res => { const i = new Image(); i.crossOrigin = "anonymous"; i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
    if (bgImage) { const img = await loadImg(bgImage); if (img) { ctx.save(); ctx.globalAlpha = bgOpacity/100; ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h); ctx.restore(); } }
    for (const el of elements) {
      ctx.save();
      ctx.globalAlpha = (el.opacity??100)/100;
      if (el.type==="image") { const img=await loadImg(el.src); if(img) ctx.drawImage(img,el.x,el.y,el.w,el.h); }
      else if (el.type==="text") {
        ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
        ctx.textAlign = el.align||"left";
        let tx=el.x; if(el.align==="center") tx=el.x+el.w/2; if(el.align==="right") tx=el.x+el.w;
        const textY = el.y + el.fontSize;
        
        ctx.fillStyle = el.color;
        ctx.fillText(el.text, tx, textY);
      } else if (el.type==="shape" && el.imageSrc) {
        const img = await loadImg(el.imageSrc);
        if (img) {
          ctx.save();
          ctx.beginPath();
          if (el.shape === "rect") ctx.rect(el.x, el.y, el.w, el.h);
          else if (el.shape === "circle") ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
          ctx.clip();
          const scale = el.imageScale || 1;
          const imgW = el.w * scale;
          const imgH = el.h * scale;
          const imgX = el.x + (el.w - imgW) / 2 + (el.imagePosition?.x || 0);
          const imgY = el.y + (el.h - imgH) / 2 + (el.imagePosition?.y || 0);
          ctx.drawImage(img, imgX, imgY, imgW, imgH);
          ctx.restore();
        }
      } else if (el.type==="shape"){
        ctx.fillStyle = el.fill;
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.strokeW;
        if (el.shape === "rect") {
          if (el.borderRadius > 0) {
            ctx.beginPath();
            ctx.roundRect(el.x, el.y, el.w, el.h, el.borderRadius);
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.fillRect(el.x, el.y, el.w, el.h);
            ctx.strokeRect(el.x, el.y, el.w, el.h);
          }
        } else if (el.shape === "circle") {
          ctx.beginPath();
          ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
    }
    const a = document.createElement("a");
    a.download = `${designTitle}.png`;
    a.href = canvas.toDataURL();
    a.click();
  };

  const getCurrentUserId = () => {
    try { const userStr = localStorage.getItem("user"); if (userStr) { const user = JSON.parse(userStr); return user._id || user.id; } } catch (e) {}
    return null;
  };

  const canvasToFile = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize.w; canvas.height = canvasSize.h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = getBgStyle(); ctx.fillRect(0,0,canvasSize.w,canvasSize.h);
    const loadImg = src => new Promise(res => { const img = new Image(); img.crossOrigin="anonymous"; img.onload=()=>res(img); img.onerror=()=>res(null); img.src=src; });
    if (bgImage) { const img=await loadImg(bgImage); if(img){ctx.save();ctx.globalAlpha=bgOpacity/100;ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h);ctx.restore();} }
    for (const el of elements) {
      ctx.save(); ctx.globalAlpha=(el.opacity??100)/100;
      if(el.type==="image"){const img=await loadImg(el.src);if(img)ctx.drawImage(img,el.x,el.y,el.w,el.h);}
      else if(el.type==="text"){
        ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
        ctx.textAlign = el.align||"left";
        let tx=el.x; if(el.align==="center") tx=el.x+el.w/2; if(el.align==="right") tx=el.x+el.w;
        const textY = el.y + el.fontSize;
        
        ctx.fillStyle = el.color;
        ctx.fillText(el.text, tx, textY);
      }
      else if (el.type==="shape" && el.imageSrc) {
        const img = await loadImg(el.imageSrc);
        if (img) {
          ctx.save();
          ctx.beginPath();
          if (el.shape === "rect") ctx.rect(el.x, el.y, el.w, el.h);
          else if (el.shape === "circle") ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
          ctx.clip();
          const scale = el.imageScale || 1;
          const imgW = el.w * scale;
          const imgH = el.h * scale;
          const imgX = el.x + (el.w - imgW) / 2 + (el.imagePosition?.x || 0);
          const imgY = el.y + (el.h - imgH) / 2 + (el.imagePosition?.y || 0);
          ctx.drawImage(img, imgX, imgY, imgW, imgH);
          ctx.restore();
        }
      } else if(el.type==="shape"){
        ctx.fillStyle = el.fill;
        ctx.strokeStyle = el.stroke;
        ctx.lineWidth = el.strokeW;
        if (el.shape === "rect") {
          if (el.borderRadius > 0) {
            ctx.beginPath();
            ctx.roundRect(el.x, el.y, el.w, el.h, el.borderRadius);
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.fillRect(el.x, el.y, el.w, el.h);
            ctx.strokeRect(el.x, el.y, el.w, el.h);
          }
        } else if (el.shape === "circle") {
          ctx.beginPath();
          ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
    }
    return new Promise(resolve => { canvas.toBlob(blob => resolve(new File([blob],`design-${Date.now()}.png`,{type:'image/png'})),'image/png'); });
  };

  const saveDesignToServer = async () => {
    const toastId = toast.loading("Saving design...");
    try {
      const file = await canvasToFile();
      const userId = getCurrentUserId();
      if (!userId) { toast.error("Please login first", { id: toastId }); return; }
      const flexBookId = location.state?.flexBookData?.flexBookId || localStorage.getItem('currentFlexBookId') || null;
      const formData = new FormData();
      formData.append('image', file);
      formData.append('flexBookId', flexBookId);
      const response = await fetch(`${API_BASE_URL}/api/auth/save/${userId}`, { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) { toast.success("Design saved!", { id: toastId }); setTimeout(() => navigate(-1), 1000); }
      else toast.error(result.message, { id: toastId });
    } catch (error) {
      toast.error(error.message || "Error saving design", { id: toastId });
    }
  };

  const bgFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset ? " " + filterPreset : ""}`;
  const bleedSize = 35;
  const foldX = canvasSize.w / 2;
  const foldY = canvasSize.h / 2;
  const guideX1 = canvasSize.w / 3;
  const guideX2 = (canvasSize.w * 2) / 3;
  const guideY1 = canvasSize.h / 3;
  const guideY2 = (canvasSize.h * 2) / 3;

  const getMenuItems = () => {
    const baseMenuItems = [
      { id: "deselect", icon: <FiCheckCircle />, label: "Clear", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
      { id: "upload-bg", icon: <FiImage />, label: "BG", action: () => uploadBgRef.current.click() },
      { id: "upload-img", icon: <FiUpload />, label: "Image", action: () => uploadImgRef.current.click() },
      { id: "text", icon: <FiType />, label: "Text", action: () => setActiveFeature(activeFeature === "addText" ? null : "addText"), active: activeFeature === "addText" },
      { id: "rect", icon: <FiSquare />, label: "Rect", action: () => addShape("rect") },
      { id: "circle", icon: <FiCircleIcon />, label: "Circle", action: () => addShape("circle") },
      { id: "image-rect", icon: <FiImage />, label: "Img Rect", action: () => addShape("image-rect") },
      { id: "image-circle", icon: <FiImage />, label: "Img Circ", action: () => addShape("image-circle") },
      { id: "removeBg", icon: <FiRemoveBg />, label: "Remove BG", action: removeBackgroundFromCanvas, active: false },
      { id: "bgColor", icon: <MdColorLens />, label: "BGColor", action: () => setActiveFeature(activeFeature === "bgColor" ? null : "bgColor"), active: activeFeature === "bgColor", colorDot: bgColor },
      { id: "bgOpacity", icon: <MdOpacity />, label: "BGOpacity", action: () => setActiveFeature(activeFeature === "bgOpacity" ? null : "bgOpacity"), active: activeFeature === "bgOpacity" },
      { id: "filters", icon: <FiSliders />, label: "Filters", action: () => setActiveFeature(activeFeature === "filters" ? null : "filters"), active: activeFeature === "filters" },
      { id: "layers", icon: <FiLayers />, label: "Layers", action: () => setActiveFeature(activeFeature === "layers" ? null : "layers"), active: activeFeature === "layers" },
      { id: "grid", icon: <FiGrid />, label: "Grid", action: () => setShowGrid(!showGrid), active: showGrid },
      { id: "guides", icon: <FiEye />, label: "Guides", action: () => setShowGuides(!showGuides), active: showGuides },
      { id: "bleed", icon: <FiScissors />, label: "Bleed", action: () => setShowBleed(!showBleed), active: showBleed },
      { id: "folds", icon: <FiCrop />, label: "Folds", action: () => setShowFolds(!showFolds), active: showFolds },
    ];

    if (selEl && !editingTextId) {
      if (selEl.type === "text") {
        return [
          { id: "deselect", icon: <FiCheckCircle />, label: "Clear", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
          { id: "bold", icon: <FiBold />, label: "Bold", action: () => commitSel({ bold: !selEl.bold }), active: selEl.bold },
          { id: "italic", icon: <FiItalic />, label: "Italic", action: () => commitSel({ italic: !selEl.italic }), active: selEl.italic },
          { id: "underline", icon: <FiUnderline />, label: "Underline", action: () => commitSel({ underline: !selEl.underline }), active: selEl.underline },
          { id: "font", icon: <FiType />, label: "Font", action: () => setActiveFeature(activeFeature === "font" ? null : "font"), active: activeFeature === "font" },
          { id: "size", icon: <FiType />, label: "Size", action: () => setActiveFeature(activeFeature === "size" ? null : "size"), active: activeFeature === "size" },
          { id: "fill", icon: <MdColorLens />, label: "Fill", action: () => setActiveFeature(activeFeature === "fillColor" ? null : "fillColor"), active: activeFeature === "fillColor", colorDot: selEl.useGradient ? "gradient" : selEl.color },
          { id: "outline", icon: <FiBox />, label: "Outline", action: () => setActiveFeature(activeFeature === "outline" ? null : "outline"), active: activeFeature === "outline" },
          { id: "shadow", icon: <FiBox />, label: "Shadow", action: () => setActiveFeature(activeFeature === "shadow" ? null : "shadow"), active: activeFeature === "shadow" },
          { id: "alignment", icon: <FiAlignLeft />, label: "Align", action: () => setActiveFeature(activeFeature === "alignment" ? null : "alignment"), active: activeFeature === "alignment" },
          { id: "list", icon: <FiList />, label: "List", action: () => setActiveFeature(activeFeature === "list" ? null : "list"), active: activeFeature === "list" },
          { id: "lineHeight", icon: <MdFormatLineSpacing />, label: "Line Ht", action: () => setActiveFeature(activeFeature === "lineHeight" ? null : "lineHeight"), active: activeFeature === "lineHeight" },
          { id: "position", icon: <FiMove />, label: "Position", action: () => setActiveFeature(activeFeature === "position" ? null : "position"), active: activeFeature === "position" },
          { id: "changeLang", icon: <FiGlobe />, label: "Lang", action: () => setActiveFeature(activeFeature === "changeLang" ? null : "changeLang"), active: activeFeature === "changeLang" },
          { id: "letterSpace", icon: <FiMove />, label: "Spacing", action: () => setActiveFeature(activeFeature === "letterSpacing" ? null : "letterSpacing"), active: activeFeature === "letterSpacing" },
          { id: "bgColor", icon: <FiImage />, label: "TextBG", action: () => setActiveFeature(activeFeature === "background" ? null : "background"), active: activeFeature === "background" },
          { id: "animate", icon: <FiPlay />, label: "Animate", action: () => setActiveFeature(activeFeature === "animation" ? null : "animation"), active: activeFeature === "animation" },
          { id: "opacity", icon: <MdOpacity />, label: "Opacity", action: () => setActiveFeature(activeFeature === "opacity" ? null : "opacity"), active: activeFeature === "opacity" },
          { id: "link", icon: <FiLink />, label: "Link", action: () => setActiveFeature(activeFeature === "hyperlink" ? null : "hyperlink"), active: activeFeature === "hyperlink" },
          { id: "rotate", icon: <FiRotateCw />, label: "Rotate", action: () => setActiveFeature(activeFeature === "rotate" ? null : "rotate"), active: activeFeature === "rotate" },
          { id: "layerUp", icon: <FiArrowUp />, label: "Up", action: layerUp },
          { id: "layerDown", icon: <FiArrowDown />, label: "Down", action: layerDown },
          { id: "duplicate", icon: <FiCopy />, label: "Copy", action: duplicateEl },
          { id: "copyStyle", icon: <FiCopy />, label: "Style", action: copyStyle },
          { id: "pasteStyle", icon: <FiCopy />, label: "Paste", action: pasteStyle },
          { id: "lock", icon: isLocked ? <FiLock /> : <FiUnlock />, label: isLocked ? "Locked" : "Lock", action: () => setIsLocked(!isLocked), active: isLocked },
          { id: "delete", icon: <FiTrash2 />, label: "Delete", action: deleteEl, danger: true },
        ];
      }
      if (selEl.type === "shape") {
        const items = [
          { id: "deselect", icon: <FiCheckCircle />, label: "Clear", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
          { id: "fill", icon: <MdColorLens />, label: "Fill", action: () => setActiveFeature(activeFeature === "shapeFillColor" ? null : "shapeFillColor"), active: activeFeature === "shapeFillColor", colorDot: selEl.fill !== "transparent" ? selEl.fill : null },
          { id: "uploadImage", icon: <FiUpload />, label: "Add Img", action: () => document.getElementById(`shape-image-upload-${selEl.id}`).click(), active: false },
          { id: "stroke", icon: <FiSquare />, label: "Stroke", action: () => setActiveFeature(activeFeature === "strokeColor" ? null : "strokeColor"), active: activeFeature === "strokeColor", colorDot: selEl.stroke },
          { id: "strokeW", icon: <FiMove />, label: "Width", action: () => setActiveFeature(activeFeature === "strokeWidth" ? null : "strokeWidth"), active: activeFeature === "strokeWidth" },
          { id: "shadow", icon: <FiBox />, label: "Shadow", action: () => setActiveFeature(activeFeature === "shapeShadow" ? null : "shapeShadow"), active: activeFeature === "shapeShadow" },
          { id: "borderRadius", icon: <MdBorderAll />, label: "Radius", action: () => setActiveFeature(activeFeature === "borderRadius" ? null : "borderRadius"), active: activeFeature === "borderRadius" },
          { id: "blur", icon: <MdBlurOn />, label: "Blur", action: () => setActiveFeature(activeFeature === "blur" ? null : "blur"), active: activeFeature === "blur" },
          { id: "opacity", icon: <MdOpacity />, label: "Opacity", action: () => setActiveFeature(activeFeature === "opacity" ? null : "opacity"), active: activeFeature === "opacity" },
          { id: "rotate", icon: <FiRotateCw />, label: "Rotate", action: () => setActiveFeature(activeFeature === "rotate" ? null : "rotate"), active: activeFeature === "rotate" },
        ];
        if (selEl.imageSrc) {
          items.push(
            { id: "removeBg", icon: <FiRemoveBg />, label: "Remove BG", action: () => removeBackgroundFromCanvas(), active: false },
            { id: "imageScale", icon: <FiZoomIn />, label: "Scale", action: () => setActiveFeature(activeFeature === "imageScale" ? null : "imageScale"), active: activeFeature === "imageScale" },
            { id: "imagePos", icon: <FiMove />, label: "Position", action: () => setActiveFeature(activeFeature === "imagePosition" ? null : "imagePosition"), active: activeFeature === "imagePosition" },
            { id: "removeImage", icon: <FiTrash2 />, label: "Remove", action: () => updateShapeImage(selEl.id, { imageSrc: null, fill: sFill }), danger: true }
          );
        } else {
          items.push({ id: "removeBgShape", icon: <FiRemoveBg />, label: "Remove BG", action: () => toast.error("Add an image to this shape first"), active: false });
        }
        items.push(
          { id: "layerUp", icon: <FiArrowUp />, label: "Up", action: layerUp },
          { id: "layerDown", icon: <FiArrowDown />, label: "Down", action: layerDown },
          { id: "duplicate", icon: <FiCopy />, label: "Copy", action: duplicateEl },
          { id: "lock", icon: isLocked ? <FiLock /> : <FiUnlock />, label: isLocked ? "Locked" : "Lock", action: () => setIsLocked(!isLocked), active: isLocked },
          { id: "delete", icon: <FiTrash2 />, label: "Delete", action: deleteEl, danger: true },
        );
        return items;
      }
      if (selEl.type === "image") {
        return [
          { id: "deselect", icon: <FiCheckCircle />, label: "Clear", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
          { id: "flip", icon: <FiMove />, label: "Flip", action: flipElement, active: selEl.flip },
          { id: "removeBg", icon: <FiRemoveBg />, label: "Remove BG", action: removeBackgroundFromCanvas, active: false },
          { id: "crop", icon: <FiCrop />, label: "Crop", action: () => startCrop(selEl.id, selEl), active: isCropping },
          { id: "size", icon: <MdPhotoSizeSelectLarge />, label: "Size", action: () => setActiveFeature(activeFeature === "imageSize" ? null : "imageSize"), active: activeFeature === "imageSize" },
          { id: "shape", icon: <MdAspectRatio />, label: "Shape", action: () => setActiveFeature(activeFeature === "imageShape" ? null : "imageShape"), active: activeFeature === "imageShape" },
          { id: "shadow", icon: <FiBox />, label: "Shadow", action: () => setActiveFeature(activeFeature === "imageShadow" ? null : "imageShadow"), active: activeFeature === "imageShadow" },
          { id: "borderRadius", icon: <MdBorderAll />, label: "Radius", action: () => setActiveFeature(activeFeature === "imageRadius" ? null : "imageRadius"), active: activeFeature === "imageRadius" },
          { id: "blur", icon: <MdBlurOn />, label: "Blur", action: () => setActiveFeature(activeFeature === "imageBlur" ? null : "imageBlur"), active: activeFeature === "imageBlur" },
          { id: "opacity", icon: <MdOpacity />, label: "Opacity", action: () => setActiveFeature(activeFeature === "imageOpacity" ? null : "imageOpacity"), active: activeFeature === "imageOpacity" },
          { id: "rotate", icon: <FiRotateCw />, label: "Rotate", action: () => setActiveFeature(activeFeature === "rotate" ? null : "rotate"), active: activeFeature === "rotate" },
          { id: "alignCenter", icon: <FiMove />, label: "Align", action: () => alignElement("center"), active: false },
          { id: "layerUp", icon: <FiArrowUp />, label: "Up", action: layerUp },
          { id: "layerDown", icon: <FiArrowDown />, label: "Down", action: layerDown },
          { id: "duplicate", icon: <FiCopy />, label: "Copy", action: duplicateEl },
          { id: "lock", icon: isLocked ? <FiLock /> : <FiUnlock />, label: isLocked ? "Locked" : "Lock", action: () => setIsLocked(!isLocked), active: isLocked },
          { id: "delete", icon: <FiTrash2 />, label: "Delete", action: deleteEl, danger: true },
        ];
      }
    }
    return baseMenuItems;
  };

  const menuItems = getMenuItems();
  const menuScrollRef = useRef(null);

  const UnifiedMenuBar = () => (
    <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
      <div ref={menuScrollRef} style={{ display: "flex", alignItems: "center", overflowX: "auto", overflowY: "hidden", padding: "8px 12px", minHeight: 62, WebkitOverflowScrolling: "touch", scrollbarWidth: "thin", gap: 6 }}>
        {menuItems.map((item) => (
          <button key={item.id} onClick={item.action} disabled={isRemovingBg && item.id === "removeBg"} style={{
            display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            minWidth: 60, height: 54, padding: "6px 8px", border: "none", borderRadius: 12,
            cursor: (isRemovingBg && item.id === "removeBg") ? "wait" : "pointer",
            background: item.active ? "#eef2ff" : "transparent",
            color: item.danger ? "#dc2626" : item.active ? ACCENT : "#555",
            flexShrink: 0, transition: "all 0.2s ease", position: "relative",
            fontWeight: item.active ? 600 : 500, opacity: (isRemovingBg && item.id === "removeBg") ? 0.6 : 1,
          }}>
            {item.colorDot && item.colorDot !== "transparent" && item.colorDot !== null && item.colorDot !== "gradient" && (
              <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 8, background: item.colorDot, border: "1.5px solid #fff", boxShadow: "0 0 0 1px #ccc" }} />
            )}
            {item.colorDot === "gradient" && (
              <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 8, background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)", border: "1.5px solid #fff", boxShadow: "0 0 0 1px #ccc" }} />
            )}
            <span style={{ fontSize: 20, lineHeight: 1 }}>{item.icon}</span>
            <span style={{ fontSize: 9, lineHeight: 1.2, fontWeight: item.active ? 600 : 500, whiteSpace: "nowrap" }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const GuidesOverlay = () => {
    if (!showGrid && !showGuides && !showBleed && !showFolds) return null;
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
        {showGrid && <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)`, backgroundSize: `${40 * canvasZoom}px ${40 * canvasZoom}px` }} />}
        {showGuides && <>
          <div style={{ position: "absolute", left: guideX1*canvasZoom, top: 0, width: 1, height: "100%", background: "rgba(255,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: guideX2*canvasZoom, top: 0, width: 1, height: "100%", background: "rgba(255,0,0,0.4)" }} />
          <div style={{ position: "absolute", top: guideY1*canvasZoom, left: 0, width: "100%", height: 1, background: "rgba(255,0,0,0.4)" }} />
          <div style={{ position: "absolute", top: guideY2*canvasZoom, left: 0, width: "100%", height: 1, background: "rgba(255,0,0,0.4)" }} />
        </>}
        {showBleed && <div style={{ position: "absolute", left: bleedSize*canvasZoom, top: bleedSize*canvasZoom, right: bleedSize*canvasZoom, bottom: bleedSize*canvasZoom, border: "1px dashed rgba(220,38,38,0.5)" }} />}
        {showFolds && <>
          <div style={{ position: "absolute", left: foldX*canvasZoom, top: 0, width: 2, height: "100%", borderLeft: "2px dashed rgba(59,130,246,0.7)" }} />
          <div style={{ position: "absolute", top: foldY*canvasZoom, left: 0, width: "100%", height: 2, borderTop: "2px dashed rgba(59,130,246,0.7)" }} />
        </>}
      </div>
    );
  };

  const CropOverlay = () => {
    if (!isCropping || !cropElementId) return null;
    
    const element = elements.find(el => el.id === cropElementId);
    if (!element) return null;
    
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 100,
          cursor: "crosshair",
          background: "rgba(0,0,0,0.55)"
        }}
        onMouseDown={handleCropMouseDown}
        onMouseMove={handleCropMouseMove}
        onMouseUp={handleCropMouseUp}
      >
        {cropSelection && cropSelection.w > 0 && cropSelection.h > 0 && (
          <div
            style={{
              position: "absolute",
              left: cropSelection.x * canvasZoom,
              top: cropSelection.y * canvasZoom,
              width: cropSelection.w * canvasZoom,
              height: cropSelection.h * canvasZoom,
              border: "2px solid #fff",
              background: "rgba(99,102,241,0.2)",
              boxSizing: "border-box",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
              pointerEvents: "none"
            }}
          >
            <div style={{ position: "absolute", left: "33.3%", top: 0, width: 1, height: "100%", background: "rgba(255,255,255,0.5)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "66.6%", top: 0, width: 1, height: "100%", background: "rgba(255,255,255,0.5)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: 0, top: "33.3%", width: "100%", height: 1, background: "rgba(255,255,255,0.5)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: 0, top: "66.6%", width: "100%", height: 1, background: "rgba(255,255,255,0.5)", pointerEvents: "none" }} />
          </div>
        )}
        
        <div style={{
          position: "fixed",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1e1e2e",
          borderRadius: 12,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          zIndex: 200
        }}>
          <span style={{ color: "#aaa", fontSize: 12, fontFamily: "monospace" }}>
            Drag to select area to crop
          </span>
          <div style={{ width: 1, height: 20, background: "#444" }} />
          <button
            onClick={(e) => { e.stopPropagation(); cancelCrop(); }}
            style={{
              padding: "6px 14px",
              background: "#374151",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const CanvasArea = () => (
    <div ref={canvasAreaRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
      onTouchStart={onPointerDown} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}
      style={{ position: "relative", width: canvasSize.w * canvasZoom, height: canvasSize.h * canvasZoom, cursor: "default", userSelect: "none", touchAction: "none", boxShadow: "0 4px 32px rgba(0,0,0,0.2)", borderRadius: 4, overflow: "hidden", background: getBgStyle(), margin: "auto" }}>
      {bgImage && <img src={bgImage} alt="bg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: bgOpacity / 100, filter: bgFilter, pointerEvents: "none" }} />}
      <GuidesOverlay />
      {elements.map(el => {
        if (el.type === "text" && editingTextId === el.id) {
          return (
            <textarea key={el.id} ref={textInputRef} value={editingTextValue} onChange={e => setEditingTextValue(e.target.value)} onBlur={finishInlineEdit} onKeyDown={handleTextKeyDown}
              onPointerDown={e => e.stopPropagation()} onPointerMove={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()}
              style={{ position: "absolute", left: el.x * canvasZoom, top: el.y * canvasZoom, width: (el.w || 100) * canvasZoom, height: (el.h || 60) * canvasZoom,
                fontSize: el.fontSize * canvasZoom, fontFamily: el.fontFamily, color: el.color, fontWeight: el.bold ? 700 : 400,
                fontStyle: el.italic ? "italic" : "normal", textDecoration: el.underline ? "underline" : "none", textAlign: el.align || "left",
                border: `2px solid ${ACCENT}`, borderRadius: 4, padding: "4px 8px", background: "transparent", outline: "none", zIndex: 20,
                boxSizing: "border-box", resize: "none", overflow: "hidden", lineHeight: el.lineHeight || 1.3, letterSpacing: `${el.letterSpacing || 0}px`, caretColor: el.color }} />
          );
        }
        return <ElView key={el.id} el={el} zoom={canvasZoom} />;
      })}
      {selEl && !editingTextId && !isCropping && <SelectBox el={selEl} zoom={canvasZoom} />}
      {elements.map(el => el.type === "shape" && <input key={`upload-${el.id}`} id={`shape-image-upload-${el.id}`} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleShapeImageUpload(e, el.id)} />)}
      <CropOverlay />
    </div>
  );

  const FeaturePopup = () => {
    if (!activeFeature) return null;
    const popupStyle = { position: "fixed", bottom: isMobile ? 72 : 60, left: isMobile ? 8 : "auto", right: isMobile ? 8 : "auto", width: isMobile ? "auto" : 350, background: "#fff", borderRadius: 16, boxShadow: "0 -4px 30px rgba(0,0,0,0.18)", zIndex: 300, padding: 16, border: "1px solid #e5e7eb", animation: "popupSlide 0.2s ease" };
    const Header = ({ title }) => (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{title}</span>
        <button onClick={() => setActiveFeature(null)} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><FiX size={14} /></button>
      </div>
    );

    // LIST POPUP - Bullets aur Numbers
    if (activeFeature === "list" && selEl && selEl.type === "text") {
      const applyList = () => {
        const text = selEl.text;
        const lines = text.split('\n');
        
        if (listType === "bullets") {
          const bulletLines = lines.map(line => `${bulletStyle} ${line}`).join('\n');
          commitSel({ text: bulletLines });
          toast.success("Bullets applied!");
        } else {
          const numberLines = lines.map((line, idx) => {
            if (numberStyle === "1.") return `${idx + 1}. ${line}`;
            if (numberStyle === "a.") return `${String.fromCharCode(97 + idx)}. ${line}`;
            if (numberStyle === "i.") {
              const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
              return `${roman[idx] || idx + 1}. ${line}`;
            }
            return `${idx + 1}. ${line}`;
          }).join('\n');
          commitSel({ text: numberLines });
          toast.success("Numbers applied!");
        }
        setActiveFeature(null);
      };
      
      return (
        <div style={popupStyle}>
          <Header title="List" />
          
          {/* List Type Selection */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button onClick={() => setListType("bullets")} style={{ flex: 1, padding: 10, borderRadius: 8, background: listType === "bullets" ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", color: listType === "bullets" ? "#fff" : "#333", fontWeight: 600 }}>
              Bullets
            </button>
            <button onClick={() => setListType("numbers")} style={{ flex: 1, padding: 10, borderRadius: 8, background: listType === "numbers" ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", color: listType === "numbers" ? "#fff" : "#333", fontWeight: 600 }}>
              Numbers
            </button>
          </div>
          
          {/* Bullet Styles */}
          {listType === "bullets" && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Bullet Style</div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setBulletStyle("•")} style={{ width: 50, height: 50, borderRadius: 10, background: bulletStyle === "•" ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", color: bulletStyle === "•" ? "#fff" : "#333" }}>•</button>
                <button onClick={() => setBulletStyle("○")} style={{ width: 50, height: 50, borderRadius: 10, background: bulletStyle === "○" ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", color: bulletStyle === "○" ? "#fff" : "#333" }}>○</button>
                <button onClick={() => setBulletStyle("▪")} style={{ width: 50, height: 50, borderRadius: 10, background: bulletStyle === "▪" ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", color: bulletStyle === "▪" ? "#fff" : "#333" }}>▪</button>
                <button onClick={() => setBulletStyle("▫")} style={{ width: 50, height: 50, borderRadius: 10, background: bulletStyle === "▫" ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", color: bulletStyle === "▫" ? "#fff" : "#333" }}>▫</button>
                <button onClick={() => setBulletStyle("➤")} style={{ width: 50, height: 50, borderRadius: 10, background: bulletStyle === "➤" ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", color: bulletStyle === "➤" ? "#fff" : "#333" }}>➤</button>
              </div>
            </div>
          )}
          
          {/* Number Styles */}
          {listType === "numbers" && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Number Style</div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setNumberStyle("1.")} style={{ flex: 1, padding: 10, borderRadius: 8, background: numberStyle === "1." ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: numberStyle === "1." ? "#fff" : "#333" }}>1, 2, 3</button>
                <button onClick={() => setNumberStyle("a.")} style={{ flex: 1, padding: 10, borderRadius: 8, background: numberStyle === "a." ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: numberStyle === "a." ? "#fff" : "#333" }}>a, b, c</button>
                <button onClick={() => setNumberStyle("i.")} style={{ flex: 1, padding: 10, borderRadius: 8, background: numberStyle === "i." ? ACCENT : "#f3f4f6", border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: numberStyle === "i." ? "#fff" : "#333" }}>i, ii, iii</button>
              </div>
            </div>
          )}
          
          {/* Apply Button */}
          <button onClick={applyList} style={{ width: "100%", padding: 12, background: ACCENT, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, marginTop: 8 }}>
            Apply {listType === "bullets" ? "Bullets" : "Numbers"}
          </button>
          
          {/* Remove List Button */}
          <button onClick={() => { 
            const text = selEl.text;
            const cleanText = text.replace(/^[•○▪▫➤]\s+|^\d+\.\s+|^[a-z]\.\s+|^[ivx]+\.\s+/gm, '');
            commitSel({ text: cleanText });
            toast.success("List removed!");
            setActiveFeature(null);
          }} style={{ width: "100%", marginTop: 10, padding: 10, background: "#fee2e2", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, color: "#dc2626" }}>
            Remove List
          </button>
        </div>
      );
    }

    // ALIGNMENT POPUP - Horizontal aur Vertical (New)
    if (activeFeature === "alignment" && selEl) {
      return (
        <div style={popupStyle}>
          <Header title="Alignment" />
          
          {/* Horizontal Alignment */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Horizontal</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { commitSel({ x: 0 }); setActiveFeature(null); toast.success("Aligned Left"); }} style={{ flex: 1, padding: 10, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <FiAlignLeft size={14} /> Left
              </button>
              <button onClick={() => { commitSel({ x: (canvasSize.w - (selEl.w || 100)) / 2 }); setActiveFeature(null); toast.success("Aligned Center"); }} style={{ flex: 1, padding: 10, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <FiAlignCenter size={14} /> Center
              </button>
              <button onClick={() => { commitSel({ x: canvasSize.w - (selEl.w || 100) }); setActiveFeature(null); toast.success("Aligned Right"); }} style={{ flex: 1, padding: 10, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <FiAlignRight size={14} /> Right
              </button>
            </div>
          </div>
          
          {/* Vertical Alignment */}
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Vertical</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { commitSel({ y: 0 }); setActiveFeature(null); toast.success("Aligned Top"); }} style={{ flex: 1, padding: 10, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <FiArrowUp size={14} /> Top
              </button>
              <button onClick={() => { commitSel({ y: (canvasSize.h - (selEl.h || 60)) / 2 }); setActiveFeature(null); toast.success("Aligned Middle"); }} style={{ flex: 1, padding: 10, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <FiMove size={14} /> Middle
              </button>
              <button onClick={() => { commitSel({ y: canvasSize.h - (selEl.h || 60) }); setActiveFeature(null); toast.success("Aligned Bottom"); }} style={{ flex: 1, padding: 10, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <FiArrowDown size={14} /> Bottom
              </button>
            </div>
          </div>
        </div>
      );
    }

    // SHADOW POPUP - 2 LEVELS (Default simple + Custom detailed)
    if (activeFeature === "shadow" && selEl && selEl.type === "text") {
      
      // If Custom mode is active, show detailed sliders
      if (isShadowCustomMode) {
        const currentShadow = selEl.textShadow && selEl.textShadow !== "none" ? selEl.textShadow : null;
        let currentOpacity = shadowOpacity, currentAngle = shadowAngle, currentBlur = shadowBlur, currentDistance = shadowDistance;
        let currentColor = shadowColor;
        
        if (currentShadow) {
          const match = currentShadow.match(/([-\d.]+)px\s+([-\d.]+)px\s+(\d+)px\s+rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
          if (match) {
            const x = parseFloat(match[1]);
            const y = parseFloat(match[2]);
            currentDistance = Math.sqrt(x*x + y*y);
            currentAngle = Math.atan2(y, x) * 180 / Math.PI;
            if (currentAngle < 0) currentAngle += 360;
            currentBlur = parseInt(match[3]);
            const r = parseInt(match[4]), g = parseInt(match[5]), b = parseInt(match[6]);
            currentColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            currentOpacity = Math.round(parseFloat(match[7]) * 100);
          }
        }
        
        const applyDetailedShadow = () => {
          const rad = (currentAngle * Math.PI) / 180;
          const x = Math.cos(rad) * currentDistance;
          const y = Math.sin(rad) * currentDistance;
          const opacityNum = currentOpacity / 100;
          const r = parseInt(currentColor.slice(1,3), 16);
          const g = parseInt(currentColor.slice(3,5), 16);
          const b = parseInt(currentColor.slice(5,7), 16);
          const shadowString = `${x}px ${y}px ${currentBlur}px rgba(${r}, ${g}, ${b}, ${opacityNum})`;
          commitSel({ textShadow: shadowString });
        };
        
        return (
          <div style={popupStyle}>
            <Header title="Shadow" />
            <button onClick={() => setIsShadowCustomMode(false)} style={{ marginBottom: 12, padding: "4px 8px", background: "#f3f4f6", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}><FiArrowLeft size={12} /> Back to Simple</button>
            
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#666" }}>Opacity</span><span style={{ fontSize: 12, fontWeight: 600 }}>{currentOpacity}%</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="range" min={0} max={100} value={currentOpacity} onChange={(e) => { setShadowOpacity(parseInt(e.target.value)); currentOpacity = parseInt(e.target.value); applyDetailedShadow(); }} style={{ flex: 1 }} />
                <button onClick={() => { setShadowOpacity(prev => Math.min(100, prev + 5)); currentOpacity = Math.min(100, currentOpacity + 5); applyDetailedShadow(); }} style={{ width: 32, height: 32, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontWeight: 600 }}>+</button>
              </div>
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#666" }}>Angle</span><span style={{ fontSize: 12, fontWeight: 600 }}>{currentAngle}°</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="range" min={0} max={360} value={currentAngle} onChange={(e) => { setShadowAngle(parseInt(e.target.value)); currentAngle = parseInt(e.target.value); applyDetailedShadow(); }} style={{ flex: 1 }} />
                <button onClick={() => { setShadowAngle(prev => (prev + 15) % 360); currentAngle = (currentAngle + 15) % 360; applyDetailedShadow(); }} style={{ width: 32, height: 32, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontWeight: 600 }}>+</button>
              </div>
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#666" }}>Blur</span><span style={{ fontSize: 12, fontWeight: 600 }}>{currentBlur}px</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="range" min={0} max={30} value={currentBlur} onChange={(e) => { setShadowBlur(parseInt(e.target.value)); currentBlur = parseInt(e.target.value); applyDetailedShadow(); }} style={{ flex: 1 }} />
                <button onClick={() => { setShadowBlur(prev => Math.min(30, prev + 1)); currentBlur = Math.min(30, currentBlur + 1); applyDetailedShadow(); }} style={{ width: 32, height: 32, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontWeight: 600 }}>+</button>
              </div>
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, marginBottom: 6 }}>Color</div>
              <input type="color" value={currentColor} onChange={(e) => { setShadowColor(e.target.value); currentColor = e.target.value; applyDetailedShadow(); }} style={{ width: "100%", height: 40, borderRadius: 8, cursor: "pointer" }} />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#666" }}>Distance</span><span style={{ fontSize: 12, fontWeight: 600 }}>{currentDistance}px</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="range" min={0} max={50} value={currentDistance} onChange={(e) => { setShadowDistance(parseInt(e.target.value)); currentDistance = parseInt(e.target.value); applyDetailedShadow(); }} style={{ flex: 1 }} />
                <button onClick={() => { setShadowDistance(prev => Math.min(50, prev + 1)); currentDistance = Math.min(50, currentDistance + 1); applyDetailedShadow(); }} style={{ width: 32, height: 32, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontWeight: 600 }}>+</button>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button onClick={() => { commitSel({ textShadow: "none" }); setShadowOpacity(0); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 13 }}>None</button>
              <button onClick={() => { const lightShadow = "2px 2px 4px rgba(0,0,0,0.15)"; commitSel({ textShadow: lightShadow }); setShadowOpacity(15); setShadowAngle(45); setShadowBlur(4); setShadowDistance(2.8); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 13 }}>Light</button>
              <button onClick={() => { const strongShadow = "4px 4px 8px rgba(0,0,0,0.5)"; commitSel({ textShadow: strongShadow }); setShadowOpacity(50); setShadowAngle(45); setShadowBlur(8); setShadowDistance(5.6); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 13 }}>Strong</button>
              <button onClick={() => { setIsShadowCustomMode(true); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: ACCENT, border: "none", cursor: "pointer", fontSize: 13, color: "#fff" }}>Custom</button>
            </div>
            
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", borderTop: "1px solid #e5e7eb", paddingTop: 12 }}>
              {["Aa", "Aa", "Aa", "Aa", "Aa", "Aa", "Aa", "Aa"].map((text, idx) => (
                <div key={idx} style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${COLOR_PRESETS[idx % COLOR_PRESETS.length]}, ${COLOR_PRESETS[(idx+3) % COLOR_PRESETS.length]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer" }} onClick={() => toast.info("Gradient text effect applied!")}>Aa</div>
              ))}
            </div>
          </div>
        );
      }
      
      // Default Simple Shadow Popup
      const currentDistanceFromShadow = () => {
        const shadow = selEl.textShadow && selEl.textShadow !== "none" ? selEl.textShadow : null;
        if (shadow) {
          const match = shadow.match(/([-\d.]+)px\s+([-\d.]+)px/);
          if (match) {
            const x = parseFloat(match[1]);
            const y = parseFloat(match[2]);
            return Math.sqrt(x*x + y*y).toFixed(0);
          }
        }
        return 4;
      };
      
      const handleDistanceChange = (val) => {
        setShadowDistance(val);
        const angle = shadowAngle;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * val;
        const y = Math.sin(rad) * val;
        const opacityNum = shadowOpacity / 100;
        const r = parseInt(shadowColor.slice(1,3), 16);
        const g = parseInt(shadowColor.slice(3,5), 16);
        const b = parseInt(shadowColor.slice(5,7), 16);
        const shadowString = `${x}px ${y}px ${shadowBlur}px rgba(${r}, ${g}, ${b}, ${opacityNum})`;
        commitSel({ textShadow: shadowString });
      };
      
      return (
        <div style={popupStyle}>
          <Header title="Shadow" />
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#666" }}>Distance</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{currentDistanceFromShadow()}px</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="range" min={0} max={30} value={currentDistanceFromShadow()} onChange={(e) => handleDistanceChange(parseInt(e.target.value))} style={{ flex: 1 }} />
              <button onClick={() => handleDistanceChange(Math.min(30, parseInt(currentDistanceFromShadow()) + 1))} style={{ width: 32, height: 32, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontWeight: 600 }}>+</button>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 10, marginBottom: 16, justifyContent: "space-between" }}>
            <div onClick={() => { commitSel({ textShadow: "2px 2px 4px rgba(255,107,107,0.4)" }); setShadowOpacity(40); setShadowBlur(4); setShadowDistance(2.8); setShadowColor("#FF6B6B"); }} style={{ width: 70, height: 50, borderRadius: 10, background: "linear-gradient(135deg, #FF6B6B, #FF6B6B)", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>Aa</div>
            <div onClick={() => { commitSel({ textShadow: "2px 2px 4px rgba(78,205,196,0.4)" }); setShadowOpacity(40); setShadowBlur(4); setShadowDistance(2.8); setShadowColor("#4ECDC4"); }} style={{ width: 70, height: 50, borderRadius: 10, background: "linear-gradient(135deg, #4ECDC4, #4ECDC4)", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>Aa</div>
            <div onClick={() => { commitSel({ textShadow: "2px 2px 4px rgba(102,126,234,0.4)" }); setShadowOpacity(40); setShadowBlur(4); setShadowDistance(2.8); setShadowColor("#667eea"); }} style={{ width: 70, height: 50, borderRadius: 10, background: "linear-gradient(135deg, #667eea, #764ba2)", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>Aa</div>
          </div>
          
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button onClick={() => { commitSel({ textShadow: "none" }); setIsShadowCustomMode(false); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 13 }}>None</button>
            <button onClick={() => { commitSel({ textShadow: "2px 2px 4px rgba(0,0,0,0.15)" }); setIsShadowCustomMode(false); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 13 }}>Light</button>
            <button onClick={() => { commitSel({ textShadow: "4px 4px 8px rgba(0,0,0,0.5)" }); setIsShadowCustomMode(false); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 13 }}>Strong</button>
            <button onClick={() => { setIsShadowCustomMode(true); }} style={{ flex: 1, padding: 8, borderRadius: 8, background: ACCENT, border: "none", cursor: "pointer", fontSize: 13, color: "#fff" }}>Custom</button>
          </div>
        </div>
      );
    }

    // FILL POPUP
    if (activeFeature === "fillColor" && selEl && selEl.type === "text") {
      return (
        <div style={popupStyle}>
          <Header title="Fill" />
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Color 1</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              <div onClick={() => commitSel({ color: "#FF6B6B", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FF6B6B", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#4ECDC4", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#4ECDC4", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#45B7D1", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#45B7D1", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#96CEB4", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#96CEB4", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#FFEAA7", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FFEAA7", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            </div>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Color 2</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              <div onClick={() => commitSel({ color: "#DDA0DD", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#DDA0DD", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#FFB347", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FFB347", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#87CEEB", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#87CEEB", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#FF69B4", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FF69B4", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
              <div onClick={() => commitSel({ color: "#20B2AA", useGradient: false })} style={{ width: 44, height: 44, borderRadius: 10, background: "#20B2AA", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            </div>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              <div onClick={() => commitSel({ useGradient: true, gradientColors: ["#FF6B6B", "#4ECDC4"], gradientType: "linear" })} style={{ width: 70, height: 50, borderRadius: 10, background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>Aa</div>
              <div onClick={() => commitSel({ useGradient: true, gradientColors: ["#667eea", "#764ba2"], gradientType: "linear" })} style={{ width: 70, height: 50, borderRadius: 10, background: "linear-gradient(135deg, #667eea, #764ba2)", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>Aa</div>
              <div onClick={() => commitSel({ useGradient: true, gradientColors: ["#f093fb", "#f5576c"], gradientType: "linear" })} style={{ width: 70, height: 50, borderRadius: 10, background: "linear-gradient(135deg, #f093fb, #f5576c)", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>Aa</div>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 8, borderTop: "1px solid #e5e7eb", paddingTop: 12 }}>
            <button onClick={() => commitSel({ useGradient: false })} style={{ flex: 1, padding: 8, borderRadius: 6, background: selEl.useGradient === false ? ACCENT : "#f3f4f6", color: selEl.useGradient === false ? "#fff" : "#333", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Solid</button>
            <button onClick={() => commitSel({ useGradient: true, gradientColors: ["#FF6B6B", "#4ECDC4"], gradientType: "linear" })} style={{ flex: 1, padding: 8, borderRadius: 6, background: (selEl.useGradient === true && selEl.gradientType === "linear") ? ACCENT : "#f3f4f6", color: (selEl.useGradient === true && selEl.gradientType === "linear") ? "#fff" : "#333", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Linear</button>
            <button onClick={() => commitSel({ useGradient: true, gradientColors: ["#FF6B6B", "#4ECDC4"], gradientType: "radial" })} style={{ flex: 1, padding: 8, borderRadius: 6, background: (selEl.useGradient === true && selEl.gradientType === "radial") ? ACCENT : "#f3f4f6", color: (selEl.useGradient === true && selEl.gradientType === "radial") ? "#fff" : "#333", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Radial</button>
          </div>
        </div>
      );
    }

    // POSITION POPUP
    if (activeFeature === "position" && selEl) {
      return (
        <div style={popupStyle}>
          <Header title="Position" />
          
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <button onClick={() => commitSel({ y: canvasSize.h - (selEl.h || 60) })} style={{ padding: "8px 12px", borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><FiArrowDown size={14} /> To Bottom</button>
              <button onClick={() => commitSel({ y: 0 })} style={{ padding: "8px 12px", borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><FiArrowUp size={14} /> To Top</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <button onClick={layerDown} style={{ padding: "8px 12px", borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Backward</button>
              <button onClick={layerUp} style={{ padding: "8px 12px", borderRadius: 8, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Forward</button>
            </div>
          </div>
          
          <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 12, borderTop: "1px solid #e5e7eb", paddingTop: 12 }}>Align on Design</div>
          
          <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><input type="checkbox" checked={alignChecks.left} onChange={(e) => setAlignChecks(prev => ({ ...prev, left: e.target.checked }))} style={{ width: 16, height: 16, cursor: "pointer" }} /> Left</label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><input type="checkbox" checked={alignChecks.middle} onChange={(e) => setAlignChecks(prev => ({ ...prev, middle: e.target.checked }))} style={{ width: 16, height: 16, cursor: "pointer" }} /> Middle</label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><input type="checkbox" checked={alignChecks.right} onChange={(e) => setAlignChecks(prev => ({ ...prev, right: e.target.checked }))} style={{ width: 16, height: 16, cursor: "pointer" }} /> Right</label>
          </div>
          
          <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><input type="checkbox" checked={alignChecks.top} onChange={(e) => setAlignChecks(prev => ({ ...prev, top: e.target.checked }))} style={{ width: 16, height: 16, cursor: "pointer" }} /> Top</label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><input type="checkbox" checked={alignChecks.center} onChange={(e) => setAlignChecks(prev => ({ ...prev, center: e.target.checked }))} style={{ width: 16, height: 16, cursor: "pointer" }} /> Center</label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><input type="checkbox" checked={alignChecks.bottom} onChange={(e) => setAlignChecks(prev => ({ ...prev, bottom: e.target.checked }))} style={{ width: 16, height: 16, cursor: "pointer" }} /> Bottom</label>
          </div>
          
          <div style={{ display: "flex", gap: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><input type="checkbox" checked={alignChecks.core} onChange={(e) => setAlignChecks(prev => ({ ...prev, core: e.target.checked }))} style={{ width: 16, height: 16, cursor: "pointer" }} /> Core</label>
          </div>
          
          <button onClick={() => {
            if (alignChecks.left) commitSel({ x: 0 });
            if (alignChecks.middle) commitSel({ x: (canvasSize.w - (selEl.w || 100)) / 2 });
            if (alignChecks.right) commitSel({ x: canvasSize.w - (selEl.w || 100) });
            if (alignChecks.top) commitSel({ y: 0 });
            if (alignChecks.center) commitSel({ y: (canvasSize.h - (selEl.h || 60)) / 2 });
            if (alignChecks.bottom) commitSel({ y: canvasSize.h - (selEl.h || 60) });
            if (alignChecks.core) { commitSel({ x: (canvasSize.w - (selEl.w || 100)) / 2, y: (canvasSize.h - (selEl.h || 60)) / 2 }); }
            toast.success("Aligned!");
            setAlignChecks({ left: false, middle: false, right: false, top: false, center: false, bottom: false, core: false });
            setActiveFeature(null);
          }} style={{ width: "100%", marginTop: 16, padding: 10, background: ACCENT, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Apply Align</button>
        </div>
      );
    }

    // OUTLINE POPUP
    if (activeFeature === "outline" && selEl && selEl.type === "text") {
      const isOutlineOn = selEl.textOutline === "solid" && selEl.outlineWidth > 0;
      
      return (
        <div style={popupStyle}>
          <Header title="Outline" />
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Outline</div>
            <div onClick={() => {
              if (isOutlineOn) { commitSel({ textOutline: "none", outlineWidth: 0 }); } 
              else { commitSel({ textOutline: "solid", outlineWidth: 2 }); }
            }} style={{ width: 50, height: 24, background: isOutlineOn ? ACCENT : "#ccc", borderRadius: 30, position: "relative", cursor: "pointer", transition: "all 0.2s ease" }}>
              <div style={{ position: "absolute", width: 20, height: 20, background: "#fff", borderRadius: 20, top: 2, left: isOutlineOn ? "calc(100% - 22px)" : "2px", transition: "left 0.2s ease", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
          
          {isOutlineOn && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, marginBottom: 8 }}>Width: {selEl.outlineWidth || 2}px</div>
              <input type="range" min={1} max={10} step={1} value={selEl.outlineWidth || 2} onChange={e => commitSel({ outlineWidth: +e.target.value, textOutline: "solid" })} style={{ width: "100%" }} />
            </div>
          )}
        </div>
      );
    }

    // Shape Fill Color Popup
    if (activeFeature === "shapeFillColor" && selEl && selEl.type === "shape") {
      return (
        <div style={popupStyle}>
          <Header title="Fill" />
          <input type="color" value={selEl.fill === "transparent" ? "#ffffff" : selEl.fill} onChange={e => commitSel({ fill: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 12, cursor: "pointer" }} />
          <div style={{ display: "flex", gap: 10, justifyContent: "space-between", marginBottom: 12 }}>
            <div onClick={() => commitSel({ fill: "#FF6B6B" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FF6B6B", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#4ECDC4" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#4ECDC4", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#45B7D1" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#45B7D1", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#96CEB4" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#96CEB4", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#FFEAA7" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FFEAA7", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "space-between", marginBottom: 16 }}>
            <div onClick={() => commitSel({ fill: "#DDA0DD" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#DDA0DD", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#FFB347" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FFB347", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#87CEEB" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#87CEEB", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#FF69B4" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#FF69B4", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
            <div onClick={() => commitSel({ fill: "#20B2AA" })} style={{ width: 44, height: 44, borderRadius: 10, background: "#20B2AA", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
          </div>
          <button onClick={() => commitSel({ fill: "transparent" })} style={{ width: "100%", padding: 10, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Transparent</button>
        </div>
      );
    }

    // Image Size Adjustment Popup
    if (activeFeature === "imageSize" && selEl && selEl.type === "image") {
      return (
        <div style={popupStyle}>
          <Header title="Adjust Image Size" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, marginBottom: 8 }}>Width: {Math.round(selEl.w)}px | Height: {Math.round(selEl.h)}px</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FiMinimize size={14} />
                <input type="range" min={20} max={500} value={selEl.w} onChange={(e) => { const newW = parseInt(e.target.value); const aspectRatio = selEl.w / selEl.h; commitSel({ w: newW, h: newW / aspectRatio }); }} style={{ flex: 1 }} />
                <FiMaximize size={14} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => adjustImageSize(100)} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>Reset</button>
              <button onClick={() => { const newW = selEl.w * 1.2; const aspectRatio = selEl.w / selEl.h; commitSel({ w: newW, h: newW / aspectRatio }); }} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>Enlarge 20%</button>
              <button onClick={() => { const newW = selEl.w * 0.8; const aspectRatio = selEl.w / selEl.h; commitSel({ w: newW, h: newW / aspectRatio }); }} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>Shrink 20%</button>
            </div>
          </div>
        </div>
      );
    }

    // Image Shape/Aspect Ratio Adjustment Popup
    if (activeFeature === "imageShape" && selEl && selEl.type === "image") {
      return (
        <div style={popupStyle}>
          <Header title="Adjust Image Shape" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
            <button onClick={() => adjustImageShape("original")} style={{ padding: 10, borderRadius: 8, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}><MdAspectRatio size={18} /><br/>Original</button>
            <button onClick={() => adjustImageShape("square")} style={{ padding: 10, borderRadius: 8, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>⬜<br/>Square 1:1</button>
            <button onClick={() => adjustImageShape("portrait")} style={{ padding: 10, borderRadius: 8, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>📱<br/>Portrait 3:4</button>
            <button onClick={() => adjustImageShape("landscape")} style={{ padding: 10, borderRadius: 8, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>🖥️<br/>Landscape 4:3</button>
            <button onClick={() => adjustImageShape("circle")} style={{ padding: 10, borderRadius: 8, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>⚪<br/>Circle</button>
            <button onClick={() => { const newW = selEl.h; const newH = selEl.h; commitSel({ w: newW, h: newH, borderRadius: 0 }); }} style={{ padding: 10, borderRadius: 8, background: "#f3f4f6", cursor: "pointer", fontSize: 12 }}>🔲<br/>Equal W/H</button>
          </div>
          <div style={{ marginTop: 12, padding: 8, background: "#eef2ff", borderRadius: 8, fontSize: 11, textAlign: "center", color: ACCENT }}>Current: {Math.round(selEl.w)} × {Math.round(selEl.h)}</div>
        </div>
      );
    }

    if (activeFeature === "addText") return (
      <div style={popupStyle}>
        <Header title="Add Text" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <textarea value={tText} onChange={e => setTText(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 10, fontSize: 14, resize: "none", height: 70, boxSizing: "border-box" }} />
          <select value={tFont} onChange={e => setTFont(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 8, fontSize: 13 }}>{FONTS.map(f => <option key={f}>{f}</option>)}</select>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 12, color: "#666", width: 50 }}>Size {tSize}</span><input type="range" min={8} max={200} value={tSize} onChange={e => setTSize(+e.target.value)} style={{ flex: 1 }} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 12, color: "#666" }}>Color</span><input type="color" value={tColor} onChange={e => setTColor(e.target.value)} style={{ width: 40, height: 34, borderRadius: 6, border: "none", cursor: "pointer" }} /></div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["B", () => setTBold(!tBold), tBold], ["I", () => setTItalic(!tItalic), tItalic], ["U", () => setTUnderline(!tUnderline), tUnderline]].map(([l, a, on]) => (<button key={l} onClick={a} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: on ? ACCENT : "#f3f4f6", color: on ? "#fff" : "#333", fontWeight: 700, cursor: "pointer" }}>{l}</button>))}
            <button onClick={() => setTAlign("left")} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: tAlign === "left" ? ACCENT : "#f3f4f6", cursor: "pointer", color: tAlign === "left" ? "#fff" : "#333" }}><FiAlignLeft /></button>
            <button onClick={() => setTAlign("center")} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: tAlign === "center" ? ACCENT : "#f3f4f6", cursor: "pointer", color: tAlign === "center" ? "#fff" : "#333" }}><FiAlignCenter /></button>
            <button onClick={() => setTAlign("right")} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: tAlign === "right" ? ACCENT : "#f3f4f6", cursor: "pointer", color: tAlign === "right" ? "#fff" : "#333" }}><FiAlignRight /></button>
          </div>
          <button onClick={addText} style={{ padding: 12, background: ACCENT, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600 }}>Add Text to Canvas</button>
        </div>
      </div>
    );

    if (activeFeature === "shapeShadow" && selEl && selEl.type === "shape") return (
      <div style={popupStyle}>
        <Header title="Shape Shadow" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><div style={{ fontSize: 12 }}>Shadow Blur</div><input type="range" min={0} max={20} value={selEl.shadow?.blur || 0} onChange={e => commitSel({ shadow: { ...(selEl.shadow || {}), enabled: e.target.value > 0, blur: +e.target.value, color: selEl.shadow?.color || "#000", x: 2, y: 2 } })} style={{ width: "100%" }} /></div>
          <div><div style={{ fontSize: 12 }}>Shadow Color</div><input type="color" value={selEl.shadow?.color || "#000"} onChange={e => commitSel({ shadow: { ...(selEl.shadow || {}), color: e.target.value, enabled: true } })} style={{ width: "100%", height: 40 }} /></div>
          <button onClick={() => commitSel({ shadow: { enabled: false, blur: 0, color: "#000", x: 0, y: 0 } })} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8 }}>Remove Shadow</button>
        </div>
      </div>
    );

    if (activeFeature === "borderRadius" && selEl && selEl.type === "shape") return (
      <div style={popupStyle}>
        <Header title="Border Radius" />
        <input type="range" min={0} max={50} value={selEl.borderRadius || 0} onChange={e => commitSel({ borderRadius: +e.target.value })} style={{ width: "100%" }} />
        <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.borderRadius || 0}px</div>
      </div>
    );

    if (activeFeature === "blur" && selEl && (selEl.type === "shape" || selEl.type === "image")) return (
      <div style={popupStyle}>
        <Header title="Blur Effect" />
        <input type="range" min={0} max={20} value={selEl.blur || 0} onChange={e => commitSel({ blur: +e.target.value })} style={{ width: "100%" }} />
        <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.blur || 0}px</div>
      </div>
    );

    if (activeFeature === "imageRadius" && selEl && selEl.type === "image") return (
      <div style={popupStyle}>
        <Header title="Border Radius" />
        <input type="range" min={0} max={100} value={selEl.borderRadius || 0} onChange={e => commitSel({ borderRadius: +e.target.value })} style={{ width: "100%" }} />
        <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.borderRadius || 0}px</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={() => commitSel({ borderRadius: 50 })} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#f3f4f6", cursor: "pointer" }}>Circle (50px)</button>
          <button onClick={() => commitSel({ borderRadius: 0 })} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#f3f4f6", cursor: "pointer" }}>Square</button>
        </div>
      </div>
    );

    if (activeFeature === "imageShadow" && selEl && selEl.type === "image") return (
      <div style={popupStyle}>
        <Header title="Image Shadow" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><div style={{ fontSize: 12 }}>Shadow Blur</div><input type="range" min={0} max={30} value={selEl.shadow?.blur || 0} onChange={e => commitSel({ shadow: { ...(selEl.shadow || {}), enabled: e.target.value > 0, blur: +e.target.value, color: selEl.shadow?.color || "#000", x: 2, y: 2 } })} style={{ width: "100%" }} /></div>
          <div><div style={{ fontSize: 12 }}>Shadow Color</div><input type="color" value={selEl.shadow?.color || "#000"} onChange={e => commitSel({ shadow: { ...(selEl.shadow || {}), color: e.target.value, enabled: true } })} style={{ width: "100%", height: 40 }} /></div>
          <button onClick={() => commitSel({ shadow: { enabled: false, blur: 0, color: "#000", x: 0, y: 0 } })} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8 }}>Remove Shadow</button>
        </div>
      </div>
    );

    if (activeFeature === "imageOpacity" && selEl && selEl.type === "image") return (
      <div style={popupStyle}>
        <Header title="Image Opacity" />
        <input type="range" min={0} max={100} value={selEl.opacity || 100} onChange={e => commitSel({ opacity: +e.target.value })} style={{ width: "100%" }} />
        <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.opacity || 100}%</div>
      </div>
    );

    if (activeFeature === "changeLang" && selEl && selEl.type === "text") return (
      <div style={popupStyle}>
        <Header title="Change Language" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          <button onClick={() => { const hindiMap = { 'a':'अ','b':'ब','c':'क','d':'द','e':'इ','f':'फ','g':'ग','h':'ह','i':'ई','j':'ज','k':'क','l':'ल','m':'म','n':'न','o':'ओ','p':'प','q':'क','r':'र','s':'स','t':'त','u':'ऊ','v':'व','w':'व','x':'क्स','y':'य','z':'ज',' ':' ' }; commitSel({ text: selEl.text.split('').map(char => hindiMap[char] || char).join('') }); setActiveFeature(null); toast.success("Converted to Hindi"); }} style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>हिंदी</button>
          <button onClick={() => { const englishMap = { 'अ':'a','आ':'aa','इ':'i','ई':'ee','उ':'u','ऊ':'oo','ए':'e','ऐ':'ai','ओ':'o','औ':'au','क':'k','ख':'kh','ग':'g','घ':'gh','च':'ch','छ':'chh','ज':'j','झ':'jh','ट':'t','ठ':'th','ड':'d','ढ':'dh','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'sh','ष':'sh','स':'s','ह':'h',' ':' ' }; commitSel({ text: selEl.text.split('').map(char => englishMap[char] || char).join('') }); setActiveFeature(null); toast.success("Converted to English"); }} style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>English</button>
          <button onClick={() => { const urduMap = { 'a':'ا','b':'ب','c':'ک','d':'د','e':'ع','f':'ف','g':'گ','h':'ہ','i':'ی','j':'ج','k':'ک','l':'ل','m':'م','n':'ن','o':'و','p':'پ','q':'ق','r':'ر','s':'س','t':'ت','u':'ا','v':'و','w':'و','x':'کس','y':'ی','z':'ز',' ':' ' }; commitSel({ text: selEl.text.split('').map(char => urduMap[char] || char).join('') }); setActiveFeature(null); toast.success("Converted to Urdu"); }} style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>اردو</button>
        </div>
      </div>
    );

    if (activeFeature === "rotate" && selEl) return (
      <div style={popupStyle}>
        <Header title="Rotate" />
        <input type="range" min={0} max={360} value={selEl.rotation || 0} onChange={e => commitSel({ rotation: +e.target.value })} style={{ width: "100%" }} />
        <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.rotation || 0}°</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={() => commitSel({ rotation: (selEl.rotation || 0) + 90 })} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#fff", border: "1px solid #e5e7eb", cursor: "pointer" }}>+90°</button>
          <button onClick={() => commitSel({ rotation: (selEl.rotation || 0) - 90 })} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#fff", border: "1px solid #e5e7eb", cursor: "pointer" }}>-90°</button>
          <button onClick={() => commitSel({ rotation: 0 })} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#fff", border: "1px solid #e5e7eb", cursor: "pointer" }}>Reset</button>
        </div>
      </div>
    );

    if (activeFeature === "font" && selEl) return (
      <div style={popupStyle}><Header title="Select Font" /><select value={selEl.fontFamily} onChange={e => { commitSel({ fontFamily: e.target.value }); setActiveFeature(null); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14 }}>{FONTS.map(f => <option key={f}>{f}</option>)}</select></div>
    );

    // Size popup - exactly as you wanted: only (-) number (+) with range slider below
    if (activeFeature === "size" && selEl && selEl.type === "text") return (
      <div style={popupStyle}>
        <Header title="Font Size" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 16 }}>
          <button onClick={() => commitSel({ fontSize: Math.max(8, selEl.fontSize - 2) })} style={{ background: "#f3f4f6", border: "none", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 22, fontWeight: 700, color: "#555" }}>−</button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}><span style={{ fontSize: 32, fontWeight: 700, color: ACCENT }}>{selEl.fontSize}</span><span style={{ fontSize: 12, color: "#888" }}>px</span></div>
          <button onClick={() => commitSel({ fontSize: Math.min(200, selEl.fontSize + 2) })} style={{ background: "#f3f4f6", border: "none", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 22, fontWeight: 700, color: "#555" }}>+</button>
        </div>
        <input type="range" min={8} max={200} value={selEl.fontSize} onChange={e => commitSel({ fontSize: +e.target.value })} style={{ width: "100%" }} />
      </div>
    );

    if (activeFeature === "lineHeight" && selEl) return (
      <div style={popupStyle}><Header title="Line Height" /><input type="range" min={0.8} max={2.5} step={0.1} value={selEl.lineHeight || 1.3} onChange={e => commitSel({ lineHeight: +e.target.value })} style={{ width: "100%" }} /><div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.lineHeight || 1.3}</div></div>
    );

    if (activeFeature === "letterSpacing" && selEl) return (
      <div style={popupStyle}><Header title="Letter Spacing" /><input type="range" min={-2} max={10} value={selEl.letterSpacing || 0} onChange={e => commitSel({ letterSpacing: +e.target.value })} style={{ width: "100%" }} /><div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.letterSpacing || 0}px</div></div>
    );

    if (activeFeature === "background" && selEl) return (
      <div style={popupStyle}><Header title="Text Background" /><input type="color" value={selEl.textBackground === "transparent" ? "#ffffff" : selEl.textBackground} onChange={e => commitSel({ textBackground: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8 }} /><button onClick={() => commitSel({ textBackground: "transparent" })} style={{ marginTop: 10, padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, width: "100%", cursor: "pointer" }}>Remove Background</button></div>
    );

    if (activeFeature === "animation" && selEl) return (
      <div style={popupStyle}><Header title="Animation" /><div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>{["none", "fadeIn", "slideUp", "bounce", "pulse", "shake", "zoomIn"].map(anim => (<button key={anim} onClick={() => { commitSel({ animation: anim }); setActiveFeature(null); }} style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", background: selEl.animation === anim ? ACCENT : "#fff", color: selEl.animation === anim ? "#fff" : "#333", cursor: "pointer" }}>{anim}</button>))}</div></div>
    );

    if (activeFeature === "opacity" && selEl && (selEl.type === "text" || selEl.type === "shape")) return (
      <div style={popupStyle}><Header title="Opacity" /><input type="range" min={0} max={100} value={selEl.opacity || 100} onChange={e => commitSel({ opacity: +e.target.value })} style={{ width: "100%" }} /><div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.opacity || 100}%</div></div>
    );

    if (activeFeature === "strokeColor" && selEl) return (
      <div style={popupStyle}><Header title="Stroke Color" /><input type="color" value={selEl.stroke} onChange={e => commitSel({ stroke: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8 }} /><div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <div onClick={() => commitSel({ stroke: "#000000" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#000000", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#FF0000" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#FF0000", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#00FF00" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#00FF00", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#0000FF" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#0000FF", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#FFFF00" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#FFFF00", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#FF00FF" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#FF00FF", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#00FFFF" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#00FFFF", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#FFA500" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#FFA500", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#800080" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#800080", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
        <div onClick={() => commitSel({ stroke: "#FFC0CB" })} style={{ width: 30, height: 30, borderRadius: 15, background: "#FFC0CB", cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />
      </div></div>
    );

    if (activeFeature === "strokeWidth" && selEl) return (
      <div style={popupStyle}><Header title="Stroke Width" /><input type="range" min={0} max={20} value={selEl.strokeW} onChange={e => commitSel({ strokeW: +e.target.value })} style={{ width: "100%" }} /><div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.strokeW}px</div></div>
    );

    if (activeFeature === "imageScale" && selEl && selEl.imageSrc) return (
      <div style={popupStyle}><Header title="Image Scale" /><input type="range" min={0.1} max={3} step={0.01} value={selEl.imageScale || 1} onChange={e => updateShapeImage(selEl.id, { imageScale: +e.target.value })} style={{ width: "100%" }} /><div style={{ textAlign: "center", marginTop: 8 }}>{Math.round((selEl.imageScale || 1) * 100)}%</div></div>
    );

    if (activeFeature === "imagePosition" && selEl && selEl.imageSrc) return (
      <div style={popupStyle}><Header title="Image Position" /><div><div style={{ fontSize: 12 }}>X Offset: {(selEl.imagePosition?.x || 0)}px</div><input type="range" min={-100} max={100} value={selEl.imagePosition?.x || 0} onChange={e => updateShapeImage(selEl.id, { imagePosition: { ...(selEl.imagePosition || { x: 0, y: 0 }), x: +e.target.value } })} style={{ width: "100%" }} /></div>
      <div><div style={{ fontSize: 12 }}>Y Offset: {(selEl.imagePosition?.y || 0)}px</div><input type="range" min={-100} max={100} value={selEl.imagePosition?.y || 0} onChange={e => updateShapeImage(selEl.id, { imagePosition: { ...(selEl.imagePosition || { x: 0, y: 0 }), y: +e.target.value } })} style={{ width: "100%" }} /></div></div>
    );

    if (activeFeature === "hyperlink" && selEl) return (
      <div style={popupStyle}><Header title="Hyperlink" /><input type="url" placeholder="https://example.com" value={selEl.hyperlink || ""} onChange={e => commitSel({ hyperlink: e.target.value })} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 10 }} /><button onClick={() => commitSel({ hyperlink: null })} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", width: "100%" }}>Remove Link</button></div>
    );

    if (activeFeature === "bgColor") return (
      <div style={popupStyle}><Header title="Background Color" /><input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: "100%", height: 50, borderRadius: 8 }} /><div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>{COLOR_PRESETS.map(c => <div key={c} onClick={() => setBgColor(c)} style={{ width: 30, height: 30, borderRadius: 15, background: c, cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />)}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginTop: 8 }}>
        {["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#FFC0CB"].map(c => (<div key={c} onClick={() => setBgColor(c)} style={{ width: "100%", aspectRatio: "1/1", borderRadius: 8, background: c, cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />))}
      </div></div>
    );

    if (activeFeature === "bgOpacity") return (
      <div style={popupStyle}><Header title="Background Opacity" /><input type="range" min={0} max={100} value={bgOpacity} onChange={e => setBgOpacity(+e.target.value)} style={{ width: "100%" }} /><div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{bgOpacity}%</div></div>
    );

    if (activeFeature === "filters") return (
      <div style={popupStyle}><Header title="Image Filters" /><div><div style={{ fontSize: 12 }}>Brightness: {brightness}%</div><input type="range" min={0} max={200} value={brightness} onChange={e => setBrightness(+e.target.value)} style={{ width: "100%" }} /></div>
      <div><div style={{ fontSize: 12 }}>Contrast: {contrast}%</div><input type="range" min={0} max={200} value={contrast} onChange={e => setContrast(+e.target.value)} style={{ width: "100%" }} /></div>
      <div><div style={{ fontSize: 12 }}>Saturation: {saturation}%</div><input type="range" min={0} max={200} value={saturation} onChange={e => setSaturation(+e.target.value)} style={{ width: "100%" }} /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6 }}>{FILTERS_LIST.map(f => <button key={f.name} onClick={() => setFilterPreset(f.value)} style={{ padding: 6, borderRadius: 6, border: "1px solid #e5e7eb", background: filterPreset === f.value ? ACCENT : "#fff", color: filterPreset === f.value ? "#fff" : "#333", cursor: "pointer", fontSize: 11 }}>{f.name}</button>)}</div></div>
    );

    if (activeFeature === "layers") return (
      <div style={popupStyle}><Header title="Layers" /><div style={{ maxHeight: 300, overflowY: "auto" }}>{[...elements].reverse().map((el, idx) => (<div key={el.id} onClick={() => { setSelId(el.id); setActiveFeature(null); }} style={{ padding: 8, marginBottom: 6, borderRadius: 8, background: selId === el.id ? "#eef2ff" : "#f9fafb", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13 }}>{el._label || el.type} {el.type === "text" && `: ${el.text?.substring(0, 20)}`}</span><span style={{ fontSize: 11, color: "#999" }}>Layer {elements.length - idx}</span></div>))}</div></div>
    );

    return null;
  };

  const ImageUploadPopup = () => {
    if (!showImageUploader) return null;
    return (<><div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }} onClick={() => setShowImageUploader(false)} /><div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", borderRadius: 16, padding: 24, zIndex: 999, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", minWidth: 300 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><h3 style={{ margin: 0 }}>Upload Image for Shape</h3><button onClick={() => setShowImageUploader(false)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20 }}>×</button></div><input type="file" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if (f && selectedShapeForImage) { const r = new FileReader(); r.onload = ev => { const el = { id: uid(), type: "shape", shape: selectedShapeForImage, x: 200, y: 200, w: 140, h: 140, fill: "transparent", stroke: sStroke, strokeW: sStrokeW, opacity: 100, rotation: 0, imageSrc: ev.target.result, imageScale: 1, imagePosition: { x: 0, y: 0 }, shadow: { enabled: false, blur: 0, color: "#000", x: 0, y: 0 }, blur: 0, borderRadius: 0 }; commitElements([...elements, el]); setSelId(el.id); setShowImageUploader(false); setSelectedShapeForImage(null); }; r.readAsDataURL(f); } e.target.value = ""; }} style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }} /><button onClick={() => setShowImageUploader(false)} style={{ marginTop: 16, width: "100%", padding: 10, background: ACCENT, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Cancel</button></div></>);
  };

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#e0e0e6", overflow: "hidden" }}>
        <Toaster position="top-center" />
        {isLoadingData && (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ background: "#fff", borderRadius: 20, padding: 32, textAlign: "center" }}><div style={{ fontSize: 40, marginBottom: 16, animation: "spin 1s linear infinite" }}>🎨</div><div style={{ fontSize: 16, fontWeight: 600 }}>Loading Design...</div></div></div>)}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${ACCENT},#ec4899)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>C</div><input value={designTitle} onChange={e => setDesignTitle(e.target.value)} style={{ flex: 1, border: "1px solid #eee", borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 500, minWidth: 0 }} /><button onClick={undo} disabled={hIdx <= 0} style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 14 }}>↩</button><button onClick={redo} disabled={hIdx >= history.length - 1} style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 14 }}>↪</button><button onClick={saveDesignToServer} style={{ padding: "6px 12px", borderRadius: 8, background: `linear-gradient(135deg,${ACCENT},#ec4899)`, color: "#fff", border: "none", fontSize: 12, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}><FiSave size={12} /> Save</button></div>
        <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "16px 12px" }}><CanvasArea /></div>
        <div style={{ position: "fixed", right: 12, bottom: 75, zIndex: 50, display: "flex", flexDirection: "column", gap: 8 }}><button onClick={() => setCanvasZoom(z => Math.min(2, +(z+0.1).toFixed(1)))} style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FiZoomIn /></button><button onClick={() => setCanvasZoom(z => Math.max(0.2, +(z-0.1).toFixed(1)))} style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FiZoomOut /></button><div style={{ width: 40, height: 40, borderRadius: 40, background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{Math.round(canvasZoom*100)}%</div></div>
        <input ref={uploadBgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgUpload} />
        <input ref={uploadImgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAddImage} />
        <UnifiedMenuBar />
        <FeaturePopup />
        <ImageUploadPopup />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes popupSlide { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } } @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } } .animate-fadeIn { animation: fadeIn 0.5s ease; } .animate-slideUp { animation: slideUp 0.5s ease; } .animate-bounce { animation: bounce 0.5s ease; } .animate-pulse { animation: pulse 1s ease-in-out infinite; } .animate-shake { animation: shake 0.5s ease; } .animate-zoomIn { animation: zoomIn 0.5s ease; }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#e0e0e6", overflow: "hidden" }}>
      <Toaster position="top-center" />
      {isLoadingData && (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center" }}><div style={{ fontSize: 32, animation: "spin 1s linear infinite" }}>🎨</div><div style={{ marginTop: 8, fontWeight: 600 }}>Loading Design...</div></div></div>)}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", height: 50, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", flexShrink: 0 }}><div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${ACCENT},#ec4899)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>C</div><input value={designTitle} onChange={e => setDesignTitle(e.target.value)} style={{ border: "1px solid #eee", borderRadius: 8, padding: "4px 12px", fontSize: 13, width: 200 }} /><div style={{ width: 1, height: 26, background: "#e5e7eb" }} /><button onClick={undo} disabled={hIdx <= 0} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 13 }}>↩ Undo</button><button onClick={redo} disabled={hIdx >= history.length - 1} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 13 }}>↪ Redo</button><div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}><button onClick={() => setCanvasZoom(z => Math.max(0.2, +(z-0.1).toFixed(1)))} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18 }}><FiZoomOut /></button><span style={{ fontSize: 12, minWidth: 42, textAlign: "center", fontWeight: 600 }}>{Math.round(canvasZoom*100)}%</span><button onClick={() => setCanvasZoom(z => Math.min(2, +(z+0.1).toFixed(1)))} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18 }}><FiZoomIn /></button><div style={{ width: 1, height: 26, background: "#e5e7eb" }} /><button onClick={exportPNG} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 13 }}>Export PNG</button><button onClick={saveDesignToServer} style={{ padding: "5px 14px", borderRadius: 6, background: "#10b981", color: "#fff", border: "none", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600 }}><FiSave size={14} /> Save</button></div></div>
      <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}><CanvasArea /></div>
      <input ref={uploadBgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgUpload} />
      <input ref={uploadImgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAddImage} />
      <UnifiedMenuBar />
      <FeaturePopup />
      <ImageUploadPopup />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes popupSlide { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } } @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } } @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } } .animate-fadeIn { animation: fadeIn 0.5s ease; } .animate-slideUp { animation: slideUp 0.5s ease; } .animate-bounce { animation: bounce 0.5s ease; } .animate-pulse { animation: pulse 1s ease-in-out infinite; } .animate-shake { animation: shake 0.5s ease; } .animate-zoomIn { animation: zoomIn 0.5s ease; }`}</style>
    </div>
  );
}

function SelectBox({ el, zoom }) {
  const w = (el.w || el.size || 80) * zoom;
  const h = (el.h || el.size || 80) * zoom;
  const ACCENT = "#6366f1";
  const centerX = w / 2;
  return (
    <div style={{ position: "absolute", left: el.x * zoom, top: el.y * zoom, width: w, height: h, pointerEvents: "none", zIndex: 15 }}>
      <div style={{ position: "absolute", inset: 0, border: `2px solid ${ACCENT}`, borderRadius: 4, boxShadow: `0 0 0 1px rgba(99,102,241,0.2), 0 0 0 3px rgba(99,102,241,0.1)`, transition: "all 0.2s ease" }} />
      <div style={{ position: "absolute", inset: -2, border: `1px dashed ${ACCENT}`, borderRadius: 6, opacity: 0.4, animation: "pulse 1.5s ease-in-out infinite" }} />
      {[{ left: -6, top: -6, cursor: "nw-resize" }, { left: centerX - 6, top: -6, cursor: "n-resize" }, { left: w - 6, top: -6, cursor: "ne-resize" }, { left: w - 6, top: h/2 - 6, cursor: "e-resize" }, { left: w - 6, top: h - 6, cursor: "se-resize" }, { left: centerX - 6, top: h - 6, cursor: "s-resize" }, { left: -6, top: h - 6, cursor: "sw-resize" }, { left: -6, top: h/2 - 6, cursor: "w-resize" }].map((handle, i) => (<div key={i} style={{ position: "absolute", left: handle.left, top: handle.top, width: 12, height: 12, background: "#fff", border: `2px solid ${ACCENT}`, borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.15)", cursor: handle.cursor, transition: "transform 0.1s ease, background 0.2s ease" }} />))}
      <div style={{ position: "absolute", left: centerX - 8, top: -22, width: 16, height: 16, background: ACCENT, borderRadius: "50%", cursor: "grab", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.1s ease" }}><FiRotateCw size={10} color="#fff" /></div>
      <div style={{ position: "absolute", left: centerX - 1, top: -6, width: 2, height: 10, background: ACCENT, opacity: 0.5 }} />
    </div>
  );
}

function ElView({ el, zoom }) {
  const w = (el.w || el.size || 80) * zoom;
  const h = (el.h || el.size || 80) * zoom;
  const getAnimClass = () => { const map = { fadeIn: "animate-fadeIn", slideUp: "animate-slideUp", bounce: "animate-bounce", pulse: "animate-pulse", shake: "animate-shake", zoomIn: "animate-zoomIn" }; return map[el.animation] || ""; };
  const transform = `${el.rotation ? `rotate(${el.rotation}deg)` : ""}${el.scale && el.scale !== 1 ? ` scale(${el.scale})` : ""}`.trim();
  const base = { position: "absolute", left: el.x * zoom, top: el.y * zoom, width: w, height: h, opacity: (el.opacity ?? 100) / 100, transform: transform || undefined, transformOrigin: "center center", pointerEvents: "auto", cursor: "move" };
  const shadowStyle = el.shadow?.enabled ? `${el.shadow.x}px ${el.shadow.y}px ${el.shadow.blur}px ${el.shadow.color}` : "none";
  const blurStyle = el.blur ? `blur(${el.blur}px)` : "none";
  const borderRadiusStyle = el.borderRadius ? `${el.borderRadius * zoom}px` : "0px";

  if (el.type === "image") {
    const imgTransform = `${el.rotation ? `rotate(${el.rotation}deg)` : ""}${el.flip ? " scaleX(-1)" : ""}`.trim();
    return <img src={el.src} alt="" draggable={false} className={getAnimClass()} style={{ ...base, objectFit: "contain", transform: imgTransform || undefined, filter: blurStyle, boxShadow: shadowStyle, borderRadius: borderRadiusStyle }} />;
  }

  if (el.type === "text") {
    const textOutlineStyle = el.textOutline === "solid" && el.outlineWidth > 0 ? `${el.outlineWidth * zoom}px ${el.outlineColor}` : "none";
    let textGradient = "";
    if (el.useGradient && el.gradientColors && el.gradientColors.length >= 2) {
      if (el.gradientType === "linear") {
        textGradient = `linear-gradient(135deg, ${el.gradientColors[0]}, ${el.gradientColors[1]})`;
      } else {
        textGradient = `radial-gradient(circle, ${el.gradientColors[0]}, ${el.gradientColors[1]})`;
      }
    }
    const style = { ...base, color: textGradient ? "transparent" : el.color, background: textGradient ? textGradient : (el.textBackground && el.textBackground !== "transparent" ? el.textBackground : "transparent"), backgroundClip: textGradient ? "text" : "unset", WebkitBackgroundClip: textGradient ? "text" : "unset", fontSize: el.fontSize * zoom, fontFamily: el.fontFamily, fontWeight: el.bold ? 700 : 400, fontStyle: el.italic ? "italic" : "normal", textDecoration: el.underline ? "underline" : "none", textAlign: el.align || "left", whiteSpace: "pre-wrap", lineHeight: el.lineHeight || 1.3, letterSpacing: `${el.letterSpacing || 0}px`, textShadow: el.textShadow && el.textShadow !== "none" ? el.textShadow : "none", WebkitTextStroke: textOutlineStyle !== "none" ? textOutlineStyle : undefined, WebkitTextStrokeWidth: textOutlineStyle !== "none" ? `${el.outlineWidth * zoom}px` : undefined, WebkitTextStrokeColor: textOutlineStyle !== "none" ? el.outlineColor : undefined, display: "flex", alignItems: "center", justifyContent: el.align === "center" ? "center" : el.align === "right" ? "flex-end" : "flex-start", borderRadius: 4, padding: "2px 4px" };
    if (el.hyperlink) return <a href={el.hyperlink} target="_blank" rel="noopener noreferrer" className={getAnimClass()} style={style}>{el.text}</a>;
    return <div className={getAnimClass()} style={style}>{el.text}</div>;
  }

  if (el.type === "shape") {
    const sw = (el.strokeW || 2) * zoom;
    if (el.imageSrc) {
      const scale = el.imageScale || 1;
      const imgX = (el.imagePosition?.x || 0) * zoom;
      const imgY = (el.imagePosition?.y || 0) * zoom;
      const imgW = w * scale;
      const imgH = h * scale;
      const clipX = (w - imgW) / 2 + imgX;
      const clipY = (h - imgH) / 2 + imgY;
      return (<div className={getAnimClass()} style={{ ...base, overflow: "hidden", position: "absolute", filter: blurStyle, boxShadow: shadowStyle, borderRadius: borderRadiusStyle }}><svg style={{ position: "absolute", top: 0, left: 0, width: w, height: h }}><defs><clipPath id={`clip-${el.id}`}>{el.shape === "rect" && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} rx={el.borderRadius ? el.borderRadius * zoom : 0} />}{el.shape === "circle" && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} />}</clipPath></defs><image href={el.imageSrc} x={clipX} y={clipY} width={imgW} height={imgH} preserveAspectRatio="xMidYMid slice" clipPath={`url(#clip-${el.id})`} opacity={el.opacity / 100} />{el.shape === "rect" && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} rx={el.borderRadius ? el.borderRadius * zoom : 0} fill="none" stroke={el.stroke} strokeWidth={sw} />}{el.shape === "circle" && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill="none" stroke={el.stroke} strokeWidth={sw} />}</svg></div>);
    }
    return (<svg className={getAnimClass()} style={{ ...base, pointerEvents: "auto", cursor: "move", filter: blurStyle, boxShadow: shadowStyle }} viewBox={`0 0 ${w} ${h}`} overflow="visible">{(el.shape === "rect" || el.shape === "image-rect") && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} rx={el.borderRadius ? el.borderRadius * zoom : 0} fill={el.fill === "transparent" ? "none" : el.fill} stroke={el.stroke} strokeWidth={sw} />}{(el.shape === "circle" || el.shape === "image-circle") && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill={el.fill === "transparent" ? "none" : el.fill} stroke={el.stroke} strokeWidth={sw} />}</svg>);
  }
  return null;
}