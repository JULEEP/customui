// import { useState, useRef, useCallback } from "react";

// const FONTS = ["Arial","Georgia","Impact","Courier New","Verdana","Times New Roman","Comic Sans MS","Trebuchet MS","Tahoma","Palatino"];
// const FILTERS_LIST = [
//   { name: "Normal", value: "" },
//   { name: "Grayscale", value: "grayscale(100%)" },
//   { name: "Sepia", value: "sepia(100%)" },
//   { name: "Warm", value: "sepia(40%) saturate(150%)" },
//   { name: "Cool", value: "hue-rotate(180deg) saturate(120%)" },
//   { name: "Vintage", value: "sepia(60%) contrast(90%) brightness(90%)" },
//   { name: "Bright", value: "brightness(130%) saturate(120%)" },
//   { name: "High Contrast", value: "contrast(160%)" },
//   { name: "Blur", value: "blur(2px)" },
//   { name: "Invert", value: "invert(100%)" },
// ];
// const STICKERS = ["❤️","⭐","🎉","🔥","✨","😊","🌸","🎨","💫","🌟","🎭","🦋","🎪","🏆","💎","🎯"];
// const CANVAS_SIZES = [
//   { label: "Square 1:1", w: 1080, h: 1080 },
//   { label: "Portrait 4:5", w: 1080, h: 1350 },
//   { label: "Landscape 16:9", w: 1920, h: 1080 },
//   { label: "Story 9:16", w: 1080, h: 1920 },
//   { label: "A4 Portrait", w: 794, h: 1123 },
//   { label: "Twitter Post", w: 1200, h: 675 },
//   { label: "Facebook Cover", w: 1640, h: 624 },
// ];

// let idCounter = 1;
// const uid = () => ++idCounter;
// const ACCENT = "#6366f1";
// const HANDLE_R = 5;

// export default function CanvasEditor() {
//   const [panel, setPanel] = useState("upload");
//   const [elements, setElements] = useState([]);
//   const [selId, setSelId] = useState(null);
//   const [bgColor, setBgColor] = useState("#ffffff");
//   const [bgImage, setBgImage] = useState(null);
//   const [bgOpacity, setBgOpacity] = useState(100);
//   const [filterPreset, setFilterPreset] = useState("");
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [canvasSize, setCanvasSize] = useState({ w: 1080, h: 1080 });
//   const [zoom, setZoom] = useState(0.5);
//   const [showGrid, setShowGrid] = useState(false);
//   const [designName, setDesignName] = useState("My Design");
//   const [history, setHistory] = useState([[]]);
//   const [hIdx, setHIdx] = useState(0);
//   // text panel state
//   const [tText, setTText] = useState("Your Text Here");
//   const [tFont, setTFont] = useState("Arial");
//   const [tSize, setTSize] = useState(40);
//   const [tColor, setTColor] = useState("#000000");
//   const [tBold, setTBold] = useState(false);
//   const [tItalic, setTItalic] = useState(false);
//   const [tUnderline, setTUnderline] = useState(false);
//   const [tAlign, setTAlign] = useState("left");
//   // shape
//   const [sFill, setSFill] = useState("#6366f1");
//   const [sStroke, setSStroke] = useState("#000000");
//   const [sStrokeW, setSStrokeW] = useState(2);
//   // draw
//   const [drawColor, setDrawColor] = useState("#000000");
//   const [drawSize, setDrawSize] = useState(5);
//   const [activeTool, setActiveTool] = useState("select");
//   // interaction
//   const interactRef = useRef({ type: null });
//   const isDrawingRef = useRef(false);
//   const drawPathRef = useRef([]);
//   const [liveDrawPath, setLiveDrawPath] = useState(null);
//   const canvasAreaRef = useRef(null);

//   // ── history ───────────────────────────────────────────────────────────────
//   const pushHistory = useCallback((els) => {
//     setHistory(h => {
//       const sliced = h.slice(0, hIdx + 1);
//       return [...sliced, JSON.parse(JSON.stringify(els))];
//     });
//     setHIdx(i => i + 1);
//   }, [hIdx]);

//   const commitElements = useCallback((els) => {
//     setElements(els);
//     pushHistory(els);
//   }, [pushHistory]);

//   const undo = () => {
//     if (hIdx <= 0) return;
//     const ni = hIdx - 1;
//     setHIdx(ni);
//     setElements(JSON.parse(JSON.stringify(history[ni])));
//     setSelId(null);
//   };
//   const redo = () => {
//     if (hIdx >= history.length - 1) return;
//     const ni = hIdx + 1;
//     setHIdx(ni);
//     setElements(JSON.parse(JSON.stringify(history[ni])));
//     setSelId(null);
//   };

//   const selEl = elements.find(e => e.id === selId) || null;
//   const updateSel = (props) => setElements(prev => prev.map(e => e.id === selId ? { ...e, ...props } : e));
//   const commitSel = (props) => {
//     const next = elements.map(e => e.id === selId ? { ...e, ...props } : e);
//     commitElements(next);
//   };

//   // ── canvas helpers ────────────────────────────────────────────────────────
//   const getXY = (e) => {
//     const rect = canvasAreaRef.current.getBoundingClientRect();
//     return { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
//   };

//   const hitTest = (x, y) => {
//     for (let i = elements.length - 1; i >= 0; i--) {
//       const el = elements[i];
//       const ew = el.w || el.size || 80;
//       const eh = el.h || el.size || 80;
//       if (x >= el.x && x <= el.x + ew && y >= el.y && y <= el.y + eh) return el;
//     }
//     return null;
//   };

//   const HANDLES = ["nw","n","ne","e","se","s","sw","w"];
//   const getHPos = (el, h) => {
//     const w = el.w || el.size || 80, hi = el.h || el.size || 80;
//     return {
//       nw:{x:el.x,y:el.y}, n:{x:el.x+w/2,y:el.y}, ne:{x:el.x+w,y:el.y},
//       e:{x:el.x+w,y:el.y+hi/2}, se:{x:el.x+w,y:el.y+hi},
//       s:{x:el.x+w/2,y:el.y+hi}, sw:{x:el.x,y:el.y+hi}, w:{x:el.x,y:el.y+hi/2},
//     }[h];
//   };
//   const hitHandle = (x, y, el) => {
//     const hs = HANDLE_R * 2 / zoom;
//     for (const h of HANDLES) {
//       const p = getHPos(el, h);
//       if (Math.abs(x - p.x) <= hs && Math.abs(y - p.y) <= hs) return h;
//     }
//     return null;
//   };

//   // ── pointer events ────────────────────────────────────────────────────────
//   const onPointerDown = (e) => {
//     if (e.button !== 0) return;
//     e.currentTarget.setPointerCapture(e.pointerId);
//     const { x, y } = getXY(e);

//     if (activeTool === "draw") {
//       isDrawingRef.current = true;
//       drawPathRef.current = [{ x, y }];
//       setLiveDrawPath([{ x, y }]);
//       return;
//     }

//     // check resize handle first
//     if (selEl) {
//       const h = hitHandle(x, y, selEl);
//       if (h) {
//         interactRef.current = { type:"resize", id:selEl.id, handle:h, startX:x, startY:y, origEl:{...selEl} };
//         return;
//       }
//     }

//     const hit = hitTest(x, y);
//     if (hit) {
//       setSelId(hit.id);
//       interactRef.current = { type:"move", id:hit.id, startX:x, startY:y, origEl:{...hit} };
//     } else {
//       setSelId(null);
//       interactRef.current = { type:null };
//     }
//   };

//   const onPointerMove = (e) => {
//     const { x, y } = getXY(e);

//     if (activeTool === "draw" && isDrawingRef.current) {
//       drawPathRef.current.push({ x, y });
//       setLiveDrawPath([...drawPathRef.current]);
//       return;
//     }

//     const ia = interactRef.current;
//     if (!ia.type) return;
//     const dx = x - ia.startX, dy = y - ia.startY;

//     if (ia.type === "move") {
//       setElements(prev => prev.map(el => el.id !== ia.id ? el : {
//         ...el, x: ia.origEl.x + dx, y: ia.origEl.y + dy
//       }));
//     } else if (ia.type === "resize") {
//       const orig = ia.origEl;
//       let nx = orig.x, ny = orig.y;
//       let nw = orig.w || orig.size || 80, nh = orig.h || orig.size || 80;
//       const h = ia.handle;
//       if (h.includes("e")) nw = Math.max(20, orig.w + dx);
//       if (h.includes("s")) nh = Math.max(20, orig.h + dy);
//       if (h.includes("w")) { nx = orig.x + dx; nw = Math.max(20, orig.w - dx); }
//       if (h.includes("n")) { ny = orig.y + dy; nh = Math.max(20, orig.h - dy); }
//       if (orig.size !== undefined) {
//         const ns = Math.max(20, orig.size + Math.max(dx, dy));
//         setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, size: ns }));
//       } else {
//         setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, w: nw, h: nh }));
//       }
//     }
//   };

//   const onPointerUp = () => {
//     if (activeTool === "draw" && isDrawingRef.current) {
//       isDrawingRef.current = false;
//       const path = [...drawPathRef.current];
//       drawPathRef.current = [];
//       setLiveDrawPath(null);
//       if (path.length > 1) {
//         const el = { id:uid(), type:"drawing", path, color:drawColor, size:drawSize, opacity:100 };
//         commitElements([...elements, el]);
//       }
//       return;
//     }
//     const ia = interactRef.current;
//     if (ia.type) setElements(curr => { pushHistory(curr); return curr; });
//     interactRef.current = { type:null };
//   };

//   // ── element actions ───────────────────────────────────────────────────────
//   const addImageEl = (src, iw, ih) => {
//     const scale = Math.min(400/iw, 400/ih, 1);
//     const el = { id:uid(), type:"image", src, x:80, y:80, w:iw*scale, h:ih*scale, opacity:100, rotation:0, flip:false };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     setPanel("upload");
//   };

//   const handleBgUpload = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => setBgImage(ev.target.result);
//     r.readAsDataURL(f); e.target.value = "";
//   };

//   const handleAddImage = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => {
//       const img = new Image();
//       img.onload = () => addImageEl(ev.target.result, img.naturalWidth, img.naturalHeight);
//       img.src = ev.target.result;
//     };
//     r.readAsDataURL(f); e.target.value = "";
//   };

//   const addText = () => {
//     const el = { id:uid(), type:"text", text:tText, x:100, y:100, w:320, h:tSize*2, fontSize:tSize, fontFamily:tFont, color:tColor, bold:tBold, italic:tItalic, underline:tUnderline, align:tAlign, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//   };

//   const addShape = (shape) => {
//     const el = { id:uid(), type:"shape", shape, x:200, y:200, w:140, h:140, fill:sFill, stroke:sStroke, strokeW:sStrokeW, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//   };

//   const addSticker = (emoji) => {
//     const el = { id:uid(), type:"sticker", emoji, x:200, y:200, size:80, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//   };

//   const deleteEl = () => { if (!selId) return; commitElements(elements.filter(e=>e.id!==selId)); setSelId(null); };
//   const duplicateEl = () => {
//     if (!selEl) return;
//     const copy = { ...JSON.parse(JSON.stringify(selEl)), id:uid(), x:selEl.x+20, y:selEl.y+20 };
//     commitElements([...elements, copy]); setSelId(copy.id);
//   };
//   const layerUp = () => {
//     const i = elements.findIndex(e=>e.id===selId);
//     if (i < elements.length-1) { const a=[...elements]; [a[i],a[i+1]]=[a[i+1],a[i]]; commitElements(a); }
//   };
//   const layerDown = () => {
//     const i = elements.findIndex(e=>e.id===selId);
//     if (i > 0) { const a=[...elements]; [a[i],a[i-1]]=[a[i-1],a[i]]; commitElements(a); }
//   };

//   // ── export ────────────────────────────────────────────────────────────────
//   const exportPNG = async () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = canvasSize.w; canvas.height = canvasSize.h;
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvasSize.w,canvasSize.h);
//     const loadImg = src => new Promise(res => { const i=new Image(); i.onload=()=>res(i); i.src=src; });
//     if (bgImage) {
//       const img = await loadImg(bgImage);
//       ctx.save(); ctx.globalAlpha=bgOpacity/100;
//       ctx.filter=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;
//       ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h); ctx.restore();
//     }
//     for (const el of elements) {
//       ctx.save(); ctx.globalAlpha=(el.opacity??100)/100;
//       const cx=el.x+(el.w||el.size||80)/2, cy=el.y+(el.h||el.size||80)/2;
//       if (el.rotation) { ctx.translate(cx,cy); ctx.rotate(el.rotation*Math.PI/180); ctx.translate(-cx,-cy); }
//       if (el.type==="image") {
//         const img=await loadImg(el.src);
//         if (el.flip) { ctx.translate(el.x+el.w,el.y); ctx.scale(-1,1); ctx.drawImage(img,0,0,el.w,el.h); }
//         else ctx.drawImage(img,el.x,el.y,el.w,el.h);
//       } else if (el.type==="text") {
//         ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
//         ctx.fillStyle=el.color; ctx.textAlign=el.align||"left";
//         const tx=el.align==="center"?el.x+el.w/2:el.align==="right"?el.x+el.w:el.x;
//         ctx.fillText(el.text,tx,el.y+el.fontSize);
//         if (el.underline) { const tw=ctx.measureText(el.text).width; ctx.fillRect(el.x,el.y+el.fontSize+3,tw,2); }
//       } else if (el.type==="shape") {
//         ctx.fillStyle=el.fill; ctx.strokeStyle=el.stroke; ctx.lineWidth=el.strokeW;
//         ctx.beginPath();
//         if (el.shape==="rect") ctx.rect(el.x,el.y,el.w,el.h);
//         else if (el.shape==="circle") ctx.ellipse(el.x+el.w/2,el.y+el.h/2,el.w/2,el.h/2,0,0,Math.PI*2);
//         else if (el.shape==="triangle") { ctx.moveTo(el.x+el.w/2,el.y); ctx.lineTo(el.x+el.w,el.y+el.h); ctx.lineTo(el.x,el.y+el.h); ctx.closePath(); }
//         ctx.fill(); ctx.stroke();
//       } else if (el.type==="sticker") {
//         ctx.font=`${el.size}px Arial`; ctx.fillText(el.emoji,el.x,el.y+el.size);
//       } else if (el.type==="drawing") {
//         ctx.strokeStyle=el.color; ctx.lineWidth=el.size; ctx.lineCap="round"; ctx.lineJoin="round";
//         ctx.beginPath(); el.path.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
//       }
//       ctx.restore();
//     }
//     const a=document.createElement("a"); a.download=`${designName}.png`; a.href=canvas.toDataURL(); a.click();
//   };

//   const bgFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;

//   // ── sidebar ───────────────────────────────────────────────────────────────
//   const sideItems = [
//     { id:"upload", icon:"⬆", label:"Upload" },
//     { id:"text", icon:"T", label:"Text" },
//     { id:"shapes", icon:"◻", label:"Shapes" },
//     { id:"stickers", icon:"★", label:"Stickers" },
//     { id:"draw", icon:"✏", label:"Draw" },
//     { id:"bg", icon:"🎨", label:"BG" },
//     { id:"filters", icon:"◑", label:"Filters" },
//     { id:"layers", icon:"≡", label:"Layers" },
//     { id:"size", icon:"⊡", label:"Size" },
//   ];

//   const uploadBgRef = useRef(null);
//   const uploadImgRef = useRef(null);

//   return (
//     <div style={{ display:"flex", height:"100vh", fontFamily:"system-ui,sans-serif", background:"#f1f1f3", overflow:"hidden" }}>

//       {/* Icon rail */}
//       <div style={{ width:68, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", alignItems:"center", padding:"12px 0", gap:4, flexShrink:0 }}>
//         <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:18, marginBottom:12 }}>C</div>
//         {sideItems.map(s => (
//           <button key={s.id}
//             onClick={() => { setPanel(s.id); if(s.id==="draw") setActiveTool("draw"); else setActiveTool("select"); }}
//             style={{ width:54, height:54, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"none", borderRadius:10, cursor:"pointer", background:panel===s.id?"#eef2ff":"transparent", color:panel===s.id?ACCENT:"#555", gap:2 }}>
//             <span style={{ fontSize:s.icon==="T"?20:16, fontWeight:s.icon==="T"?700:400 }}>{s.icon}</span>
//             <span style={{ fontSize:9 }}>{s.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Side panel */}
//       <div style={{ width:250, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0 }}>
//         <div style={{ padding:"12px 14px", borderBottom:"1px solid #f0f0f0", fontWeight:600, fontSize:13, color:"#222" }}>
//           {sideItems.find(s=>s.id===panel)?.label}
//         </div>
//         <div style={{ flex:1, overflowY:"auto", padding:12 }}>

//           {/* Upload panel */}
//           {panel==="upload" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               <input ref={uploadBgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleBgUpload} />
//               <input ref={uploadImgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleAddImage} />
//               <button onClick={()=>uploadBgRef.current.click()}
//                 style={{ padding:"10px 0", border:`2px dashed ${ACCENT}`, borderRadius:10, background:"#f8f8ff", color:ACCENT, cursor:"pointer", fontWeight:600, fontSize:13 }}>
//                 + Set Background Image
//               </button>
//               <button onClick={()=>uploadImgRef.current.click()}
//                 style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:600, fontSize:13 }}>
//                 + Add Image Layer
//               </button>
//               {bgImage && (
//                 <button onClick={()=>setBgImage(null)}
//                   style={{ padding:"8px 0", border:"none", borderRadius:10, background:"#fee2e2", color:"#dc2626", cursor:"pointer", fontSize:12 }}>
//                   Remove Background
//                 </button>
//               )}
//               <div style={{ fontSize:11, color:"#aaa", marginTop:4 }}>JPG · PNG · WEBP · GIF</div>
//             </div>
//           )}

//           {/* Text panel */}
//           {panel==="text" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               <textarea value={tText} onChange={e=>setTText(e.target.value)}
//                 style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:8, fontSize:13, resize:"none", height:72, boxSizing:"border-box", outline:"none" }} />
//               <div>
//                 <div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Font</div>
//                 <select value={tFont} onChange={e=>setTFont(e.target.value)}
//                   style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:"5px 6px", fontSize:12 }}>
//                   {FONTS.map(f=><option key={f}>{f}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Size: {tSize}px</div>
//                 <input type="range" min={8} max={200} value={tSize} onChange={e=>setTSize(+e.target.value)} style={{ width:"100%" }} />
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 <div style={{ fontSize:11, color:"#888" }}>Color</div>
//                 <input type="color" value={tColor} onChange={e=>setTColor(e.target.value)}
//                   style={{ width:40, height:30, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} />
//               </div>
//               <div style={{ display:"flex", gap:6 }}>
//                 {[["B","bold",tBold,setTBold],["I","italic",tItalic,setTItalic],["U","underline",tUnderline,setTUnderline]].map(([l,,v,s])=>(
//                   <button key={l} onClick={()=>s(!v)}
//                     style={{ flex:1, padding:"6px 0", borderRadius:8, border:"1px solid #eee", background:v?ACCENT:"#fff", color:v?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none" }}>{l}</button>
//                 ))}
//               </div>
//               <div style={{ display:"flex", gap:4 }}>
//                 {["left","center","right"].map(a=>(
//                   <button key={a} onClick={()=>setTAlign(a)}
//                     style={{ flex:1, padding:"5px 0", borderRadius:8, border:"1px solid #eee", background:tAlign===a?ACCENT:"#fff", color:tAlign===a?"#fff":"#333", cursor:"pointer", fontSize:14 }}>
//                     {a==="left"?"⇤":a==="center"?"⇔":"⇥"}
//                   </button>
//                 ))}
//               </div>
//               <button onClick={addText}
//                 style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:14 }}>
//                 Add Text
//               </button>
//             </div>
//           )}

//           {/* Shapes panel */}
//           {panel==="shapes" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
//                 {[["rect","▭","Rect"],["circle","○","Circle"],["triangle","△","Triangle"]].map(([s,icon,lbl])=>(
//                   <button key={s} onClick={()=>addShape(s)}
//                     style={{ aspectRatio:"1", border:"1px solid #eee", borderRadius:10, background:"#f8f8ff", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, fontSize:24 }}>
//                     {icon}<span style={{ fontSize:9, color:"#888" }}>{lbl}</span>
//                   </button>
//                 ))}
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 <div style={{ fontSize:11, color:"#888", width:40 }}>Fill</div>
//                 <input type="color" value={sFill} onChange={e=>setSFill(e.target.value)}
//                   style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} />
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 <div style={{ fontSize:11, color:"#888", width:40 }}>Stroke</div>
//                 <input type="color" value={sStroke} onChange={e=>setSStroke(e.target.value)}
//                   style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} />
//                 <input type="range" min={0} max={20} value={sStrokeW} onChange={e=>setSStrokeW(+e.target.value)} style={{ flex:1 }} />
//                 <span style={{ fontSize:11 }}>{sStrokeW}px</span>
//               </div>
//             </div>
//           )}

//           {/* Stickers panel */}
//           {panel==="stickers" && (
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
//               {STICKERS.map(s=>(
//                 <button key={s} onClick={()=>addSticker(s)}
//                   style={{ fontSize:28, padding:8, border:"1px solid #eee", borderRadius:8, cursor:"pointer", background:"#fafafa" }}>{s}</button>
//               ))}
//             </div>
//           )}

//           {/* Draw panel */}
//           {panel==="draw" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//               <div style={{ fontSize:12, color:"#666", padding:8, background:"#f8f8ff", borderRadius:8, border:"1px solid #eee" }}>
//                 ✏️ Draw mode active — drag on canvas to draw
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 <div style={{ fontSize:11, color:"#888" }}>Color</div>
//                 <input type="color" value={drawColor} onChange={e=>setDrawColor(e.target.value)}
//                   style={{ width:40, height:34, borderRadius:8, border:"1px solid #eee", cursor:"pointer" }} />
//               </div>
//               <div>
//                 <div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Brush: {drawSize}px</div>
//                 <input type="range" min={1} max={60} value={drawSize} onChange={e=>setDrawSize(+e.target.value)} style={{ width:"100%" }} />
//               </div>
//               <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
//                 {["#000000","#ef4444","#3b82f6","#22c55e","#f59e0b","#8b5cf6","#ec4899","#ffffff","#64748b"].map(c=>(
//                   <button key={c} onClick={()=>setDrawColor(c)}
//                     style={{ width:28, height:28, borderRadius:"50%", background:c, border:drawColor===c?"3px solid #6366f1":"1px solid #ddd", cursor:"pointer" }} />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* BG panel */}
//           {panel==="bg" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//               <div>
//                 <div style={{ fontSize:11, color:"#888", marginBottom:4 }}>Background Color</div>
//                 <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)}
//                   style={{ width:"100%", height:40, borderRadius:8, border:"1px solid #eee", cursor:"pointer", display:"block" }} />
//               </div>
//               <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
//                 {["#ffffff","#000000","#f8fafc","#fef2f2","#eff6ff","#f0fdf4","#fdf4ff","#fff7ed","#1e293b","#0f172a"].map(c=>(
//                   <button key={c} onClick={()=>setBgColor(c)}
//                     style={{ height:30, borderRadius:6, background:c, border:bgColor===c?"2.5px solid #6366f1":"1px solid #e5e7eb", cursor:"pointer" }} />
//                 ))}
//               </div>
//               {bgImage && (
//                 <div>
//                   <div style={{ fontSize:11, color:"#888", marginBottom:3 }}>BG Opacity: {bgOpacity}%</div>
//                   <input type="range" min={0} max={100} value={bgOpacity} onChange={e=>setBgOpacity(+e.target.value)} style={{ width:"100%" }} />
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Filters panel */}
//           {panel==="filters" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
//                 {FILTERS_LIST.map(f=>(
//                   <button key={f.name} onClick={()=>setFilterPreset(f.value)}
//                     style={{ padding:"7px 4px", borderRadius:8, border:filterPreset===f.value?`2px solid ${ACCENT}`:"1px solid #eee", background:filterPreset===f.value?"#eef2ff":"#fff", cursor:"pointer", fontSize:11, color:filterPreset===f.value?ACCENT:"#444" }}>
//                     {f.name}
//                   </button>
//                 ))}
//               </div>
//               {[["Brightness",brightness,setBrightness],["Contrast",contrast,setContrast],["Saturation",saturation,setSaturation]].map(([l,v,s])=>(
//                 <div key={l}>
//                   <div style={{ fontSize:11, color:"#888", marginBottom:3 }}>{l}: {v}%</div>
//                   <input type="range" min={0} max={200} value={v} onChange={e=>s(+e.target.value)} style={{ width:"100%" }} />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Layers panel */}
//           {panel==="layers" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//               {elements.length===0 && <div style={{ fontSize:12, color:"#aaa", textAlign:"center", padding:20 }}>No layers yet</div>}
//               {[...elements].reverse().map((el,i)=>(
//                 <div key={el.id} onClick={()=>setSelId(el.id)}
//                   style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:8, border:selId===el.id?`2px solid ${ACCENT}`:"1px solid #eee", background:selId===el.id?"#eef2ff":"#fafafa", cursor:"pointer" }}>
//                   <span style={{ fontSize:16 }}>{el.type==="text"?"T":el.type==="image"?"🖼":el.type==="shape"?"◻":el.type==="sticker"?el.emoji:"✏"}</span>
//                   <span style={{ fontSize:11, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:"#333" }}>
//                     {el.type==="text"?el.text:el.type==="sticker"?el.emoji:`${el.type} ${elements.length-i}`}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Size panel */}
//           {panel==="size" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//               {CANVAS_SIZES.map(s=>(
//                 <button key={s.label} onClick={()=>setCanvasSize({w:s.w,h:s.h})}
//                   style={{ padding:"9px 12px", borderRadius:10, border:canvasSize.w===s.w&&canvasSize.h===s.h?`2px solid ${ACCENT}`:"1px solid #eee", background:canvasSize.w===s.w&&canvasSize.h===s.h?"#eef2ff":"#fff", cursor:"pointer", textAlign:"left" }}>
//                   <div style={{ fontSize:13, fontWeight:600, color:canvasSize.w===s.w&&canvasSize.h===s.h?ACCENT:"#222" }}>{s.label}</div>
//                   <div style={{ fontSize:11, color:"#888" }}>{s.w} × {s.h}px</div>
//                 </button>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>

//       {/* Main area */}
//       <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

//         {/* Toolbar */}
//         <div style={{ height:50, background:"#fff", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", gap:8, padding:"0 14px", flexShrink:0 }}>
//           <input value={designName} onChange={e=>setDesignName(e.target.value)}
//             style={{ border:"1px solid #eee", borderRadius:8, padding:"4px 10px", fontSize:13, fontWeight:600, width:130, outline:"none" }} />
//           <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px" }} />
//           <TBtn onClick={undo} disabled={hIdx<=0}>↩</TBtn>
//           <TBtn onClick={redo} disabled={hIdx>=history.length-1}>↪</TBtn>
//           <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px" }} />
//           {selEl && <>
//             <TBtn onClick={deleteEl} danger>🗑</TBtn>
//             <TBtn onClick={duplicateEl}>⧉</TBtn>
//             <TBtn onClick={layerUp}>↑ Layer</TBtn>
//             <TBtn onClick={layerDown}>↓ Layer</TBtn>
//             {selEl.type==="image" && <TBtn onClick={()=>commitSel({flip:!selEl.flip})}>↔ Flip</TBtn>}
//             <span style={{ fontSize:11, color:"#888", marginLeft:4 }}>Opacity</span>
//             <input type="range" min={0} max={100} value={selEl.opacity??100}
//               onChange={e=>updateSel({opacity:+e.target.value})}
//               onPointerUp={()=>pushHistory(elements)} style={{ width:70 }} />
//             <span style={{ fontSize:11, minWidth:28 }}>{selEl.opacity??100}%</span>
//             <span style={{ fontSize:11, color:"#888", marginLeft:4 }}>Rotate</span>
//             <input type="range" min={-180} max={180} value={selEl.rotation??0}
//               onChange={e=>updateSel({rotation:+e.target.value})}
//               onPointerUp={()=>pushHistory(elements)} style={{ width:70 }} />
//             <span style={{ fontSize:11, minWidth:30 }}>{selEl.rotation??0}°</span>
//           </>}
//           <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
//             <label style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, cursor:"pointer" }}>
//               <input type="checkbox" checked={showGrid} onChange={e=>setShowGrid(e.target.checked)} />Grid
//             </label>
//             <TBtn onClick={()=>setZoom(z=>Math.max(0.1,+(z-0.1).toFixed(1)))}>−</TBtn>
//             <span style={{ fontSize:12, minWidth:42, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
//             <TBtn onClick={()=>setZoom(z=>Math.min(3,+(z+0.1).toFixed(1)))}>+</TBtn>
//             <button onClick={exportPNG}
//               style={{ padding:"7px 18px", borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:13 }}>
//               ⬇ Download
//             </button>
//           </div>
//         </div>

//         {/* Canvas workspace */}
//         <div style={{ flex:1, overflow:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:40, background:"#e0e0e6" }}>
//           <div
//             ref={canvasAreaRef}
//             onPointerDown={onPointerDown}
//             onPointerMove={onPointerMove}
//             onPointerUp={onPointerUp}
//             style={{
//               position:"relative",
//               width: canvasSize.w * zoom,
//               height: canvasSize.h * zoom,
//               cursor: activeTool==="draw" ? "crosshair" : "default",
//               userSelect:"none",
//               touchAction:"none",
//               boxShadow:"0 8px 48px rgba(0,0,0,0.22)",
//               borderRadius:3,
//               overflow:"hidden",
//               flexShrink:0,
//               background: bgColor,
//             }}
//           >
//             {/* BG image */}
//             {bgImage && (
//               <img src={bgImage} alt="bg" style={{
//                 position:"absolute", inset:0, width:"100%", height:"100%",
//                 objectFit:"cover", opacity:bgOpacity/100,
//                 filter:bgFilter, pointerEvents:"none",
//               }} />
//             )}

//             {/* Grid */}
//             {showGrid && (
//               <div style={{
//                 position:"absolute", inset:0, pointerEvents:"none",
//                 backgroundImage:`linear-gradient(rgba(99,102,241,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.12) 1px,transparent 1px)`,
//                 backgroundSize:`${40*zoom}px ${40*zoom}px`,
//               }} />
//             )}

//             {/* All elements */}
//             {elements.map(el => <ElView key={el.id} el={el} zoom={zoom} />)}

//             {/* Selection + handles */}
//             {selEl && <SelectBox el={selEl} zoom={zoom} />}

//             {/* Live draw preview */}
//             {liveDrawPath && liveDrawPath.length > 1 && (
//               <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
//                 <polyline
//                   points={liveDrawPath.map(p=>`${p.x*zoom},${p.y*zoom}`).join(" ")}
//                   fill="none" stroke={drawColor} strokeWidth={drawSize*zoom}
//                   strokeLinecap="round" strokeLinejoin="round"
//                 />
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Right properties panel */}
//       {selEl && (
//         <div style={{ width:220, background:"#fff", borderLeft:"1px solid #e5e7eb", overflowY:"auto", padding:12, flexShrink:0 }}>
//           <div style={{ fontWeight:600, fontSize:13, marginBottom:12, color:"#222" }}>Properties</div>
//           <PRw label="X"><NIn value={Math.round(selEl.x)} onChange={v=>commitSel({x:v})} /></PRw>
//           <PRw label="Y"><NIn value={Math.round(selEl.y)} onChange={v=>commitSel({y:v})} /></PRw>
//           {selEl.w!=null && <PRw label="W"><NIn value={Math.round(selEl.w)} onChange={v=>commitSel({w:v})} /></PRw>}
//           {selEl.h!=null && <PRw label="H"><NIn value={Math.round(selEl.h)} onChange={v=>commitSel({h:v})} /></PRw>}
//           {selEl.size!=null && <PRw label="Size"><NIn value={Math.round(selEl.size)} onChange={v=>commitSel({size:v})} /></PRw>}

//           {selEl.type==="text" && <>
//             <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>TEXT</div>
//             <textarea value={selEl.text}
//               onChange={e=>updateSel({text:e.target.value})}
//               onBlur={()=>pushHistory(elements)}
//               style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:6, fontSize:12, resize:"none", height:60, boxSizing:"border-box" }} />
//             <PRw label="Font">
//               <select value={selEl.fontFamily} onChange={e=>commitSel({fontFamily:e.target.value})}
//                 style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 4px", fontSize:11 }}>
//                 {FONTS.map(f=><option key={f}>{f}</option>)}
//               </select>
//             </PRw>
//             <PRw label="Size"><NIn value={selEl.fontSize} onChange={v=>commitSel({fontSize:v})} /></PRw>
//             <PRw label="Color">
//               <input type="color" value={selEl.color} onChange={e=>commitSel({color:e.target.value})}
//                 style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} />
//             </PRw>
//             <div style={{ display:"flex", gap:6, marginTop:4 }}>
//               {[["B","bold"],["I","italic"],["U","underline"]].map(([l,k])=>(
//                 <button key={k} onClick={()=>commitSel({[k]:!selEl[k]})}
//                   style={{ flex:1, padding:"5px 0", borderRadius:6, border:"1px solid #eee", background:selEl[k]?ACCENT:"#fff", color:selEl[k]?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none", fontSize:13 }}>{l}</button>
//               ))}
//             </div>
//           </>}

//           {selEl.type==="shape" && <>
//             <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>SHAPE</div>
//             <PRw label="Fill">
//               <input type="color" value={selEl.fill} onChange={e=>commitSel({fill:e.target.value})}
//                 style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} />
//             </PRw>
//             <PRw label="Stroke">
//               <input type="color" value={selEl.stroke} onChange={e=>commitSel({stroke:e.target.value})}
//                 style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} />
//             </PRw>
//             <PRw label="SW"><NIn value={selEl.strokeW} onChange={v=>commitSel({strokeW:v})} /></PRw>
//           </>}

//           {selEl.type==="sticker" && <>
//             <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>STICKER</div>
//             <div style={{ textAlign:"center", fontSize: selEl.size*0.5 }}>{selEl.emoji}</div>
//           </>}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Selection box with resize handles ────────────────────────────────────────
// function SelectBox({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;
//   const x = el.x * zoom, y = el.y * zoom;
//   const hs = HANDLE_R;
//   const hpts = [
//     { cx:x,     cy:y,     cur:"nw-resize" },
//     { cx:x+w/2, cy:y,     cur:"n-resize" },
//     { cx:x+w,   cy:y,     cur:"ne-resize" },
//     { cx:x+w,   cy:y+h/2, cur:"e-resize" },
//     { cx:x+w,   cy:y+h,   cur:"se-resize" },
//     { cx:x+w/2, cy:y+h,   cur:"s-resize" },
//     { cx:x,     cy:y+h,   cur:"sw-resize" },
//     { cx:x,     cy:y+h/2, cur:"w-resize" },
//   ];
//   return (
//     <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"visible" }}>
//       <rect x={x} y={y} width={w} height={h}
//         fill="none" stroke={ACCENT} strokeWidth={1.5} strokeDasharray="5 4" />
//       {hpts.map((hd,i) => (
//         <rect key={i} x={hd.cx-hs} y={hd.cy-hs} width={hs*2} height={hs*2}
//           rx={2} fill="#fff" stroke={ACCENT} strokeWidth={1.5}
//           style={{ cursor:hd.cur, pointerEvents:"all" }} />
//       ))}
//     </svg>
//   );
// }

// // ── Element renderer ──────────────────────────────────────────────────────────
// function ElView({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;
//   const base = {
//     position:"absolute",
//     left: el.x * zoom,
//     top: el.y * zoom,
//     width: w,
//     height: h,
//     opacity: (el.opacity??100)/100,
//     transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
//     transformOrigin:"center center",
//     pointerEvents:"none",
//   };

//   if (el.type==="image") {
//     return <img src={el.src} alt="" draggable={false}
//       style={{ ...base, objectFit:"contain",
//         transform:`${el.rotation?`rotate(${el.rotation}deg)`:""}${el.flip?" scaleX(-1)":""}`.trim()||undefined }} />;
//   }
//   if (el.type==="text") {
//     return (
//       <div style={{ ...base, fontSize:el.fontSize*zoom, fontFamily:el.fontFamily, color:el.color,
//         fontWeight:el.bold?700:400, fontStyle:el.italic?"italic":"normal",
//         textDecoration:el.underline?"underline":"none", textAlign:el.align||"left",
//         whiteSpace:"pre-wrap", lineHeight:1.3, overflow:"visible" }}>
//         {el.text}
//       </div>
//     );
//   }
//   if (el.type==="shape") {
//     const sw = (el.strokeW||2)*zoom;
//     return (
//       <svg style={base} viewBox={`0 0 ${w} ${h}`} overflow="visible">
//         {el.shape==="rect" && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} fill={el.fill} stroke={el.stroke} strokeWidth={sw} />}
//         {el.shape==="circle" && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill={el.fill} stroke={el.stroke} strokeWidth={sw} />}
//         {el.shape==="triangle" && <polygon points={`${w/2},${sw/2} ${w-sw/2},${h-sw/2} ${sw/2},${h-sw/2}`} fill={el.fill} stroke={el.stroke} strokeWidth={sw} />}
//       </svg>
//     );
//   }
//   if (el.type==="sticker") {
//     return <div style={{ ...base, fontSize:el.size*zoom, lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center" }}>{el.emoji}</div>;
//   }
//   if (el.type==="drawing") {
//     const xs=el.path.map(p=>p.x), ys=el.path.map(p=>p.y);
//     const pad=(el.size||4)+4;
//     const minX=Math.min(...xs)-pad, minY=Math.min(...ys)-pad;
//     const maxX=Math.max(...xs)+pad, maxY=Math.max(...ys)+pad;
//     return (
//       <svg style={{ position:"absolute", left:minX*zoom, top:minY*zoom, pointerEvents:"none", opacity:(el.opacity??100)/100 }}
//         width={(maxX-minX)*zoom} height={(maxY-minY)*zoom}>
//         <polyline
//           points={el.path.map(p=>`${(p.x-minX)*zoom},${(p.y-minY)*zoom}`).join(" ")}
//           fill="none" stroke={el.color} strokeWidth={el.size*zoom}
//           strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     );
//   }
//   return null;
// }

// // ── Tiny shared components ────────────────────────────────────────────────────
// function TBtn({ onClick, disabled, danger, children }) {
//   return (
//     <button onClick={onClick} disabled={disabled}
//       style={{ padding:"5px 10px", borderRadius:7, border:"1px solid #eee", background:danger?"#fef2f2":"#fff", color:danger?"#dc2626":"#333", cursor:disabled?"default":"pointer", opacity:disabled?0.4:1, fontSize:13, whiteSpace:"nowrap" }}>
//       {children}
//     </button>
//   );
// }
// function PRw({ label, children }) {
//   return (
//     <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
//       <div style={{ fontSize:11, color:"#888", width:36 }}>{label}</div>
//       <div style={{ flex:1 }}>{children}</div>
//     </div>
//   );
// }
// function NIn({ value, onChange }) {
//   return (
//     <input type="number" value={value} onChange={e=>onChange(+e.target.value)}
//       style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 6px", fontSize:12, boxSizing:"border-box", outline:"none" }} />
//   );
// }




// // CanvasEditor.jsx - Fixed: Centered Image, No Duplicate BG, API Data Loaded
// import { useState, useRef, useCallback, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast, Toaster } from 'react-hot-toast';

// const FONTS = ["Arial","Georgia","Impact","Courier New","Verdana","Times New Roman","Comic Sans MS","Trebuchet MS","Tahoma","Palatino","Poppins","Roboto","Open Sans"];
// const FILTERS_LIST = [
//   { name: "Normal", value: "" },
//   { name: "Grayscale", value: "grayscale(100%)" },
//   { name: "Sepia", value: "sepia(100%)" },
//   { name: "Warm", value: "sepia(40%) saturate(150%)" },
//   { name: "Cool", value: "hue-rotate(180deg) saturate(120%)" },
//   { name: "Vintage", value: "sepia(60%) contrast(90%) brightness(90%)" },
//   { name: "Bright", value: "brightness(130%) saturate(120%)" },
//   { name: "High Contrast", value: "contrast(160%)" },
//   { name: "Blur", value: "blur(2px)" },
//   { name: "Invert", value: "invert(100%)" },
// ];
// const STICKERS = ["❤️","⭐","🎉","🔥","✨","😊","🌸","🎨","💫","🌟","🎭","🦋","🎪","🏆","💎","🎯"];
// const CANVAS_SIZES = [
//   { label: "Square 1:1", w: 1080, h: 1080 },
//   { label: "Portrait 4:5", w: 1080, h: 1350 },
//   { label: "Landscape 16:9", w: 1920, h: 1080 },
//   { label: "Story 9:16", w: 1080, h: 1920 },
//   { label: "A4 Portrait", w: 794, h: 1123 },
//   { label: "Twitter Post", w: 1200, h: 675 },
//   { label: "Facebook Cover", w: 1640, h: 624 },
// ];

// let idCounter = 1;
// const uid = () => `el_${++idCounter}_${Date.now()}`;
// const ACCENT = "#6366f1";
// const HANDLE_R = 5;
// const API_BASE_URL = "https://designback.onrender.com";

// // Helper: build full URL from relative path
// const getFullImageUrl = (imagePath) => {
//   if (!imagePath) return null;
//   if (imagePath.startsWith('http')) return imagePath;
//   if (imagePath.startsWith('data:')) return imagePath;
//   const cleanPath = imagePath.replace(/\\/g, '/');
//   const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
//   return `${API_BASE_URL}/${normalizedPath}`;
// };

// // Helper: load image and get natural dimensions
// const loadImageDimensions = (src) =>
//   new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
//     img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
//     img.src = src;
//   });

// export default function CanvasEditor() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [panel, setPanel] = useState("upload");
//   const [elements, setElements] = useState([]);
//   const [selId, setSelId] = useState(null);
//   const [bgColor, setBgColor] = useState("#ffffff");
//   // bgImage is intentionally kept null — template image goes as a canvas layer, not bg
//   const [bgImage, setBgImage] = useState(null);
//   const [bgOpacity, setBgOpacity] = useState(100);
//   const [filterPreset, setFilterPreset] = useState("");
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [canvasSize, setCanvasSize] = useState({ w: 794, h: 1123 }); // A4 default for bill book
//   const [zoom, setZoom] = useState(0.55);
//   const [showGrid, setShowGrid] = useState(false);
//   const [designName, setDesignName] = useState("Bill Book Design");
//   const [history, setHistory] = useState([[]]);
//   const [hIdx, setHIdx] = useState(0);
//   const [isLoadingData, setIsLoadingData] = useState(false);

//   // text panel state
//   const [tText, setTText] = useState("Your Text Here");
//   const [tFont, setTFont] = useState("Poppins");
//   const [tSize, setTSize] = useState(40);
//   const [tColor, setTColor] = useState("#000000");
//   const [tBold, setTBold] = useState(false);
//   const [tItalic, setTItalic] = useState(false);
//   const [tUnderline, setTUnderline] = useState(false);
//   const [tAlign, setTAlign] = useState("left");

//   // shape
//   const [sFill, setSFill] = useState("#6366f1");
//   const [sStroke, setSStroke] = useState("#000000");
//   const [sStrokeW, setSStrokeW] = useState(2);

//   // draw
//   const [drawColor, setDrawColor] = useState("#000000");
//   const [drawSize, setDrawSize] = useState(5);
//   const [activeTool, setActiveTool] = useState("select");

//   // interaction
//   const interactRef = useRef({ type: null });
//   const isDrawingRef = useRef(false);
//   const drawPathRef = useRef([]);
//   const [liveDrawPath, setLiveDrawPath] = useState(null);
//   const canvasAreaRef = useRef(null);

//   // ── history helpers ────────────────────────────────────────────────────────
//   const pushHistory = useCallback((els) => {
//     setHistory(h => {
//       const sliced = h.slice(0, hIdx + 1);
//       return [...sliced, JSON.parse(JSON.stringify(els))];
//     });
//     setHIdx(i => i + 1);
//   }, [hIdx]);

//   const commitElements = useCallback((els) => {
//     setElements(els);
//     pushHistory(els);
//   }, [pushHistory]);

//   const undo = () => {
//     if (hIdx <= 0) return;
//     const ni = hIdx - 1;
//     setHIdx(ni);
//     setElements(JSON.parse(JSON.stringify(history[ni])));
//     setSelId(null);
//   };
//   const redo = () => {
//     if (hIdx >= history.length - 1) return;
//     const ni = hIdx + 1;
//     setHIdx(ni);
//     setElements(JSON.parse(JSON.stringify(history[ni])));
//     setSelId(null);
//   };

//   // ── Load bill book data from API ──────────────────────────────────────────
//   /**
//    * Main loader — calls /api/admin/billbook/:id directly and populates canvas.
//    * Also merges in customer details (companyName, address etc.) from designData.
//    */
//   const loadBillBookFromAPI = useCallback(async (billBookId, customerData = {}) => {
//     setIsLoadingData(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/admin/billbook/${billBookId}`);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       const result = await response.json();
//       if (!result.success) throw new Error("API returned failure");

//       const data = result.data;
//       const newElements = [];

//       // 1. Apply design background color (do NOT set bgImage — template is a layer)
//       if (data.design?.backgroundColor) {
//         setBgColor(data.design.backgroundColor);
//       }

//       // 2. Load Template Image as a CENTERED LAYER (not background)
//       if (data.templateImage) {
//         const templateUrl = getFullImageUrl(data.templateImage);
//         try {
//           const { width: iw, height: ih } = await loadImageDimensions(templateUrl);
//           // Fit inside canvas with padding, maintain aspect ratio
//           const maxW = canvasSize.w * 0.85;
//           const maxH = canvasSize.h * 0.85;
//           const scale = Math.min(maxW / iw, maxH / ih, 1);
//           const finalW = Math.round(iw * scale);
//           const finalH = Math.round(ih * scale);
//           const cx = Math.round((canvasSize.w - finalW) / 2);
//           const cy = Math.round((canvasSize.h - finalH) / 2);

//           newElements.push({
//             id: uid(),
//             type: "image",
//             src: templateUrl,
//             x: cx,
//             y: cy,
//             w: finalW,
//             h: finalH,
//             opacity: 100,
//             rotation: 0,
//             flip: false,
//             _label: "Template"
//           });
//         } catch (e) {
//           console.warn("Template image failed to load dimensions:", e);
//         }
//       }

//       // 3. Add text elements from textStyles + real customer data
//       if (data.textStyles) {
//         const textValues = {
//           companyName:    customerData.companyName    || data.companyName    || "",
//           companyAddress: customerData.address        || data.companyAddress || "",
//           companyEmail:   customerData.email          || data.companyEmail   || "",
//           companyPhone:   customerData.mobile         || data.companyPhone   || "",
//           customerName:   data.customerName    || "",
//           customerAddress:data.customerAddress || "",
//           customerEmail:  data.customerEmail   || "",
//           customerPhone:  data.customerPhone   || "",
//         };

//         Object.entries(data.textStyles).forEach(([key, style]) => {
//           if (style.show === false) return;
//           const textContent = textValues[key];
//           if (!textContent) return;

//           const fontSize = style.fontSize || 14;
//           const estWidth = Math.min(textContent.length * fontSize * 0.65, canvasSize.w - 40);

//           newElements.push({
//             id: uid(),
//             type: "text",
//             text: textContent,
//             x: style.x ?? 80,
//             y: style.y ?? 80,
//             w: Math.max(estWidth, 100),
//             h: fontSize * 1.6,
//             fontSize,
//             fontFamily: data.design?.fontFamily || "Poppins",
//             color: style.color || data.design?.textColor || "#000000",
//             bold: style.fontWeight === "bold",
//             italic: style.italic || false,
//             underline: style.underline || false,
//             align: "left",
//             opacity: 100,
//             rotation: 0,
//             _label: key
//           });
//         });
//       }

//       // 4. Add Logo as a layer (with exact logoSettings position)
//       const logoSrc = customerData.logo
//         ? (typeof customerData.logo === "string"
//             ? getFullImageUrl(customerData.logo)
//             : URL.createObjectURL(customerData.logo))
//         : (data.logo ? getFullImageUrl(data.logo) : null);

//       if (logoSrc && data.logoSettings?.show !== false) {
//         const ls = data.logoSettings || {};
//         try {
//           await loadImageDimensions(logoSrc); // just verify it loads
//           newElements.push({
//             id: uid(),
//             type: "image",
//             src: logoSrc,
//             x: ls.x ?? canvasSize.w - 130,
//             y: ls.y ?? 30,
//             w: ls.width  ?? 100,
//             h: ls.height ?? 100,
//             opacity: 100,
//             rotation: 0,
//             flip: false,
//             _label: "Logo"
//           });
//         } catch (e) {
//           console.warn("Logo failed to load:", e);
//         }
//       }

//       // 5. Add border shape if design.border is true
//       if (data.design?.border) {
//         newElements.push({
//           id: uid(),
//           type: "shape",
//           shape: "rect",
//           x: 12,
//           y: 12,
//           w: canvasSize.w - 24,
//           h: canvasSize.h - 24,
//           fill: "transparent",
//           stroke: data.design?.accentColor || ACCENT,
//           strokeW: 2,
//           opacity: 100,
//           rotation: 0,
//           _label: "Border"
//         });
//       }

//       // Commit all at once
//       setElements(newElements);
//       setHistory([[...newElements]]);
//       setHIdx(0);

//       if (customerData.companyName || data.companyName) {
//         setDesignName(`${customerData.companyName || data.companyName} - Bill Book`);
//       }

//       toast.success("Bill book loaded! You can now customize it.");
//     } catch (err) {
//       console.error("Error loading bill book from API:", err);
//       toast.error("Could not load bill book data. Starting with empty canvas.");
//     } finally {
//       setIsLoadingData(false);
//     }
//   }, [canvasSize]);

//   // ── On mount: check localStorage / location state ─────────────────────────
//   useEffect(() => {
//     const init = async () => {
//       // Prefer location.state (passed from SingleBillBook navigate)
//       const stateData = location.state?.billBookData;
//       const localRaw = localStorage.getItem('billBookDesignData');
//       const localData = localRaw ? (() => { try { return JSON.parse(localRaw); } catch { return null; } })() : null;

//       const source = stateData || localData;

//       if (source?.billBookId) {
//         if (localRaw) localStorage.removeItem('billBookDesignData');
//         await loadBillBookFromAPI(source.billBookId, {
//           companyName: source.companyName,
//           address:     source.address,
//           mobile:      source.mobile,
//           email:       source.email,
//           gstNo:       source.gstNo,
//           logo:        source.logo,
//         });
//       }
//     };
//     init();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const selEl = elements.find(e => e.id === selId) || null;
//   const updateSel = (props) => setElements(prev => prev.map(e => e.id === selId ? { ...e, ...props } : e));
//   const commitSel = (props) => {
//     const next = elements.map(e => e.id === selId ? { ...e, ...props } : e);
//     commitElements(next);
//   };

//   // ── canvas coordinate helpers ─────────────────────────────────────────────
//   const getXY = (e) => {
//     const rect = canvasAreaRef.current.getBoundingClientRect();
//     return { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
//   };

//   const hitTest = (x, y) => {
//     for (let i = elements.length - 1; i >= 0; i--) {
//       const el = elements[i];
//       const ew = el.w || el.size || 80;
//       const eh = el.h || el.size || 80;
//       if (x >= el.x && x <= el.x + ew && y >= el.y && y <= el.y + eh) return el;
//     }
//     return null;
//   };

//   const HANDLES = ["nw","n","ne","e","se","s","sw","w"];
//   const getHPos = (el, h) => {
//     const w = el.w || el.size || 80, hi = el.h || el.size || 80;
//     return {
//       nw:{x:el.x,y:el.y}, n:{x:el.x+w/2,y:el.y}, ne:{x:el.x+w,y:el.y},
//       e:{x:el.x+w,y:el.y+hi/2}, se:{x:el.x+w,y:el.y+hi},
//       s:{x:el.x+w/2,y:el.y+hi}, sw:{x:el.x,y:el.y+hi}, w:{x:el.x,y:el.y+hi/2},
//     }[h];
//   };
//   const hitHandle = (x, y, el) => {
//     const hs = HANDLE_R * 2 / zoom;
//     for (const h of HANDLES) {
//       const p = getHPos(el, h);
//       if (Math.abs(x - p.x) <= hs && Math.abs(y - p.y) <= hs) return h;
//     }
//     return null;
//   };

//   // ── pointer events ────────────────────────────────────────────────────────
//   const onPointerDown = (e) => {
//     if (e.button !== 0) return;
//     e.currentTarget.setPointerCapture(e.pointerId);
//     const { x, y } = getXY(e);

//     if (activeTool === "draw") {
//       isDrawingRef.current = true;
//       drawPathRef.current = [{ x, y }];
//       setLiveDrawPath([{ x, y }]);
//       return;
//     }

//     if (selEl) {
//       const h = hitHandle(x, y, selEl);
//       if (h) {
//         interactRef.current = { type:"resize", id:selEl.id, handle:h, startX:x, startY:y, origEl:{...selEl} };
//         return;
//       }
//     }

//     const hit = hitTest(x, y);
//     if (hit) {
//       setSelId(hit.id);
//       interactRef.current = { type:"move", id:hit.id, startX:x, startY:y, origEl:{...hit} };
//     } else {
//       setSelId(null);
//       interactRef.current = { type:null };
//     }
//   };

//   const onPointerMove = (e) => {
//     const { x, y } = getXY(e);

//     if (activeTool === "draw" && isDrawingRef.current) {
//       drawPathRef.current.push({ x, y });
//       setLiveDrawPath([...drawPathRef.current]);
//       return;
//     }

//     const ia = interactRef.current;
//     if (!ia.type) return;
//     const dx = x - ia.startX, dy = y - ia.startY;

//     if (ia.type === "move") {
//       setElements(prev => prev.map(el => el.id !== ia.id ? el : {
//         ...el, x: ia.origEl.x + dx, y: ia.origEl.y + dy
//       }));
//     } else if (ia.type === "resize") {
//       const orig = ia.origEl;
//       let nx = orig.x, ny = orig.y;
//       let nw = orig.w || orig.size || 80, nh = orig.h || orig.size || 80;
//       const h = ia.handle;
//       if (h.includes("e")) nw = Math.max(20, orig.w + dx);
//       if (h.includes("s")) nh = Math.max(20, orig.h + dy);
//       if (h.includes("w")) { nx = orig.x + dx; nw = Math.max(20, orig.w - dx); }
//       if (h.includes("n")) { ny = orig.y + dy; nh = Math.max(20, orig.h - dy); }
//       if (orig.size !== undefined) {
//         const ns = Math.max(20, orig.size + Math.max(dx, dy));
//         setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, size: ns }));
//       } else {
//         setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, w: nw, h: nh }));
//       }
//     }
//   };

//   const onPointerUp = () => {
//     if (activeTool === "draw" && isDrawingRef.current) {
//       isDrawingRef.current = false;
//       const path = [...drawPathRef.current];
//       drawPathRef.current = [];
//       setLiveDrawPath(null);
//       if (path.length > 1) {
//         const el = { id:uid(), type:"drawing", path, color:drawColor, size:drawSize, opacity:100 };
//         commitElements([...elements, el]);
//       }
//       return;
//     }
//     const ia = interactRef.current;
//     if (ia.type) setElements(curr => { pushHistory(curr); return curr; });
//     interactRef.current = { type:null };
//   };

//   // ── element actions ───────────────────────────────────────────────────────
//   const addImageEl = (src, iw, ih) => {
//     const scale = Math.min(400/iw, 400/ih, 1);
//     const el = { id:uid(), type:"image", src, x:80, y:80, w:iw*scale, h:ih*scale, opacity:100, rotation:0, flip:false };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     setPanel("upload");
//   };

//   const handleBgUpload = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => setBgImage(ev.target.result);
//     r.readAsDataURL(f); e.target.value = "";
//   };

//   const handleAddImage = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => {
//       const img = new Image();
//       img.onload = () => addImageEl(ev.target.result, img.naturalWidth, img.naturalHeight);
//       img.src = ev.target.result;
//     };
//     r.readAsDataURL(f); e.target.value = "";
//   };

//   const addText = () => {
//     const el = { id:uid(), type:"text", text:tText, x:100, y:100, w:320, h:tSize*2, fontSize:tSize, fontFamily:tFont, color:tColor, bold:tBold, italic:tItalic, underline:tUnderline, align:tAlign, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//   };

//   const addShape = (shape) => {
//     const el = { id:uid(), type:"shape", shape, x:200, y:200, w:140, h:140, fill:sFill, stroke:sStroke, strokeW:sStrokeW, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//   };

//   const addSticker = (emoji) => {
//     const el = { id:uid(), type:"sticker", emoji, x:200, y:200, size:80, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//   };

//   const deleteEl = () => { if (!selId) return; commitElements(elements.filter(e=>e.id!==selId)); setSelId(null); };
//   const duplicateEl = () => {
//     if (!selEl) return;
//     const copy = { ...JSON.parse(JSON.stringify(selEl)), id:uid(), x:selEl.x+20, y:selEl.y+20 };
//     commitElements([...elements, copy]); setSelId(copy.id);
//   };
//   const layerUp = () => {
//     const i = elements.findIndex(e=>e.id===selId);
//     if (i < elements.length-1) { const a=[...elements]; [a[i],a[i+1]]=[a[i+1],a[i]]; commitElements(a); }
//   };
//   const layerDown = () => {
//     const i = elements.findIndex(e=>e.id===selId);
//     if (i > 0) { const a=[...elements]; [a[i],a[i-1]]=[a[i-1],a[i]]; commitElements(a); }
//   };

//   const saveAndGoBack = () => {
//     const designData = { elements, bgColor, bgImage, bgOpacity, filterPreset, brightness, contrast, saturation, canvasSize, designName };
//     localStorage.setItem('savedDesign', JSON.stringify(designData));
//     toast.success("Design saved!");
//     navigate('/billbooks');
//   };

//   // ── export ────────────────────────────────────────────────────────────────
//   const exportPNG = async () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = canvasSize.w; canvas.height = canvasSize.h;
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvasSize.w,canvasSize.h);
//     const loadImg = src => new Promise(res => { const i=new Image(); i.crossOrigin="anonymous"; i.onload=()=>res(i); i.onerror=()=>res(null); i.src=src; });
//     if (bgImage) {
//       const img = await loadImg(bgImage);
//       if (img) {
//         ctx.save(); ctx.globalAlpha=bgOpacity/100;
//         ctx.filter=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;
//         ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h); ctx.restore();
//       }
//     }
//     for (const el of elements) {
//       ctx.save(); ctx.globalAlpha=(el.opacity??100)/100;
//       const cx=el.x+(el.w||el.size||80)/2, cy=el.y+(el.h||el.size||80)/2;
//       if (el.rotation) { ctx.translate(cx,cy); ctx.rotate(el.rotation*Math.PI/180); ctx.translate(-cx,-cy); }
//       if (el.type==="image") {
//         const img=await loadImg(el.src);
//         if (img) {
//           if (el.flip) { ctx.translate(el.x+el.w,el.y); ctx.scale(-1,1); ctx.drawImage(img,0,0,el.w,el.h); }
//           else ctx.drawImage(img,el.x,el.y,el.w,el.h);
//         }
//       } else if (el.type==="text") {
//         ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
//         ctx.fillStyle=el.color; ctx.textAlign=el.align||"left";
//         const tx=el.align==="center"?el.x+el.w/2:el.align==="right"?el.x+el.w:el.x;
//         ctx.fillText(el.text,tx,el.y+el.fontSize);
//         if (el.underline) { const tw=ctx.measureText(el.text).width; ctx.fillRect(el.x,el.y+el.fontSize+3,tw,2); }
//       } else if (el.type==="shape") {
//         ctx.fillStyle=el.fill==="transparent"?"rgba(0,0,0,0)":el.fill;
//         ctx.strokeStyle=el.stroke; ctx.lineWidth=el.strokeW;
//         ctx.beginPath();
//         if (el.shape==="rect") ctx.rect(el.x,el.y,el.w,el.h);
//         else if (el.shape==="circle") ctx.ellipse(el.x+el.w/2,el.y+el.h/2,el.w/2,el.h/2,0,0,Math.PI*2);
//         else if (el.shape==="triangle") { ctx.moveTo(el.x+el.w/2,el.y); ctx.lineTo(el.x+el.w,el.y+el.h); ctx.lineTo(el.x,el.y+el.h); ctx.closePath(); }
//         ctx.fill(); ctx.stroke();
//       } else if (el.type==="sticker") {
//         ctx.font=`${el.size}px Arial`; ctx.fillText(el.emoji,el.x,el.y+el.size);
//       } else if (el.type==="drawing") {
//         ctx.strokeStyle=el.color; ctx.lineWidth=el.size; ctx.lineCap="round"; ctx.lineJoin="round";
//         ctx.beginPath(); el.path.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
//       }
//       ctx.restore();
//     }
//     const a=document.createElement("a"); a.download=`${designName}.png`; a.href=canvas.toDataURL(); a.click();
//   };

//   const bgFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;

//   const sideItems = [
//     { id:"upload", icon:"⬆", label:"Upload" },
//     { id:"text",   icon:"T",  label:"Text" },
//     { id:"shapes", icon:"◻",  label:"Shapes" },
//     { id:"stickers",icon:"★", label:"Stickers" },
//     { id:"draw",   icon:"✏",  label:"Draw" },
//     { id:"bg",     icon:"🎨", label:"BG" },
//     { id:"filters",icon:"◑",  label:"Filters" },
//     { id:"layers", icon:"≡",  label:"Layers" },
//     { id:"size",   icon:"⊡",  label:"Size" },
//   ];

//   const uploadBgRef = useRef(null);
//   const uploadImgRef = useRef(null);

//   return (
//     <div style={{ display:"flex", height:"100vh", fontFamily:"system-ui,sans-serif", background:"#f1f1f3", overflow:"hidden" }}>
//       <Toaster position="top-center" />

//       {/* Loading overlay */}
//       {isLoadingData && (
//         <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center" }}>
//           <div style={{ background:"#fff", borderRadius:16, padding:"32px 40px", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
//             <div style={{ fontSize:32, marginBottom:12, animation:"spin 1s linear infinite", display:"inline-block" }}>⚙️</div>
//             <div style={{ fontWeight:700, fontSize:16, color:"#333" }}>Loading Bill Book Design...</div>
//             <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Fetching template & placing elements</div>
//           </div>
//         </div>
//       )}

//       {/* Icon rail */}
//       <div style={{ width:68, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", alignItems:"center", padding:"12px 0", gap:4, flexShrink:0 }}>
//         <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:18, marginBottom:12 }}>C</div>
//         {sideItems.map(s => (
//           <button key={s.id}
//             onClick={() => { setPanel(s.id); if(s.id==="draw") setActiveTool("draw"); else setActiveTool("select"); }}
//             style={{ width:54, height:54, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"none", borderRadius:10, cursor:"pointer", background:panel===s.id?"#eef2ff":"transparent", color:panel===s.id?ACCENT:"#555", gap:2 }}>
//             <span style={{ fontSize:s.icon==="T"?20:16, fontWeight:s.icon==="T"?700:400 }}>{s.icon}</span>
//             <span style={{ fontSize:9 }}>{s.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Side panel */}
//       <div style={{ width:250, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0 }}>
//         <div style={{ padding:"12px 14px", borderBottom:"1px solid #f0f0f0", fontWeight:600, fontSize:13, color:"#222" }}>
//           {sideItems.find(s=>s.id===panel)?.label}
//         </div>
//         <div style={{ flex:1, overflowY:"auto", padding:12 }}>

//           {/* Upload panel */}
//           {panel==="upload" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               <input ref={uploadBgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleBgUpload} />
//               <input ref={uploadImgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleAddImage} />
//               <button onClick={()=>uploadBgRef.current.click()} style={{ padding:"10px 0", border:`2px dashed ${ACCENT}`, borderRadius:10, background:"#f8f8ff", color:ACCENT, cursor:"pointer", fontWeight:600, fontSize:13 }}>+ Set Background Image</button>
//               <button onClick={()=>uploadImgRef.current.click()} style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:600, fontSize:13 }}>+ Add Image Layer</button>
//               {bgImage && (<button onClick={()=>setBgImage(null)} style={{ padding:"8px 0", border:"none", borderRadius:10, background:"#fee2e2", color:"#dc2626", cursor:"pointer", fontSize:12 }}>Remove Background</button>)}
//               <div style={{ fontSize:11, color:"#aaa", marginTop:4 }}>JPG · PNG · WEBP · GIF</div>
//             </div>
//           )}

//           {/* Text panel */}
//           {panel==="text" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               <textarea value={tText} onChange={e=>setTText(e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:8, fontSize:13, resize:"none", height:72, boxSizing:"border-box", outline:"none" }} />
//               <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Font</div><select value={tFont} onChange={e=>setTFont(e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:"5px 6px", fontSize:12 }}>{FONTS.map(f=><option key={f}>{f}</option>)}</select></div>
//               <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Size: {tSize}px</div><input type="range" min={8} max={200} value={tSize} onChange={e=>setTSize(+e.target.value)} style={{ width:"100%" }} /></div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888" }}>Color</div><input type="color" value={tColor} onChange={e=>setTColor(e.target.value)} style={{ width:40, height:30, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></div>
//               <div style={{ display:"flex", gap:6 }}>{[["B","bold",tBold,setTBold],["I","italic",tItalic,setTItalic],["U","underline",tUnderline,setTUnderline]].map(([l,,v,s])=>(<button key={l} onClick={()=>s(!v)} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"1px solid #eee", background:v?ACCENT:"#fff", color:v?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none" }}>{l}</button>))}</div>
//               <div style={{ display:"flex", gap:4 }}>{["left","center","right"].map(a=>(<button key={a} onClick={()=>setTAlign(a)} style={{ flex:1, padding:"5px 0", borderRadius:8, border:"1px solid #eee", background:tAlign===a?ACCENT:"#fff", color:tAlign===a?"#fff":"#333", cursor:"pointer", fontSize:14 }}>{a==="left"?"⇤":a==="center"?"⇔":"⇥"}</button>))}</div>
//               <button onClick={addText} style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:14 }}>Add Text</button>
//             </div>
//           )}

//           {/* Shapes panel */}
//           {panel==="shapes" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>{[["rect","▭","Rect"],["circle","○","Circle"],["triangle","△","Triangle"]].map(([s,icon,lbl])=>(<button key={s} onClick={()=>addShape(s)} style={{ aspectRatio:"1", border:"1px solid #eee", borderRadius:10, background:"#f8f8ff", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, fontSize:24 }}>{icon}<span style={{ fontSize:9, color:"#888" }}>{lbl}</span></button>))}</div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888", width:40 }}>Fill</div><input type="color" value={sFill} onChange={e=>setSFill(e.target.value)} style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888", width:40 }}>Stroke</div><input type="color" value={sStroke} onChange={e=>setSStroke(e.target.value)} style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /><input type="range" min={0} max={20} value={sStrokeW} onChange={e=>setSStrokeW(+e.target.value)} style={{ flex:1 }} /><span style={{ fontSize:11 }}>{sStrokeW}px</span></div>
//             </div>
//           )}

//           {/* Stickers panel */}
//           {panel==="stickers" && (<div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>{STICKERS.map(s=>(<button key={s} onClick={()=>addSticker(s)} style={{ fontSize:28, padding:8, border:"1px solid #eee", borderRadius:8, cursor:"pointer", background:"#fafafa" }}>{s}</button>))}</div>)}

//           {/* Draw panel */}
//           {panel==="draw" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//               <div style={{ fontSize:12, color:"#666", padding:8, background:"#f8f8ff", borderRadius:8, border:"1px solid #eee" }}>✏️ Draw mode active — drag on canvas to draw</div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888" }}>Color</div><input type="color" value={drawColor} onChange={e=>setDrawColor(e.target.value)} style={{ width:40, height:34, borderRadius:8, border:"1px solid #eee", cursor:"pointer" }} /></div>
//               <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Brush: {drawSize}px</div><input type="range" min={1} max={60} value={drawSize} onChange={e=>setDrawSize(+e.target.value)} style={{ width:"100%" }} /></div>
//               <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{["#000000","#ef4444","#3b82f6","#22c55e","#f59e0b","#8b5cf6","#ec4899","#ffffff","#64748b"].map(c=>(<button key={c} onClick={()=>setDrawColor(c)} style={{ width:28, height:28, borderRadius:"50%", background:c, border:drawColor===c?"3px solid #6366f1":"1px solid #ddd", cursor:"pointer" }} />))}</div>
//             </div>
//           )}

//           {/* BG panel */}
//           {panel==="bg" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//               <div><div style={{ fontSize:11, color:"#888", marginBottom:4 }}>Background Color</div><input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} style={{ width:"100%", height:40, borderRadius:8, border:"1px solid #eee", cursor:"pointer", display:"block" }} /></div>
//               <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>{["#ffffff","#000000","#f8fafc","#fef2f2","#eff6ff","#f0fdf4","#fdf4ff","#fff7ed","#1e293b","#0f172a"].map(c=>(<button key={c} onClick={()=>setBgColor(c)} style={{ height:30, borderRadius:6, background:c, border:bgColor===c?"2.5px solid #6366f1":"1px solid #e5e7eb", cursor:"pointer" }} />))}</div>
//               {bgImage && (<div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>BG Opacity: {bgOpacity}%</div><input type="range" min={0} max={100} value={bgOpacity} onChange={e=>setBgOpacity(+e.target.value)} style={{ width:"100%" }} /></div>)}
//             </div>
//           )}

//           {/* Filters panel */}
//           {panel==="filters" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>{FILTERS_LIST.map(f=>(<button key={f.name} onClick={()=>setFilterPreset(f.value)} style={{ padding:"7px 4px", borderRadius:8, border:filterPreset===f.value?`2px solid ${ACCENT}`:"1px solid #eee", background:filterPreset===f.value?"#eef2ff":"#fff", cursor:"pointer", fontSize:11, color:filterPreset===f.value?ACCENT:"#444" }}>{f.name}</button>))}</div>
//               {[["Brightness",brightness,setBrightness],["Contrast",contrast,setContrast],["Saturation",saturation,setSaturation]].map(([l,v,s])=>(<div key={l}><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>{l}: {v}%</div><input type="range" min={0} max={200} value={v} onChange={e=>s(+e.target.value)} style={{ width:"100%" }} /></div>))}
//             </div>
//           )}

//           {/* Layers panel */}
//           {panel==="layers" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//               {elements.length===0 && <div style={{ fontSize:12, color:"#aaa", textAlign:"center", padding:20 }}>No layers yet</div>}
//               {[...elements].reverse().map((el,i)=>{
//                 const label = el._label || (el.type==="text" ? el.text?.slice(0,20) : `${el.type} ${elements.length-i}`);
//                 return (
//                   <div key={el.id} onClick={()=>setSelId(el.id)} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:8, border:selId===el.id?`2px solid ${ACCENT}`:"1px solid #eee", background:selId===el.id?"#eef2ff":"#fafafa", cursor:"pointer" }}>
//                     <span style={{ fontSize:16 }}>{el.type==="text"?"T":el.type==="image"?"🖼":el.type==="shape"?"◻":el.type==="sticker"?el.emoji:"✏"}</span>
//                     <span style={{ fontSize:11, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:"#333" }}>{label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Size panel */}
//           {panel==="size" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>{CANVAS_SIZES.map(s=>(<button key={s.label} onClick={()=>setCanvasSize({w:s.w,h:s.h})} style={{ padding:"9px 12px", borderRadius:10, border:canvasSize.w===s.w&&canvasSize.h===s.h?`2px solid ${ACCENT}`:"1px solid #eee", background:canvasSize.w===s.w&&canvasSize.h===s.h?"#eef2ff":"#fff", cursor:"pointer", textAlign:"left" }}><div style={{ fontSize:13, fontWeight:600, color:canvasSize.w===s.w&&canvasSize.h===s.h?ACCENT:"#222" }}>{s.label}</div><div style={{ fontSize:11, color:"#888" }}>{s.w} × {s.h}px</div></button>))}</div>
//           )}
//         </div>
//       </div>

//       {/* Main area */}
//       <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//         {/* Toolbar */}
//         <div style={{ height:50, background:"#fff", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", gap:8, padding:"0 14px", flexShrink:0, overflowX:"auto" }}>
//           <input value={designName} onChange={e=>setDesignName(e.target.value)} style={{ border:"1px solid #eee", borderRadius:8, padding:"4px 10px", fontSize:13, fontWeight:600, width:160, outline:"none", flexShrink:0 }} />
//           <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px", flexShrink:0 }} />
//           <TBtn onClick={undo} disabled={hIdx<=0}>↩ Undo</TBtn>
//           <TBtn onClick={redo} disabled={hIdx>=history.length-1}>↪ Redo</TBtn>
//           <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px", flexShrink:0 }} />
//           {selEl && <>
//             <TBtn onClick={deleteEl} danger>🗑</TBtn>
//             <TBtn onClick={duplicateEl}>⧉</TBtn>
//             <TBtn onClick={layerUp}>↑</TBtn>
//             <TBtn onClick={layerDown}>↓</TBtn>
//             {selEl.type==="image" && <TBtn onClick={()=>commitSel({flip:!selEl.flip})}>↔</TBtn>}
//             <span style={{ fontSize:11, color:"#888", marginLeft:4, flexShrink:0 }}>Opacity</span>
//             <input type="range" min={0} max={100} value={selEl.opacity??100} onChange={e=>updateSel({opacity:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
//             <span style={{ fontSize:11, minWidth:28, flexShrink:0 }}>{selEl.opacity??100}%</span>
//             <span style={{ fontSize:11, color:"#888", marginLeft:4, flexShrink:0 }}>Rotate</span>
//             <input type="range" min={-180} max={180} value={selEl.rotation??0} onChange={e=>updateSel({rotation:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
//             <span style={{ fontSize:11, minWidth:30, flexShrink:0 }}>{selEl.rotation??0}°</span>
//           </>}
//           <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
//             <label style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, cursor:"pointer" }}><input type="checkbox" checked={showGrid} onChange={e=>setShowGrid(e.target.checked)} />Grid</label>
//             <TBtn onClick={()=>setZoom(z=>Math.max(0.1,+(z-0.1).toFixed(1)))}>−</TBtn>
//             <span style={{ fontSize:12, minWidth:42, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
//             <TBtn onClick={()=>setZoom(z=>Math.min(3,+(z+0.1).toFixed(1)))}>+</TBtn>
//             <button onClick={exportPNG} style={{ padding:"7px 14px", borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>⬇ Export</button>
//             <button onClick={saveAndGoBack} style={{ padding:"7px 14px", borderRadius:8, background:"#10b981", color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>💾 Save</button>
//           </div>
//         </div>

//         {/* Canvas workspace */}
//         <div style={{ flex:1, overflow:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:40, background:"#e0e0e6" }}>
//           <div
//             ref={canvasAreaRef}
//             onPointerDown={onPointerDown}
//             onPointerMove={onPointerMove}
//             onPointerUp={onPointerUp}
//             style={{
//               position:"relative",
//               width: canvasSize.w * zoom,
//               height: canvasSize.h * zoom,
//               cursor: activeTool==="draw" ? "crosshair" : "default",
//               userSelect:"none",
//               touchAction:"none",
//               boxShadow:"0 8px 48px rgba(0,0,0,0.22)",
//               borderRadius:3,
//               overflow:"hidden",
//               flexShrink:0,
//               background: bgColor,
//             }}
//           >
//             {/* BG image — only shown if user manually sets one */}
//             {bgImage && (
//               <img src={bgImage} alt="bg" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:bgOpacity/100, filter:bgFilter, pointerEvents:"none" }} />
//             )}
//             {showGrid && (
//               <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(99,102,241,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.12) 1px,transparent 1px)`, backgroundSize:`${40*zoom}px ${40*zoom}px` }} />
//             )}

//             {elements.map(el => <ElView key={el.id} el={el} zoom={zoom} />)}
//             {selEl && <SelectBox el={selEl} zoom={zoom} />}
//             {liveDrawPath && liveDrawPath.length > 1 && (
//               <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
//                 <polyline points={liveDrawPath.map(p=>`${p.x*zoom},${p.y*zoom}`).join(" ")} fill="none" stroke={drawColor} strokeWidth={drawSize*zoom} strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Right properties panel */}
//       {selEl && (
//         <div style={{ width:220, background:"#fff", borderLeft:"1px solid #e5e7eb", overflowY:"auto", padding:12, flexShrink:0 }}>
//           <div style={{ fontWeight:600, fontSize:13, marginBottom:12, color:"#222" }}>Properties</div>
//           {selEl._label && <div style={{ fontSize:10, color:ACCENT, fontWeight:600, marginBottom:8, background:"#eef2ff", padding:"3px 8px", borderRadius:20, display:"inline-block" }}>{selEl._label}</div>}
//           <PRw label="X"><NIn value={Math.round(selEl.x)} onChange={v=>commitSel({x:v})} /></PRw>
//           <PRw label="Y"><NIn value={Math.round(selEl.y)} onChange={v=>commitSel({y:v})} /></PRw>
//           {selEl.w!=null && <PRw label="W"><NIn value={Math.round(selEl.w)} onChange={v=>commitSel({w:v})} /></PRw>}
//           {selEl.h!=null && <PRw label="H"><NIn value={Math.round(selEl.h)} onChange={v=>commitSel({h:v})} /></PRw>}
//           {selEl.size!=null && <PRw label="Size"><NIn value={Math.round(selEl.size)} onChange={v=>commitSel({size:v})} /></PRw>}

//           {selEl.type==="text" && <>
//             <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>TEXT</div>
//             <textarea value={selEl.text} onChange={e=>updateSel({text:e.target.value})} onBlur={()=>pushHistory(elements)} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:6, fontSize:12, resize:"none", height:60, boxSizing:"border-box" }} />
//             <PRw label="Font"><select value={selEl.fontFamily} onChange={e=>commitSel({fontFamily:e.target.value})} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 4px", fontSize:11 }}>{FONTS.map(f=><option key={f}>{f}</option>)}</select></PRw>
//             <PRw label="Size"><NIn value={selEl.fontSize} onChange={v=>commitSel({fontSize:v})} /></PRw>
//             <PRw label="Color"><input type="color" value={selEl.color} onChange={e=>commitSel({color:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
//             <div style={{ display:"flex", gap:6, marginTop:4 }}>{[["B","bold"],["I","italic"],["U","underline"]].map(([l,k])=>(<button key={k} onClick={()=>commitSel({[k]:!selEl[k]})} style={{ flex:1, padding:"5px 0", borderRadius:6, border:"1px solid #eee", background:selEl[k]?ACCENT:"#fff", color:selEl[k]?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none", fontSize:13 }}>{l}</button>))}</div>
//           </>}

//           {selEl.type==="shape" && <>
//             <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>SHAPE</div>
//             <PRw label="Fill"><input type="color" value={selEl.fill==="transparent"?"#ffffff":selEl.fill} onChange={e=>commitSel({fill:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
//             <PRw label="Stroke"><input type="color" value={selEl.stroke} onChange={e=>commitSel({stroke:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
//             <PRw label="SW"><NIn value={selEl.strokeW} onChange={v=>commitSel({strokeW:v})} /></PRw>
//           </>}
//         </div>
//       )}

//       <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }

// // ── Selection box ─────────────────────────────────────────────────────────────
// function SelectBox({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;
//   const x = el.x * zoom, y = el.y * zoom;
//   const hs = HANDLE_R;
//   const hpts = [
//     { cx:x,     cy:y,     cur:"nw-resize" }, { cx:x+w/2, cy:y,     cur:"n-resize"  }, { cx:x+w, cy:y,     cur:"ne-resize" },
//     { cx:x+w,   cy:y+h/2, cur:"e-resize"  }, { cx:x+w,   cy:y+h,   cur:"se-resize" }, { cx:x+w/2, cy:y+h, cur:"s-resize"  },
//     { cx:x,     cy:y+h,   cur:"sw-resize" }, { cx:x,     cy:y+h/2, cur:"w-resize"  },
//   ];
//   return (
//     <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"visible" }}>
//       <rect x={x} y={y} width={w} height={h} fill="none" stroke={ACCENT} strokeWidth={1.5} strokeDasharray="5 4" />
//       {hpts.map((hd,i)=>(<rect key={i} x={hd.cx-hs} y={hd.cy-hs} width={hs*2} height={hs*2} rx={2} fill="#fff" stroke={ACCENT} strokeWidth={1.5} style={{ cursor:hd.cur, pointerEvents:"all" }} />))}
//     </svg>
//   );
// }

// // ── Element renderer ──────────────────────────────────────────────────────────
// function ElView({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;
//   const base = {
//     position:"absolute", left:el.x*zoom, top:el.y*zoom, width:w, height:h,
//     opacity:(el.opacity??100)/100,
//     transform:el.rotation ? `rotate(${el.rotation}deg)` : undefined,
//     transformOrigin:"center center", pointerEvents:"none",
//   };
//   if (el.type==="image") return <img src={el.src} alt="" crossOrigin="anonymous" draggable={false} style={{ ...base, objectFit:"contain", transform:`${el.rotation?`rotate(${el.rotation}deg)`:""}${el.flip?" scaleX(-1)":""}`.trim()||undefined }} />;
//   if (el.type==="text") return (<div style={{ ...base, fontSize:el.fontSize*zoom, fontFamily:el.fontFamily, color:el.color, fontWeight:el.bold?700:400, fontStyle:el.italic?"italic":"normal", textDecoration:el.underline?"underline":"none", textAlign:el.align||"left", whiteSpace:"pre-wrap", lineHeight:1.3, overflow:"visible" }}>{el.text}</div>);
//   if (el.type==="shape") {
//     const sw=(el.strokeW||2)*zoom;
//     return (<svg style={base} viewBox={`0 0 ${w} ${h}`} overflow="visible">
//       {el.shape==="rect"     && <rect     x={sw/2} y={sw/2} width={w-sw} height={h-sw} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
//       {el.shape==="circle"   && <ellipse  cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
//       {el.shape==="triangle" && <polygon  points={`${w/2},${sw/2} ${w-sw/2},${h-sw/2} ${sw/2},${h-sw/2}`} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
//     </svg>);
//   }
//   if (el.type==="sticker") return <div style={{ ...base, fontSize:el.size*zoom, lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center" }}>{el.emoji}</div>;
//   if (el.type==="drawing") {
//     // drawing elements are rendered in the parent SVG overlay via liveDrawPath; stored drawings need their own SVG
//     const allX = el.path.map(p=>p.x), allY = el.path.map(p=>p.y);
//     const minX = Math.min(...allX), minY = Math.min(...allY);
//     const maxX = Math.max(...allX), maxY = Math.max(...allY);
//     const pad = el.size;
//     return (
//       <svg style={{ position:"absolute", left:(minX-pad)*zoom, top:(minY-pad)*zoom, width:(maxX-minX+pad*2)*zoom, height:(maxY-minY+pad*2)*zoom, pointerEvents:"none", overflow:"visible", opacity:(el.opacity??100)/100 }}>
//         <polyline points={el.path.map(p=>`${(p.x-minX+pad)*zoom},${(p.y-minY+pad)*zoom}`).join(" ")} fill="none" stroke={el.color} strokeWidth={el.size*zoom} strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     );
//   }
//   return null;
// }

// function TBtn({ onClick, disabled, danger, children }) {
//   return (<button onClick={onClick} disabled={disabled} style={{ padding:"5px 10px", borderRadius:7, border:"1px solid #eee", background:danger?"#fef2f2":"#fff", color:danger?"#dc2626":"#333", cursor:disabled?"default":"pointer", opacity:disabled?0.4:1, fontSize:13, whiteSpace:"nowrap", flexShrink:0 }}>{children}</button>);
// }
// function PRw({ label, children }) {
//   return (<div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}><div style={{ fontSize:11, color:"#888", width:36 }}>{label}</div><div style={{ flex:1 }}>{children}</div></div>);
// }
// function NIn({ value, onChange }) {
//   return (<input type="number" value={value} onChange={e=>onChange(+e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 6px", fontSize:12, boxSizing:"border-box", outline:"none" }} />);
// }




// // CanvasEditor.jsx - Fixed: Centered Image, No Duplicate BG, API Data Loaded + Mobile Responsive
// import { useState, useRef, useCallback, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast, Toaster } from 'react-hot-toast';

// const FONTS = ["Arial","Georgia","Impact","Courier New","Verdana","Times New Roman","Comic Sans MS","Trebuchet MS","Tahoma","Palatino","Poppins","Roboto","Open Sans"];
// const FILTERS_LIST = [
//   { name: "Normal", value: "" },
//   { name: "Grayscale", value: "grayscale(100%)" },
//   { name: "Sepia", value: "sepia(100%)" },
//   { name: "Warm", value: "sepia(40%) saturate(150%)" },
//   { name: "Cool", value: "hue-rotate(180deg) saturate(120%)" },
//   { name: "Vintage", value: "sepia(60%) contrast(90%) brightness(90%)" },
//   { name: "Bright", value: "brightness(130%) saturate(120%)" },
//   { name: "High Contrast", value: "contrast(160%)" },
//   { name: "Blur", value: "blur(2px)" },
//   { name: "Invert", value: "invert(100%)" },
// ];
// const STICKERS = ["❤️","⭐","🎉","🔥","✨","😊","🌸","🎨","💫","🌟","🎭","🦋","🎪","🏆","💎","🎯"];
// const CANVAS_SIZES = [
//   { label: "Square 1:1", w: 1080, h: 1080 },
//   { label: "Portrait 4:5", w: 1080, h: 1350 },
//   { label: "Landscape 16:9", w: 1920, h: 1080 },
//   { label: "Story 9:16", w: 1080, h: 1920 },
//   { label: "A4 Portrait", w: 794, h: 1123 },
//   { label: "Twitter Post", w: 1200, h: 675 },
//   { label: "Facebook Cover", w: 1640, h: 624 },
// ];

// let idCounter = 1;
// const uid = () => `el_${++idCounter}_${Date.now()}`;
// const ACCENT = "#6366f1";
// const HANDLE_R = 5;
// const API_BASE_URL = "https://designback.onrender.com";

// // Helper: build full URL from relative path
// const getFullImageUrl = (imagePath) => {
//   if (!imagePath) return null;
//   if (imagePath.startsWith('http')) return imagePath;
//   if (imagePath.startsWith('data:')) return imagePath;
//   const cleanPath = imagePath.replace(/\\/g, '/');
//   const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
//   return `${API_BASE_URL}/${normalizedPath}`;
// };

// // Helper: load image and get natural dimensions
// const loadImageDimensions = (src) =>
//   new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
//     img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
//     img.src = src;
//   });

// // Hook: detect mobile
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handler);
//     return () => window.removeEventListener('resize', handler);
//   }, []);
//   return isMobile;
// };

// export default function CanvasEditor() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [panel, setPanel] = useState("upload");
//   const [showMobilePanel, setShowMobilePanel] = useState(false);
//   const [elements, setElements] = useState([]);
//   const [selId, setSelId] = useState(null);
//   const [bgColor, setBgColor] = useState("#ffffff");
//   const [bgImage, setBgImage] = useState(null);
//   const [bgOpacity, setBgOpacity] = useState(100);
//   const [filterPreset, setFilterPreset] = useState("");
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [canvasSize, setCanvasSize] = useState({ w: 794, h: 1123 });
//   const [zoom, setZoom] = useState(0.55);
//   const [showGrid, setShowGrid] = useState(false);
//   const [designName, setDesignName] = useState("Bill Book Design");
//   const [history, setHistory] = useState([[]]);
//   const [hIdx, setHIdx] = useState(0);
//   const [isLoadingData, setIsLoadingData] = useState(false);

//   // text panel state
//   const [tText, setTText] = useState("Your Text Here");
//   const [tFont, setTFont] = useState("Poppins");
//   const [tSize, setTSize] = useState(40);
//   const [tColor, setTColor] = useState("#000000");
//   const [tBold, setTBold] = useState(false);
//   const [tItalic, setTItalic] = useState(false);
//   const [tUnderline, setTUnderline] = useState(false);
//   const [tAlign, setTAlign] = useState("left");

//   // shape
//   const [sFill, setSFill] = useState("#6366f1");
//   const [sStroke, setSStroke] = useState("#000000");
//   const [sStrokeW, setSStrokeW] = useState(2);

//   // draw
//   const [drawColor, setDrawColor] = useState("#000000");
//   const [drawSize, setDrawSize] = useState(5);
//   const [activeTool, setActiveTool] = useState("select");

//   // interaction
//   const interactRef = useRef({ type: null });
//   const isDrawingRef = useRef(false);
//   const drawPathRef = useRef([]);
//   const [liveDrawPath, setLiveDrawPath] = useState(null);
//   const canvasAreaRef = useRef(null);

//   // Auto-set zoom for mobile
//   useEffect(() => {
//     if (isMobile) {
//       const vw = window.innerWidth;
//       const newZoom = Math.min(0.35, (vw - 20) / canvasSize.w);
//       setZoom(+newZoom.toFixed(2));
//     }
//   }, [isMobile, canvasSize]);

//   // ── history helpers ────────────────────────────────────────────────────────
//   const pushHistory = useCallback((els) => {
//     setHistory(h => {
//       const sliced = h.slice(0, hIdx + 1);
//       return [...sliced, JSON.parse(JSON.stringify(els))];
//     });
//     setHIdx(i => i + 1);
//   }, [hIdx]);

//   const commitElements = useCallback((els) => {
//     setElements(els);
//     pushHistory(els);
//   }, [pushHistory]);

//   const undo = () => {
//     if (hIdx <= 0) return;
//     const ni = hIdx - 1;
//     setHIdx(ni);
//     setElements(JSON.parse(JSON.stringify(history[ni])));
//     setSelId(null);
//   };
//   const redo = () => {
//     if (hIdx >= history.length - 1) return;
//     const ni = hIdx + 1;
//     setHIdx(ni);
//     setElements(JSON.parse(JSON.stringify(history[ni])));
//     setSelId(null);
//   };

//   // ── Load bill book data from API ──────────────────────────────────────────
//   const loadBillBookFromAPI = useCallback(async (billBookId, customerData = {}) => {
//     setIsLoadingData(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/admin/billbook/${billBookId}`);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       const result = await response.json();
//       if (!result.success) throw new Error("API returned failure");

//       const data = result.data;
//       const newElements = [];

//       if (data.design?.backgroundColor) {
//         setBgColor(data.design.backgroundColor);
//       }

//       if (data.templateImage) {
//         const templateUrl = getFullImageUrl(data.templateImage);
//         try {
//           const { width: iw, height: ih } = await loadImageDimensions(templateUrl);
//           const maxW = canvasSize.w * 0.85;
//           const maxH = canvasSize.h * 0.85;
//           const scale = Math.min(maxW / iw, maxH / ih, 1);
//           const finalW = Math.round(iw * scale);
//           const finalH = Math.round(ih * scale);
//           const cx = Math.round((canvasSize.w - finalW) / 2);
//           const cy = Math.round((canvasSize.h - finalH) / 2);

//           newElements.push({
//             id: uid(),
//             type: "image",
//             src: templateUrl,
//             x: cx,
//             y: cy,
//             w: finalW,
//             h: finalH,
//             opacity: 100,
//             rotation: 0,
//             flip: false,
//             _label: "Template"
//           });
//         } catch (e) {
//           console.warn("Template image failed to load dimensions:", e);
//         }
//       }

//       if (data.textStyles) {
//         const textValues = {
//           companyName:    customerData.companyName    || data.companyName    || "",
//           companyAddress: customerData.address        || data.companyAddress || "",
//           companyEmail:   customerData.email          || data.companyEmail   || "",
//           companyPhone:   customerData.mobile         || data.companyPhone   || "",
//           customerName:   data.customerName    || "",
//           customerAddress:data.customerAddress || "",
//           customerEmail:  data.customerEmail   || "",
//           customerPhone:  data.customerPhone   || "",
//         };

//         Object.entries(data.textStyles).forEach(([key, style]) => {
//           if (style.show === false) return;
//           const textContent = textValues[key];
//           if (!textContent) return;

//           const fontSize = style.fontSize || 14;
//           const estWidth = Math.min(textContent.length * fontSize * 0.65, canvasSize.w - 40);

//           newElements.push({
//             id: uid(),
//             type: "text",
//             text: textContent,
//             x: style.x ?? 80,
//             y: style.y ?? 80,
//             w: Math.max(estWidth, 100),
//             h: fontSize * 1.6,
//             fontSize,
//             fontFamily: data.design?.fontFamily || "Poppins",
//             color: style.color || data.design?.textColor || "#000000",
//             bold: style.fontWeight === "bold",
//             italic: style.italic || false,
//             underline: style.underline || false,
//             align: "left",
//             opacity: 100,
//             rotation: 0,
//             _label: key
//           });
//         });
//       }

//       const logoSrc = customerData.logo
//         ? (typeof customerData.logo === "string"
//             ? getFullImageUrl(customerData.logo)
//             : URL.createObjectURL(customerData.logo))
//         : (data.logo ? getFullImageUrl(data.logo) : null);

//       if (logoSrc && data.logoSettings?.show !== false) {
//         const ls = data.logoSettings || {};
//         try {
//           await loadImageDimensions(logoSrc);
//           newElements.push({
//             id: uid(),
//             type: "image",
//             src: logoSrc,
//             x: ls.x ?? canvasSize.w - 130,
//             y: ls.y ?? 30,
//             w: ls.width  ?? 100,
//             h: ls.height ?? 100,
//             opacity: 100,
//             rotation: 0,
//             flip: false,
//             _label: "Logo"
//           });
//         } catch (e) {
//           console.warn("Logo failed to load:", e);
//         }
//       }

//       if (data.design?.border) {
//         newElements.push({
//           id: uid(),
//           type: "shape",
//           shape: "rect",
//           x: 12,
//           y: 12,
//           w: canvasSize.w - 24,
//           h: canvasSize.h - 24,
//           fill: "transparent",
//           stroke: data.design?.accentColor || ACCENT,
//           strokeW: 2,
//           opacity: 100,
//           rotation: 0,
//           _label: "Border"
//         });
//       }

//       setElements(newElements);
//       setHistory([[...newElements]]);
//       setHIdx(0);

//       if (customerData.companyName || data.companyName) {
//         setDesignName(`${customerData.companyName || data.companyName} - Bill Book`);
//       }

//       toast.success("Bill book loaded! You can now customize it.");
//     } catch (err) {
//       console.error("Error loading bill book from API:", err);
//       toast.error("Could not load bill book data. Starting with empty canvas.");
//     } finally {
//       setIsLoadingData(false);
//     }
//   }, [canvasSize]);

//   // ── On mount ─────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const init = async () => {
//       const stateData = location.state?.billBookData;
//       const localRaw = localStorage.getItem('billBookDesignData');
//       const localData = localRaw ? (() => { try { return JSON.parse(localRaw); } catch { return null; } })() : null;

//       const source = stateData || localData;

//       if (source?.billBookId) {
//         if (localRaw) localStorage.removeItem('billBookDesignData');
//         await loadBillBookFromAPI(source.billBookId, {
//           companyName: source.companyName,
//           address:     source.address,
//           mobile:      source.mobile,
//           email:       source.email,
//           gstNo:       source.gstNo,
//           logo:        source.logo,
//         });
//       }
//     };
//     init();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const selEl = elements.find(e => e.id === selId) || null;
//   const updateSel = (props) => setElements(prev => prev.map(e => e.id === selId ? { ...e, ...props } : e));
//   const commitSel = (props) => {
//     const next = elements.map(e => e.id === selId ? { ...e, ...props } : e);
//     commitElements(next);
//   };

//   // ── canvas coordinate helpers ─────────────────────────────────────────────
//   const getXY = (e) => {
//     const rect = canvasAreaRef.current.getBoundingClientRect();
//     return { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
//   };

//   const hitTest = (x, y) => {
//     for (let i = elements.length - 1; i >= 0; i--) {
//       const el = elements[i];
//       const ew = el.w || el.size || 80;
//       const eh = el.h || el.size || 80;
//       if (x >= el.x && x <= el.x + ew && y >= el.y && y <= el.y + eh) return el;
//     }
//     return null;
//   };

//   const HANDLES = ["nw","n","ne","e","se","s","sw","w"];
//   const getHPos = (el, h) => {
//     const w = el.w || el.size || 80, hi = el.h || el.size || 80;
//     return {
//       nw:{x:el.x,y:el.y}, n:{x:el.x+w/2,y:el.y}, ne:{x:el.x+w,y:el.y},
//       e:{x:el.x+w,y:el.y+hi/2}, se:{x:el.x+w,y:el.y+hi},
//       s:{x:el.x+w/2,y:el.y+hi}, sw:{x:el.x,y:el.y+hi}, w:{x:el.x,y:el.y+hi/2},
//     }[h];
//   };
//   const hitHandle = (x, y, el) => {
//     const hs = HANDLE_R * 2 / zoom;
//     for (const h of HANDLES) {
//       const p = getHPos(el, h);
//       if (Math.abs(x - p.x) <= hs && Math.abs(y - p.y) <= hs) return h;
//     }
//     return null;
//   };

//   // ── pointer events ────────────────────────────────────────────────────────
//   const onPointerDown = (e) => {
//     if (e.button !== 0) return;
//     e.currentTarget.setPointerCapture(e.pointerId);
//     const { x, y } = getXY(e);

//     if (activeTool === "draw") {
//       isDrawingRef.current = true;
//       drawPathRef.current = [{ x, y }];
//       setLiveDrawPath([{ x, y }]);
//       return;
//     }

//     if (selEl) {
//       const h = hitHandle(x, y, selEl);
//       if (h) {
//         interactRef.current = { type:"resize", id:selEl.id, handle:h, startX:x, startY:y, origEl:{...selEl} };
//         return;
//       }
//     }

//     const hit = hitTest(x, y);
//     if (hit) {
//       setSelId(hit.id);
//       interactRef.current = { type:"move", id:hit.id, startX:x, startY:y, origEl:{...hit} };
//     } else {
//       setSelId(null);
//       interactRef.current = { type:null };
//     }
//   };

//   const onPointerMove = (e) => {
//     const { x, y } = getXY(e);

//     if (activeTool === "draw" && isDrawingRef.current) {
//       drawPathRef.current.push({ x, y });
//       setLiveDrawPath([...drawPathRef.current]);
//       return;
//     }

//     const ia = interactRef.current;
//     if (!ia.type) return;
//     const dx = x - ia.startX, dy = y - ia.startY;

//     if (ia.type === "move") {
//       setElements(prev => prev.map(el => el.id !== ia.id ? el : {
//         ...el, x: ia.origEl.x + dx, y: ia.origEl.y + dy
//       }));
//     } else if (ia.type === "resize") {
//       const orig = ia.origEl;
//       let nx = orig.x, ny = orig.y;
//       let nw = orig.w || orig.size || 80, nh = orig.h || orig.size || 80;
//       const h = ia.handle;
//       if (h.includes("e")) nw = Math.max(20, orig.w + dx);
//       if (h.includes("s")) nh = Math.max(20, orig.h + dy);
//       if (h.includes("w")) { nx = orig.x + dx; nw = Math.max(20, orig.w - dx); }
//       if (h.includes("n")) { ny = orig.y + dy; nh = Math.max(20, orig.h - dy); }
//       if (orig.size !== undefined) {
//         const ns = Math.max(20, orig.size + Math.max(dx, dy));
//         setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, size: ns }));
//       } else {
//         setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, w: nw, h: nh }));
//       }
//     }
//   };

//   const onPointerUp = () => {
//     if (activeTool === "draw" && isDrawingRef.current) {
//       isDrawingRef.current = false;
//       const path = [...drawPathRef.current];
//       drawPathRef.current = [];
//       setLiveDrawPath(null);
//       if (path.length > 1) {
//         const el = { id:uid(), type:"drawing", path, color:drawColor, size:drawSize, opacity:100 };
//         commitElements([...elements, el]);
//       }
//       return;
//     }
//     const ia = interactRef.current;
//     if (ia.type) setElements(curr => { pushHistory(curr); return curr; });
//     interactRef.current = { type:null };
//   };

//   // ── element actions ───────────────────────────────────────────────────────
//   const addImageEl = (src, iw, ih) => {
//     const scale = Math.min(400/iw, 400/ih, 1);
//     const el = { id:uid(), type:"image", src, x:80, y:80, w:iw*scale, h:ih*scale, opacity:100, rotation:0, flip:false };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     setPanel("upload");
//   };

//   const handleBgUpload = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => setBgImage(ev.target.result);
//     r.readAsDataURL(f); e.target.value = "";
//   };

//   const handleAddImage = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => {
//       const img = new Image();
//       img.onload = () => addImageEl(ev.target.result, img.naturalWidth, img.naturalHeight);
//       img.src = ev.target.result;
//     };
//     r.readAsDataURL(f); e.target.value = "";
//   };

//   const addText = () => {
//     const el = { id:uid(), type:"text", text:tText, x:100, y:100, w:320, h:tSize*2, fontSize:tSize, fontFamily:tFont, color:tColor, bold:tBold, italic:tItalic, underline:tUnderline, align:tAlign, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     if (isMobile) setShowMobilePanel(false);
//   };

//   const addShape = (shape) => {
//     const el = { id:uid(), type:"shape", shape, x:200, y:200, w:140, h:140, fill:sFill, stroke:sStroke, strokeW:sStrokeW, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     if (isMobile) setShowMobilePanel(false);
//   };

//   const addSticker = (emoji) => {
//     const el = { id:uid(), type:"sticker", emoji, x:200, y:200, size:80, opacity:100, rotation:0 };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     if (isMobile) setShowMobilePanel(false);
//   };

//   const deleteEl = () => { if (!selId) return; commitElements(elements.filter(e=>e.id!==selId)); setSelId(null); };
//   const duplicateEl = () => {
//     if (!selEl) return;
//     const copy = { ...JSON.parse(JSON.stringify(selEl)), id:uid(), x:selEl.x+20, y:selEl.y+20 };
//     commitElements([...elements, copy]); setSelId(copy.id);
//   };
//   const layerUp = () => {
//     const i = elements.findIndex(e=>e.id===selId);
//     if (i < elements.length-1) { const a=[...elements]; [a[i],a[i+1]]=[a[i+1],a[i]]; commitElements(a); }
//   };
//   const layerDown = () => {
//     const i = elements.findIndex(e=>e.id===selId);
//     if (i > 0) { const a=[...elements]; [a[i],a[i-1]]=[a[i-1],a[i]]; commitElements(a); }
//   };

//   const saveAndGoBack = () => {
//     const designData = { elements, bgColor, bgImage, bgOpacity, filterPreset, brightness, contrast, saturation, canvasSize, designName };
//     localStorage.setItem('savedDesign', JSON.stringify(designData));
//     toast.success("Design saved!");
//     navigate('/billbooks');
//   };

//   // ── export ────────────────────────────────────────────────────────────────
//   const exportPNG = async () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = canvasSize.w; canvas.height = canvasSize.h;
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvasSize.w,canvasSize.h);
//     const loadImg = src => new Promise(res => { const i=new Image(); i.crossOrigin="anonymous"; i.onload=()=>res(i); i.onerror=()=>res(null); i.src=src; });
//     if (bgImage) {
//       const img = await loadImg(bgImage);
//       if (img) {
//         ctx.save(); ctx.globalAlpha=bgOpacity/100;
//         ctx.filter=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;
//         ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h); ctx.restore();
//       }
//     }
//     for (const el of elements) {
//       ctx.save(); ctx.globalAlpha=(el.opacity??100)/100;
//       const cx=el.x+(el.w||el.size||80)/2, cy=el.y+(el.h||el.size||80)/2;
//       if (el.rotation) { ctx.translate(cx,cy); ctx.rotate(el.rotation*Math.PI/180); ctx.translate(-cx,-cy); }
//       if (el.type==="image") {
//         const img=await loadImg(el.src);
//         if (img) {
//           if (el.flip) { ctx.translate(el.x+el.w,el.y); ctx.scale(-1,1); ctx.drawImage(img,0,0,el.w,el.h); }
//           else ctx.drawImage(img,el.x,el.y,el.w,el.h);
//         }
//       } else if (el.type==="text") {
//         ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
//         ctx.fillStyle=el.color; ctx.textAlign=el.align||"left";
//         const tx=el.align==="center"?el.x+el.w/2:el.align==="right"?el.x+el.w:el.x;
//         ctx.fillText(el.text,tx,el.y+el.fontSize);
//         if (el.underline) { const tw=ctx.measureText(el.text).width; ctx.fillRect(el.x,el.y+el.fontSize+3,tw,2); }
//       } else if (el.type==="shape") {
//         ctx.fillStyle=el.fill==="transparent"?"rgba(0,0,0,0)":el.fill;
//         ctx.strokeStyle=el.stroke; ctx.lineWidth=el.strokeW;
//         ctx.beginPath();
//         if (el.shape==="rect") ctx.rect(el.x,el.y,el.w,el.h);
//         else if (el.shape==="circle") ctx.ellipse(el.x+el.w/2,el.y+el.h/2,el.w/2,el.h/2,0,0,Math.PI*2);
//         else if (el.shape==="triangle") { ctx.moveTo(el.x+el.w/2,el.y); ctx.lineTo(el.x+el.w,el.y+el.h); ctx.lineTo(el.x,el.y+el.h); ctx.closePath(); }
//         ctx.fill(); ctx.stroke();
//       } else if (el.type==="sticker") {
//         ctx.font=`${el.size}px Arial`; ctx.fillText(el.emoji,el.x,el.y+el.size);
//       } else if (el.type==="drawing") {
//         ctx.strokeStyle=el.color; ctx.lineWidth=el.size; ctx.lineCap="round"; ctx.lineJoin="round";
//         ctx.beginPath(); el.path.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
//       }
//       ctx.restore();
//     }
//     const a=document.createElement("a"); a.download=`${designName}.png`; a.href=canvas.toDataURL(); a.click();
//   };

//   const bgFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;

//   const sideItems = [
//     { id:"upload", icon:"⬆", label:"Upload" },
//     { id:"text",   icon:"T",  label:"Text" },
//     { id:"shapes", icon:"◻",  label:"Shapes" },
//     { id:"stickers",icon:"★", label:"Stickers" },
//     { id:"draw",   icon:"✏",  label:"Draw" },
//     { id:"bg",     icon:"🎨", label:"BG" },
//     { id:"filters",icon:"◑",  label:"Filters" },
//     { id:"layers", icon:"≡",  label:"Layers" },
//     { id:"size",   icon:"⊡",  label:"Size" },
//   ];

//   const uploadBgRef = useRef(null);
//   const uploadImgRef = useRef(null);

//   // ── Panel content (shared between desktop side panel and mobile bottom sheet)
//   const PanelContent = () => (
//     <div style={{ flex:1, overflowY:"auto", padding:12 }}>

//       {panel==="upload" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//           <input ref={uploadBgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleBgUpload} />
//           <input ref={uploadImgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleAddImage} />
//           <button onClick={()=>uploadBgRef.current.click()} style={{ padding:"10px 0", border:`2px dashed ${ACCENT}`, borderRadius:10, background:"#f8f8ff", color:ACCENT, cursor:"pointer", fontWeight:600, fontSize:13 }}>+ Set Background Image</button>
//           <button onClick={()=>uploadImgRef.current.click()} style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:600, fontSize:13 }}>+ Add Image Layer</button>
//           {bgImage && (<button onClick={()=>setBgImage(null)} style={{ padding:"8px 0", border:"none", borderRadius:10, background:"#fee2e2", color:"#dc2626", cursor:"pointer", fontSize:12 }}>Remove Background</button>)}
//           <div style={{ fontSize:11, color:"#aaa", marginTop:4 }}>JPG · PNG · WEBP · GIF</div>
//         </div>
//       )}

//       {panel==="text" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//           <textarea value={tText} onChange={e=>setTText(e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:8, fontSize:13, resize:"none", height:72, boxSizing:"border-box", outline:"none" }} />
//           <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Font</div><select value={tFont} onChange={e=>setTFont(e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:"5px 6px", fontSize:12 }}>{FONTS.map(f=><option key={f}>{f}</option>)}</select></div>
//           <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Size: {tSize}px</div><input type="range" min={8} max={200} value={tSize} onChange={e=>setTSize(+e.target.value)} style={{ width:"100%" }} /></div>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888" }}>Color</div><input type="color" value={tColor} onChange={e=>setTColor(e.target.value)} style={{ width:40, height:30, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></div>
//           <div style={{ display:"flex", gap:6 }}>{[["B","bold",tBold,setTBold],["I","italic",tItalic,setTItalic],["U","underline",tUnderline,setTUnderline]].map(([l,,v,s])=>(<button key={l} onClick={()=>s(!v)} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"1px solid #eee", background:v?ACCENT:"#fff", color:v?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none" }}>{l}</button>))}</div>
//           <div style={{ display:"flex", gap:4 }}>{["left","center","right"].map(a=>(<button key={a} onClick={()=>setTAlign(a)} style={{ flex:1, padding:"5px 0", borderRadius:8, border:"1px solid #eee", background:tAlign===a?ACCENT:"#fff", color:tAlign===a?"#fff":"#333", cursor:"pointer", fontSize:14 }}>{a==="left"?"⇤":a==="center"?"⇔":"⇥"}</button>))}</div>
//           <button onClick={addText} style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:14 }}>Add Text</button>
//         </div>
//       )}

//       {panel==="shapes" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>{[["rect","▭","Rect"],["circle","○","Circle"],["triangle","△","Triangle"]].map(([s,icon,lbl])=>(<button key={s} onClick={()=>addShape(s)} style={{ aspectRatio:"1", border:"1px solid #eee", borderRadius:10, background:"#f8f8ff", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, fontSize:24 }}>{icon}<span style={{ fontSize:9, color:"#888" }}>{lbl}</span></button>))}</div>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888", width:40 }}>Fill</div><input type="color" value={sFill} onChange={e=>setSFill(e.target.value)} style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></div>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888", width:40 }}>Stroke</div><input type="color" value={sStroke} onChange={e=>setSStroke(e.target.value)} style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /><input type="range" min={0} max={20} value={sStrokeW} onChange={e=>setSStrokeW(+e.target.value)} style={{ flex:1 }} /><span style={{ fontSize:11 }}>{sStrokeW}px</span></div>
//         </div>
//       )}

//       {panel==="stickers" && (<div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>{STICKERS.map(s=>(<button key={s} onClick={()=>addSticker(s)} style={{ fontSize:28, padding:8, border:"1px solid #eee", borderRadius:8, cursor:"pointer", background:"#fafafa" }}>{s}</button>))}</div>)}

//       {panel==="draw" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//           <div style={{ fontSize:12, color:"#666", padding:8, background:"#f8f8ff", borderRadius:8, border:"1px solid #eee" }}>✏️ Draw mode active — drag on canvas to draw</div>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888" }}>Color</div><input type="color" value={drawColor} onChange={e=>setDrawColor(e.target.value)} style={{ width:40, height:34, borderRadius:8, border:"1px solid #eee", cursor:"pointer" }} /></div>
//           <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Brush: {drawSize}px</div><input type="range" min={1} max={60} value={drawSize} onChange={e=>setDrawSize(+e.target.value)} style={{ width:"100%" }} /></div>
//           <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{["#000000","#ef4444","#3b82f6","#22c55e","#f59e0b","#8b5cf6","#ec4899","#ffffff","#64748b"].map(c=>(<button key={c} onClick={()=>setDrawColor(c)} style={{ width:28, height:28, borderRadius:"50%", background:c, border:drawColor===c?"3px solid #6366f1":"1px solid #ddd", cursor:"pointer" }} />))}</div>
//         </div>
//       )}

//       {panel==="bg" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//           <div><div style={{ fontSize:11, color:"#888", marginBottom:4 }}>Background Color</div><input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} style={{ width:"100%", height:40, borderRadius:8, border:"1px solid #eee", cursor:"pointer", display:"block" }} /></div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>{["#ffffff","#000000","#f8fafc","#fef2f2","#eff6ff","#f0fdf4","#fdf4ff","#fff7ed","#1e293b","#0f172a"].map(c=>(<button key={c} onClick={()=>setBgColor(c)} style={{ height:30, borderRadius:6, background:c, border:bgColor===c?"2.5px solid #6366f1":"1px solid #e5e7eb", cursor:"pointer" }} />))}</div>
//           {bgImage && (<div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>BG Opacity: {bgOpacity}%</div><input type="range" min={0} max={100} value={bgOpacity} onChange={e=>setBgOpacity(+e.target.value)} style={{ width:"100%" }} /></div>)}
//         </div>
//       )}

//       {panel==="filters" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>{FILTERS_LIST.map(f=>(<button key={f.name} onClick={()=>setFilterPreset(f.value)} style={{ padding:"7px 4px", borderRadius:8, border:filterPreset===f.value?`2px solid ${ACCENT}`:"1px solid #eee", background:filterPreset===f.value?"#eef2ff":"#fff", cursor:"pointer", fontSize:11, color:filterPreset===f.value?ACCENT:"#444" }}>{f.name}</button>))}</div>
//           {[["Brightness",brightness,setBrightness],["Contrast",contrast,setContrast],["Saturation",saturation,setSaturation]].map(([l,v,s])=>(<div key={l}><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>{l}: {v}%</div><input type="range" min={0} max={200} value={v} onChange={e=>s(+e.target.value)} style={{ width:"100%" }} /></div>))}
//         </div>
//       )}

//       {panel==="layers" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//           {elements.length===0 && <div style={{ fontSize:12, color:"#aaa", textAlign:"center", padding:20 }}>No layers yet</div>}
//           {[...elements].reverse().map((el,i)=>{
//             const label = el._label || (el.type==="text" ? el.text?.slice(0,20) : `${el.type} ${elements.length-i}`);
//             return (
//               <div key={el.id} onClick={()=>{ setSelId(el.id); if(isMobile) setShowMobilePanel(false); }} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:8, border:selId===el.id?`2px solid ${ACCENT}`:"1px solid #eee", background:selId===el.id?"#eef2ff":"#fafafa", cursor:"pointer" }}>
//                 <span style={{ fontSize:16 }}>{el.type==="text"?"T":el.type==="image"?"🖼":el.type==="shape"?"◻":el.type==="sticker"?el.emoji:"✏"}</span>
//                 <span style={{ fontSize:11, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:"#333" }}>{label}</span>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {panel==="size" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:6 }}>{CANVAS_SIZES.map(s=>(<button key={s.label} onClick={()=>setCanvasSize({w:s.w,h:s.h})} style={{ padding:"9px 12px", borderRadius:10, border:canvasSize.w===s.w&&canvasSize.h===s.h?`2px solid ${ACCENT}`:"1px solid #eee", background:canvasSize.w===s.w&&canvasSize.h===s.h?"#eef2ff":"#fff", cursor:"pointer", textAlign:"left" }}><div style={{ fontSize:13, fontWeight:600, color:canvasSize.w===s.w&&canvasSize.h===s.h?ACCENT:"#222" }}>{s.label}</div><div style={{ fontSize:11, color:"#888" }}>{s.w} × {s.h}px</div></button>))}</div>
//       )}
//     </div>
//   );

//   // ── MOBILE LAYOUT ─────────────────────────────────────────────────────────
//   if (isMobile) {
//     return (
//       <div style={{ display:"flex", flexDirection:"column", height:"100vh", fontFamily:"system-ui,sans-serif", background:"#f1f1f3", overflow:"hidden" }}>
//         <Toaster position="top-center" />

//         {isLoadingData && (
//           <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <div style={{ background:"#fff", borderRadius:16, padding:"32px 40px", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
//               <div style={{ fontSize:32, marginBottom:12, animation:"spin 1s linear infinite", display:"inline-block" }}>⚙️</div>
//               <div style={{ fontWeight:700, fontSize:16, color:"#333" }}>Loading Bill Book Design...</div>
//               <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Fetching template & placing elements</div>
//             </div>
//           </div>
//         )}

//         {/* Mobile Top Toolbar */}
//         <div style={{ background:"#fff", borderBottom:"1px solid #e5e7eb", padding:"8px 10px", display:"flex", alignItems:"center", gap:6, flexShrink:0, overflowX:"auto" }}>
//           <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, flexShrink:0 }}>C</div>
//           <input value={designName} onChange={e=>setDesignName(e.target.value)} style={{ border:"1px solid #eee", borderRadius:8, padding:"4px 8px", fontSize:12, fontWeight:600, width:120, outline:"none", flexShrink:0 }} />
//           <TBtn onClick={undo} disabled={hIdx<=0}>↩</TBtn>
//           <TBtn onClick={redo} disabled={hIdx>=history.length-1}>↪</TBtn>
//           {selEl && <>
//             <TBtn onClick={deleteEl} danger>🗑</TBtn>
//             <TBtn onClick={duplicateEl}>⧉</TBtn>
//             <TBtn onClick={layerUp}>↑</TBtn>
//             <TBtn onClick={layerDown}>↓</TBtn>
//           </>}
//           <div style={{ marginLeft:"auto", display:"flex", gap:6, flexShrink:0 }}>
//             <button onClick={exportPNG} style={{ padding:"6px 10px", borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:12, whiteSpace:"nowrap" }}>⬇</button>
//             <button onClick={saveAndGoBack} style={{ padding:"6px 10px", borderRadius:8, background:"#10b981", color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:12, whiteSpace:"nowrap" }}>💾</button>
//           </div>
//         </div>

//         {/* Canvas workspace — takes remaining space above bottom bar */}
//         <div style={{ flex:1, overflow:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"12px 0", background:"#e0e0e6" }}>
//           <div
//             ref={canvasAreaRef}
//             onPointerDown={onPointerDown}
//             onPointerMove={onPointerMove}
//             onPointerUp={onPointerUp}
//             style={{
//               position:"relative",
//               width: canvasSize.w * zoom,
//               height: canvasSize.h * zoom,
//               cursor: activeTool==="draw" ? "crosshair" : "default",
//               userSelect:"none",
//               touchAction:"none",
//               boxShadow:"0 8px 48px rgba(0,0,0,0.22)",
//               borderRadius:3,
//               overflow:"hidden",
//               flexShrink:0,
//               background: bgColor,
//             }}
//           >
//             {bgImage && (
//               <img src={bgImage} alt="bg" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:bgOpacity/100, filter:bgFilter, pointerEvents:"none" }} />
//             )}
//             {showGrid && (
//               <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(99,102,241,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.12) 1px,transparent 1px)`, backgroundSize:`${40*zoom}px ${40*zoom}px` }} />
//             )}
//             {elements.map(el => <ElView key={el.id} el={el} zoom={zoom} />)}
//             {selEl && <SelectBox el={selEl} zoom={zoom} />}
//             {liveDrawPath && liveDrawPath.length > 1 && (
//               <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
//                 <polyline points={liveDrawPath.map(p=>`${p.x*zoom},${p.y*zoom}`).join(" ")} fill="none" stroke={drawColor} strokeWidth={drawSize*zoom} strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             )}
//           </div>
//         </div>

//         {/* Mobile Bottom Nav Bar */}
//         <div style={{ background:"#fff", borderTop:"1px solid #e5e7eb", display:"flex", overflowX:"auto", flexShrink:0, padding:"4px 0" }}>
//           {sideItems.map(s => (
//             <button key={s.id}
//               onClick={() => {
//                 setPanel(s.id);
//                 if (s.id==="draw") setActiveTool("draw"); else setActiveTool("select");
//                 setShowMobilePanel(true);
//               }}
//               style={{ minWidth:56, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"none", borderRadius:10, cursor:"pointer", background:panel===s.id&&showMobilePanel?"#eef2ff":"transparent", color:panel===s.id&&showMobilePanel?ACCENT:"#555", gap:2, padding:"6px 0", flexShrink:0 }}>
//               <span style={{ fontSize:s.icon==="T"?18:14, fontWeight:s.icon==="T"?700:400 }}>{s.icon}</span>
//               <span style={{ fontSize:8 }}>{s.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Mobile Bottom Sheet Panel */}
//         {showMobilePanel && (
//           <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
//             {/* Backdrop */}
//             <div onClick={()=>setShowMobilePanel(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.25)" }} />
//             {/* Sheet */}
//             <div style={{ position:"relative", background:"#fff", borderRadius:"18px 18px 0 0", maxHeight:"65vh", display:"flex", flexDirection:"column", boxShadow:"0 -8px 40px rgba(0,0,0,0.18)" }}>
//               <div style={{ padding:"10px 14px 6px", borderBottom:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                 <div style={{ fontWeight:600, fontSize:13, color:"#222" }}>{sideItems.find(s=>s.id===panel)?.label}</div>
//                 <button onClick={()=>setShowMobilePanel(false)} style={{ border:"none", background:"none", fontSize:18, cursor:"pointer", color:"#888", padding:"0 4px" }}>✕</button>
//               </div>
//               <div style={{ overflowY:"auto", flex:1 }}>
//                 <PanelContent />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Selected element properties — mobile floating bar */}
//         {selEl && !showMobilePanel && (
//           <div style={{ position:"fixed", bottom:60, left:0, right:0, zIndex:100, padding:"0 10px" }}>
//             <div style={{ background:"#fff", borderRadius:14, padding:"8px 12px", boxShadow:"0 4px 24px rgba(0,0,0,0.18)", display:"flex", gap:8, alignItems:"center", overflowX:"auto" }}>
//               {selEl._label && <div style={{ fontSize:10, color:ACCENT, fontWeight:600, background:"#eef2ff", padding:"2px 8px", borderRadius:20, whiteSpace:"nowrap" }}>{selEl._label}</div>}
//               <div style={{ fontSize:11, color:"#888", whiteSpace:"nowrap" }}>Op</div>
//               <input type="range" min={0} max={100} value={selEl.opacity??100} onChange={e=>updateSel({opacity:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
//               <div style={{ fontSize:11, color:"#888", whiteSpace:"nowrap" }}>Rot</div>
//               <input type="range" min={-180} max={180} value={selEl.rotation??0} onChange={e=>updateSel({rotation:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
//               {selEl.type==="image" && <TBtn onClick={()=>commitSel({flip:!selEl.flip})}>↔</TBtn>}
//               {selEl.type==="text" && (
//                 <>
//                   <input type="color" value={selEl.color} onChange={e=>commitSel({color:e.target.value})} style={{ width:30, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer", flexShrink:0 }} />
//                   <input type="number" value={selEl.fontSize} onChange={e=>commitSel({fontSize:+e.target.value})} style={{ width:46, border:"1px solid #eee", borderRadius:6, padding:"3px 4px", fontSize:12 }} />
//                 </>
//               )}
//               {selEl.type==="shape" && (
//                 <>
//                   <input type="color" value={selEl.fill==="transparent"?"#ffffff":selEl.fill} onChange={e=>commitSel({fill:e.target.value})} style={{ width:30, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer", flexShrink:0 }} />
//                   <input type="color" value={selEl.stroke} onChange={e=>commitSel({stroke:e.target.value})} style={{ width:30, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer", flexShrink:0 }} />
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

//   // ── DESKTOP LAYOUT (original, unchanged) ─────────────────────────────────
//   return (
//     <div style={{ display:"flex", height:"100vh", fontFamily:"system-ui,sans-serif", background:"#f1f1f3", overflow:"hidden" }}>
//       <Toaster position="top-center" />

//       {isLoadingData && (
//         <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center" }}>
//           <div style={{ background:"#fff", borderRadius:16, padding:"32px 40px", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
//             <div style={{ fontSize:32, marginBottom:12, animation:"spin 1s linear infinite", display:"inline-block" }}>⚙️</div>
//             <div style={{ fontWeight:700, fontSize:16, color:"#333" }}>Loading Bill Book Design...</div>
//             <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Fetching template & placing elements</div>
//           </div>
//         </div>
//       )}

//       {/* Icon rail */}
//       <div style={{ width:68, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", alignItems:"center", padding:"12px 0", gap:4, flexShrink:0 }}>
//         <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:18, marginBottom:12 }}>C</div>
//         {sideItems.map(s => (
//           <button key={s.id}
//             onClick={() => { setPanel(s.id); if(s.id==="draw") setActiveTool("draw"); else setActiveTool("select"); }}
//             style={{ width:54, height:54, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"none", borderRadius:10, cursor:"pointer", background:panel===s.id?"#eef2ff":"transparent", color:panel===s.id?ACCENT:"#555", gap:2 }}>
//             <span style={{ fontSize:s.icon==="T"?20:16, fontWeight:s.icon==="T"?700:400 }}>{s.icon}</span>
//             <span style={{ fontSize:9 }}>{s.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Side panel */}
//       <div style={{ width:250, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0 }}>
//         <div style={{ padding:"12px 14px", borderBottom:"1px solid #f0f0f0", fontWeight:600, fontSize:13, color:"#222" }}>
//           {sideItems.find(s=>s.id===panel)?.label}
//         </div>
//         <PanelContent />
//       </div>

//       {/* Main area */}
//       <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//         {/* Toolbar */}
//         <div style={{ height:50, background:"#fff", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", gap:8, padding:"0 14px", flexShrink:0, overflowX:"auto" }}>
//           <input value={designName} onChange={e=>setDesignName(e.target.value)} style={{ border:"1px solid #eee", borderRadius:8, padding:"4px 10px", fontSize:13, fontWeight:600, width:160, outline:"none", flexShrink:0 }} />
//           <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px", flexShrink:0 }} />
//           <TBtn onClick={undo} disabled={hIdx<=0}>↩ Undo</TBtn>
//           <TBtn onClick={redo} disabled={hIdx>=history.length-1}>↪ Redo</TBtn>
//           <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px", flexShrink:0 }} />
//           {selEl && <>
//             <TBtn onClick={deleteEl} danger>🗑</TBtn>
//             <TBtn onClick={duplicateEl}>⧉</TBtn>
//             <TBtn onClick={layerUp}>↑</TBtn>
//             <TBtn onClick={layerDown}>↓</TBtn>
//             {selEl.type==="image" && <TBtn onClick={()=>commitSel({flip:!selEl.flip})}>↔</TBtn>}
//             <span style={{ fontSize:11, color:"#888", marginLeft:4, flexShrink:0 }}>Opacity</span>
//             <input type="range" min={0} max={100} value={selEl.opacity??100} onChange={e=>updateSel({opacity:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
//             <span style={{ fontSize:11, minWidth:28, flexShrink:0 }}>{selEl.opacity??100}%</span>
//             <span style={{ fontSize:11, color:"#888", marginLeft:4, flexShrink:0 }}>Rotate</span>
//             <input type="range" min={-180} max={180} value={selEl.rotation??0} onChange={e=>updateSel({rotation:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
//             <span style={{ fontSize:11, minWidth:30, flexShrink:0 }}>{selEl.rotation??0}°</span>
//           </>}
//           <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
//             <label style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, cursor:"pointer" }}><input type="checkbox" checked={showGrid} onChange={e=>setShowGrid(e.target.checked)} />Grid</label>
//             <TBtn onClick={()=>setZoom(z=>Math.max(0.1,+(z-0.1).toFixed(1)))}>−</TBtn>
//             <span style={{ fontSize:12, minWidth:42, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
//             <TBtn onClick={()=>setZoom(z=>Math.min(3,+(z+0.1).toFixed(1)))}>+</TBtn>
//             <button onClick={exportPNG} style={{ padding:"7px 14px", borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>⬇ Export</button>
//             <button onClick={saveAndGoBack} style={{ padding:"7px 14px", borderRadius:8, background:"#10b981", color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>💾 Save</button>
//           </div>
//         </div>

//         {/* Canvas workspace */}
//         <div style={{ flex:1, overflow:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:40, background:"#e0e0e6" }}>
//           <div
//             ref={canvasAreaRef}
//             onPointerDown={onPointerDown}
//             onPointerMove={onPointerMove}
//             onPointerUp={onPointerUp}
//             style={{
//               position:"relative",
//               width: canvasSize.w * zoom,
//               height: canvasSize.h * zoom,
//               cursor: activeTool==="draw" ? "crosshair" : "default",
//               userSelect:"none",
//               touchAction:"none",
//               boxShadow:"0 8px 48px rgba(0,0,0,0.22)",
//               borderRadius:3,
//               overflow:"hidden",
//               flexShrink:0,
//               background: bgColor,
//             }}
//           >
//             {bgImage && (
//               <img src={bgImage} alt="bg" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:bgOpacity/100, filter:bgFilter, pointerEvents:"none" }} />
//             )}
//             {showGrid && (
//               <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(99,102,241,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.12) 1px,transparent 1px)`, backgroundSize:`${40*zoom}px ${40*zoom}px` }} />
//             )}

//             {elements.map(el => <ElView key={el.id} el={el} zoom={zoom} />)}
//             {selEl && <SelectBox el={selEl} zoom={zoom} />}
//             {liveDrawPath && liveDrawPath.length > 1 && (
//               <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
//                 <polyline points={liveDrawPath.map(p=>`${p.x*zoom},${p.y*zoom}`).join(" ")} fill="none" stroke={drawColor} strokeWidth={drawSize*zoom} strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Right properties panel */}
//       {selEl && (
//         <div style={{ width:220, background:"#fff", borderLeft:"1px solid #e5e7eb", overflowY:"auto", padding:12, flexShrink:0 }}>
//           <div style={{ fontWeight:600, fontSize:13, marginBottom:12, color:"#222" }}>Properties</div>
//           {selEl._label && <div style={{ fontSize:10, color:ACCENT, fontWeight:600, marginBottom:8, background:"#eef2ff", padding:"3px 8px", borderRadius:20, display:"inline-block" }}>{selEl._label}</div>}
//           <PRw label="X"><NIn value={Math.round(selEl.x)} onChange={v=>commitSel({x:v})} /></PRw>
//           <PRw label="Y"><NIn value={Math.round(selEl.y)} onChange={v=>commitSel({y:v})} /></PRw>
//           {selEl.w!=null && <PRw label="W"><NIn value={Math.round(selEl.w)} onChange={v=>commitSel({w:v})} /></PRw>}
//           {selEl.h!=null && <PRw label="H"><NIn value={Math.round(selEl.h)} onChange={v=>commitSel({h:v})} /></PRw>}
//           {selEl.size!=null && <PRw label="Size"><NIn value={Math.round(selEl.size)} onChange={v=>commitSel({size:v})} /></PRw>}

//           {selEl.type==="text" && <>
//             <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>TEXT</div>
//             <textarea value={selEl.text} onChange={e=>updateSel({text:e.target.value})} onBlur={()=>pushHistory(elements)} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:6, fontSize:12, resize:"none", height:60, boxSizing:"border-box" }} />
//             <PRw label="Font"><select value={selEl.fontFamily} onChange={e=>commitSel({fontFamily:e.target.value})} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 4px", fontSize:11 }}>{FONTS.map(f=><option key={f}>{f}</option>)}</select></PRw>
//             <PRw label="Size"><NIn value={selEl.fontSize} onChange={v=>commitSel({fontSize:v})} /></PRw>
//             <PRw label="Color"><input type="color" value={selEl.color} onChange={e=>commitSel({color:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
//             <div style={{ display:"flex", gap:6, marginTop:4 }}>{[["B","bold"],["I","italic"],["U","underline"]].map(([l,k])=>(<button key={k} onClick={()=>commitSel({[k]:!selEl[k]})} style={{ flex:1, padding:"5px 0", borderRadius:6, border:"1px solid #eee", background:selEl[k]?ACCENT:"#fff", color:selEl[k]?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none", fontSize:13 }}>{l}</button>))}</div>
//           </>}

//           {selEl.type==="shape" && <>
//             <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>SHAPE</div>
//             <PRw label="Fill"><input type="color" value={selEl.fill==="transparent"?"#ffffff":selEl.fill} onChange={e=>commitSel({fill:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
//             <PRw label="Stroke"><input type="color" value={selEl.stroke} onChange={e=>commitSel({stroke:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
//             <PRw label="SW"><NIn value={selEl.strokeW} onChange={v=>commitSel({strokeW:v})} /></PRw>
//           </>}
//         </div>
//       )}

//       <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }

// // ── Selection box ─────────────────────────────────────────────────────────────
// function SelectBox({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;
//   const x = el.x * zoom, y = el.y * zoom;
//   const hs = HANDLE_R;
//   const hpts = [
//     { cx:x,     cy:y,     cur:"nw-resize" }, { cx:x+w/2, cy:y,     cur:"n-resize"  }, { cx:x+w, cy:y,     cur:"ne-resize" },
//     { cx:x+w,   cy:y+h/2, cur:"e-resize"  }, { cx:x+w,   cy:y+h,   cur:"se-resize" }, { cx:x+w/2, cy:y+h, cur:"s-resize"  },
//     { cx:x,     cy:y+h,   cur:"sw-resize" }, { cx:x,     cy:y+h/2, cur:"w-resize"  },
//   ];
//   return (
//     <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"visible" }}>
//       <rect x={x} y={y} width={w} height={h} fill="none" stroke={ACCENT} strokeWidth={1.5} strokeDasharray="5 4" />
//       {hpts.map((hd,i)=>(<rect key={i} x={hd.cx-hs} y={hd.cy-hs} width={hs*2} height={hs*2} rx={2} fill="#fff" stroke={ACCENT} strokeWidth={1.5} style={{ cursor:hd.cur, pointerEvents:"all" }} />))}
//     </svg>
//   );
// }

// // ── Element renderer ──────────────────────────────────────────────────────────
// function ElView({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;
//   const base = {
//     position:"absolute", left:el.x*zoom, top:el.y*zoom, width:w, height:h,
//     opacity:(el.opacity??100)/100,
//     transform:el.rotation ? `rotate(${el.rotation}deg)` : undefined,
//     transformOrigin:"center center", pointerEvents:"none",
//   };
//   if (el.type==="image") return <img src={el.src} alt="" crossOrigin="anonymous" draggable={false} style={{ ...base, objectFit:"contain", transform:`${el.rotation?`rotate(${el.rotation}deg)`:""}${el.flip?" scaleX(-1)":""}`.trim()||undefined }} />;
//   if (el.type==="text") return (<div style={{ ...base, fontSize:el.fontSize*zoom, fontFamily:el.fontFamily, color:el.color, fontWeight:el.bold?700:400, fontStyle:el.italic?"italic":"normal", textDecoration:el.underline?"underline":"none", textAlign:el.align||"left", whiteSpace:"pre-wrap", lineHeight:1.3, overflow:"visible" }}>{el.text}</div>);
//   if (el.type==="shape") {
//     const sw=(el.strokeW||2)*zoom;
//     return (<svg style={base} viewBox={`0 0 ${w} ${h}`} overflow="visible">
//       {el.shape==="rect"     && <rect     x={sw/2} y={sw/2} width={w-sw} height={h-sw} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
//       {el.shape==="circle"   && <ellipse  cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
//       {el.shape==="triangle" && <polygon  points={`${w/2},${sw/2} ${w-sw/2},${h-sw/2} ${sw/2},${h-sw/2}`} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
//     </svg>);
//   }
//   if (el.type==="sticker") return <div style={{ ...base, fontSize:el.size*zoom, lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center" }}>{el.emoji}</div>;
//   if (el.type==="drawing") {
//     const allX = el.path.map(p=>p.x), allY = el.path.map(p=>p.y);
//     const minX = Math.min(...allX), minY = Math.min(...allY);
//     const maxX = Math.max(...allX), maxY = Math.max(...allY);
//     const pad = el.size;
//     return (
//       <svg style={{ position:"absolute", left:(minX-pad)*zoom, top:(minY-pad)*zoom, width:(maxX-minX+pad*2)*zoom, height:(maxY-minY+pad*2)*zoom, pointerEvents:"none", overflow:"visible", opacity:(el.opacity??100)/100 }}>
//         <polyline points={el.path.map(p=>`${(p.x-minX+pad)*zoom},${(p.y-minY+pad)*zoom}`).join(" ")} fill="none" stroke={el.color} strokeWidth={el.size*zoom} strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     );
//   }
//   return null;
// }

// function TBtn({ onClick, disabled, danger, children }) {
//   return (<button onClick={onClick} disabled={disabled} style={{ padding:"5px 10px", borderRadius:7, border:"1px solid #eee", background:danger?"#fef2f2":"#fff", color:danger?"#dc2626":"#333", cursor:disabled?"default":"pointer", opacity:disabled?0.4:1, fontSize:13, whiteSpace:"nowrap", flexShrink:0 }}>{children}</button>);
// }
// function PRw({ label, children }) {
//   return (<div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}><div style={{ fontSize:11, color:"#888", width:36 }}>{label}</div><div style={{ flex:1 }}>{children}</div></div>);
// }
// function NIn({ value, onChange }) {
//   return (<input type="number" value={value} onChange={e=>onChange(+e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 6px", fontSize:12, boxSizing:"border-box", outline:"none" }} />);
// }



// CanvasEditor.jsx - Fixed: Supports both Bill Book and Flex Book + Mobile Responsive
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

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
  { name: "Blur", value: "blur(2px)" },
  { name: "Invert", value: "invert(100%)" },
];
const STICKERS = ["❤️","⭐","🎉","🔥","✨","😊","🌸","🎨","💫","🌟","🎭","🦋","🎪","🏆","💎","🎯"];
const CANVAS_SIZES = [
  { label: "Square 1:1", w: 1080, h: 1080 },
  { label: "Portrait 4:5", w: 1080, h: 1350 },
  { label: "Landscape 16:9", w: 1920, h: 1080 },
  { label: "Story 9:16", w: 1080, h: 1920 },
  { label: "A4 Portrait", w: 794, h: 1123 },
  { label: "Twitter Post", w: 1200, h: 675 },
  { label: "Facebook Cover", w: 1640, h: 624 },
];

let idCounter = 1;
const uid = () => `el_${++idCounter}_${Date.now()}`;
const ACCENT = "#6366f1";
const HANDLE_R = 5;
const API_BASE_URL = "https://designback.onrender.com";

// Helper: build full URL from relative path
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('data:')) return imagePath;
  const cleanPath = imagePath.replace(/\\/g, '/');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  return `${API_BASE_URL}/${normalizedPath}`;
};

// Helper: load image and get natural dimensions
const loadImageDimensions = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

// Hook: detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

export default function CanvasEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [panel, setPanel] = useState("upload");
  const [showMobilePanel, setShowMobilePanel] = useState(false);
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
  const [zoom, setZoom] = useState(0.55);
  const [showGrid, setShowGrid] = useState(false);
  const [designName, setDesignName] = useState("Design");
  const [history, setHistory] = useState([[]]);
  const [hIdx, setHIdx] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [productType, setProductType] = useState(null); // "billbook" or "flexbook"

  // text panel state
  const [tText, setTText] = useState("Your Text Here");
  const [tFont, setTFont] = useState("Poppins");
  const [tSize, setTSize] = useState(40);
  const [tColor, setTColor] = useState("#000000");
  const [tBold, setTBold] = useState(false);
  const [tItalic, setTItalic] = useState(false);
  const [tUnderline, setTUnderline] = useState(false);
  const [tAlign, setTAlign] = useState("left");

  // shape
  const [sFill, setSFill] = useState("#6366f1");
  const [sStroke, setSStroke] = useState("#000000");
  const [sStrokeW, setSStrokeW] = useState(2);

  // draw
  const [drawColor, setDrawColor] = useState("#000000");
  const [drawSize, setDrawSize] = useState(5);
  const [activeTool, setActiveTool] = useState("select");

  // interaction
  const interactRef = useRef({ type: null });
  const isDrawingRef = useRef(false);
  const drawPathRef = useRef([]);
  const [liveDrawPath, setLiveDrawPath] = useState(null);
  const canvasAreaRef = useRef(null);

  // Auto-set zoom for mobile
  useEffect(() => {
    if (isMobile) {
      const vw = window.innerWidth;
      const newZoom = Math.min(0.35, (vw - 20) / canvasSize.w);
      setZoom(+newZoom.toFixed(2));
    }
  }, [isMobile, canvasSize]);

  // ── history helpers ────────────────────────────────────────────────────────
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
  };
  const redo = () => {
    if (hIdx >= history.length - 1) return;
    const ni = hIdx + 1;
    setHIdx(ni);
    setElements(JSON.parse(JSON.stringify(history[ni])));
    setSelId(null);
  };

  // ── Load Flex Book data from API ──────────────────────────────────────────
  const loadFlexBookFromAPI = useCallback(async (flexBookId, customerData = {}) => {
    setIsLoadingData(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/flexbook/${flexBookId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result.success) throw new Error("API returned failure");

      const data = result.data;
      const newElements = [];

      // Set canvas size from API
      if (data.canvasSize) {
        setCanvasSize({ w: data.canvasSize.width || 800, h: data.canvasSize.height || 800 });
      }

      // Set background color from design
      if (data.design?.backgroundColor) {
        setBgColor(data.design.backgroundColor);
      }

      // Load template image
      if (data.templateImage) {
        const templateUrl = getFullImageUrl(data.templateImage);
        try {
          const { width: iw, height: ih } = await loadImageDimensions(templateUrl);
          const maxW = canvasSize.w * 0.85;
          const maxH = canvasSize.h * 0.85;
          const scale = Math.min(maxW / iw, maxH / ih, 1);
          const finalW = Math.round(iw * scale);
          const finalH = Math.round(ih * scale);
          const cx = Math.round((canvasSize.w - finalW) / 2);
          const cy = Math.round((canvasSize.h - finalH) / 2);

          newElements.push({
            id: uid(),
            type: "image",
            src: templateUrl,
            x: cx,
            y: cy,
            w: finalW,
            h: finalH,
            opacity: 100,
            rotation: 0,
            flip: false,
            _label: "Flex Template"
          });
        } catch (e) {
          console.warn("Template image failed to load dimensions:", e);
        }
      }

      // Add Flex Title text
      if (data.flexTitle && data.textStyles?.flexTitle?.show !== false) {
        const style = data.textStyles.flexTitle || {};
        newElements.push({
          id: uid(),
          type: "text",
          text: data.flexTitle,
          x: style.x ?? canvasSize.w / 2 - 100,
          y: style.y ?? 250,
          w: 200,
          h: style.fontSize ? style.fontSize * 1.6 : 40,
          fontSize: style.fontSize || 24,
          fontFamily: data.design?.fontFamily || "Poppins",
          color: style.color || data.design?.accentColor || "#3b82f6",
          bold: style.fontWeight === "bold",
          italic: style.italic || false,
          underline: style.underline || false,
          align: "center",
          opacity: 100,
          rotation: 0,
          _label: "Flex Title"
        });
      }

      // Add Points Title
      if (data.pointsTitle && data.textStyles?.pointsTitle?.show !== false) {
        const style = data.textStyles.pointsTitle || {};
        newElements.push({
          id: uid(),
          type: "text",
          text: data.pointsTitle,
          x: style.x ?? 80,
          y: style.y ?? 340,
          w: 200,
          h: style.fontSize ? style.fontSize * 1.6 : 30,
          fontSize: style.fontSize || 18,
          fontFamily: data.design?.fontFamily || "Poppins",
          color: style.color || data.design?.accentColor || "#3b82f6",
          bold: style.fontWeight === "bold",
          italic: style.italic || false,
          underline: style.underline || false,
          align: "left",
          opacity: 100,
          rotation: 0,
          _label: "Points Title"
        });
      }

      // Add Points (list items)
      if (data.points && data.points.length > 0 && data.design?.showPoints !== false) {
        data.points.forEach((point, idx) => {
          newElements.push({
            id: uid(),
            type: "text",
            text: `• ${point.text}`,
            x: point.x ?? 80,
            y: point.y ?? (380 + idx * 28),
            w: 300,
            h: 28,
            fontSize: 14,
            fontFamily: data.design?.fontFamily || "Poppins",
            color: data.design?.textColor || "#333333",
            bold: false,
            italic: false,
            underline: false,
            align: "left",
            opacity: 100,
            rotation: 0,
            _label: `Point ${idx + 1}`
          });
        });
      }

      // Add Message
      if (data.message && data.textStyles?.message?.show !== false) {
        const style = data.textStyles.message || {};
        newElements.push({
          id: uid(),
          type: "text",
          text: data.message,
          x: style.x ?? canvasSize.w / 2 - 150,
          y: style.y ?? 630,
          w: 300,
          h: style.fontSize ? style.fontSize * 1.6 : 25,
          fontSize: style.fontSize || 14,
          fontFamily: data.design?.fontFamily || "Poppins",
          color: style.color || "#999999",
          bold: style.fontWeight === "bold",
          italic: style.italic || true,
          underline: style.underline || false,
          align: "center",
          opacity: 100,
          rotation: 0,
          _label: "Message"
        });
      }

      // Text styles for company info
      const textValues = {
        companyName: customerData.companyName || data.companyName || "",
        companyAddress: customerData.address || data.companyAddress || "",
        companyEmail: customerData.email || data.companyEmail || "",
        companyPhone: customerData.mobile || data.companyPhone || "",
      };

      // Add company info texts
      if (data.textStyles) {
        Object.entries(data.textStyles).forEach(([key, style]) => {
          if (key === "flexTitle" || key === "pointsTitle" || key === "message") return;
          if (style.show === false) return;
          const textContent = textValues[key];
          if (!textContent) return;

          const fontSize = style.fontSize || 12;
          newElements.push({
            id: uid(),
            type: "text",
            text: textContent,
            x: style.x ?? 80,
            y: style.y ?? 80,
            w: Math.min(textContent.length * fontSize * 0.6, canvasSize.w - 40),
            h: fontSize * 1.6,
            fontSize: fontSize,
            fontFamily: data.design?.fontFamily || "Poppins",
            color: style.color || data.design?.textColor || "#666666",
            bold: style.fontWeight === "bold",
            italic: style.italic || false,
            underline: style.underline || false,
            align: "left",
            opacity: 100,
            rotation: 0,
            _label: key
          });
        });
      }

      // Add Logo
      const logoSrc = customerData.logo
        ? (typeof customerData.logo === "string"
            ? getFullImageUrl(customerData.logo)
            : URL.createObjectURL(customerData.logo))
        : (data.logo ? getFullImageUrl(data.logo) : null);

      if (logoSrc && data.logoSettings?.show !== false) {
        const ls = data.logoSettings || {};
        try {
          await loadImageDimensions(logoSrc);
          newElements.push({
            id: uid(),
            type: "image",
            src: logoSrc,
            x: ls.x ?? 50,
            y: ls.y ?? 40,
            w: ls.width ?? 100,
            h: ls.height ?? 80,
            opacity: 100,
            rotation: 0,
            flip: false,
            _label: "Logo"
          });
        } catch (e) {
          console.warn("Logo failed to load:", e);
        }
      }

      // Add Border if enabled
      if (data.design?.border) {
        newElements.push({
          id: uid(),
          type: "shape",
          shape: "rect",
          x: 12,
          y: 12,
          w: canvasSize.w - 24,
          h: canvasSize.h - 24,
          fill: "transparent",
          stroke: data.design?.accentColor || ACCENT,
          strokeW: 2,
          opacity: 100,
          rotation: 0,
          _label: "Border"
        });
      }

      setElements(newElements);
      setHistory([[...newElements]]);
      setHIdx(0);
      setProductType("flexbook");

      if (customerData.companyName || data.companyName) {
        setDesignName(`${customerData.companyName || data.companyName} - Flex Book`);
      }

      toast.success("Flex book loaded! You can now customize it.");
    } catch (err) {
      console.error("Error loading flex book from API:", err);
      toast.error("Could not load flex book data. Starting with empty canvas.");
    } finally {
      setIsLoadingData(false);
    }
  }, [canvasSize]);

  // ── Load Bill Book data from API ──────────────────────────────────────────
  const loadBillBookFromAPI = useCallback(async (billBookId, customerData = {}) => {
    setIsLoadingData(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/billbook/${billBookId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (!result.success) throw new Error("API returned failure");

      const data = result.data;
      const newElements = [];

      if (data.design?.backgroundColor) {
        setBgColor(data.design.backgroundColor);
      }

      if (data.templateImage) {
        const templateUrl = getFullImageUrl(data.templateImage);
        try {
          const { width: iw, height: ih } = await loadImageDimensions(templateUrl);
          const maxW = canvasSize.w * 0.85;
          const maxH = canvasSize.h * 0.85;
          const scale = Math.min(maxW / iw, maxH / ih, 1);
          const finalW = Math.round(iw * scale);
          const finalH = Math.round(ih * scale);
          const cx = Math.round((canvasSize.w - finalW) / 2);
          const cy = Math.round((canvasSize.h - finalH) / 2);

          newElements.push({
            id: uid(),
            type: "image",
            src: templateUrl,
            x: cx,
            y: cy,
            w: finalW,
            h: finalH,
            opacity: 100,
            rotation: 0,
            flip: false,
            _label: "Template"
          });
        } catch (e) {
          console.warn("Template image failed to load dimensions:", e);
        }
      }

      if (data.textStyles) {
        const textValues = {
          companyName:    customerData.companyName    || data.companyName    || "",
          companyAddress: customerData.address        || data.companyAddress || "",
          companyEmail:   customerData.email          || data.companyEmail   || "",
          companyPhone:   customerData.mobile         || data.companyPhone   || "",
          customerName:   data.customerName    || "",
          customerAddress:data.customerAddress || "",
          customerEmail:  data.customerEmail   || "",
          customerPhone:  data.customerPhone   || "",
        };

        Object.entries(data.textStyles).forEach(([key, style]) => {
          if (style.show === false) return;
          const textContent = textValues[key];
          if (!textContent) return;

          const fontSize = style.fontSize || 14;
          const estWidth = Math.min(textContent.length * fontSize * 0.65, canvasSize.w - 40);

          newElements.push({
            id: uid(),
            type: "text",
            text: textContent,
            x: style.x ?? 80,
            y: style.y ?? 80,
            w: Math.max(estWidth, 100),
            h: fontSize * 1.6,
            fontSize,
            fontFamily: data.design?.fontFamily || "Poppins",
            color: style.color || data.design?.textColor || "#000000",
            bold: style.fontWeight === "bold",
            italic: style.italic || false,
            underline: style.underline || false,
            align: "left",
            opacity: 100,
            rotation: 0,
            _label: key
          });
        });
      }

      const logoSrc = customerData.logo
        ? (typeof customerData.logo === "string"
            ? getFullImageUrl(customerData.logo)
            : URL.createObjectURL(customerData.logo))
        : (data.logo ? getFullImageUrl(data.logo) : null);

      if (logoSrc && data.logoSettings?.show !== false) {
        const ls = data.logoSettings || {};
        try {
          await loadImageDimensions(logoSrc);
          newElements.push({
            id: uid(),
            type: "image",
            src: logoSrc,
            x: ls.x ?? canvasSize.w - 130,
            y: ls.y ?? 30,
            w: ls.width  ?? 100,
            h: ls.height ?? 100,
            opacity: 100,
            rotation: 0,
            flip: false,
            _label: "Logo"
          });
        } catch (e) {
          console.warn("Logo failed to load:", e);
        }
      }

      if (data.design?.border) {
        newElements.push({
          id: uid(),
          type: "shape",
          shape: "rect",
          x: 12,
          y: 12,
          w: canvasSize.w - 24,
          h: canvasSize.h - 24,
          fill: "transparent",
          stroke: data.design?.accentColor || ACCENT,
          strokeW: 2,
          opacity: 100,
          rotation: 0,
          _label: "Border"
        });
      }

      setElements(newElements);
      setHistory([[...newElements]]);
      setHIdx(0);
      setProductType("billbook");

      if (customerData.companyName || data.companyName) {
        setDesignName(`${customerData.companyName || data.companyName} - Bill Book`);
      }

      toast.success("Bill book loaded! You can now customize it.");
    } catch (err) {
      console.error("Error loading bill book from API:", err);
      toast.error("Could not load bill book data. Starting with empty canvas.");
    } finally {
      setIsLoadingData(false);
    }
  }, [canvasSize]);

  // ── On mount: check for Bill Book or Flex Book data ───────────────────────
  useEffect(() => {
    const init = async () => {
      const stateData = location.state?.billBookData || location.state?.flexBookData;
      const localRaw = localStorage.getItem('billBookDesignData') || localStorage.getItem('flexBookDesignData');
      const localData = localRaw ? (() => { try { return JSON.parse(localRaw); } catch { return null; } })() : null;

      const source = stateData || localData;

      // Check if it's Flex Book
      if (source?.flexBookId) {
        if (localStorage.getItem('flexBookDesignData')) localStorage.removeItem('flexBookDesignData');
        await loadFlexBookFromAPI(source.flexBookId, {
          companyName: source.companyName,
          address: source.address,
          mobile: source.mobile,
          email: source.email,
          gstNo: source.gstNo,
          logo: source.logo,
        });
      }
      // Check if it's Bill Book
      else if (source?.billBookId) {
        if (localStorage.getItem('billBookDesignData')) localStorage.removeItem('billBookDesignData');
        await loadBillBookFromAPI(source.billBookId, {
          companyName: source.companyName,
          address: source.address,
          mobile: source.mobile,
          email: source.email,
          gstNo: source.gstNo,
          logo: source.logo,
        });
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selEl = elements.find(e => e.id === selId) || null;
  const updateSel = (props) => setElements(prev => prev.map(e => e.id === selId ? { ...e, ...props } : e));
  const commitSel = (props) => {
    const next = elements.map(e => e.id === selId ? { ...e, ...props } : e);
    commitElements(next);
  };

  // ── canvas coordinate helpers ─────────────────────────────────────────────
  const getXY = (e) => {
    const rect = canvasAreaRef.current.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / zoom, y: (e.clientY - rect.top) / zoom };
  };

  const hitTest = (x, y) => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      const ew = el.w || el.size || 80;
      const eh = el.h || el.size || 80;
      if (x >= el.x && x <= el.x + ew && y >= el.y && y <= el.y + eh) return el;
    }
    return null;
  };

  const HANDLES = ["nw","n","ne","e","se","s","sw","w"];
  const getHPos = (el, h) => {
    const w = el.w || el.size || 80, hi = el.h || el.size || 80;
    return {
      nw:{x:el.x,y:el.y}, n:{x:el.x+w/2,y:el.y}, ne:{x:el.x+w,y:el.y},
      e:{x:el.x+w,y:el.y+hi/2}, se:{x:el.x+w,y:el.y+hi},
      s:{x:el.x+w/2,y:el.y+hi}, sw:{x:el.x,y:el.y+hi}, w:{x:el.x,y:el.y+hi/2},
    }[h];
  };
  const hitHandle = (x, y, el) => {
    const hs = HANDLE_R * 2 / zoom;
    for (const h of HANDLES) {
      const p = getHPos(el, h);
      if (Math.abs(x - p.x) <= hs && Math.abs(y - p.y) <= hs) return h;
    }
    return null;
  };

  // ── pointer events ────────────────────────────────────────────────────────
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = getXY(e);

    if (activeTool === "draw") {
      isDrawingRef.current = true;
      drawPathRef.current = [{ x, y }];
      setLiveDrawPath([{ x, y }]);
      return;
    }

    if (selEl) {
      const h = hitHandle(x, y, selEl);
      if (h) {
        interactRef.current = { type:"resize", id:selEl.id, handle:h, startX:x, startY:y, origEl:{...selEl} };
        return;
      }
    }

    const hit = hitTest(x, y);
    if (hit) {
      setSelId(hit.id);
      interactRef.current = { type:"move", id:hit.id, startX:x, startY:y, origEl:{...hit} };
    } else {
      setSelId(null);
      interactRef.current = { type:null };
    }
  };

  const onPointerMove = (e) => {
    const { x, y } = getXY(e);

    if (activeTool === "draw" && isDrawingRef.current) {
      drawPathRef.current.push({ x, y });
      setLiveDrawPath([...drawPathRef.current]);
      return;
    }

    const ia = interactRef.current;
    if (!ia.type) return;
    const dx = x - ia.startX, dy = y - ia.startY;

    if (ia.type === "move") {
      setElements(prev => prev.map(el => el.id !== ia.id ? el : {
        ...el, x: ia.origEl.x + dx, y: ia.origEl.y + dy
      }));
    } else if (ia.type === "resize") {
      const orig = ia.origEl;
      let nx = orig.x, ny = orig.y;
      let nw = orig.w || orig.size || 80, nh = orig.h || orig.size || 80;
      const h = ia.handle;
      if (h.includes("e")) nw = Math.max(20, orig.w + dx);
      if (h.includes("s")) nh = Math.max(20, orig.h + dy);
      if (h.includes("w")) { nx = orig.x + dx; nw = Math.max(20, orig.w - dx); }
      if (h.includes("n")) { ny = orig.y + dy; nh = Math.max(20, orig.h - dy); }
      if (orig.size !== undefined) {
        const ns = Math.max(20, orig.size + Math.max(dx, dy));
        setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, size: ns }));
      } else {
        setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, w: nw, h: nh }));
      }
    }
  };

  const onPointerUp = () => {
    if (activeTool === "draw" && isDrawingRef.current) {
      isDrawingRef.current = false;
      const path = [...drawPathRef.current];
      drawPathRef.current = [];
      setLiveDrawPath(null);
      if (path.length > 1) {
        const el = { id:uid(), type:"drawing", path, color:drawColor, size:drawSize, opacity:100 };
        commitElements([...elements, el]);
      }
      return;
    }
    const ia = interactRef.current;
    if (ia.type) setElements(curr => { pushHistory(curr); return curr; });
    interactRef.current = { type:null };
  };

  // ── element actions ───────────────────────────────────────────────────────
  const addImageEl = (src, iw, ih) => {
    const scale = Math.min(400/iw, 400/ih, 1);
    const el = { id:uid(), type:"image", src, x:80, y:80, w:iw*scale, h:ih*scale, opacity:100, rotation:0, flip:false };
    commitElements([...elements, el]);
    setSelId(el.id);
    setPanel("upload");
  };

  const handleBgUpload = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setBgImage(ev.target.result);
    r.readAsDataURL(f); e.target.value = "";
  };

  const handleAddImage = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      const img = new Image();
      img.onload = () => addImageEl(ev.target.result, img.naturalWidth, img.naturalHeight);
      img.src = ev.target.result;
    };
    r.readAsDataURL(f); e.target.value = "";
  };

  const addText = () => {
    const el = { id:uid(), type:"text", text:tText, x:100, y:100, w:320, h:tSize*2, fontSize:tSize, fontFamily:tFont, color:tColor, bold:tBold, italic:tItalic, underline:tUnderline, align:tAlign, opacity:100, rotation:0 };
    commitElements([...elements, el]);
    setSelId(el.id);
    if (isMobile) setShowMobilePanel(false);
  };

  const addShape = (shape) => {
    const el = { id:uid(), type:"shape", shape, x:200, y:200, w:140, h:140, fill:sFill, stroke:sStroke, strokeW:sStrokeW, opacity:100, rotation:0 };
    commitElements([...elements, el]);
    setSelId(el.id);
    if (isMobile) setShowMobilePanel(false);
  };

  const addSticker = (emoji) => {
    const el = { id:uid(), type:"sticker", emoji, x:200, y:200, size:80, opacity:100, rotation:0 };
    commitElements([...elements, el]);
    setSelId(el.id);
    if (isMobile) setShowMobilePanel(false);
  };

  const deleteEl = () => { if (!selId) return; commitElements(elements.filter(e=>e.id!==selId)); setSelId(null); };
  const duplicateEl = () => {
    if (!selEl) return;
    const copy = { ...JSON.parse(JSON.stringify(selEl)), id:uid(), x:selEl.x+20, y:selEl.y+20 };
    commitElements([...elements, copy]); setSelId(copy.id);
  };
  const layerUp = () => {
    const i = elements.findIndex(e=>e.id===selId);
    if (i < elements.length-1) { const a=[...elements]; [a[i],a[i+1]]=[a[i+1],a[i]]; commitElements(a); }
  };
  const layerDown = () => {
    const i = elements.findIndex(e=>e.id===selId);
    if (i > 0) { const a=[...elements]; [a[i],a[i-1]]=[a[i-1],a[i]]; commitElements(a); }
  };

  const saveAndGoBack = () => {
    const designData = { elements, bgColor, bgImage, bgOpacity, filterPreset, brightness, contrast, saturation, canvasSize, designName, productType };
    localStorage.setItem('savedDesign', JSON.stringify(designData));
    toast.success("Design saved!");
    // Go back to previous page (billbooks or flexbooks)
    navigate(-1);
  };

  // ── export ────────────────────────────────────────────────────────────────
  const exportPNG = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize.w; canvas.height = canvasSize.h;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvasSize.w,canvasSize.h);
    const loadImg = src => new Promise(res => { const i=new Image(); i.crossOrigin="anonymous"; i.onload=()=>res(i); i.onerror=()=>res(null); i.src=src; });
    if (bgImage) {
      const img = await loadImg(bgImage);
      if (img) {
        ctx.save(); ctx.globalAlpha=bgOpacity/100;
        ctx.filter=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;
        ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h); ctx.restore();
      }
    }
    for (const el of elements) {
      ctx.save(); ctx.globalAlpha=(el.opacity??100)/100;
      const cx=el.x+(el.w||el.size||80)/2, cy=el.y+(el.h||el.size||80)/2;
      if (el.rotation) { ctx.translate(cx,cy); ctx.rotate(el.rotation*Math.PI/180); ctx.translate(-cx,-cy); }
      if (el.type==="image") {
        const img=await loadImg(el.src);
        if (img) {
          if (el.flip) { ctx.translate(el.x+el.w,el.y); ctx.scale(-1,1); ctx.drawImage(img,0,0,el.w,el.h); }
          else ctx.drawImage(img,el.x,el.y,el.w,el.h);
        }
      } else if (el.type==="text") {
        ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
        ctx.fillStyle=el.color; ctx.textAlign=el.align||"left";
        const tx=el.align==="center"?el.x+el.w/2:el.align==="right"?el.x+el.w:el.x;
        ctx.fillText(el.text,tx,el.y+el.fontSize);
        if (el.underline) { const tw=ctx.measureText(el.text).width; ctx.fillRect(el.x,el.y+el.fontSize+3,tw,2); }
      } else if (el.type==="shape") {
        ctx.fillStyle=el.fill==="transparent"?"rgba(0,0,0,0)":el.fill;
        ctx.strokeStyle=el.stroke; ctx.lineWidth=el.strokeW;
        ctx.beginPath();
        if (el.shape==="rect") ctx.rect(el.x,el.y,el.w,el.h);
        else if (el.shape==="circle") ctx.ellipse(el.x+el.w/2,el.y+el.h/2,el.w/2,el.h/2,0,0,Math.PI*2);
        else if (el.shape==="triangle") { ctx.moveTo(el.x+el.w/2,el.y); ctx.lineTo(el.x+el.w,el.y+el.h); ctx.lineTo(el.x,el.y+el.h); ctx.closePath(); }
        ctx.fill(); ctx.stroke();
      } else if (el.type==="sticker") {
        ctx.font=`${el.size}px Arial`; ctx.fillText(el.emoji,el.x,el.y+el.size);
      } else if (el.type==="drawing") {
        ctx.strokeStyle=el.color; ctx.lineWidth=el.size; ctx.lineCap="round"; ctx.lineJoin="round";
        ctx.beginPath(); el.path.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
      }
      ctx.restore();
    }
    const a=document.createElement("a"); a.download=`${designName}.png`; a.href=canvas.toDataURL(); a.click();
  };

  const bgFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset?" "+filterPreset:""}`;

  const sideItems = [
    { id:"upload", icon:"⬆", label:"Upload" },
    { id:"text",   icon:"T",  label:"Text" },
    { id:"shapes", icon:"◻",  label:"Shapes" },
    { id:"stickers",icon:"★", label:"Stickers" },
    { id:"draw",   icon:"✏",  label:"Draw" },
    { id:"bg",     icon:"🎨", label:"BG" },
    { id:"filters",icon:"◑",  label:"Filters" },
    { id:"layers", icon:"≡",  label:"Layers" },
    { id:"size",   icon:"⊡",  label:"Size" },
  ];

  const uploadBgRef = useRef(null);
  const uploadImgRef = useRef(null);

  // ── Panel content (shared between desktop side panel and mobile bottom sheet)
  const PanelContent = () => (
    <div style={{ flex:1, overflowY:"auto", padding:12 }}>

      {panel==="upload" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <input ref={uploadBgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleBgUpload} />
          <input ref={uploadImgRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleAddImage} />
          <button onClick={()=>uploadBgRef.current.click()} style={{ padding:"10px 0", border:`2px dashed ${ACCENT}`, borderRadius:10, background:"#f8f8ff", color:ACCENT, cursor:"pointer", fontWeight:600, fontSize:13 }}>+ Set Background Image</button>
          <button onClick={()=>uploadImgRef.current.click()} style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:600, fontSize:13 }}>+ Add Image Layer</button>
          {bgImage && (<button onClick={()=>setBgImage(null)} style={{ padding:"8px 0", border:"none", borderRadius:10, background:"#fee2e2", color:"#dc2626", cursor:"pointer", fontSize:12 }}>Remove Background</button>)}
          <div style={{ fontSize:11, color:"#aaa", marginTop:4 }}>JPG · PNG · WEBP · GIF</div>
        </div>
      )}

      {panel==="text" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <textarea value={tText} onChange={e=>setTText(e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:8, fontSize:13, resize:"none", height:72, boxSizing:"border-box", outline:"none" }} />
          <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Font</div><select value={tFont} onChange={e=>setTFont(e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:8, padding:"5px 6px", fontSize:12 }}>{FONTS.map(f=><option key={f}>{f}</option>)}</select></div>
          <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Size: {tSize}px</div><input type="range" min={8} max={200} value={tSize} onChange={e=>setTSize(+e.target.value)} style={{ width:"100%" }} /></div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888" }}>Color</div><input type="color" value={tColor} onChange={e=>setTColor(e.target.value)} style={{ width:40, height:30, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></div>
          <div style={{ display:"flex", gap:6 }}>{[["B","bold",tBold,setTBold],["I","italic",tItalic,setTItalic],["U","underline",tUnderline,setTUnderline]].map(([l,,v,s])=>(<button key={l} onClick={()=>s(!v)} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"1px solid #eee", background:v?ACCENT:"#fff", color:v?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none" }}>{l}</button>))}</div>
          <div style={{ display:"flex", gap:4 }}>{["left","center","right"].map(a=>(<button key={a} onClick={()=>setTAlign(a)} style={{ flex:1, padding:"5px 0", borderRadius:8, border:"1px solid #eee", background:tAlign===a?ACCENT:"#fff", color:tAlign===a?"#fff":"#333", cursor:"pointer", fontSize:14 }}>{a==="left"?"⇤":a==="center"?"⇔":"⇥"}</button>))}</div>
          <button onClick={addText} style={{ padding:"10px 0", border:"none", borderRadius:10, background:ACCENT, color:"#fff", cursor:"pointer", fontWeight:700, fontSize:14 }}>Add Text</button>
        </div>
      )}

      {panel==="shapes" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>{[["rect","▭","Rect"],["circle","○","Circle"],["triangle","△","Triangle"]].map(([s,icon,lbl])=>(<button key={s} onClick={()=>addShape(s)} style={{ aspectRatio:"1", border:"1px solid #eee", borderRadius:10, background:"#f8f8ff", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, fontSize:24 }}>{icon}<span style={{ fontSize:9, color:"#888" }}>{lbl}</span></button>))}</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888", width:40 }}>Fill</div><input type="color" value={sFill} onChange={e=>setSFill(e.target.value)} style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888", width:40 }}>Stroke</div><input type="color" value={sStroke} onChange={e=>setSStroke(e.target.value)} style={{ width:36, height:28, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /><input type="range" min={0} max={20} value={sStrokeW} onChange={e=>setSStrokeW(+e.target.value)} style={{ flex:1 }} /><span style={{ fontSize:11 }}>{sStrokeW}px</span></div>
        </div>
      )}

      {panel==="stickers" && (<div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>{STICKERS.map(s=>(<button key={s} onClick={()=>addSticker(s)} style={{ fontSize:28, padding:8, border:"1px solid #eee", borderRadius:8, cursor:"pointer", background:"#fafafa" }}>{s}</button>))}</div>)}

      {panel==="draw" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ fontSize:12, color:"#666", padding:8, background:"#f8f8ff", borderRadius:8, border:"1px solid #eee" }}>✏️ Draw mode active — drag on canvas to draw</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}><div style={{ fontSize:11, color:"#888" }}>Color</div><input type="color" value={drawColor} onChange={e=>setDrawColor(e.target.value)} style={{ width:40, height:34, borderRadius:8, border:"1px solid #eee", cursor:"pointer" }} /></div>
          <div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>Brush: {drawSize}px</div><input type="range" min={1} max={60} value={drawSize} onChange={e=>setDrawSize(+e.target.value)} style={{ width:"100%" }} /></div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{["#000000","#ef4444","#3b82f6","#22c55e","#f59e0b","#8b5cf6","#ec4899","#ffffff","#64748b"].map(c=>(<button key={c} onClick={()=>setDrawColor(c)} style={{ width:28, height:28, borderRadius:"50%", background:c, border:drawColor===c?"3px solid #6366f1":"1px solid #ddd", cursor:"pointer" }} />))}</div>
        </div>
      )}

      {panel==="bg" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><div style={{ fontSize:11, color:"#888", marginBottom:4 }}>Background Color</div><input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} style={{ width:"100%", height:40, borderRadius:8, border:"1px solid #eee", cursor:"pointer", display:"block" }} /></div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>{["#ffffff","#000000","#f8fafc","#fef2f2","#eff6ff","#f0fdf4","#fdf4ff","#fff7ed","#1e293b","#0f172a"].map(c=>(<button key={c} onClick={()=>setBgColor(c)} style={{ height:30, borderRadius:6, background:c, border:bgColor===c?"2.5px solid #6366f1":"1px solid #e5e7eb", cursor:"pointer" }} />))}</div>
          {bgImage && (<div><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>BG Opacity: {bgOpacity}%</div><input type="range" min={0} max={100} value={bgOpacity} onChange={e=>setBgOpacity(+e.target.value)} style={{ width:"100%" }} /></div>)}
        </div>
      )}

      {panel==="filters" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>{FILTERS_LIST.map(f=>(<button key={f.name} onClick={()=>setFilterPreset(f.value)} style={{ padding:"7px 4px", borderRadius:8, border:filterPreset===f.value?`2px solid ${ACCENT}`:"1px solid #eee", background:filterPreset===f.value?"#eef2ff":"#fff", cursor:"pointer", fontSize:11, color:filterPreset===f.value?ACCENT:"#444" }}>{f.name}</button>))}</div>
          {[["Brightness",brightness,setBrightness],["Contrast",contrast,setContrast],["Saturation",saturation,setSaturation]].map(([l,v,s])=>(<div key={l}><div style={{ fontSize:11, color:"#888", marginBottom:3 }}>{l}: {v}%</div><input type="range" min={0} max={200} value={v} onChange={e=>s(+e.target.value)} style={{ width:"100%" }} /></div>))}
        </div>
      )}

      {panel==="layers" && (
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {elements.length===0 && <div style={{ fontSize:12, color:"#aaa", textAlign:"center", padding:20 }}>No layers yet</div>}
          {[...elements].reverse().map((el,i)=>{
            const label = el._label || (el.type==="text" ? el.text?.slice(0,20) : `${el.type} ${elements.length-i}`);
            return (
              <div key={el.id} onClick={()=>{ setSelId(el.id); if(isMobile) setShowMobilePanel(false); }} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:8, border:selId===el.id?`2px solid ${ACCENT}`:"1px solid #eee", background:selId===el.id?"#eef2ff":"#fafafa", cursor:"pointer" }}>
                <span style={{ fontSize:16 }}>{el.type==="text"?"T":el.type==="image"?"🖼":el.type==="shape"?"◻":el.type==="sticker"?el.emoji:"✏"}</span>
                <span style={{ fontSize:11, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", color:"#333" }}>{label}</span>
              </div>
            );
          })}
        </div>
      )}

      {panel==="size" && (
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>{CANVAS_SIZES.map(s=>(<button key={s.label} onClick={()=>setCanvasSize({w:s.w,h:s.h})} style={{ padding:"9px 12px", borderRadius:10, border:canvasSize.w===s.w&&canvasSize.h===s.h?`2px solid ${ACCENT}`:"1px solid #eee", background:canvasSize.w===s.w&&canvasSize.h===s.h?"#eef2ff":"#fff", cursor:"pointer", textAlign:"left" }}><div style={{ fontSize:13, fontWeight:600, color:canvasSize.w===s.w&&canvasSize.h===s.h?ACCENT:"#222" }}>{s.label}</div><div style={{ fontSize:11, color:"#888" }}>{s.w} × {s.h}px</div></button>))}</div>
      )}
    </div>
  );

  // ── MOBILE LAYOUT ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100vh", fontFamily:"system-ui,sans-serif", background:"#f1f1f3", overflow:"hidden" }}>
        <Toaster position="top-center" />

        {isLoadingData && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ background:"#fff", borderRadius:16, padding:"32px 40px", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
              <div style={{ fontSize:32, marginBottom:12, animation:"spin 1s linear infinite", display:"inline-block" }}>⚙️</div>
              <div style={{ fontWeight:700, fontSize:16, color:"#333" }}>Loading {productType === "flexbook" ? "Flex Book" : "Bill Book"} Design...</div>
              <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Fetching template & placing elements</div>
            </div>
          </div>
        )}

        {/* Mobile Top Toolbar */}
        <div style={{ background:"#fff", borderBottom:"1px solid #e5e7eb", padding:"8px 10px", display:"flex", alignItems:"center", gap:6, flexShrink:0, overflowX:"auto" }}>
          <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, flexShrink:0 }}>C</div>
          <input value={designName} onChange={e=>setDesignName(e.target.value)} style={{ border:"1px solid #eee", borderRadius:8, padding:"4px 8px", fontSize:12, fontWeight:600, width:120, outline:"none", flexShrink:0 }} />
          <TBtn onClick={undo} disabled={hIdx<=0}>↩</TBtn>
          <TBtn onClick={redo} disabled={hIdx>=history.length-1}>↪</TBtn>
          {selEl && <>
            <TBtn onClick={deleteEl} danger>🗑</TBtn>
            <TBtn onClick={duplicateEl}>⧉</TBtn>
            <TBtn onClick={layerUp}>↑</TBtn>
            <TBtn onClick={layerDown}>↓</TBtn>
          </>}
          <div style={{ marginLeft:"auto", display:"flex", gap:6, flexShrink:0 }}>
            <button onClick={exportPNG} style={{ padding:"6px 10px", borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:12, whiteSpace:"nowrap" }}>⬇</button>
            <button onClick={saveAndGoBack} style={{ padding:"6px 10px", borderRadius:8, background:"#10b981", color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:12, whiteSpace:"nowrap" }}>💾</button>
          </div>
        </div>

        {/* Canvas workspace — takes remaining space above bottom bar */}
        <div style={{ flex:1, overflow:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"12px 0", background:"#e0e0e6" }}>
          <div
            ref={canvasAreaRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{
              position:"relative",
              width: canvasSize.w * zoom,
              height: canvasSize.h * zoom,
              cursor: activeTool==="draw" ? "crosshair" : "default",
              userSelect:"none",
              touchAction:"none",
              boxShadow:"0 8px 48px rgba(0,0,0,0.22)",
              borderRadius:3,
              overflow:"hidden",
              flexShrink:0,
              background: bgColor,
            }}
          >
            {bgImage && (
              <img src={bgImage} alt="bg" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:bgOpacity/100, filter:bgFilter, pointerEvents:"none" }} />
            )}
            {showGrid && (
              <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(99,102,241,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.12) 1px,transparent 1px)`, backgroundSize:`${40*zoom}px ${40*zoom}px` }} />
            )}
            {elements.map(el => <ElView key={el.id} el={el} zoom={zoom} />)}
            {selEl && <SelectBox el={selEl} zoom={zoom} />}
            {liveDrawPath && liveDrawPath.length > 1 && (
              <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
                <polyline points={liveDrawPath.map(p=>`${p.x*zoom},${p.y*zoom}`).join(" ")} fill="none" stroke={drawColor} strokeWidth={drawSize*zoom} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>

        {/* Mobile Bottom Nav Bar */}
        <div style={{ background:"#fff", borderTop:"1px solid #e5e7eb", display:"flex", overflowX:"auto", flexShrink:0, padding:"4px 0" }}>
          {sideItems.map(s => (
            <button key={s.id}
              onClick={() => {
                setPanel(s.id);
                if (s.id==="draw") setActiveTool("draw"); else setActiveTool("select");
                setShowMobilePanel(true);
              }}
              style={{ minWidth:56, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"none", borderRadius:10, cursor:"pointer", background:panel===s.id&&showMobilePanel?"#eef2ff":"transparent", color:panel===s.id&&showMobilePanel?ACCENT:"#555", gap:2, padding:"6px 0", flexShrink:0 }}>
              <span style={{ fontSize:s.icon==="T"?18:14, fontWeight:s.icon==="T"?700:400 }}>{s.icon}</span>
              <span style={{ fontSize:8 }}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Bottom Sheet Panel */}
        {showMobilePanel && (
          <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <div onClick={()=>setShowMobilePanel(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.25)" }} />
            <div style={{ position:"relative", background:"#fff", borderRadius:"18px 18px 0 0", maxHeight:"65vh", display:"flex", flexDirection:"column", boxShadow:"0 -8px 40px rgba(0,0,0,0.18)" }}>
              <div style={{ padding:"10px 14px 6px", borderBottom:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ fontWeight:600, fontSize:13, color:"#222" }}>{sideItems.find(s=>s.id===panel)?.label}</div>
                <button onClick={()=>setShowMobilePanel(false)} style={{ border:"none", background:"none", fontSize:18, cursor:"pointer", color:"#888", padding:"0 4px" }}>✕</button>
              </div>
              <div style={{ overflowY:"auto", flex:1 }}>
                <PanelContent />
              </div>
            </div>
          </div>
        )}

        {/* Selected element properties — mobile floating bar */}
        {selEl && !showMobilePanel && (
          <div style={{ position:"fixed", bottom:60, left:0, right:0, zIndex:100, padding:"0 10px" }}>
            <div style={{ background:"#fff", borderRadius:14, padding:"8px 12px", boxShadow:"0 4px 24px rgba(0,0,0,0.18)", display:"flex", gap:8, alignItems:"center", overflowX:"auto" }}>
              {selEl._label && <div style={{ fontSize:10, color:ACCENT, fontWeight:600, background:"#eef2ff", padding:"2px 8px", borderRadius:20, whiteSpace:"nowrap" }}>{selEl._label}</div>}
              <div style={{ fontSize:11, color:"#888", whiteSpace:"nowrap" }}>Op</div>
              <input type="range" min={0} max={100} value={selEl.opacity??100} onChange={e=>updateSel({opacity:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
              <div style={{ fontSize:11, color:"#888", whiteSpace:"nowrap" }}>Rot</div>
              <input type="range" min={-180} max={180} value={selEl.rotation??0} onChange={e=>updateSel({rotation:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
              {selEl.type==="image" && <TBtn onClick={()=>commitSel({flip:!selEl.flip})}>↔</TBtn>}
              {selEl.type==="text" && (
                <>
                  <input type="color" value={selEl.color} onChange={e=>commitSel({color:e.target.value})} style={{ width:30, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer", flexShrink:0 }} />
                  <input type="number" value={selEl.fontSize} onChange={e=>commitSel({fontSize:+e.target.value})} style={{ width:46, border:"1px solid #eee", borderRadius:6, padding:"3px 4px", fontSize:12 }} />
                </>
              )}
              {selEl.type==="shape" && (
                <>
                  <input type="color" value={selEl.fill==="transparent"?"#ffffff":selEl.fill} onChange={e=>commitSel({fill:e.target.value})} style={{ width:30, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer", flexShrink:0 }} />
                  <input type="color" value={selEl.stroke} onChange={e=>commitSel({stroke:e.target.value})} style={{ width:30, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer", flexShrink:0 }} />
                </>
              )}
            </div>
          </div>
        )}

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── DESKTOP LAYOUT ─────────────────────────────────────────────────
  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"system-ui,sans-serif", background:"#f1f1f3", overflow:"hidden" }}>
      <Toaster position="top-center" />

      {isLoadingData && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#fff", borderRadius:16, padding:"32px 40px", textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize:32, marginBottom:12, animation:"spin 1s linear infinite", display:"inline-block" }}>⚙️</div>
            <div style={{ fontWeight:700, fontSize:16, color:"#333" }}>Loading {productType === "flexbook" ? "Flex Book" : "Bill Book"} Design...</div>
            <div style={{ fontSize:13, color:"#888", marginTop:4 }}>Fetching template & placing elements</div>
          </div>
        </div>
      )}

      {/* Icon rail */}
      <div style={{ width:68, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", alignItems:"center", padding:"12px 0", gap:4, flexShrink:0 }}>
        <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:18, marginBottom:12 }}>C</div>
        {sideItems.map(s => (
          <button key={s.id}
            onClick={() => { setPanel(s.id); if(s.id==="draw") setActiveTool("draw"); else setActiveTool("select"); }}
            style={{ width:54, height:54, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"none", borderRadius:10, cursor:"pointer", background:panel===s.id?"#eef2ff":"transparent", color:panel===s.id?ACCENT:"#555", gap:2 }}>
            <span style={{ fontSize:s.icon==="T"?20:16, fontWeight:s.icon==="T"?700:400 }}>{s.icon}</span>
            <span style={{ fontSize:9 }}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Side panel */}
      <div style={{ width:250, background:"#fff", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0 }}>
        <div style={{ padding:"12px 14px", borderBottom:"1px solid #f0f0f0", fontWeight:600, fontSize:13, color:"#222" }}>
          {sideItems.find(s=>s.id===panel)?.label}
        </div>
        <PanelContent />
      </div>

      {/* Main area */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Toolbar */}
        <div style={{ height:50, background:"#fff", borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", gap:8, padding:"0 14px", flexShrink:0, overflowX:"auto" }}>
          <input value={designName} onChange={e=>setDesignName(e.target.value)} style={{ border:"1px solid #eee", borderRadius:8, padding:"4px 10px", fontSize:13, fontWeight:600, width:160, outline:"none", flexShrink:0 }} />
          <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px", flexShrink:0 }} />
          <TBtn onClick={undo} disabled={hIdx<=0}>↩ Undo</TBtn>
          <TBtn onClick={redo} disabled={hIdx>=history.length-1}>↪ Redo</TBtn>
          <div style={{ width:1, height:26, background:"#e5e7eb", margin:"0 2px", flexShrink:0 }} />
          {selEl && <>
            <TBtn onClick={deleteEl} danger>🗑</TBtn>
            <TBtn onClick={duplicateEl}>⧉</TBtn>
            <TBtn onClick={layerUp}>↑</TBtn>
            <TBtn onClick={layerDown}>↓</TBtn>
            {selEl.type==="image" && <TBtn onClick={()=>commitSel({flip:!selEl.flip})}>↔</TBtn>}
            <span style={{ fontSize:11, color:"#888", marginLeft:4, flexShrink:0 }}>Opacity</span>
            <input type="range" min={0} max={100} value={selEl.opacity??100} onChange={e=>updateSel({opacity:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
            <span style={{ fontSize:11, minWidth:28, flexShrink:0 }}>{selEl.opacity??100}%</span>
            <span style={{ fontSize:11, color:"#888", marginLeft:4, flexShrink:0 }}>Rotate</span>
            <input type="range" min={-180} max={180} value={selEl.rotation??0} onChange={e=>updateSel({rotation:+e.target.value})} onPointerUp={()=>pushHistory(elements)} style={{ width:70, flexShrink:0 }} />
            <span style={{ fontSize:11, minWidth:30, flexShrink:0 }}>{selEl.rotation??0}°</span>
          </>}
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <label style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, cursor:"pointer" }}><input type="checkbox" checked={showGrid} onChange={e=>setShowGrid(e.target.checked)} />Grid</label>
            <TBtn onClick={()=>setZoom(z=>Math.max(0.1,+(z-0.1).toFixed(1)))}>−</TBtn>
            <span style={{ fontSize:12, minWidth:42, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
            <TBtn onClick={()=>setZoom(z=>Math.min(3,+(z+0.1).toFixed(1)))}>+</TBtn>
            <button onClick={exportPNG} style={{ padding:"7px 14px", borderRadius:8, background:`linear-gradient(135deg,${ACCENT},#ec4899)`, color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>⬇ Export</button>
            <button onClick={saveAndGoBack} style={{ padding:"7px 14px", borderRadius:8, background:"#10b981", color:"#fff", border:"none", cursor:"pointer", fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>💾 Save</button>
          </div>
        </div>

        {/* Canvas workspace */}
        <div style={{ flex:1, overflow:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:40, background:"#e0e0e6" }}>
          <div
            ref={canvasAreaRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{
              position:"relative",
              width: canvasSize.w * zoom,
              height: canvasSize.h * zoom,
              cursor: activeTool==="draw" ? "crosshair" : "default",
              userSelect:"none",
              touchAction:"none",
              boxShadow:"0 8px 48px rgba(0,0,0,0.22)",
              borderRadius:3,
              overflow:"hidden",
              flexShrink:0,
              background: bgColor,
            }}
          >
            {bgImage && (
              <img src={bgImage} alt="bg" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:bgOpacity/100, filter:bgFilter, pointerEvents:"none" }} />
            )}
            {showGrid && (
              <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(99,102,241,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.12) 1px,transparent 1px)`, backgroundSize:`${40*zoom}px ${40*zoom}px` }} />
            )}

            {elements.map(el => <ElView key={el.id} el={el} zoom={zoom} />)}
            {selEl && <SelectBox el={selEl} zoom={zoom} />}
            {liveDrawPath && liveDrawPath.length > 1 && (
              <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
                <polyline points={liveDrawPath.map(p=>`${p.x*zoom},${p.y*zoom}`).join(" ")} fill="none" stroke={drawColor} strokeWidth={drawSize*zoom} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Right properties panel */}
      {selEl && (
        <div style={{ width:220, background:"#fff", borderLeft:"1px solid #e5e7eb", overflowY:"auto", padding:12, flexShrink:0 }}>
          <div style={{ fontWeight:600, fontSize:13, marginBottom:12, color:"#222" }}>Properties</div>
          {selEl._label && <div style={{ fontSize:10, color:ACCENT, fontWeight:600, marginBottom:8, background:"#eef2ff", padding:"3px 8px", borderRadius:20, display:"inline-block" }}>{selEl._label}</div>}
          <PRw label="X"><NIn value={Math.round(selEl.x)} onChange={v=>commitSel({x:v})} /></PRw>
          <PRw label="Y"><NIn value={Math.round(selEl.y)} onChange={v=>commitSel({y:v})} /></PRw>
          {selEl.w!=null && <PRw label="W"><NIn value={Math.round(selEl.w)} onChange={v=>commitSel({w:v})} /></PRw>}
          {selEl.h!=null && <PRw label="H"><NIn value={Math.round(selEl.h)} onChange={v=>commitSel({h:v})} /></PRw>}
          {selEl.size!=null && <PRw label="Size"><NIn value={Math.round(selEl.size)} onChange={v=>commitSel({size:v})} /></PRw>}

          {selEl.type==="text" && <>
            <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>TEXT</div>
            <textarea value={selEl.text} onChange={e=>updateSel({text:e.target.value})} onBlur={()=>pushHistory(elements)} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:6, fontSize:12, resize:"none", height:60, boxSizing:"border-box" }} />
            <PRw label="Font"><select value={selEl.fontFamily} onChange={e=>commitSel({fontFamily:e.target.value})} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 4px", fontSize:11 }}>{FONTS.map(f=><option key={f}>{f}</option>)}</select></PRw>
            <PRw label="Size"><NIn value={selEl.fontSize} onChange={v=>commitSel({fontSize:v})} /></PRw>
            <PRw label="Color"><input type="color" value={selEl.color} onChange={e=>commitSel({color:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
            <div style={{ display:"flex", gap:6, marginTop:4 }}>{[["B","bold"],["I","italic"],["U","underline"]].map(([l,k])=>(<button key={k} onClick={()=>commitSel({[k]:!selEl[k]})} style={{ flex:1, padding:"5px 0", borderRadius:6, border:"1px solid #eee", background:selEl[k]?ACCENT:"#fff", color:selEl[k]?"#fff":"#333", cursor:"pointer", fontWeight:l==="B"?700:400, fontStyle:l==="I"?"italic":"normal", textDecoration:l==="U"?"underline":"none", fontSize:13 }}>{l}</button>))}</div>
          </>}

          {selEl.type==="shape" && <>
            <div style={{ marginTop:10, fontSize:11, color:"#888", fontWeight:600, marginBottom:6 }}>SHAPE</div>
            <PRw label="Fill"><input type="color" value={selEl.fill==="transparent"?"#ffffff":selEl.fill} onChange={e=>commitSel({fill:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
            <PRw label="Stroke"><input type="color" value={selEl.stroke} onChange={e=>commitSel({stroke:e.target.value})} style={{ width:36, height:26, borderRadius:6, border:"1px solid #eee", cursor:"pointer" }} /></PRw>
            <PRw label="SW"><NIn value={selEl.strokeW} onChange={v=>commitSel({strokeW:v})} /></PRw>
          </>}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Selection box ─────────────────────────────────────────────────────────────
function SelectBox({ el, zoom }) {
  const w = (el.w || el.size || 80) * zoom;
  const h = (el.h || el.size || 80) * zoom;
  const x = el.x * zoom, y = el.y * zoom;
  const hs = HANDLE_R;
  const hpts = [
    { cx:x,     cy:y,     cur:"nw-resize" }, { cx:x+w/2, cy:y,     cur:"n-resize"  }, { cx:x+w, cy:y,     cur:"ne-resize" },
    { cx:x+w,   cy:y+h/2, cur:"e-resize"  }, { cx:x+w,   cy:y+h,   cur:"se-resize" }, { cx:x+w/2, cy:y+h, cur:"s-resize"  },
    { cx:x,     cy:y+h,   cur:"sw-resize" }, { cx:x,     cy:y+h/2, cur:"w-resize"  },
  ];
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"visible" }}>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={ACCENT} strokeWidth={1.5} strokeDasharray="5 4" />
      {hpts.map((hd,i)=>(<rect key={i} x={hd.cx-hs} y={hd.cy-hs} width={hs*2} height={hs*2} rx={2} fill="#fff" stroke={ACCENT} strokeWidth={1.5} style={{ cursor:hd.cur, pointerEvents:"all" }} />))}
    </svg>
  );
}

// ── Element renderer ──────────────────────────────────────────────────────────
function ElView({ el, zoom }) {
  const w = (el.w || el.size || 80) * zoom;
  const h = (el.h || el.size || 80) * zoom;
  const base = {
    position:"absolute", left:el.x*zoom, top:el.y*zoom, width:w, height:h,
    opacity:(el.opacity??100)/100,
    transform:el.rotation ? `rotate(${el.rotation}deg)` : undefined,
    transformOrigin:"center center", pointerEvents:"none",
  };
  if (el.type==="image") return <img src={el.src} alt="" crossOrigin="anonymous" draggable={false} style={{ ...base, objectFit:"contain", transform:`${el.rotation?`rotate(${el.rotation}deg)`:""}${el.flip?" scaleX(-1)":""}`.trim()||undefined }} />;
  if (el.type==="text") return (<div style={{ ...base, fontSize:el.fontSize*zoom, fontFamily:el.fontFamily, color:el.color, fontWeight:el.bold?700:400, fontStyle:el.italic?"italic":"normal", textDecoration:el.underline?"underline":"none", textAlign:el.align||"left", whiteSpace:"pre-wrap", lineHeight:1.3, overflow:"visible" }}>{el.text}</div>);
  if (el.type==="shape") {
    const sw=(el.strokeW||2)*zoom;
    return (<svg style={base} viewBox={`0 0 ${w} ${h}`} overflow="visible">
      {el.shape==="rect"     && <rect     x={sw/2} y={sw/2} width={w-sw} height={h-sw} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
      {el.shape==="circle"   && <ellipse  cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
      {el.shape==="triangle" && <polygon  points={`${w/2},${sw/2} ${w-sw/2},${h-sw/2} ${sw/2},${h-sw/2}`} fill={el.fill==="transparent"?"none":el.fill} stroke={el.stroke} strokeWidth={sw} />}
    </svg>);
  }
  if (el.type==="sticker") return <div style={{ ...base, fontSize:el.size*zoom, lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center" }}>{el.emoji}</div>;
  if (el.type==="drawing") {
    const allX = el.path.map(p=>p.x), allY = el.path.map(p=>p.y);
    const minX = Math.min(...allX), minY = Math.min(...allY);
    const maxX = Math.max(...allX), maxY = Math.max(...allY);
    const pad = el.size;
    return (
      <svg style={{ position:"absolute", left:(minX-pad)*zoom, top:(minY-pad)*zoom, width:(maxX-minX+pad*2)*zoom, height:(maxY-minY+pad*2)*zoom, pointerEvents:"none", overflow:"visible", opacity:(el.opacity??100)/100 }}>
        <polyline points={el.path.map(p=>`${(p.x-minX+pad)*zoom},${(p.y-minY+pad)*zoom}`).join(" ")} fill="none" stroke={el.color} strokeWidth={el.size*zoom} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

function TBtn({ onClick, disabled, danger, children }) {
  return (<button onClick={onClick} disabled={disabled} style={{ padding:"5px 10px", borderRadius:7, border:"1px solid #eee", background:danger?"#fef2f2":"#fff", color:danger?"#dc2626":"#333", cursor:disabled?"default":"pointer", opacity:disabled?0.4:1, fontSize:13, whiteSpace:"nowrap", flexShrink:0 }}>{children}</button>);
}
function PRw({ label, children }) {
  return (<div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}><div style={{ fontSize:11, color:"#888", width:36 }}>{label}</div><div style={{ flex:1 }}>{children}</div></div>);
}
function NIn({ value, onChange }) {
  return (<input type="number" value={value} onChange={e=>onChange(+e.target.value)} style={{ width:"100%", border:"1px solid #eee", borderRadius:6, padding:"3px 6px", fontSize:12, boxSizing:"border-box", outline:"none" }} />);
}