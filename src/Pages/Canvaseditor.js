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



// // CanvasEditor.jsx - Complete working version with added text features (Outline, Line Height, Position, Change Language)
// import { useState, useRef, useCallback, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast, Toaster } from 'react-hot-toast';
// import { 
//   FiUpload, FiType, FiSquare, FiLayers, FiGrid, FiZoomIn, FiZoomOut, 
//   FiSave, FiTrash2, FiCopy, FiArrowUp, FiArrowDown,
//   FiAlignLeft, FiAlignCenter, FiAlignRight, FiBold, FiItalic,
//   FiUnderline, FiImage, FiSliders, FiMonitor, FiX, 
//   FiPlay, FiEye, FiScissors, FiCrop,
//   FiEdit2, FiXCircle, FiLock, FiUnlock, FiLink, FiMove, FiRotateCw,
//   FiBox, FiAlignJustify, FiGlobe
// } from 'react-icons/fi';
// import { MdAnimation, MdOpacity, MdColorLens, MdFormatLineSpacing, MdTextFields } from 'react-icons/md';

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
// ];
// const CANVAS_SIZES = [
//   { label: "Square 1:1", w: 1080, h: 1080 },
//   { label: "Portrait 4:5", w: 1080, h: 1350 },
//   { label: "Landscape 16:9", w: 1920, h: 1080 },
//   { label: "Story 9:16", w: 1080, h: 1920 },
//   { label: "A4 Portrait", w: 2480, h: 3508 },
//   { label: "A4 Landscape", w: 3508, h: 2480 },
// ];

// let idCounter = 1;
// const uid = () => `el_${++idCounter}_${Date.now()}`;
// const ACCENT = "#6366f1";
// const HANDLE_R = 5;
// const API_BASE_URL = "https://designback.onrender.com";

// const getFullImageUrl = (imagePath) => {
//   if (!imagePath) return null;
//   if (imagePath.startsWith('http')) return imagePath;
//   if (imagePath.startsWith('data:')) return imagePath;
//   const cleanPath = imagePath.replace(/\\/g, '/');
//   const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
//   return `${API_BASE_URL}/${normalizedPath}`;
// };

// const MOCK_FLEX_DATA = {
//   _id: "mock_flex_001",
//   companyName: "My Business Pvt Ltd",
//   companyAddress: "123 Business Street, Downtown",
//   companyEmail: "info@mybusiness.com",
//   companyPhone: "+91 9876543210",
//   flexTitle: "FLEX BOOK",
//   pointsTitle: "Our Services",
//   message: "Thank you for your business!",
//   points: [
//     { id: 1, text: "सिलाई सेटर - Ladies Suit, Blouse", x: 400, y: 384 },
//     { id: 2, text: "बच्चों के कपड़े", x: 400, y: 408 },
//     { id: 3, text: "Ladies Dress Designing", x: 400, y: 432 },
//     { id: 4, text: "Beauty Parlour + Mehandi", x: 400, y: 456 },
//   ],
//   textStyles: {
//     companyName: { fontSize: 24, fontWeight: "bold", color: "#000000", x: 400, y: 60, show: true },
//     companyAddress: { fontSize: 12, color: "#666666", x: 400, y: 100, show: true },
//     companyEmail: { fontSize: 12, color: "#666666", x: 400, y: 130, show: true },
//     companyPhone: { fontSize: 14, fontWeight: "bold", color: "#3b82f6", x: 400, y: 160, show: true },
//     flexTitle: { fontSize: 32, fontWeight: "bold", color: "#3b82f6", x: 400, y: 240, underline: true, show: true },
//     pointsTitle: { fontSize: 20, fontWeight: "bold", color: "#3b82f6", x: 400, y: 340, show: true },
//     message: { fontSize: 12, color: "#999999", x: 400, y: 650, italic: true, show: true },
//   },
//   logoSettings: { x: 50, y: 40, width: 100, height: 80, show: true },
//   design: {
//     backgroundColor: "#ffffff",
//     textColor: "#000000",
//     accentColor: "#3b82f6",
//     fontFamily: "Poppins",
//     border: true,
//     showPoints: true,
//   },
//   canvasSize: { width: 800, height: 800 },
//   templateImage: null,
// };

// export default function CanvasEditor() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [editingTextId, setEditingTextId] = useState(null);
//   const [editingTextValue, setEditingTextValue] = useState("");
//   const textInputRef = useRef(null);
//   const [isLocked, setIsLocked] = useState(false);
//   const [showImageUploader, setShowImageUploader] = useState(false);
//   const [selectedShapeForImage, setSelectedShapeForImage] = useState(null);
//   const [isRotating, setIsRotating] = useState(false);
//   const [rotationStart, setRotationStart] = useState({ angle: 0, startAngle: 0 });

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (editingTextId && textInputRef.current) {
//       textInputRef.current.focus();
//       const length = editingTextValue.length;
//       textInputRef.current.setSelectionRange(length, length);
//     }
//   }, [editingTextId]);

//   const [panel, setPanel] = useState(null);
//   const [elements, setElements] = useState([]);
//   const [selId, setSelId] = useState(null);
//   const [bgColor, setBgColor] = useState("#ffffff");
//   const [bgImage, setBgImage] = useState(null);
//   const [bgOpacity, setBgOpacity] = useState(100);
//   const [filterPreset, setFilterPreset] = useState("");
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [canvasSize, setCanvasSize] = useState({ w: 800, h: 800 });
//   const [zoom, setZoom] = useState(0.55);
//   const [showGrid, setShowGrid] = useState(false);
//   const [showGuides, setShowGuides] = useState(false);
//   const [showBleed, setShowBleed] = useState(false);
//   const [showFolds, setShowFolds] = useState(false);
//   const [designTitle, setDesignTitle] = useState("My Design");
//   const [history, setHistory] = useState([[]]);
//   const [hIdx, setHIdx] = useState(0);
//   const [isLoadingData, setIsLoadingData] = useState(false);
//   const [productType, setProductType] = useState(null);

//   const [tText, setTText] = useState("Your Text Here");
//   const [tFont, setTFont] = useState("Poppins");
//   const [tSize, setTSize] = useState(40);
//   const [tColor, setTColor] = useState("#000000");
//   const [tBold, setTBold] = useState(false);
//   const [tItalic, setTItalic] = useState(false);
//   const [tUnderline, setTUnderline] = useState(false);
//   const [tAlign, setTAlign] = useState("left");

//   const [sFill, setSFill] = useState("#6366f1");
//   const [sStroke, setSStroke] = useState("#000000");
//   const [sStrokeW, setSStrokeW] = useState(2);

//   const canvasAreaRef = useRef(null);
//   const copyStyleRef = useRef(null);
//   const interactRef = useRef({ type: null });
//   const lastClickRef = useRef({ id: null, time: 0 });

//   const uploadBgRef = useRef(null);
//   const uploadImgRef = useRef(null);

//   useEffect(() => {
//     if (isMobile) {
//       const vw = window.innerWidth;
//       const newZoom = Math.min(0.5, (vw - 30) / canvasSize.w);
//       setZoom(Math.max(0.3, +newZoom.toFixed(2)));
//     }
//   }, [isMobile, canvasSize]);

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
//     setEditingTextId(null);
//     setActiveFeature(null);
//   };

//   const redo = () => {
//     if (hIdx >= history.length - 1) return;
//     const ni = hIdx + 1;
//     setHIdx(ni);
//     setElements(JSON.parse(JSON.stringify(history[ni])));
//     setSelId(null);
//     setEditingTextId(null);
//     setActiveFeature(null);
//   };

//   const getTextDimensions = (text, fontSize, fontFamily) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     ctx.font = `${fontSize}px ${fontFamily}`;
//     const metrics = ctx.measureText(text);
//     return { width: metrics.width, height: fontSize * 1.3 };
//   };

//   const createElementsFromData = useCallback((data, customerData = {}) => {
//     const newElements = [];
//     const canvasW = data.canvasSize?.width || 800;
//     const canvasH = data.canvasSize?.height || 800;

//     setCanvasSize({ w: canvasW, h: canvasH });
//     if (data.design?.backgroundColor) setBgColor(data.design.backgroundColor);
//     if (data.templateImage) setBgImage(getFullImageUrl(data.templateImage));

//     const addTextElement = (text, style, defaultX, defaultY, defaultFontSize, label, align = "center") => {
//       if (!text) return;
//       const fontSize = style?.fontSize || defaultFontSize;
//       const dimensions = getTextDimensions(text, fontSize, data.design?.fontFamily || "Poppins");
//       const estimatedWidth = Math.min(dimensions.width + 30, canvasW - 60);
//       let x = style?.x || defaultX;
//       let y = style?.y || defaultY;
//       if (align === "center") x = x - (estimatedWidth / 2);
//       else if (align === "right") x = x - estimatedWidth;

//       newElements.push({
//         id: uid(), type: "text", text,
//         x: Math.max(10, Math.min(x, canvasW - estimatedWidth - 10)),
//         y: y - (fontSize / 2), w: estimatedWidth, h: fontSize * 1.6,
//         fontSize, fontFamily: data.design?.fontFamily || "Poppins",
//         color: style?.color || data.design?.textColor || "#000000",
//         bold: style?.fontWeight === "bold", italic: style?.italic || false,
//         underline: style?.underline || false, align,
//         opacity: 100, rotation: 0, animation: "none",
//         lineHeight: 1.3, letterSpacing: 0, textBackground: "transparent", textShadow: "none",
//         textOutline: "none", outlineWidth: 0, outlineColor: "#000000",
//         _label: label
//       });
//     };

//     addTextElement(customerData.companyName || data.companyName, data.textStyles?.companyName, 400, 60, 24, "Company Name", "center");
//     addTextElement(customerData.address || data.companyAddress, data.textStyles?.companyAddress, 400, 100, 12, "Company Address", "center");
//     addTextElement(customerData.email || data.companyEmail, data.textStyles?.companyEmail, 400, 130, 12, "Company Email", "center");
//     addTextElement(customerData.mobile || data.companyPhone, data.textStyles?.companyPhone, 400, 160, 14, "Company Phone", "center");
//     addTextElement(data.flexTitle, data.textStyles?.flexTitle, 400, 250, 32, "Flex Title", "center");
//     addTextElement(data.pointsTitle, data.textStyles?.pointsTitle, 400, 350, 20, "Points Title", "center");
//     addTextElement(data.message, data.textStyles?.message, 400, 660, 12, "Message", "center");

//     if (data.points && data.points.length > 0 && data.design?.showPoints !== false) {
//       data.points.forEach((point, idx) => {
//         const fontSize = 14;
//         const text = `✓ ${point.text}`;
//         const dimensions = getTextDimensions(text, fontSize, data.design?.fontFamily || "Poppins");
//         const estimatedWidth = Math.min(dimensions.width + 30, canvasW - 60);
//         newElements.push({
//           id: uid(), type: "text", text,
//           x: (point.x || 400) - 20,
//           y: (point.y || (390 + idx * 32)) - (fontSize / 2),
//           w: estimatedWidth, h: fontSize * 1.6,
//           fontSize, fontFamily: data.design?.fontFamily || "Poppins",
//           color: data.design?.textColor || "#333333",
//           bold: false, italic: false, underline: false, align: "left",
//           opacity: 100, rotation: 0, animation: "none",
//           lineHeight: 1.3, letterSpacing: 0, textBackground: "transparent", textShadow: "none",
//           textOutline: "none", outlineWidth: 0, outlineColor: "#000000",
//           _label: `Point ${idx + 1}`
//         });
//       });
//     }

//     const logoSrc = customerData.logo
//       ? (typeof customerData.logo === "string" ? getFullImageUrl(customerData.logo) : URL.createObjectURL(customerData.logo))
//       : (data.logo ? getFullImageUrl(data.logo) : null);

//     if (logoSrc && data.logoSettings?.show !== false) {
//       const ls = data.logoSettings || {};
//       newElements.push({
//         id: uid(), type: "image", src: logoSrc,
//         x: ls.x || 50, y: ls.y || 40, w: ls.width || 100, h: ls.height || 80,
//         opacity: 100, rotation: 0, flip: false, animation: "none", _label: "Logo"
//       });
//     }

//     if (data.design?.border) {
//       newElements.push({
//         id: uid(), type: "shape", shape: "rect",
//         x: 10, y: 10, w: canvasW - 20, h: canvasH - 20,
//         fill: "transparent", stroke: data.design?.accentColor || ACCENT,
//         strokeW: 3, opacity: 100, rotation: 0, _label: "Border"
//       });
//     }

//     return newElements;
//   }, []);

//   const loadFlexBook = useCallback(async (flexBookId, customerData = {}) => {
//     setIsLoadingData(true);
//     const timeoutId = setTimeout(() => {
//       const mockElements = createElementsFromData(MOCK_FLEX_DATA, customerData);
//       setElements(mockElements);
//       setHistory([[...mockElements]]);
//       setHIdx(0);
//       setProductType("flexbook");
//       setDesignTitle(`${customerData.companyName || "Demo"} - Flex Book`);
//       setIsLoadingData(false);
//       toast.success("Demo data loaded! Double-click any text to edit.");
//     }, 3000);

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/admin/flexbook/${flexBookId}`);
//       clearTimeout(timeoutId);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       const result = await response.json();
//       if (result.success && result.data) {
//         const newElements = createElementsFromData(result.data, customerData);
//         setElements(newElements);
//         setHistory([[...newElements]]);
//         setHIdx(0);
//         setProductType("flexbook");
//         setDesignTitle(`${customerData.companyName || result.data.companyName || "Flex Book"} - Flex Book`);
//         toast.success("Flex Book loaded!");
//       } else throw new Error("Invalid API response");
//     } catch (err) {
//       clearTimeout(timeoutId);
//       const mockElements = createElementsFromData(MOCK_FLEX_DATA, customerData);
//       setElements(mockElements);
//       setHistory([[...mockElements]]);
//       setHIdx(0);
//       setProductType("flexbook");
//       setDesignTitle(`${customerData.companyName || "Demo"} - Flex Book`);
//       toast.success("Demo data loaded! Double-click any text to edit.");
//     } finally {
//       setIsLoadingData(false);
//     }
//   }, [createElementsFromData]);

//   useEffect(() => {
//     const init = async () => {
//       const stateData = location.state?.flexBookData;
//       const source = stateData || (() => { try { return JSON.parse(localStorage.getItem('flexBookDesignData')); } catch { return null; } })();
//       if (source?.flexBookId) {
//         await loadFlexBook(source.flexBookId, {
//           companyName: source.companyName, address: source.address,
//           mobile: source.mobile, email: source.email, logo: source.logo,
//         });
//       } else {
//         const mockElements = createElementsFromData(MOCK_FLEX_DATA, {});
//         setElements(mockElements);
//         setHistory([[...mockElements]]);
//         setHIdx(0);
//         setProductType("flexbook");
//         setDesignTitle("My Business - Flex Book");
//         setIsLoadingData(false);
//       }
//     };
//     init();
//   }, [loadFlexBook, createElementsFromData]);

//   const selEl = elements.find(e => e.id === selId) || null;
//   const commitSel = (props) => commitElements(elements.map(e => e.id === selId ? { ...e, ...props } : e));

//   const getXY = (e) => {
//     const rect = canvasAreaRef.current.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     return { x: (clientX - rect.left) / zoom, y: (clientY - rect.top) / zoom };
//   };

//   const getCenter = (el) => {
//     return {
//       x: el.x + (el.w || el.size || 80) / 2,
//       y: el.y + (el.h || el.size || 80) / 2
//     };
//   };

//   const hitTest = (x, y) => {
//     for (let i = elements.length - 1; i >= 0; i--) {
//       const el = elements[i];
//       if (el._label === "Border") continue;
//       const elW = el.w || el.size || 80;
//       const elH = el.h || el.size || 80;
//       if (x >= el.x && x <= el.x + elW && y >= el.y && y <= el.y + elH) return el;
//     }
//     return null;
//   };

//   const HANDLES = ["nw","n","ne","e","se","s","sw","w"];
//   const getHPos = (el, h) => {
//     const w = el.w || el.size || 80;
//     const hi = el.h || el.size || 80;
//     return {
//       nw: { x: el.x, y: el.y }, n: { x: el.x + w/2, y: el.y }, ne: { x: el.x + w, y: el.y },
//       e: { x: el.x + w, y: el.y + hi/2 }, se: { x: el.x + w, y: el.y + hi },
//       s: { x: el.x + w/2, y: el.y + hi }, sw: { x: el.x, y: el.y + hi }, w: { x: el.x, y: el.y + hi/2 },
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

//   const hitRotateHandle = (x, y, el) => {
//     const center = getCenter(el);
//     const handlePos = { x: center.x, y: el.y - 25 };
//     const hs = 15 / zoom;
//     return Math.abs(x - handlePos.x) <= hs && Math.abs(y - handlePos.y) <= hs;
//   };

//   const startInlineEdit = (id, currentText) => {
//     if (isLocked) {
//       toast.error("Element is locked! Unlock to edit.");
//       return;
//     }
//     setEditingTextId(id);
//     setEditingTextValue(currentText);
//     setActiveFeature(null);
//     setPanel(null);
//   };

//   const updateTextContent = (id, newText) => {
//     if (!newText || newText.trim() === "") return;
//     setElements(prev => prev.map(el => {
//       if (el.id === id && el.type === "text") {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         ctx.font = `${el.italic ? "italic " : ""}${el.bold ? "bold " : ""}${el.fontSize}px ${el.fontFamily}`;
//         const metrics = ctx.measureText(newText);
//         const newWidth = Math.min(metrics.width + 40, canvasSize.w - 40);
//         return { ...el, text: newText, w: Math.max(newWidth, 50) };
//       }
//       return el;
//     }));
//   };

//   const finishInlineEdit = () => {
//     if (editingTextId && editingTextValue.trim() !== "") {
//       updateTextContent(editingTextId, editingTextValue);
//       setTimeout(() => {
//         pushHistory(elements);
//       }, 0);
//     }
//     setEditingTextId(null);
//     setEditingTextValue("");
//   };

//   const handleTextKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       finishInlineEdit();
//     } else if (e.key === 'Escape') {
//       setEditingTextId(null);
//       setEditingTextValue("");
//     }
//   };

//   const onPointerDown = (e) => {
//     e.preventDefault();
//     const { x, y } = getXY(e);
    
//     if (selEl && !isLocked) {
//       if (hitRotateHandle(x, y, selEl)) {
//         const center = getCenter(selEl);
//         const angle = Math.atan2(y - center.y, x - center.x) * 180 / Math.PI;
//         setIsRotating(true);
//         setRotationStart({ angle: selEl.rotation || 0, startAngle: angle });
//         return;
//       }
      
//       const h = hitHandle(x, y, selEl);
//       if (h) {
//         interactRef.current = { type: "resize", id: selEl.id, handle: h, startX: x, startY: y, origEl: { ...selEl } };
//         return;
//       }
//     }
    
//     const hit = hitTest(x, y);
//     if (hit) {
//       const now = Date.now();
//       const isDoubleClick = (now - lastClickRef.current.time) < 300 && lastClickRef.current.id === hit.id;
//       lastClickRef.current = { id: hit.id, time: now };
      
//       setSelId(hit.id);
      
//       if (isDoubleClick && hit.type === "text" && !isLocked) {
//         startInlineEdit(hit.id, hit.text);
//       }
      
//       if (!isLocked && !isDoubleClick) {
//         interactRef.current = { type: "move", id: hit.id, startX: x, startY: y, origEl: { ...hit } };
//       }
//     } else {
//       if (!editingTextId) {
//         setSelId(null);
//         setActiveFeature(null);
//         setPanel(null);
//       }
//       interactRef.current = { type: null };
//     }
//   };

//   const onPointerMove = (e) => {
//     if (isLocked) return;
//     const { x, y } = getXY(e);
    
//     if (isRotating && selEl) {
//       const center = getCenter(selEl);
//       const currentAngle = Math.atan2(y - center.y, x - center.x) * 180 / Math.PI;
//       let deltaAngle = currentAngle - rotationStart.startAngle;
//       let newRotation = (rotationStart.angle + deltaAngle) % 360;
//       if (newRotation < 0) newRotation += 360;
//       setElements(prev => prev.map(el => el.id === selEl.id ? { ...el, rotation: newRotation } : el));
//       return;
//     }
    
//     const ia = interactRef.current;
//     if (!ia.type) return;
//     const dx = x - ia.startX, dy = y - ia.startY;
//     if (ia.type === "move") {
//       setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: ia.origEl.x + dx, y: ia.origEl.y + dy }));
//     } else if (ia.type === "resize") {
//       const orig = ia.origEl;
//       let nx = orig.x, ny = orig.y;
//       let nw = orig.w || orig.size || 80, nh = orig.h || orig.size || 80;
//       const h = ia.handle;
//       if (h.includes("e")) nw = Math.max(40, orig.w + dx);
//       if (h.includes("s")) nh = Math.max(30, orig.h + dy);
//       if (h.includes("w")) { nx = orig.x + dx; nw = Math.max(40, orig.w - dx); }
//       if (h.includes("n")) { ny = orig.y + dy; nh = Math.max(30, orig.h - dy); }
//       setElements(prev => prev.map(el => el.id !== ia.id ? el : { ...el, x: nx, y: ny, w: nw, h: nh }));
//     }
//   };

//   const onPointerUp = () => {
//     if (isRotating) {
//       pushHistory(elements);
//       setIsRotating(false);
//     }
//     if (interactRef.current.type) pushHistory(elements);
//     interactRef.current = { type: null };
//   };

//   const copyStyle = () => {
//     if (selEl && selEl.type === "text") {
//       copyStyleRef.current = {
//         fontFamily: selEl.fontFamily, fontSize: selEl.fontSize, color: selEl.color,
//         bold: selEl.bold, italic: selEl.italic, underline: selEl.underline, align: selEl.align,
//         lineHeight: selEl.lineHeight, letterSpacing: selEl.letterSpacing,
//         textBackground: selEl.textBackground, textShadow: selEl.textShadow,
//         textOutline: selEl.textOutline, outlineWidth: selEl.outlineWidth, outlineColor: selEl.outlineColor
//       };
//       toast.success("Style copied!");
//     } else {
//       toast.error("Select a text element first");
//     }
//   };

//   const pasteStyle = () => {
//     if (selEl && selEl.type === "text" && copyStyleRef.current) {
//       commitSel(copyStyleRef.current);
//       toast.success("Style applied!");
//     } else if (!selEl) {
//       toast.error("Select a text element to paste style");
//     } else if (selEl.type !== "text") {
//       toast.error("Style can only be pasted on text elements");
//     }
//   };

//   const addImageEl = (src, iw, ih) => {
//     const scale = Math.min(300/iw, 300/ih, 1);
//     const el = { id: uid(), type: "image", src, x: 100, y: 100, w: iw*scale, h: ih*scale, opacity: 100, rotation: 0, flip: false, animation: "none" };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//   };

//   const handleBgUpload = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => setBgImage(ev.target.result);
//     r.readAsDataURL(f);
//     e.target.value = "";
//   };

//   const handleAddImage = (e) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => {
//       const img = new Image();
//       img.onload = () => addImageEl(ev.target.result, img.naturalWidth, img.naturalHeight);
//       img.src = ev.target.result;
//     };
//     r.readAsDataURL(f);
//     e.target.value = "";
//   };

//   const addText = () => {
//     const dimensions = getTextDimensions(tText, tSize, tFont);
//     const el = {
//       id: uid(), type: "text", text: tText, x: 100, y: 100,
//       w: dimensions.width + 30, h: tSize * 1.6,
//       fontSize: tSize, fontFamily: tFont, color: tColor,
//       bold: tBold, italic: tItalic, underline: tUnderline, align: tAlign,
//       opacity: 100, rotation: 0, animation: "none",
//       lineHeight: 1.3, letterSpacing: 0, textBackground: "transparent", textShadow: "none",
//       textOutline: "none", outlineWidth: 0, outlineColor: "#000000"
//     };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     setActiveFeature(null);
//   };

//   const addShape = (shape) => {
//     if (shape === "image-rect" || shape === "image-circle") {
//       setSelectedShapeForImage(shape === "image-rect" ? "rect" : "circle");
//       setShowImageUploader(true);
//       return;
//     }
//     const el = { 
//       id: uid(), type: "shape", shape, x: 200, y: 200, w: 140, h: 140, 
//       fill: sFill, stroke: sStroke, strokeW: sStrokeW, opacity: 100, rotation: 0,
//       imageSrc: null, imageScale: 1, imagePosition: { x: 0, y: 0 }
//     };
//     commitElements([...elements, el]);
//     setSelId(el.id);
//     setActiveFeature(null);
//   };

//   const handleShapeImageUpload = (e, shapeId) => {
//     const f = e.target.files[0]; if (!f) return;
//     const r = new FileReader();
//     r.onload = ev => {
//       setElements(prev => prev.map(el => 
//         el.id === shapeId ? { ...el, imageSrc: ev.target.result, fill: "transparent" } : el
//       ));
//     };
//     r.readAsDataURL(f);
//     e.target.value = "";
//   };

//   const updateShapeImage = (shapeId, updates) => {
//     setElements(prev => prev.map(el => 
//       el.id === shapeId ? { ...el, ...updates } : el
//     ));
//   };

//   const deleteEl = () => {
//     if (!selId) return;
//     if (isLocked) {
//       toast.error("Element is locked! Unlock to delete.");
//       return;
//     }
//     commitElements(elements.filter(e => e.id !== selId));
//     setSelId(null);
//     setEditingTextId(null);
//     setActiveFeature(null);
//   };

//   const duplicateEl = () => {
//     if (!selEl) return;
//     if (isLocked) {
//       toast.error("Element is locked! Unlock to duplicate.");
//       return;
//     }
//     const copy = { ...JSON.parse(JSON.stringify(selEl)), id: uid(), x: selEl.x + 30, y: selEl.y + 30 };
//     commitElements([...elements, copy]);
//     setSelId(copy.id);
//   };

//   const layerUp = () => {
//     const i = elements.findIndex(e => e.id === selId);
//     if (i < elements.length - 1) {
//       const a = [...elements];
//       [a[i], a[i+1]] = [a[i+1], a[i]];
//       commitElements(a);
//     }
//   };

//   const layerDown = () => {
//     const i = elements.findIndex(e => e.id === selId);
//     if (i > 0) {
//       const a = [...elements];
//       [a[i], a[i-1]] = [a[i-1], a[i]];
//       commitElements(a);
//     }
//   };

//   const exportPNG = async () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = canvasSize.w;
//     canvas.height = canvasSize.h;
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = bgColor;
//     ctx.fillRect(0, 0, canvasSize.w, canvasSize.h);
//     const loadImg = src => new Promise(res => {
//       const i = new Image(); i.crossOrigin = "anonymous";
//       i.onload = () => res(i); i.onerror = () => res(null); i.src = src;
//     });
//     if (bgImage) {
//       const img = await loadImg(bgImage);
//       if (img) { ctx.save(); ctx.globalAlpha = bgOpacity/100; ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h); ctx.restore(); }
//     }
//     for (const el of elements) {
//       ctx.save();
//       ctx.globalAlpha = (el.opacity??100)/100;
//       if (el.type==="image") { const img=await loadImg(el.src); if(img) ctx.drawImage(img,el.x,el.y,el.w,el.h); }
//       else if (el.type==="text") {
//         ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
//         ctx.fillStyle=el.color;
//         // Apply text outline if enabled
//         if (el.textOutline === "solid" && el.outlineWidth > 0) {
//           ctx.lineWidth = el.outlineWidth;
//           ctx.strokeStyle = el.outlineColor;
//           ctx.textAlign = el.align||"left";
//           let tx=el.x; if(el.align==="center") tx=el.x+el.w/2; if(el.align==="right") tx=el.x+el.w;
//           ctx.strokeText(el.text,tx,el.y+el.fontSize);
//         }
//         ctx.textAlign = el.align||"left";
//         let tx=el.x; if(el.align==="center") tx=el.x+el.w/2; if(el.align==="right") tx=el.x+el.w;
//         ctx.fillText(el.text,tx,el.y+el.fontSize);
//       } else if (el.type==="shape" && el.imageSrc) {
//         const img = await loadImg(el.imageSrc);
//         if (img) {
//           ctx.save();
//           ctx.beginPath();
//           if (el.shape === "rect") ctx.rect(el.x, el.y, el.w, el.h);
//           else if (el.shape === "circle") ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
//           ctx.clip();
//           const scale = el.imageScale || 1;
//           const imgW = el.w * scale;
//           const imgH = el.h * scale;
//           const imgX = el.x + (el.w - imgW) / 2 + (el.imagePosition?.x || 0);
//           const imgY = el.y + (el.h - imgH) / 2 + (el.imagePosition?.y || 0);
//           ctx.drawImage(img, imgX, imgY, imgW, imgH);
//           ctx.restore();
//         }
//       } else if (el.type==="shape"){
//         ctx.fillStyle = el.fill;
//         ctx.strokeStyle = el.stroke;
//         ctx.lineWidth = el.strokeW;
//         if (el.shape === "rect") {
//           ctx.fillRect(el.x, el.y, el.w, el.h);
//           ctx.strokeRect(el.x, el.y, el.w, el.h);
//         } else if (el.shape === "circle") {
//           ctx.beginPath();
//           ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
//           ctx.fill();
//           ctx.stroke();
//         }
//       }
//       ctx.restore();
//     }
//     const a = document.createElement("a");
//     a.download = `${designTitle}.png`;
//     a.href = canvas.toDataURL();
//     a.click();
//   };

//   const getCurrentUserId = () => {
//     try {
//       const userStr = localStorage.getItem("user");
//       if (userStr) { const user = JSON.parse(userStr); return user._id || user.id; }
//     } catch (e) {}
//     return null;
//   };

//   const canvasToFile = async () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = canvasSize.w; canvas.height = canvasSize.h;
//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = bgColor; ctx.fillRect(0,0,canvasSize.w,canvasSize.h);
//     const loadImg = src => new Promise(res => {
//       const img = new Image(); img.crossOrigin="anonymous";
//       img.onload=()=>res(img); img.onerror=()=>res(null); img.src=src;
//     });
//     if (bgImage) { const img=await loadImg(bgImage); if(img){ctx.save();ctx.globalAlpha=bgOpacity/100;ctx.drawImage(img,0,0,canvasSize.w,canvasSize.h);ctx.restore();} }
//     for (const el of elements) {
//       ctx.save(); ctx.globalAlpha=(el.opacity??100)/100;
//       if(el.type==="image"){const img=await loadImg(el.src);if(img)ctx.drawImage(img,el.x,el.y,el.w,el.h);}
//       else if(el.type==="text"){
//         ctx.font=`${el.italic?"italic ":""}${el.bold?"bold ":""}${el.fontSize}px ${el.fontFamily}`;
//         ctx.fillStyle=el.color;
//         if (el.textOutline === "solid" && el.outlineWidth > 0) {
//           ctx.lineWidth = el.outlineWidth;
//           ctx.strokeStyle = el.outlineColor;
//           ctx.textAlign = el.align||"left";
//           let tx=el.x; if(el.align==="center") tx=el.x+el.w/2; if(el.align==="right") tx=el.x+el.w;
//           ctx.strokeText(el.text,tx,el.y+el.fontSize);
//         }
//         ctx.textAlign = el.align||"left";
//         let tx=el.x; if(el.align==="center") tx=el.x+el.w/2; if(el.align==="right") tx=el.x+el.w;
//         ctx.fillText(el.text,tx,el.y+el.fontSize);
//       }
//       else if (el.type==="shape" && el.imageSrc) {
//         const img = await loadImg(el.imageSrc);
//         if (img) {
//           ctx.save();
//           ctx.beginPath();
//           if (el.shape === "rect") ctx.rect(el.x, el.y, el.w, el.h);
//           else if (el.shape === "circle") ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
//           ctx.clip();
//           const scale = el.imageScale || 1;
//           const imgW = el.w * scale;
//           const imgH = el.h * scale;
//           const imgX = el.x + (el.w - imgW) / 2 + (el.imagePosition?.x || 0);
//           const imgY = el.y + (el.h - imgH) / 2 + (el.imagePosition?.y || 0);
//           ctx.drawImage(img, imgX, imgY, imgW, imgH);
//           ctx.restore();
//         }
//       } else if(el.type==="shape"){
//         ctx.fillStyle = el.fill;
//         ctx.strokeStyle = el.stroke;
//         ctx.lineWidth = el.strokeW;
//         if (el.shape === "rect") {
//           ctx.fillRect(el.x, el.y, el.w, el.h);
//           ctx.strokeRect(el.x, el.y, el.w, el.h);
//         } else if (el.shape === "circle") {
//           ctx.beginPath();
//           ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
//           ctx.fill();
//           ctx.stroke();
//         }
//       }
//       ctx.restore();
//     }
//     return new Promise(resolve => { canvas.toBlob(blob => resolve(new File([blob],`design-${Date.now()}.png`,{type:'image/png'})),'image/png'); });
//   };

//   const saveDesignToServer = async () => {
//     const toastId = toast.loading("Saving design...");
//     try {
//       const file = await canvasToFile();
//       const userId = getCurrentUserId();
//       if (!userId) { toast.error("Please login first", { id: toastId }); return; }
//       const flexBookId = location.state?.flexBookData?.flexBookId || localStorage.getItem('currentFlexBookId') || null;
//       const formData = new FormData();
//       formData.append('image', file);
//       formData.append('flexBookId', flexBookId);
//       const response = await fetch(`${API_BASE_URL}/api/auth/save/${userId}`, { method: 'POST', body: formData });
//       const result = await response.json();
//       if (result.success) { toast.success("Design saved!", { id: toastId }); setTimeout(() => navigate(-1), 1000); }
//       else toast.error(result.message, { id: toastId });
//     } catch (error) {
//       toast.error(error.message || "Error saving design", { id: toastId });
//     }
//   };

//   const bgFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)${filterPreset ? " " + filterPreset : ""}`;
//   const bleedSize = 35;
//   const foldX = canvasSize.w / 2;
//   const foldY = canvasSize.h / 2;
//   const guideX1 = canvasSize.w / 3;
//   const guideX2 = (canvasSize.w * 2) / 3;
//   const guideY1 = canvasSize.h / 3;
//   const guideY2 = (canvasSize.h * 2) / 3;

//   const getMenuItems = () => {
//     if (selEl && !editingTextId) {
//       if (selEl.type === "text") {
//         return [
//           { id: "bold", icon: <FiBold />, label: "Bold", action: () => commitSel({ bold: !selEl.bold }), active: selEl.bold },
//           { id: "italic", icon: <FiItalic />, label: "Italic", action: () => commitSel({ italic: !selEl.italic }), active: selEl.italic },
//           { id: "underline", icon: <FiUnderline />, label: "Underline", action: () => commitSel({ underline: !selEl.underline }), active: selEl.underline },
//           { id: "font", icon: <FiType />, label: "Font", action: () => setActiveFeature(activeFeature === "font" ? null : "font"), active: activeFeature === "font" },
//           { id: "size", icon: <FiType />, label: "Size", action: () => setActiveFeature(activeFeature === "size" ? null : "size"), active: activeFeature === "size" },
//           { id: "color", icon: <MdColorLens />, label: "Color", action: () => setActiveFeature(activeFeature === "color" ? null : "color"), active: activeFeature === "color", colorDot: selEl.color },
//           { id: "outline", icon: <FiBox />, label: "Outline", action: () => setActiveFeature(activeFeature === "outline" ? null : "outline"), active: activeFeature === "outline" },
//           { id: "lineHeight", icon: <MdFormatLineSpacing />, label: "Line Ht", action: () => setActiveFeature(activeFeature === "lineHeight" ? null : "lineHeight"), active: activeFeature === "lineHeight" },
//           { id: "position", icon: <FiMove />, label: "Position", action: () => setActiveFeature(activeFeature === "position" ? null : "position"), active: activeFeature === "position" },
//           { id: "changeLang", icon: <FiGlobe />, label: "Lang", action: () => setActiveFeature(activeFeature === "changeLang" ? null : "changeLang"), active: activeFeature === "changeLang" },
//           { id: "alignL", icon: <FiAlignLeft />, label: "Left", action: () => commitSel({ align: "left" }), active: selEl.align === "left" },
//           { id: "alignC", icon: <FiAlignCenter />, label: "Center", action: () => commitSel({ align: "center" }), active: selEl.align === "center" },
//           { id: "alignR", icon: <FiAlignRight />, label: "Right", action: () => commitSel({ align: "right" }), active: selEl.align === "right" },
//           { id: "letterSpace", icon: <FiMove />, label: "Spacing", action: () => setActiveFeature(activeFeature === "letterSpacing" ? null : "letterSpacing"), active: activeFeature === "letterSpacing" },
//           { id: "bgColor", icon: <FiImage />, label: "TextBG", action: () => setActiveFeature(activeFeature === "background" ? null : "background"), active: activeFeature === "background" },
//           { id: "shadow", icon: <FiEye />, label: "Shadow", action: () => setActiveFeature(activeFeature === "shadow" ? null : "shadow"), active: activeFeature === "shadow" },
//           { id: "animate", icon: <FiPlay />, label: "Animate", action: () => setActiveFeature(activeFeature === "animation" ? null : "animation"), active: activeFeature === "animation" },
//           { id: "opacity", icon: <MdOpacity />, label: "Opacity", action: () => setActiveFeature(activeFeature === "opacity" ? null : "opacity"), active: activeFeature === "opacity" },
//           { id: "link", icon: <FiLink />, label: "Link", action: () => setActiveFeature(activeFeature === "hyperlink" ? null : "hyperlink"), active: activeFeature === "hyperlink" },
//           { id: "rotate", icon: <FiRotateCw />, label: "Rotate", action: () => setActiveFeature(activeFeature === "rotate" ? null : "rotate"), active: activeFeature === "rotate" },
//           { id: "layerUp", icon: <FiArrowUp />, label: "Up", action: layerUp },
//           { id: "layerDown", icon: <FiArrowDown />, label: "Down", action: layerDown },
//           { id: "duplicate", icon: <FiCopy />, label: "Copy", action: duplicateEl },
//           { id: "copyStyle", icon: <FiCopy />, label: "Style", action: copyStyle },
//           { id: "pasteStyle", icon: <FiCopy />, label: "Paste", action: pasteStyle },
//           { id: "lock", icon: isLocked ? <FiLock /> : <FiUnlock />, label: isLocked ? "Locked" : "Lock", action: () => setIsLocked(!isLocked), active: isLocked },
//           { id: "delete", icon: <FiTrash2 />, label: "Delete", action: deleteEl, danger: true },
//           { id: "deselect", icon: <FiXCircle />, label: "X", action: () => { setSelId(null); setActiveFeature(null); } },
//         ];
//       }
//       if (selEl.type === "shape") {
//         const items = [
//           { id: "fill", icon: <MdColorLens />, label: "Fill", action: () => setActiveFeature(activeFeature === "fillColor" ? null : "fillColor"), active: activeFeature === "fillColor", colorDot: selEl.fill !== "transparent" ? selEl.fill : null },
//           { id: "uploadImage", icon: <FiUpload />, label: "Add Img", action: () => document.getElementById(`shape-image-upload-${selEl.id}`).click(), active: false },
//           { id: "stroke", icon: <FiSquare />, label: "Stroke", action: () => setActiveFeature(activeFeature === "strokeColor" ? null : "strokeColor"), active: activeFeature === "strokeColor", colorDot: selEl.stroke },
//           { id: "strokeW", icon: <FiMove />, label: "Width", action: () => setActiveFeature(activeFeature === "strokeWidth" ? null : "strokeWidth"), active: activeFeature === "strokeWidth" },
//           { id: "opacity", icon: <MdOpacity />, label: "Opacity", action: () => setActiveFeature(activeFeature === "opacity" ? null : "opacity"), active: activeFeature === "opacity" },
//           { id: "rotate", icon: <FiRotateCw />, label: "Rotate", action: () => setActiveFeature(activeFeature === "rotate" ? null : "rotate"), active: activeFeature === "rotate" },
//         ];
//         if (selEl.imageSrc) {
//           items.push(
//             { id: "imageScale", icon: <FiZoomIn />, label: "Scale", action: () => setActiveFeature(activeFeature === "imageScale" ? null : "imageScale"), active: activeFeature === "imageScale" },
//             { id: "imagePos", icon: <FiMove />, label: "Position", action: () => setActiveFeature(activeFeature === "imagePosition" ? null : "imagePosition"), active: activeFeature === "imagePosition" },
//             { id: "removeImage", icon: <FiTrash2 />, label: "Remove", action: () => updateShapeImage(selEl.id, { imageSrc: null, fill: sFill }), danger: true }
//           );
//         }
//         items.push(
//           { id: "layerUp", icon: <FiArrowUp />, label: "Up", action: layerUp },
//           { id: "layerDown", icon: <FiArrowDown />, label: "Down", action: layerDown },
//           { id: "duplicate", icon: <FiCopy />, label: "Copy", action: duplicateEl },
//           { id: "lock", icon: isLocked ? <FiLock /> : <FiUnlock />, label: isLocked ? "Locked" : "Lock", action: () => setIsLocked(!isLocked), active: isLocked },
//           { id: "delete", icon: <FiTrash2 />, label: "Delete", action: deleteEl, danger: true },
//           { id: "deselect", icon: <FiXCircle />, label: "X", action: () => { setSelId(null); setActiveFeature(null); } },
//         );
//         return items;
//       }
//       if (selEl.type === "image") {
//         return [
//           { id: "flip", icon: <FiMove />, label: "Flip", action: () => commitSel({ flip: !selEl.flip }), active: selEl.flip },
//           { id: "opacity", icon: <MdOpacity />, label: "Settings", action: () => setActiveFeature(activeFeature === "imageSettings" ? null : "imageSettings"), active: activeFeature === "imageSettings" },
//           { id: "rotate", icon: <FiRotateCw />, label: "Rotate", action: () => setActiveFeature(activeFeature === "rotate" ? null : "rotate"), active: activeFeature === "rotate" },
//           { id: "layerUp", icon: <FiArrowUp />, label: "Up", action: layerUp },
//           { id: "layerDown", icon: <FiArrowDown />, label: "Down", action: layerDown },
//           { id: "duplicate", icon: <FiCopy />, label: "Copy", action: duplicateEl },
//           { id: "lock", icon: isLocked ? <FiLock /> : <FiUnlock />, label: isLocked ? "Locked" : "Lock", action: () => setIsLocked(!isLocked), active: isLocked },
//           { id: "delete", icon: <FiTrash2 />, label: "Delete", action: deleteEl, danger: true },
//           { id: "deselect", icon: <FiXCircle />, label: "X", action: () => { setSelId(null); setActiveFeature(null); } },
//         ];
//       }
//     }
//     return [
//       { id: "upload-bg", icon: <FiImage />, label: "BG", action: () => uploadBgRef.current.click() },
//       { id: "upload-img", icon: <FiUpload />, label: "Image", action: () => uploadImgRef.current.click() },
//       { id: "text", icon: <FiType />, label: "Text", action: () => setActiveFeature(activeFeature === "addText" ? null : "addText"), active: activeFeature === "addText" },
//       { id: "rect", icon: <FiSquare />, label: "Rect", action: () => addShape("rect") },
//       { id: "circle", icon: <FiSquare />, label: "Circle", action: () => addShape("circle") },
//       { id: "image-rect", icon: <FiImage />, label: "Img Rect", action: () => addShape("image-rect") },
//       { id: "image-circle", icon: <FiImage />, label: "Img Circ", action: () => addShape("image-circle") },
//       { id: "bgColor", icon: <MdColorLens />, label: "BGColor", action: () => setActiveFeature(activeFeature === "bgColor" ? null : "bgColor"), active: activeFeature === "bgColor", colorDot: bgColor },
//       { id: "bgOpacity", icon: <MdOpacity />, label: "BGOpacity", action: () => setActiveFeature(activeFeature === "bgOpacity" ? null : "bgOpacity"), active: activeFeature === "bgOpacity" },
//       { id: "filters", icon: <FiSliders />, label: "Filters", action: () => setActiveFeature(activeFeature === "filters" ? null : "filters"), active: activeFeature === "filters" },
//       { id: "layers", icon: <FiLayers />, label: "Layers", action: () => setActiveFeature(activeFeature === "layers" ? null : "layers"), active: activeFeature === "layers" },
//       { id: "size", icon: <FiMonitor />, label: "Canvas", action: () => setActiveFeature(activeFeature === "canvasSize" ? null : "canvasSize"), active: activeFeature === "canvasSize" },
//       { id: "grid", icon: <FiGrid />, label: "Grid", action: () => setShowGrid(!showGrid), active: showGrid },
//       { id: "guides", icon: <FiEye />, label: "Guides", action: () => setShowGuides(!showGuides), active: showGuides },
//       { id: "bleed", icon: <FiScissors />, label: "Bleed", action: () => setShowBleed(!showBleed), active: showBleed },
//       { id: "folds", icon: <FiCrop />, label: "Folds", action: () => setShowFolds(!showFolds), active: showFolds },
//     ];
//   };

//   const menuItems = getMenuItems();
//   const menuScrollRef = useRef(null);

//   const UnifiedMenuBar = () => (
//     <div style={{ 
//       background: "#fff", 
//       borderTop: "1px solid #e5e7eb", 
//       borderBottom: "1px solid #e5e7eb",
//       flexShrink: 0,
//     }}>
//       <div
//         ref={menuScrollRef}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           overflowX: "auto",
//           overflowY: "hidden",
//           padding: "8px 12px",
//           minHeight: 62,
//           WebkitOverflowScrolling: "touch",
//           scrollbarWidth: "thin",
//           gap: 6,
//         }}
//       >
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={item.action}
//             style={{
//               display: "inline-flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 4,
//               minWidth: 60,
//               height: 54,
//               padding: "6px 8px",
//               border: "none",
//               borderRadius: 12,
//               cursor: "pointer",
//               background: item.active ? "#eef2ff" : "transparent",
//               color: item.danger ? "#dc2626" : item.active ? ACCENT : "#555",
//               flexShrink: 0,
//               transition: "all 0.2s ease",
//               position: "relative",
//               fontWeight: item.active ? 600 : 500,
//             }}
//           >
//             {item.colorDot && item.colorDot !== "transparent" && item.colorDot !== null && (
//               <div style={{
//                 position: "absolute", top: 6, right: 6,
//                 width: 8, height: 8, borderRadius: 8,
//                 background: item.colorDot,
//                 border: "1.5px solid #fff",
//                 boxShadow: "0 0 0 1px #ccc",
//               }} />
//             )}
//             <span style={{ fontSize: 20, lineHeight: 1 }}>{item.icon}</span>
//             <span style={{ fontSize: 9, lineHeight: 1.2, fontWeight: item.active ? 600 : 500, whiteSpace: "nowrap" }}>{item.label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const GuidesOverlay = () => {
//     if (!showGrid && !showGuides && !showBleed && !showFolds) return null;
//     return (
//       <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
//         {showGrid && <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)`, backgroundSize: `${40 * zoom}px ${40 * zoom}px` }} />}
//         {showGuides && <>
//           <div style={{ position: "absolute", left: guideX1*zoom, top: 0, width: 1, height: "100%", background: "rgba(255,0,0,0.4)" }} />
//           <div style={{ position: "absolute", left: guideX2*zoom, top: 0, width: 1, height: "100%", background: "rgba(255,0,0,0.4)" }} />
//           <div style={{ position: "absolute", top: guideY1*zoom, left: 0, width: "100%", height: 1, background: "rgba(255,0,0,0.4)" }} />
//           <div style={{ position: "absolute", top: guideY2*zoom, left: 0, width: "100%", height: 1, background: "rgba(255,0,0,0.4)" }} />
//         </>}
//         {showBleed && <div style={{ position: "absolute", left: bleedSize*zoom, top: bleedSize*zoom, right: bleedSize*zoom, bottom: bleedSize*zoom, border: "1px dashed rgba(220,38,38,0.5)" }} />}
//         {showFolds && <>
//           <div style={{ position: "absolute", left: foldX*zoom, top: 0, width: 2, height: "100%", borderLeft: "2px dashed rgba(59,130,246,0.7)" }} />
//           <div style={{ position: "absolute", top: foldY*zoom, left: 0, width: "100%", height: 2, borderTop: "2px dashed rgba(59,130,246,0.7)" }} />
//         </>}
//       </div>
//     );
//   };

//   // CanvasArea - textarea properly handles its own events
//   const CanvasArea = () => (
//     <div
//       ref={canvasAreaRef}
//       onPointerDown={onPointerDown}
//       onPointerMove={onPointerMove}
//       onPointerUp={onPointerUp}
//       onTouchStart={onPointerDown}
//       onTouchMove={onPointerMove}
//       onTouchEnd={onPointerUp}
//       style={{
//         position: "relative",
//         width: canvasSize.w * zoom,
//         height: canvasSize.h * zoom,
//         cursor: "default",
//         userSelect: "none",
//         touchAction: "none",
//         boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
//         borderRadius: 4,
//         overflow: "hidden",
//         background: bgColor,
//         margin: "auto",
//       }}
//     >
//       {bgImage && (
//         <img src={bgImage} alt="bg" style={{
//           position: "absolute", inset: 0, width: "100%", height: "100%",
//           objectFit: "cover", opacity: bgOpacity / 100, filter: bgFilter, pointerEvents: "none"
//         }} />
//       )}
//       <GuidesOverlay />

//       {elements.map(el => {
//         if (el.type === "text" && editingTextId === el.id) {
//           return (
//             <textarea
//               key={el.id}
//               ref={textInputRef}
//               value={editingTextValue}
//               onChange={e => setEditingTextValue(e.target.value)}
//               onBlur={finishInlineEdit}
//               onKeyDown={handleTextKeyDown}
//               onPointerDown={e => e.stopPropagation()}
//               onPointerMove={e => e.stopPropagation()}
//               onTouchStart={e => e.stopPropagation()}
//               onTouchMove={e => e.stopPropagation()}
//               style={{
//                 position: "absolute",
//                 left: el.x * zoom,
//                 top: el.y * zoom,
//                 width: (el.w || 100) * zoom,
//                 height: (el.h || 60) * zoom,
//                 fontSize: el.fontSize * zoom,
//                 fontFamily: el.fontFamily,
//                 color: el.color,
//                 fontWeight: el.bold ? 700 : 400,
//                 fontStyle: el.italic ? "italic" : "normal",
//                 textDecoration: el.underline ? "underline" : "none",
//                 textAlign: el.align || "left",
//                 border: `2px solid ${ACCENT}`,
//                 borderRadius: 4,
//                 padding: "4px 8px",
//                 background: "transparent",
//                 outline: "none",
//                 zIndex: 20,
//                 boxSizing: "border-box",
//                 resize: "none",
//                 overflow: "hidden",
//                 lineHeight: el.lineHeight || 1.3,
//                 letterSpacing: `${el.letterSpacing || 0}px`,
//                 caretColor: el.color,
//               }}
//             />
//           );
//         }
//         return <ElView key={el.id} el={el} zoom={zoom} />;
//       })}

//       {selEl && !editingTextId && <SelectBox el={selEl} zoom={zoom} />}
      
//       {elements.map(el => el.type === "shape" && (
//         <input
//           key={`upload-${el.id}`}
//           id={`shape-image-upload-${el.id}`}
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={(e) => handleShapeImageUpload(e, el.id)}
//         />
//       ))}
//     </div>
//   );

//   const FeaturePopup = () => {
//     if (!activeFeature) return null;
//     const popupStyle = {
//       position: "fixed",
//       bottom: isMobile ? 72 : 60,
//       left: isMobile ? 8 : "auto",
//       right: isMobile ? 8 : "auto",
//       width: isMobile ? "auto" : 320,
//       background: "#fff",
//       borderRadius: 16,
//       boxShadow: "0 -4px 30px rgba(0,0,0,0.18)",
//       zIndex: 300,
//       padding: 16,
//       border: "1px solid #e5e7eb",
//       animation: "popupSlide 0.2s ease",
//     };
//     const Header = ({ title }) => (
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//         <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{title}</span>
//         <button onClick={() => setActiveFeature(null)} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><FiX size={14} /></button>
//       </div>
//     );

//     if (activeFeature === "addText") return (
//       <div style={popupStyle}>
//         <Header title="Add Text" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           <textarea value={tText} onChange={e => setTText(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 10, fontSize: 14, resize: "none", height: 70, boxSizing: "border-box" }} />
//           <select value={tFont} onChange={e => setTFont(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 8, fontSize: 13 }}>
//             {FONTS.map(f => <option key={f}>{f}</option>)}
//           </select>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <span style={{ fontSize: 12, color: "#666", width: 50 }}>Size {tSize}</span>
//             <input type="range" min={8} max={200} value={tSize} onChange={e => setTSize(+e.target.value)} style={{ flex: 1 }} />
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <span style={{ fontSize: 12, color: "#666" }}>Color</span>
//             <input type="color" value={tColor} onChange={e => setTColor(e.target.value)} style={{ width: 40, height: 34, borderRadius: 6, border: "none", cursor: "pointer" }} />
//           </div>
//           <div style={{ display: "flex", gap: 6 }}>
//             {[["B", () => setTBold(!tBold), tBold], ["I", () => setTItalic(!tItalic), tItalic], ["U", () => setTUnderline(!tUnderline), tUnderline]].map(([l, a, on]) => (
//               <button key={l} onClick={a} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: on ? ACCENT : "#f3f4f6", color: on ? "#fff" : "#333", fontWeight: 700, cursor: "pointer" }}>{l}</button>
//             ))}
//             <button onClick={() => setTAlign("left")} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: tAlign === "left" ? ACCENT : "#f3f4f6", cursor: "pointer", color: tAlign === "left" ? "#fff" : "#333" }}><FiAlignLeft /></button>
//             <button onClick={() => setTAlign("center")} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: tAlign === "center" ? ACCENT : "#f3f4f6", cursor: "pointer", color: tAlign === "center" ? "#fff" : "#333" }}><FiAlignCenter /></button>
//             <button onClick={() => setTAlign("right")} style={{ flex: 1, padding: 8, borderRadius: 6, border: "none", background: tAlign === "right" ? ACCENT : "#f3f4f6", cursor: "pointer", color: tAlign === "right" ? "#fff" : "#333" }}><FiAlignRight /></button>
//           </div>
//           <button onClick={addText} style={{ padding: 12, background: ACCENT, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600 }}>Add Text to Canvas</button>
//         </div>
//       </div>
//     );

//     // NEW: Outline Feature
//     if (activeFeature === "outline" && selEl && selEl.type === "text") return (
//       <div style={popupStyle}>
//         <Header title="Text Outline" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           <div>
//             <label style={{ fontSize: 12, display: "block", marginBottom: 6 }}>Enable Outline</label>
//             <div style={{ display: "flex", gap: 8 }}>
//               <button onClick={() => commitSel({ textOutline: "solid" })} style={{ flex: 1, padding: 8, borderRadius: 6, background: selEl.textOutline === "solid" ? ACCENT : "#f3f4f6", color: selEl.textOutline === "solid" ? "#fff" : "#333", border: "none", cursor: "pointer" }}>On</button>
//               <button onClick={() => commitSel({ textOutline: "none", outlineWidth: 0 })} style={{ flex: 1, padding: 8, borderRadius: 6, background: selEl.textOutline === "none" ? ACCENT : "#f3f4f6", color: selEl.textOutline === "none" ? "#fff" : "#333", border: "none", cursor: "pointer" }}>Off</button>
//             </div>
//           </div>
//           {selEl.textOutline === "solid" && (
//             <>
//               <div>
//                 <div style={{ fontSize: 12, marginBottom: 4 }}>Outline Width: {selEl.outlineWidth || 2}px</div>
//                 <input type="range" min={1} max={10} value={selEl.outlineWidth || 2} onChange={e => commitSel({ outlineWidth: +e.target.value })} style={{ width: "100%" }} />
//               </div>
//               <div>
//                 <div style={{ fontSize: 12, marginBottom: 4 }}>Outline Color</div>
//                 <input type="color" value={selEl.outlineColor || "#000000"} onChange={e => commitSel({ outlineColor: e.target.value })} style={{ width: "100%", height: 40, borderRadius: 6, cursor: "pointer" }} />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );

//     // NEW: Position Feature (X, Y coordinates)
//     if (activeFeature === "position" && selEl && selEl.type === "text") return (
//       <div style={popupStyle}>
//         <Header title="Text Position (X, Y)" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           <div>
//             <div style={{ fontSize: 12, marginBottom: 4 }}>X Position: {Math.round(selEl.x)}px</div>
//             <input type="range" min={0} max={canvasSize.w - (selEl.w || 100)} value={selEl.x} onChange={e => commitSel({ x: +e.target.value })} style={{ width: "100%" }} />
//           </div>
//           <div>
//             <div style={{ fontSize: 12, marginBottom: 4 }}>Y Position: {Math.round(selEl.y)}px</div>
//             <input type="range" min={0} max={canvasSize.h - (selEl.h || 60)} value={selEl.y} onChange={e => commitSel({ y: +e.target.value })} style={{ width: "100%" }} />
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
//             <button onClick={() => commitSel({ x: 50, y: 50 })} style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 12 }}>Top Left</button>
//             <button onClick={() => commitSel({ x: (canvasSize.w - (selEl.w || 100)) / 2, y: 50 })} style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 12 }}>Top Center</button>
//             <button onClick={() => commitSel({ x: 50, y: (canvasSize.h - (selEl.h || 60)) / 2 })} style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 12 }}>Center Left</button>
//             <button onClick={() => commitSel({ x: (canvasSize.w - (selEl.w || 100)) / 2, y: (canvasSize.h - (selEl.h || 60)) / 2 })} style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 12 }}>Center</button>
//             <button onClick={() => commitSel({ x: canvasSize.w - (selEl.w || 100) - 50, y: 50 })} style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 12 }}>Top Right</button>
//             <button onClick={() => commitSel({ x: canvasSize.w - (selEl.w || 100) - 50, y: canvasSize.h - (selEl.h || 60) - 50 })} style={{ padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 12 }}>Bottom Right</button>
//           </div>
//         </div>
//       </div>
//     );

//     // NEW: Change Language Feature
//     if (activeFeature === "changeLang" && selEl && selEl.type === "text") return (
//       <div style={popupStyle}>
//         <Header title="Change Language" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Select Language:</div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
//             <button onClick={() => {
//               // Hindi conversion (example mapping)
//               const hindiMap = {
//                 'a': 'अ', 'b': 'ब', 'c': 'क', 'd': 'द', 'e': 'इ', 'f': 'फ', 'g': 'ग', 'h': 'ह',
//                 'i': 'ई', 'j': 'ज', 'k': 'क', 'l': 'ल', 'm': 'म', 'n': 'न', 'o': 'ओ', 'p': 'प',
//                 'q': 'क', 'r': 'र', 's': 'स', 't': 'त', 'u': 'ऊ', 'v': 'व', 'w': 'व', 'x': 'क्स',
//                 'y': 'य', 'z': 'ज', 'A': 'अ', 'B': 'ब', 'C': 'क', 'D': 'द', 'E': 'इ', 'F': 'फ',
//                 'G': 'ग', 'H': 'ह', 'I': 'ई', 'J': 'ज', 'K': 'क', 'L': 'ल', 'M': 'म', 'N': 'न',
//                 'O': 'ओ', 'P': 'प', 'Q': 'क', 'R': 'र', 'S': 'स', 'T': 'त', 'U': 'ऊ', 'V': 'व',
//                 'W': 'व', 'X': 'क्स', 'Y': 'य', 'Z': 'ज', ' ': ' '
//               };
//               let newText = selEl.text.split('').map(char => hindiMap[char] || char).join('');
//               commitSel({ text: newText });
//               setActiveFeature(null);
//               toast.success("Converted to Hindi");
//             }} style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600 }}>हिंदी</button>
            
//             <button onClick={() => {
//               // English conversion (keep as is or convert from other scripts)
//               const englishMap = {
//                 'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai',
//                 'ओ': 'o', 'औ': 'au', 'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'च': 'ch', 'छ': 'chh',
//                 'ज': 'j', 'झ': 'jh', 'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'त': 't', 'थ': 'th',
//                 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
//                 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
//                 ' ':' '
//               };
//               let newText = selEl.text.split('').map(char => englishMap[char] || char).join('');
//               commitSel({ text: newText });
//               setActiveFeature(null);
//               toast.success("Converted to English");
//             }} style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600 }}>English</button>
            
//             <button onClick={() => {
//               // Urdu conversion (simple mapping)
//               const urduMap = {
//                 'a': 'ا', 'b': 'ب', 'c': 'ک', 'd': 'د', 'e': 'ع', 'f': 'ف', 'g': 'گ', 'h': 'ہ',
//                 'i': 'ی', 'j': 'ج', 'k': 'ک', 'l': 'ل', 'm': 'م', 'n': 'ن', 'o': 'و', 'p': 'پ',
//                 'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت', 'u': 'ا', 'v': 'و', 'w': 'و', 'x': 'کس',
//                 'y': 'ی', 'z': 'ز', 'A': 'ا', 'B': 'ب', 'C': 'ک', 'D': 'د', 'E': 'ع', 'F': 'ف',
//                 'G': 'گ', 'H': 'ہ', 'I': 'ی', 'J': 'ج', 'K': 'ک', 'L': 'ل', 'M': 'م', 'N': 'ن',
//                 'O': 'و', 'P': 'پ', 'Q': 'ق', 'R': 'ر', 'S': 'س', 'T': 'ت', 'U': 'ا', 'V': 'و',
//                 'W': 'و', 'X': 'کس', 'Y': 'ی', 'Z': 'ز', ' ': ' '
//               };
//               let newText = selEl.text.split('').map(char => urduMap[char] || char).join('');
//               commitSel({ text: newText });
//               setActiveFeature(null);
//               toast.success("Converted to Urdu");
//             }} style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600 }}>اردو</button>
//           </div>
//           <div style={{ fontSize: 11, color: "#999", marginTop: 8, textAlign: "center" }}>
//             Note: Basic character conversion only
//           </div>
//         </div>
//       </div>
//     );

//     if (activeFeature === "rotate" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Rotate" />
//         <input type="range" min={0} max={360} value={selEl.rotation || 0} onChange={e => commitSel({ rotation: +e.target.value })} style={{ width: "100%" }} />
//         <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.rotation || 0}°</div>
//         <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
//           <button onClick={() => commitSel({ rotation: (selEl.rotation || 0) + 90 })} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>+90°</button>
//           <button onClick={() => commitSel({ rotation: (selEl.rotation || 0) - 90 })} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>-90°</button>
//           <button onClick={() => commitSel({ rotation: 0 })} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>Reset</button>
//         </div>
//       </div>
//     );

//     if (activeFeature === "font" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Select Font" />
//         <select value={selEl.fontFamily} onChange={e => { commitSel({ fontFamily: e.target.value }); setActiveFeature(null); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14 }}>
//           {FONTS.map(f => <option key={f}>{f}</option>)}
//         </select>
//       </div>
//     );

//     if (activeFeature === "size" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Font Size" />
//         <input type="range" min={8} max={200} value={selEl.fontSize} onChange={e => commitSel({ fontSize: +e.target.value })} style={{ width: "100%" }} />
//         <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.fontSize}px</div>
//       </div>
//     );

//     if (activeFeature === "color" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Text Color" />
//         <input type="color" value={selEl.color} onChange={e => commitSel({ color: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8, border: "none", cursor: "pointer" }} />
//       </div>
//     );

//     if (activeFeature === "lineHeight" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Line Height" />
//         <input type="range" min={0.8} max={2.5} step={0.1} value={selEl.lineHeight || 1.3} onChange={e => commitSel({ lineHeight: +e.target.value })} style={{ width: "100%" }} />
//         <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.lineHeight || 1.3}</div>
//       </div>
//     );

//     if (activeFeature === "letterSpacing" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Letter Spacing" />
//         <input type="range" min={-2} max={10} value={selEl.letterSpacing || 0} onChange={e => commitSel({ letterSpacing: +e.target.value })} style={{ width: "100%" }} />
//         <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.letterSpacing || 0}px</div>
//       </div>
//     );

//     if (activeFeature === "background" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Text Background" />
//         <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
//           <input type="color" value={selEl.textBackground === "transparent" ? "#ffffff" : selEl.textBackground} onChange={e => commitSel({ textBackground: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8, cursor: "pointer" }} />
//           <button onClick={() => commitSel({ textBackground: "transparent" })} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer" }}>Remove Background</button>
//         </div>
//       </div>
//     );

//     if (activeFeature === "shadow" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Text Shadow" />
//         <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
//           <input type="color" value={selEl.textShadow === "none" ? "#000000" : selEl.textShadow} onChange={e => commitSel({ textShadow: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8, cursor: "pointer" }} />
//           <button onClick={() => commitSel({ textShadow: "none" })} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer" }}>Remove Shadow</button>
//         </div>
//       </div>
//     );

//     if (activeFeature === "animation" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Animation" />
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
//           {["none", "fadeIn", "slideUp", "bounce", "pulse", "shake", "zoomIn"].map(anim => (
//             <button key={anim} onClick={() => { commitSel({ animation: anim }); setActiveFeature(null); }} style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", background: selEl.animation === anim ? ACCENT : "#fff", color: selEl.animation === anim ? "#fff" : "#333", cursor: "pointer" }}>
//               {anim}
//             </button>
//           ))}
//         </div>
//       </div>
//     );

//     if (activeFeature === "opacity" && selEl && (selEl.type === "text" || selEl.type === "shape")) return (
//       <div style={popupStyle}>
//         <Header title="Opacity" />
//         <input type="range" min={0} max={100} value={selEl.opacity || 100} onChange={e => commitSel({ opacity: +e.target.value })} style={{ width: "100%" }} />
//         <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.opacity || 100}%</div>
//       </div>
//     );

//     if (activeFeature === "imageSettings" && selEl && selEl.type === "image") return (
//       <div style={popupStyle}>
//         <Header title="Image Settings" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           <div>
//             <div style={{ fontSize: 12, marginBottom: 4 }}>Opacity: {selEl.opacity || 100}%</div>
//             <input type="range" min={0} max={100} value={selEl.opacity || 100} onChange={e => commitSel({ opacity: +e.target.value })} style={{ width: "100%" }} />
//           </div>
//           <div style={{ display: "flex", gap: 8 }}>
//             <button onClick={() => commitSel({ flip: !selEl.flip })} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", background: selEl.flip ? ACCENT : "#fff", color: selEl.flip ? "#fff" : "#333", cursor: "pointer" }}>
//               Flip {selEl.flip ? "On" : "Off"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );

//     if (activeFeature === "imageScale" && selEl && selEl.imageSrc) return (
//       <div style={popupStyle}>
//         <Header title="Image Scale" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           <div>
//             <div style={{ fontSize: 12, marginBottom: 4 }}>Scale: {Math.round((selEl.imageScale || 1) * 100)}%</div>
//             <input type="range" min={0.1} max={3} step={0.01} value={selEl.imageScale || 1} onChange={e => updateShapeImage(selEl.id, { imageScale: +e.target.value })} style={{ width: "100%" }} />
//           </div>
//         </div>
//       </div>
//     );

//     if (activeFeature === "imagePosition" && selEl && selEl.imageSrc) return (
//       <div style={popupStyle}>
//         <Header title="Image Position" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           <div>
//             <div style={{ fontSize: 12, marginBottom: 4 }}>X Offset: {(selEl.imagePosition?.x || 0)}px</div>
//             <input type="range" min={-100} max={100} value={selEl.imagePosition?.x || 0} onChange={e => updateShapeImage(selEl.id, { imagePosition: { ...(selEl.imagePosition || { x: 0, y: 0 }), x: +e.target.value } })} style={{ width: "100%" }} />
//           </div>
//           <div>
//             <div style={{ fontSize: 12, marginBottom: 4 }}>Y Offset: {(selEl.imagePosition?.y || 0)}px</div>
//             <input type="range" min={-100} max={100} value={selEl.imagePosition?.y || 0} onChange={e => updateShapeImage(selEl.id, { imagePosition: { ...(selEl.imagePosition || { x: 0, y: 0 }), y: +e.target.value } })} style={{ width: "100%" }} />
//           </div>
//         </div>
//       </div>
//     );

//     if (activeFeature === "hyperlink" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Hyperlink" />
//         <input type="url" placeholder="https://example.com" value={selEl.hyperlink || ""} onChange={e => commitSel({ hyperlink: e.target.value })} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 10 }} />
//         <button onClick={() => commitSel({ hyperlink: null })} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", width: "100%" }}>Remove Link</button>
//       </div>
//     );

//     if (activeFeature === "fillColor" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Fill Color" />
//         <input type="color" value={selEl.fill === "transparent" ? "#ffffff" : selEl.fill} onChange={e => commitSel({ fill: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8, cursor: "pointer" }} />
//         <button onClick={() => commitSel({ fill: "transparent" })} style={{ marginTop: 10, padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", width: "100%" }}>Transparent</button>
//       </div>
//     );

//     if (activeFeature === "strokeColor" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Stroke Color" />
//         <input type="color" value={selEl.stroke} onChange={e => commitSel({ stroke: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8, cursor: "pointer" }} />
//       </div>
//     );

//     if (activeFeature === "strokeWidth" && selEl) return (
//       <div style={popupStyle}>
//         <Header title="Stroke Width" />
//         <input type="range" min={0} max={20} value={selEl.strokeW} onChange={e => commitSel({ strokeW: +e.target.value })} style={{ width: "100%" }} />
//         <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.strokeW}px</div>
//       </div>
//     );

//     if (activeFeature === "bgColor") return (
//       <div style={popupStyle}>
//         <Header title="Background Color" />
//         <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: "100%", height: 50, borderRadius: 8, cursor: "pointer" }} />
//       </div>
//     );

//     if (activeFeature === "bgOpacity") return (
//       <div style={popupStyle}>
//         <Header title="Background Opacity" />
//         <input type="range" min={0} max={100} value={bgOpacity} onChange={e => setBgOpacity(+e.target.value)} style={{ width: "100%" }} />
//         <div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{bgOpacity}%</div>
//       </div>
//     );

//     if (activeFeature === "filters") return (
//       <div style={popupStyle}>
//         <Header title="Image Filters" />
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           <div><div style={{ fontSize: 12, marginBottom: 4 }}>Brightness: {brightness}%</div><input type="range" min={0} max={200} value={brightness} onChange={e => setBrightness(+e.target.value)} style={{ width: "100%" }} /></div>
//           <div><div style={{ fontSize: 12, marginBottom: 4 }}>Contrast: {contrast}%</div><input type="range" min={0} max={200} value={contrast} onChange={e => setContrast(+e.target.value)} style={{ width: "100%" }} /></div>
//           <div><div style={{ fontSize: 12, marginBottom: 4 }}>Saturation: {saturation}%</div><input type="range" min={0} max={200} value={saturation} onChange={e => setSaturation(+e.target.value)} style={{ width: "100%" }} /></div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6 }}>
//             {FILTERS_LIST.map(f => <button key={f.name} onClick={() => setFilterPreset(f.value)} style={{ padding: 6, borderRadius: 6, border: "1px solid #e5e7eb", background: filterPreset === f.value ? ACCENT : "#fff", color: filterPreset === f.value ? "#fff" : "#333", cursor: "pointer", fontSize: 11 }}>{f.name}</button>)}
//           </div>
//         </div>
//       </div>
//     );

//     if (activeFeature === "layers") return (
//       <div style={popupStyle}>
//         <Header title="Layers" />
//         <div style={{ maxHeight: 300, overflowY: "auto" }}>
//           {[...elements].reverse().map((el, idx) => (
//             <div key={el.id} onClick={() => { setSelId(el.id); setActiveFeature(null); }} style={{ padding: 8, marginBottom: 6, borderRadius: 8, background: selId === el.id ? "#eef2ff" : "#f9fafb", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ fontSize: 13 }}>{el._label || el.type} {el.type === "text" && `: ${el.text?.substring(0, 20)}`}</span>
//               <span style={{ fontSize: 11, color: "#999" }}>Layer {elements.length - idx}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );

//     if (activeFeature === "canvasSize") return (
//       <div style={popupStyle}>
//         <Header title="Canvas Size" />
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
//           {CANVAS_SIZES.map(size => (
//             <button key={size.label} onClick={() => { setCanvasSize({ w: size.w, h: size.h }); setActiveFeature(null); }} style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", textAlign: "left" }}>
//               <div style={{ fontWeight: 600, fontSize: 12 }}>{size.label}</div>
//               <div style={{ fontSize: 10, color: "#666" }}>{size.w}×{size.h}</div>
//             </button>
//           ))}
//         </div>
//       </div>
//     );

//     return null;
//   };

//   const ImageUploadPopup = () => {
//     if (!showImageUploader) return null;
//     return (
//       <>
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 998 }} onClick={() => setShowImageUploader(false)} />
//         <div style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           background: "#fff",
//           borderRadius: 16,
//           padding: 24,
//           zIndex: 999,
//           boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
//           minWidth: 300,
//         }}>
//           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//             <h3 style={{ margin: 0 }}>Upload Image for Shape</h3>
//             <button onClick={() => setShowImageUploader(false)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20 }}>×</button>
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const f = e.target.files[0];
//               if (f && selectedShapeForImage) {
//                 const r = new FileReader();
//                 r.onload = ev => {
//                   const el = { 
//                     id: uid(), type: "shape", 
//                     shape: selectedShapeForImage,
//                     x: 200, y: 200, w: 140, h: 140, 
//                     fill: "transparent", stroke: sStroke, strokeW: sStrokeW, 
//                     opacity: 100, rotation: 0,
//                     imageSrc: ev.target.result, imageScale: 1, imagePosition: { x: 0, y: 0 }
//                   };
//                   commitElements([...elements, el]);
//                   setSelId(el.id);
//                   setShowImageUploader(false);
//                   setSelectedShapeForImage(null);
//                 };
//                 r.readAsDataURL(f);
//               }
//               e.target.value = "";
//             }}
//             style={{ width: "100%", padding: 10, border: "1px solid #e5e7eb", borderRadius: 8 }}
//           />
//           <button onClick={() => setShowImageUploader(false)} style={{ marginTop: 16, width: "100%", padding: 10, background: ACCENT, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
//             Cancel
//           </button>
//         </div>
//       </>
//     );
//   };

//   if (isMobile) {
//     return (
//       <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#e0e0e6", overflow: "hidden" }}>
//         <Toaster position="top-center" />
//         {isLoadingData && (
//           <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <div style={{ background: "#fff", borderRadius: 20, padding: 32, textAlign: "center" }}>
//               <div style={{ fontSize: 40, marginBottom: 16, animation: "spin 1s linear infinite" }}>🎨</div>
//               <div style={{ fontSize: 16, fontWeight: 600 }}>Loading Design...</div>
//             </div>
//           </div>
//         )}
//         <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//           <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${ACCENT},#ec4899)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>C</div>
//           <input value={designTitle} onChange={e => setDesignTitle(e.target.value)} style={{ flex: 1, border: "1px solid #eee", borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 500, minWidth: 0 }} />
//           <button onClick={undo} disabled={hIdx <= 0} style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 14 }}>↩</button>
//           <button onClick={redo} disabled={hIdx >= history.length - 1} style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 14 }}>↪</button>
//           <button onClick={saveDesignToServer} style={{ padding: "6px 12px", borderRadius: 8, background: `linear-gradient(135deg,${ACCENT},#ec4899)`, color: "#fff", border: "none", fontSize: 12, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}><FiSave size={12} /> Save</button>
//         </div>
//         <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "16px 12px" }}>
//           <CanvasArea />
//         </div>
//         <div style={{ position: "fixed", right: 12, bottom: 75, zIndex: 50, display: "flex", flexDirection: "column", gap: 8 }}>
//           <button onClick={() => setZoom(z => Math.min(2, +(z+0.1).toFixed(1)))} style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FiZoomIn /></button>
//           <button onClick={() => setZoom(z => Math.max(0.2, +(z-0.1).toFixed(1)))} style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FiZoomOut /></button>
//           <div style={{ width: 40, height: 40, borderRadius: 40, background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{Math.round(zoom*100)}%</div>
//         </div>
//         <input ref={uploadBgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgUpload} />
//         <input ref={uploadImgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAddImage} />
//         <UnifiedMenuBar />
//         <FeaturePopup />
//         <ImageUploadPopup />
//         <style>{`
//           @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//           @keyframes popupSlide { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//           @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//           @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//           @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
//           @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
//           @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
//           @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//           .animate-fadeIn { animation: fadeIn 0.5s ease; }
//           .animate-slideUp { animation: slideUp 0.5s ease; }
//           .animate-bounce { animation: bounce 0.5s ease; }
//           .animate-pulse { animation: pulse 1s ease-in-out infinite; }
//           .animate-shake { animation: shake 0.5s ease; }
//           .animate-zoomIn { animation: zoomIn 0.5s ease; }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#e0e0e6", overflow: "hidden" }}>
//       <Toaster position="top-center" />
//       {isLoadingData && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <div style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center" }}>
//             <div style={{ fontSize: 32, animation: "spin 1s linear infinite" }}>🎨</div>
//             <div style={{ marginTop: 8, fontWeight: 600 }}>Loading Design...</div>
//           </div>
//         </div>
//       )}
//       <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", height: 50, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", flexShrink: 0 }}>
//         <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${ACCENT},#ec4899)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>C</div>
//         <input value={designTitle} onChange={e => setDesignTitle(e.target.value)} style={{ border: "1px solid #eee", borderRadius: 8, padding: "4px 12px", fontSize: 13, width: 200 }} />
//         <div style={{ width: 1, height: 26, background: "#e5e7eb" }} />
//         <button onClick={undo} disabled={hIdx <= 0} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 13 }}>↩ Undo</button>
//         <button onClick={redo} disabled={hIdx >= history.length - 1} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 13 }}>↪ Redo</button>
//         <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
//           <button onClick={() => setZoom(z => Math.max(0.2, +(z-0.1).toFixed(1)))} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18 }}><FiZoomOut /></button>
//           <span style={{ fontSize: 12, minWidth: 42, textAlign: "center", fontWeight: 600 }}>{Math.round(zoom*100)}%</span>
//           <button onClick={() => setZoom(z => Math.min(2, +(z+0.1).toFixed(1)))} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18 }}><FiZoomIn /></button>
//           <div style={{ width: 1, height: 26, background: "#e5e7eb" }} />
//           <button onClick={exportPNG} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 13 }}>Export PNG</button>
//           <button onClick={saveDesignToServer} style={{ padding: "5px 14px", borderRadius: 6, background: "#10b981", color: "#fff", border: "none", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600 }}><FiSave size={14} /> Save</button>
//         </div>
//       </div>
//       <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
//         <CanvasArea />
//       </div>
//       <input ref={uploadBgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgUpload} />
//       <input ref={uploadImgRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAddImage} />
//       <UnifiedMenuBar />
//       <FeaturePopup />
//       <ImageUploadPopup />
//       <style>{`
//         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         @keyframes popupSlide { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
//         @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
//         @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
//         @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         .animate-fadeIn { animation: fadeIn 0.5s ease; }
//         .animate-slideUp { animation: slideUp 0.5s ease; }
//         .animate-bounce { animation: bounce 0.5s ease; }
//         .animate-pulse { animation: pulse 1s ease-in-out infinite; }
//         .animate-shake { animation: shake 0.5s ease; }
//         .animate-zoomIn { animation: zoomIn 0.5s ease; }
//       `}</style>
//     </div>
//   );
// }

// function SelectBox({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;
//   const ACCENT = "#6366f1";
//   const centerX = w / 2;
  
//   return (
//     <div style={{ 
//       position: "absolute", 
//       left: el.x * zoom, 
//       top: el.y * zoom, 
//       width: w, 
//       height: h, 
//       pointerEvents: "none", 
//       zIndex: 15 
//     }}>
//       <div style={{ 
//         position: "absolute", 
//         inset: 0, 
//         border: `2px solid ${ACCENT}`, 
//         borderRadius: 4,
//         boxShadow: `0 0 0 1px rgba(99,102,241,0.2), 0 0 0 3px rgba(99,102,241,0.1)`,
//         transition: "all 0.2s ease",
//       }} />
      
//       <div style={{ 
//         position: "absolute", 
//         inset: -2, 
//         border: `1px dashed ${ACCENT}`, 
//         borderRadius: 6,
//         opacity: 0.4,
//         animation: "pulse 1.5s ease-in-out infinite",
//       }} />
      
//       {[
//         { left: -6, top: -6, cursor: "nw-resize" },
//         { left: centerX - 6, top: -6, cursor: "n-resize" },
//         { left: w - 6, top: -6, cursor: "ne-resize" },
//         { left: w - 6, top: h/2 - 6, cursor: "e-resize" },
//         { left: w - 6, top: h - 6, cursor: "se-resize" },
//         { left: centerX - 6, top: h - 6, cursor: "s-resize" },
//         { left: -6, top: h - 6, cursor: "sw-resize" },
//         { left: -6, top: h/2 - 6, cursor: "w-resize" },
//       ].map((handle, i) => (
//         <div key={i} style={{ 
//           position: "absolute", 
//           left: handle.left, 
//           top: handle.top, 
//           width: 12, 
//           height: 12, 
//           background: "#fff", 
//           border: `2px solid ${ACCENT}`,
//           borderRadius: 3,
//           boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
//           cursor: handle.cursor,
//           transition: "transform 0.1s ease, background 0.2s ease",
//         }} />
//       ))}
      
//       <div style={{ 
//         position: "absolute", 
//         left: centerX - 8, 
//         top: -22, 
//         width: 16, 
//         height: 16, 
//         background: ACCENT, 
//         borderRadius: "50%",
//         cursor: "grab",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         transition: "transform 0.1s ease",
//       }}>
//         <FiRotateCw size={10} color="#fff" />
//       </div>
      
//       <div style={{
//         position: "absolute",
//         left: centerX - 1,
//         top: -6,
//         width: 2,
//         height: 10,
//         background: ACCENT,
//         opacity: 0.5,
//       }} />
//     </div>
//   );
// }

// function ElView({ el, zoom }) {
//   const w = (el.w || el.size || 80) * zoom;
//   const h = (el.h || el.size || 80) * zoom;

//   const getAnimClass = () => {
//     const map = { fadeIn: "animate-fadeIn", slideUp: "animate-slideUp", bounce: "animate-bounce", pulse: "animate-pulse", shake: "animate-shake", zoomIn: "animate-zoomIn" };
//     return map[el.animation] || "";
//   };

//   const transform = `${el.rotation ? `rotate(${el.rotation}deg)` : ""}`.trim();
  
//   const base = {
//     position: "absolute", left: el.x * zoom, top: el.y * zoom,
//     width: w, height: h, opacity: (el.opacity ?? 100) / 100,
//     transform: transform || undefined,
//     transformOrigin: "center center", pointerEvents: "auto", cursor: "move",
//   };

//   if (el.type === "image") {
//     const imgTransform = `${el.rotation ? `rotate(${el.rotation}deg)` : ""}${el.flip ? " scaleX(-1)" : ""}`.trim();
//     return <img src={el.src} alt="" draggable={false} className={getAnimClass()} style={{ ...base, objectFit: "contain", transform: imgTransform || undefined }} />;
//   }

//   if (el.type === "text") {
//     // Apply text outline
//     const textOutlineStyle = el.textOutline === "solid" && el.outlineWidth > 0 
//       ? `${el.outlineWidth * zoom}px ${el.outlineColor}` 
//       : "none";
    
//     const style = {
//       ...base, fontSize: el.fontSize * zoom, fontFamily: el.fontFamily, color: el.color,
//       fontWeight: el.bold ? 700 : 400, fontStyle: el.italic ? "italic" : "normal",
//       textDecoration: el.underline ? "underline" : "none", textAlign: el.align || "left",
//       whiteSpace: "pre-wrap", lineHeight: el.lineHeight || 1.3,
//       letterSpacing: `${el.letterSpacing || 0}px`,
//       background: el.textBackground && el.textBackground !== "transparent" ? el.textBackground : "transparent",
//       textShadow: el.textShadow && el.textShadow !== "none" ? `2px 2px 4px ${el.textShadow}` : "none",
//       WebkitTextStroke: textOutlineStyle !== "none" ? textOutlineStyle : undefined,
//       WebkitTextStrokeWidth: textOutlineStyle !== "none" ? `${el.outlineWidth * zoom}px` : undefined,
//       WebkitTextStrokeColor: textOutlineStyle !== "none" ? el.outlineColor : undefined,
//       display: "flex", alignItems: "center",
//       justifyContent: el.align === "center" ? "center" : el.align === "right" ? "flex-end" : "flex-start",
//       borderRadius: 4, padding: "2px 4px",
//     };
//     if (el.hyperlink) return <a href={el.hyperlink} target="_blank" rel="noopener noreferrer" className={getAnimClass()} style={style}>{el.text}</a>;
//     return <div className={getAnimClass()} style={style}>{el.text}</div>;
//   }

//   if (el.type === "shape") {
//     const sw = (el.strokeW || 2) * zoom;
    
//     if (el.imageSrc) {
//       const scale = el.imageScale || 1;
//       const imgX = (el.imagePosition?.x || 0) * zoom;
//       const imgY = (el.imagePosition?.y || 0) * zoom;
//       const imgW = w * scale;
//       const imgH = h * scale;
//       const clipX = (w - imgW) / 2 + imgX;
//       const clipY = (h - imgH) / 2 + imgY;
      
//       return (
//         <div className={getAnimClass()} style={{ ...base, overflow: "hidden", position: "absolute" }}>
//           <svg style={{ position: "absolute", top: 0, left: 0, width: w, height: h }}>
//             <defs>
//               <clipPath id={`clip-${el.id}`}>
//                 {el.shape === "rect" && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} />}
//                 {el.shape === "circle" && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} />}
//               </clipPath>
//             </defs>
//             <image 
//               href={el.imageSrc} 
//               x={clipX} 
//               y={clipY} 
//               width={imgW} 
//               height={imgH} 
//               preserveAspectRatio="xMidYMid slice"
//               clipPath={`url(#clip-${el.id})`}
//               opacity={el.opacity / 100}
//             />
//             {el.shape === "rect" && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} fill="none" stroke={el.stroke} strokeWidth={sw} />}
//             {el.shape === "circle" && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill="none" stroke={el.stroke} strokeWidth={sw} />}
//           </svg>
//         </div>
//       );
//     }
    
//     return (
//       <svg className={getAnimClass()} style={{ ...base, pointerEvents: "auto", cursor: "move" }} viewBox={`0 0 ${w} ${h}`} overflow="visible">
//         {el.shape === "rect" && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} fill={el.fill === "transparent" ? "none" : el.fill} stroke={el.stroke} strokeWidth={sw} />}
//         {el.shape === "circle" && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill={el.fill === "transparent" ? "none" : el.fill} stroke={el.stroke} strokeWidth={sw} />}
//       </svg>
//     );
//   }

//   return null;
// }





// CanvasEditor.jsx - Complete with Fixed Gradient Text + No Canvas Tools
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
  FiHeart, FiStar, FiSun, FiMoon, FiRefreshCw, FiMaximize2, FiMinimize2
} from 'react-icons/fi';
import { MdAnimation, MdOpacity, MdColorLens, MdFormatLineSpacing, MdTextFields, 
  MdBlurOn, MdBorderAll, MdTransform, MdGradient } from 'react-icons/md';

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
  const [zoom, setZoom] = useState(0.55);
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

  useEffect(() => {
    if (isMobile) {
      const vw = window.innerWidth;
      const newZoom = Math.min(0.5, (vw - 30) / canvasSize.w);
      setZoom(Math.max(0.3, +newZoom.toFixed(2)));
    }
  }, [isMobile, canvasSize]);

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
        opacity: 100, rotation: 0, animation: "none", scale: 1, skewX: 0, skewY: 0,
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
          opacity: 100, rotation: 0, animation: "none", scale: 1, skewX: 0, skewY: 0,
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
    return { x: (clientX - rect.left) / zoom, y: (clientY - rect.top) / zoom };
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
    const hs = HANDLE_R * 2 / zoom;
    for (const h of HANDLES) {
      const p = getHPos(el, h);
      if (Math.abs(x - p.x) <= hs && Math.abs(y - p.y) <= hs) return h;
    }
    return null;
  };

  const hitRotateHandle = (x, y, el) => {
    const center = getCenter(el);
    const handlePos = { x: center.x, y: el.y - 25 };
    const hs = 15 / zoom;
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
      if (isDoubleClick && hit.type === "text" && !isLocked) startInlineEdit(hit.id, hit.text);
      if (!isLocked && !isDoubleClick) interactRef.current = { type: "move", id: hit.id, startX: x, startY: y, origEl: { ...hit } };
    } else {
      if (!editingTextId) { setSelId(null); setActiveFeature(null); setPanel(null); }
      interactRef.current = { type: null };
    }
  };

  const onPointerMove = (e) => {
    if (isLocked) return;
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
      useGradient: tUseGradient, gradientColors: tGradientColors, gradientType: tGradientType,
      bold: tBold, italic: tItalic, underline: tUnderline, align: tAlign,
      opacity: 100, rotation: 0, animation: "none", scale: 1, skewX: 0, skewY: 0,
      lineHeight: 1.3, letterSpacing: 0, textBackground: "transparent", textShadow: "none",
      textOutline: "none", outlineWidth: 0, outlineColor: "#000000",
      shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 }
    };
    commitElements([...elements, el]);
    setSelId(el.id);
    setActiveFeature(null);
  };

  const addShape = (shape) => {
    if (shape === "image-rect" || shape === "image-circle") {
      setSelectedShapeForImage(shape === "image-rect" ? "rect" : "circle");
      setShowImageUploader(true);
      return;
    }
    const el = { 
      id: uid(), type: "shape", shape, x: 200, y: 200, w: 140, h: 140, 
      fill: sFill, stroke: sStroke, strokeW: sStrokeW, opacity: 100, rotation: 0, borderRadius: 0,
      imageSrc: null, imageScale: 1, imagePosition: { x: 0, y: 0 },
      shadow: { enabled: false, color: "#000", blur: 4, x: 2, y: 2 }, blur: 0
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
        
        if (el.useGradient && el.gradientColors && el.gradientColors.length >= 2) {
          const gradient = el.gradientType === "linear"
            ? ctx.createLinearGradient(tx, textY - el.fontSize, tx + (el.w || 100), textY + el.fontSize/2)
            : ctx.createRadialGradient(tx + (el.w || 100)/2, textY - el.fontSize/2, 5, tx + (el.w || 100)/2, textY - el.fontSize/2, Math.max(el.w || 100, el.fontSize));
          el.gradientColors.forEach((color, idx) => {
            gradient.addColorStop(idx / (el.gradientColors.length - 1), color);
          });
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = el.color;
        }
        
        if (el.textOutline === "solid" && el.outlineWidth > 0) {
          ctx.lineWidth = el.outlineWidth;
          ctx.strokeStyle = el.outlineColor;
          ctx.strokeText(el.text, tx, textY);
        }
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
        if (el.borderRadius) {
          ctx.beginPath();
          ctx.roundRect(el.x, el.y, el.w, el.h, el.borderRadius);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillStyle = el.fill;
          ctx.strokeStyle = el.stroke;
          ctx.lineWidth = el.strokeW;
          if (el.shape === "rect") {
            ctx.fillRect(el.x, el.y, el.w, el.h);
            ctx.strokeRect(el.x, el.y, el.w, el.h);
          } else if (el.shape === "circle") {
            ctx.beginPath();
            ctx.ellipse(el.x + el.w/2, el.y + el.h/2, el.w/2, el.h/2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
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
        
        if (el.useGradient && el.gradientColors && el.gradientColors.length >= 2) {
          const gradient = el.gradientType === "linear"
            ? ctx.createLinearGradient(tx, textY - el.fontSize, tx + (el.w || 100), textY + el.fontSize/2)
            : ctx.createRadialGradient(tx + (el.w || 100)/2, textY - el.fontSize/2, 5, tx + (el.w || 100)/2, textY - el.fontSize/2, Math.max(el.w || 100, el.fontSize));
          el.gradientColors.forEach((color, idx) => {
            gradient.addColorStop(idx / (el.gradientColors.length - 1), color);
          });
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = el.color;
        }
        
        if (el.textOutline === "solid" && el.outlineWidth > 0) {
          ctx.lineWidth = el.outlineWidth;
          ctx.strokeStyle = el.outlineColor;
          ctx.strokeText(el.text, tx, textY);
        }
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
          ctx.fillRect(el.x, el.y, el.w, el.h);
          ctx.strokeRect(el.x, el.y, el.w, el.h);
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
    // Base menu items WITHOUT canvas tools
    const baseMenuItems = [
      { id: "deselect", icon: <FiXCircle />, label: "X", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
      { id: "upload-bg", icon: <FiImage />, label: "BG", action: () => uploadBgRef.current.click() },
      { id: "upload-img", icon: <FiUpload />, label: "Image", action: () => uploadImgRef.current.click() },
      { id: "text", icon: <FiType />, label: "Text", action: () => setActiveFeature(activeFeature === "addText" ? null : "addText"), active: activeFeature === "addText" },
      { id: "rect", icon: <FiSquare />, label: "Rect", action: () => addShape("rect") },
      { id: "circle", icon: <FiSquare />, label: "Circle", action: () => addShape("circle") },
      { id: "image-rect", icon: <FiImage />, label: "Img Rect", action: () => addShape("image-rect") },
      { id: "image-circle", icon: <FiImage />, label: "Img Circ", action: () => addShape("image-circle") },
      { id: "removeBg", icon: <FiRemoveBg />, label: "Remove BG", action: removeBackgroundFromCanvas, active: false },
      { id: "gradient", icon: <MdGradient />, label: "Gradient", action: () => setActiveFeature(activeFeature === "gradient" ? null : "gradient"), active: activeFeature === "gradient" },
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
          { id: "deselect", icon: <FiXCircle />, label: "X", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
          { id: "bold", icon: <FiBold />, label: "Bold", action: () => commitSel({ bold: !selEl.bold }), active: selEl.bold },
          { id: "italic", icon: <FiItalic />, label: "Italic", action: () => commitSel({ italic: !selEl.italic }), active: selEl.italic },
          { id: "underline", icon: <FiUnderline />, label: "Underline", action: () => commitSel({ underline: !selEl.underline }), active: selEl.underline },
          { id: "font", icon: <FiType />, label: "Font", action: () => setActiveFeature(activeFeature === "font" ? null : "font"), active: activeFeature === "font" },
          { id: "size", icon: <FiType />, label: "Size", action: () => setActiveFeature(activeFeature === "size" ? null : "size"), active: activeFeature === "size" },
          { id: "color", icon: <MdColorLens />, label: "Color", action: () => setActiveFeature(activeFeature === "color" ? null : "color"), active: activeFeature === "color", colorDot: selEl.useGradient ? "gradient" : selEl.color },
          { id: "gradient", icon: <MdGradient />, label: "Gradient", action: () => { setTempGradientColors(selEl.gradientColors || ["#FF6B6B", "#4ECDC4"]); setTempGradientType(selEl.gradientType || "linear"); setActiveFeature(activeFeature === "textGradient" ? null : "textGradient"); }, active: activeFeature === "textGradient" },
          { id: "outline", icon: <FiBox />, label: "Outline", action: () => setActiveFeature(activeFeature === "outline" ? null : "outline"), active: activeFeature === "outline" },
          { id: "shadow", icon: <FiBox />, label: "Shadow", action: () => setActiveFeature(activeFeature === "textShadow" ? null : "textShadow"), active: activeFeature === "textShadow" },
          { id: "lineHeight", icon: <MdFormatLineSpacing />, label: "Line Ht", action: () => setActiveFeature(activeFeature === "lineHeight" ? null : "lineHeight"), active: activeFeature === "lineHeight" },
          { id: "position", icon: <FiMove />, label: "Position", action: () => setActiveFeature(activeFeature === "position" ? null : "position"), active: activeFeature === "position" },
          { id: "changeLang", icon: <FiGlobe />, label: "Lang", action: () => setActiveFeature(activeFeature === "changeLang" ? null : "changeLang"), active: activeFeature === "changeLang" },
          { id: "alignL", icon: <FiAlignLeft />, label: "Left", action: () => commitSel({ align: "left" }), active: selEl.align === "left" },
          { id: "alignC", icon: <FiAlignCenter />, label: "Center", action: () => commitSel({ align: "center" }), active: selEl.align === "center" },
          { id: "alignR", icon: <FiAlignRight />, label: "Right", action: () => commitSel({ align: "right" }), active: selEl.align === "right" },
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
          { id: "deselect", icon: <FiXCircle />, label: "X", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
          { id: "fill", icon: <MdColorLens />, label: "Fill", action: () => setActiveFeature(activeFeature === "fillColor" ? null : "fillColor"), active: activeFeature === "fillColor", colorDot: selEl.fill !== "transparent" ? selEl.fill : null },
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
          { id: "deselect", icon: <FiXCircle />, label: "X", action: () => { setSelId(null); setActiveFeature(null); }, danger: false, alwaysShow: true },
          { id: "flip", icon: <FiMove />, label: "Flip", action: flipElement, active: selEl.flip },
          { id: "removeBg", icon: <FiRemoveBg />, label: "Remove BG", action: removeBackgroundFromCanvas, active: false },
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
        {showGrid && <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)`, backgroundSize: `${40 * zoom}px ${40 * zoom}px` }} />}
        {showGuides && <>
          <div style={{ position: "absolute", left: guideX1*zoom, top: 0, width: 1, height: "100%", background: "rgba(255,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: guideX2*zoom, top: 0, width: 1, height: "100%", background: "rgba(255,0,0,0.4)" }} />
          <div style={{ position: "absolute", top: guideY1*zoom, left: 0, width: "100%", height: 1, background: "rgba(255,0,0,0.4)" }} />
          <div style={{ position: "absolute", top: guideY2*zoom, left: 0, width: "100%", height: 1, background: "rgba(255,0,0,0.4)" }} />
        </>}
        {showBleed && <div style={{ position: "absolute", left: bleedSize*zoom, top: bleedSize*zoom, right: bleedSize*zoom, bottom: bleedSize*zoom, border: "1px dashed rgba(220,38,38,0.5)" }} />}
        {showFolds && <>
          <div style={{ position: "absolute", left: foldX*zoom, top: 0, width: 2, height: "100%", borderLeft: "2px dashed rgba(59,130,246,0.7)" }} />
          <div style={{ position: "absolute", top: foldY*zoom, left: 0, width: "100%", height: 2, borderTop: "2px dashed rgba(59,130,246,0.7)" }} />
        </>}
      </div>
    );
  };

  const CanvasArea = () => (
    <div ref={canvasAreaRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
      onTouchStart={onPointerDown} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}
      style={{ position: "relative", width: canvasSize.w * zoom, height: canvasSize.h * zoom, cursor: "default", userSelect: "none", touchAction: "none", boxShadow: "0 4px 32px rgba(0,0,0,0.2)", borderRadius: 4, overflow: "hidden", background: getBgStyle(), margin: "auto" }}>
      {bgImage && <img src={bgImage} alt="bg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: bgOpacity / 100, filter: bgFilter, pointerEvents: "none" }} />}
      <GuidesOverlay />
      {elements.map(el => {
        if (el.type === "text" && editingTextId === el.id) {
          return (
            <textarea key={el.id} ref={textInputRef} value={editingTextValue} onChange={e => setEditingTextValue(e.target.value)} onBlur={finishInlineEdit} onKeyDown={handleTextKeyDown}
              onPointerDown={e => e.stopPropagation()} onPointerMove={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()}
              style={{ position: "absolute", left: el.x * zoom, top: el.y * zoom, width: (el.w || 100) * zoom, height: (el.h || 60) * zoom,
                fontSize: el.fontSize * zoom, fontFamily: el.fontFamily, color: el.color, fontWeight: el.bold ? 700 : 400,
                fontStyle: el.italic ? "italic" : "normal", textDecoration: el.underline ? "underline" : "none", textAlign: el.align || "left",
                border: `2px solid ${ACCENT}`, borderRadius: 4, padding: "4px 8px", background: "transparent", outline: "none", zIndex: 20,
                boxSizing: "border-box", resize: "none", overflow: "hidden", lineHeight: el.lineHeight || 1.3, letterSpacing: `${el.letterSpacing || 0}px`, caretColor: el.color }} />
          );
        }
        return <ElView key={el.id} el={el} zoom={zoom} />;
      })}
      {selEl && !editingTextId && <SelectBox el={selEl} zoom={zoom} />}
      {elements.map(el => el.type === "shape" && <input key={`upload-${el.id}`} id={`shape-image-upload-${el.id}`} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleShapeImageUpload(e, el.id)} />)}
    </div>
  );

  const FeaturePopup = () => {
    if (!activeFeature) return null;
    const popupStyle = { position: "fixed", bottom: isMobile ? 72 : 60, left: isMobile ? 8 : "auto", right: isMobile ? 8 : "auto", width: isMobile ? "auto" : 320, background: "#fff", borderRadius: 16, boxShadow: "0 -4px 30px rgba(0,0,0,0.18)", zIndex: 300, padding: 16, border: "1px solid #e5e7eb", animation: "popupSlide 0.2s ease" };
    const Header = ({ title }) => (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{title}</span>
        <button onClick={() => setActiveFeature(null)} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><FiX size={14} /></button>
      </div>
    );

    if (activeFeature === "addText") return (
      <div style={popupStyle}>
        <Header title="Add Text" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <textarea value={tText} onChange={e => setTText(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 10, fontSize: 14, resize: "none", height: 70, boxSizing: "border-box" }} />
          <select value={tFont} onChange={e => setTFont(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: 8, fontSize: 13 }}>{FONTS.map(f => <option key={f}>{f}</option>)}</select>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 12, color: "#666", width: 50 }}>Size {tSize}</span><input type="range" min={8} max={200} value={tSize} onChange={e => setTSize(+e.target.value)} style={{ flex: 1 }} /></div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <button onClick={() => setTUseGradient(false)} style={{ flex: 1, padding: 8, borderRadius: 8, background: !tUseGradient ? ACCENT : "#f3f4f6", color: !tUseGradient ? "#fff" : "#333", border: "none", cursor: "pointer", fontSize: 12 }}>Solid</button>
            <button onClick={() => setTUseGradient(true)} style={{ flex: 1, padding: 8, borderRadius: 8, background: tUseGradient ? ACCENT : "#f3f4f6", color: tUseGradient ? "#fff" : "#333", border: "none", cursor: "pointer", fontSize: 12 }}>Gradient</button>
          </div>
          {!tUseGradient ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 12, color: "#666" }}>Color</span><input type="color" value={tColor} onChange={e => setTColor(e.target.value)} style={{ width: 40, height: 34, borderRadius: 6, border: "none", cursor: "pointer" }} /></div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setTGradientType("linear")} style={{ flex: 1, padding: 6, borderRadius: 6, background: tGradientType === "linear" ? ACCENT : "#f3f4f6", color: tGradientType === "linear" ? "#fff" : "#333", border: "none", cursor: "pointer", fontSize: 11 }}>Linear</button>
                <button onClick={() => setTGradientType("radial")} style={{ flex: 1, padding: 6, borderRadius: 6, background: tGradientType === "radial" ? ACCENT : "#f3f4f6", color: tGradientType === "radial" ? "#fff" : "#333", border: "none", cursor: "pointer", fontSize: 11 }}>Radial</button>
              </div>
              {tGradientColors.map((color, idx) => (
                <div key={idx} style={{ display: "flex", gap: 8 }}>
                  <input type="color" value={color} onChange={e => { const newColors = [...tGradientColors]; newColors[idx] = e.target.value; setTGradientColors(newColors); }} style={{ width: 50, height: 34, borderRadius: 6, border: "none", cursor: "pointer" }} />
                  <input type="text" value={color} onChange={e => { const newColors = [...tGradientColors]; newColors[idx] = e.target.value; setTGradientColors(newColors); }} style={{ flex: 1, padding: 6, borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 12 }} />
                  {tGradientColors.length > 2 && <button onClick={() => setTGradientColors(tGradientColors.filter((_, i) => i !== idx))} style={{ padding: "6px 10px", background: "#fee2e2", border: "none", borderRadius: 6, cursor: "pointer", color: "#dc2626" }}><FiTrash2 size={12} /></button>}
                </div>
              ))}
              {tGradientColors.length < 5 && <button onClick={() => setTGradientColors([...tGradientColors, "#888888"])} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>+ Add Color</button>}
            </div>
          )}
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

    if (activeFeature === "textGradient" && selEl && selEl.type === "text") {
      const updateColors = (index, value) => {
        const newColors = [...tempGradientColors];
        newColors[index] = value;
        setTempGradientColors(newColors);
        commitSel({ gradientColors: newColors, useGradient: true, gradientType: tempGradientType });
      };
      
      const addColor = () => {
        if (tempGradientColors.length < 5) {
          const newColors = [...tempGradientColors, "#888888"];
          setTempGradientColors(newColors);
          commitSel({ gradientColors: newColors, useGradient: true, gradientType: tempGradientType });
        }
      };
      
      const removeColor = (index) => {
        if (tempGradientColors.length > 2) {
          const newColors = tempGradientColors.filter((_, i) => i !== index);
          setTempGradientColors(newColors);
          commitSel({ gradientColors: newColors, useGradient: true, gradientType: tempGradientType });
        }
      };
      
      return (
        <div style={popupStyle}>
          <Header title="Text Gradient" />
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button onClick={() => { setTempGradientType("linear"); commitSel({ gradientType: "linear", useGradient: true }); }} style={{ flex: 1, padding: 8, borderRadius: 6, background: tempGradientType === "linear" ? ACCENT : "#f3f4f6", color: tempGradientType === "linear" ? "#fff" : "#333", border: "none", cursor: "pointer" }}>Linear</button>
            <button onClick={() => { setTempGradientType("radial"); commitSel({ gradientType: "radial", useGradient: true }); }} style={{ flex: 1, padding: 8, borderRadius: 6, background: tempGradientType === "radial" ? ACCENT : "#f3f4f6", color: tempGradientType === "radial" ? "#fff" : "#333", border: "none", cursor: "pointer" }}>Radial</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {tempGradientColors.map((color, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="color" value={color} onChange={(e) => updateColors(idx, e.target.value)} style={{ width: 50, height: 40, borderRadius: 6, border: "1px solid #e5e7eb", cursor: "pointer" }} />
                <input type="text" value={color} onChange={(e) => updateColors(idx, e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 12 }} />
                {tempGradientColors.length > 2 && <button onClick={() => removeColor(idx)} style={{ padding: "6px 10px", background: "#fee2e2", border: "none", borderRadius: 6, cursor: "pointer", color: "#dc2626" }}><FiTrash2 size={12} /></button>}
              </div>
            ))}
            {tempGradientColors.length < 5 && <button onClick={addColor} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>+ Add Color Stop</button>}
          </div>
          <button onClick={() => { commitSel({ useGradient: false }); setActiveFeature(null); }} style={{ marginTop: 12, padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, width: "100%", cursor: "pointer" }}>Disable Gradient</button>
        </div>
      );
    }

    if (activeFeature === "gradient") return (
      <div style={popupStyle}>
        <Header title="Gradient Background" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => applyGradientBg("linear", ["#ff6b6b", "#4ecdc4"])} style={{ flex: 1, padding: 8, borderRadius: 8, background: "linear-gradient(135deg, #ff6b6b, #4ecdc4)", color: "#fff", border: "none", cursor: "pointer" }}>Sunset</button>
            <button onClick={() => applyGradientBg("linear", ["#667eea", "#764ba2"])} style={{ flex: 1, padding: 8, borderRadius: 8, background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", border: "none", cursor: "pointer" }}>Purple</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => applyGradientBg("linear", ["#f7971e", "#ffd200"])} style={{ flex: 1, padding: 8, borderRadius: 8, background: "linear-gradient(135deg, #f7971e, #ffd200)", color: "#333", border: "none", cursor: "pointer" }}>Golden</button>
            <button onClick={() => applyGradientBg("radial", ["#3494e6", "#ec6ead"])} style={{ flex: 1, padding: 8, borderRadius: 8, background: "radial-gradient(circle, #3494e6, #ec6ead)", color: "#fff", border: "none", cursor: "pointer" }}>Radial</button>
          </div>
          <button onClick={() => { setBgGradient(null); setBgColor("#ffffff"); }} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer" }}>Reset to Solid</button>
        </div>
      </div>
    );

    if (activeFeature === "outline" && selEl && selEl.type === "text") return (
      <div style={popupStyle}>
        <Header title="Text Outline" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label style={{ fontSize: 12 }}>Enable Outline</label><div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button onClick={() => commitSel({ textOutline: "solid" })} style={{ flex: 1, padding: 8, borderRadius: 6, background: selEl.textOutline === "solid" ? ACCENT : "#f3f4f6", color: selEl.textOutline === "solid" ? "#fff" : "#333" }}>On</button>
            <button onClick={() => commitSel({ textOutline: "none", outlineWidth: 0 })} style={{ flex: 1, padding: 8, borderRadius: 6, background: selEl.textOutline === "none" ? ACCENT : "#f3f4f6", color: selEl.textOutline === "none" ? "#fff" : "#333" }}>Off</button>
          </div></div>
          {selEl.textOutline === "solid" && (<><div><div style={{ fontSize: 12 }}>Width: {selEl.outlineWidth || 2}px</div><input type="range" min={1} max={10} value={selEl.outlineWidth || 2} onChange={e => commitSel({ outlineWidth: +e.target.value })} style={{ width: "100%" }} /></div>
          <div><div style={{ fontSize: 12 }}>Color</div><input type="color" value={selEl.outlineColor || "#000000"} onChange={e => commitSel({ outlineColor: e.target.value })} style={{ width: "100%", height: 40, borderRadius: 6 }} /></div></>)}
        </div>
      </div>
    );

    if (activeFeature === "textShadow" && selEl && selEl.type === "text") return (
      <div style={popupStyle}>
        <Header title="Text Shadow" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => commitSel({ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" })} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#f3f4f6", cursor: "pointer" }}>Small</button>
            <button onClick={() => commitSel({ textShadow: "4px 4px 8px rgba(0,0,0,0.5)" })} style={{ flex: 1, padding: 8, borderRadius: 6, background: "#f3f4f6", cursor: "pointer" }}>Large</button>
          </div>
          <button onClick={() => commitSel({ textShadow: "none" })} style={{ padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer" }}>Remove Shadow</button>
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

    if (activeFeature === "position" && selEl && selEl.type === "text") return (
      <div style={popupStyle}>
        <Header title="Text Position" />
        <div><div style={{ fontSize: 12 }}>X: {Math.round(selEl.x)}px</div><input type="range" min={0} max={canvasSize.w - (selEl.w || 100)} value={selEl.x} onChange={e => commitSel({ x: +e.target.value })} style={{ width: "100%" }} /></div>
        <div><div style={{ fontSize: 12 }}>Y: {Math.round(selEl.y)}px</div><input type="range" min={0} max={canvasSize.h - (selEl.h || 60)} value={selEl.y} onChange={e => commitSel({ y: +e.target.value })} style={{ width: "100%" }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginTop: 8 }}>
          <button onClick={() => alignElement("horizontal")} style={{ padding: 6, borderRadius: 6, background: "#f3f4f6", fontSize: 11 }}>H Center</button>
          <button onClick={() => alignElement("vertical")} style={{ padding: 6, borderRadius: 6, background: "#f3f4f6", fontSize: 11 }}>V Center</button>
          <button onClick={() => alignElement("center")} style={{ padding: 6, borderRadius: 6, background: "#f3f4f6", fontSize: 11 }}>Both</button>
        </div>
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

    if (activeFeature === "size" && selEl) return (
      <div style={popupStyle}><Header title="Font Size" /><input type="range" min={8} max={200} value={selEl.fontSize} onChange={e => commitSel({ fontSize: +e.target.value })} style={{ width: "100%" }} /><div style={{ textAlign: "center", marginTop: 8, fontWeight: 700, color: ACCENT }}>{selEl.fontSize}px</div></div>
    );

    if (activeFeature === "color" && selEl) return (
      <div style={popupStyle}><Header title="Text Color" /><input type="color" value={selEl.color} onChange={e => commitSel({ color: e.target.value, useGradient: false })} style={{ width: "100%", height: 50, borderRadius: 8, border: "none", cursor: "pointer" }} />
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>{COLOR_PRESETS.map(c => <div key={c} onClick={() => commitSel({ color: c, useGradient: false })} style={{ width: 30, height: 30, borderRadius: 15, background: c, cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />)}</div>
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

    if (activeFeature === "fillColor" && selEl) return (
      <div style={popupStyle}><Header title="Fill Color" /><input type="color" value={selEl.fill === "transparent" ? "#ffffff" : selEl.fill} onChange={e => commitSel({ fill: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8 }} /><button onClick={() => commitSel({ fill: "transparent" })} style={{ marginTop: 10, padding: 8, background: "#f3f4f6", border: "none", borderRadius: 8, width: "100%", cursor: "pointer" }}>Transparent</button></div>
    );

    if (activeFeature === "strokeColor" && selEl) return (
      <div style={popupStyle}><Header title="Stroke Color" /><input type="color" value={selEl.stroke} onChange={e => commitSel({ stroke: e.target.value })} style={{ width: "100%", height: 50, borderRadius: 8 }} /></div>
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
      <div style={popupStyle}><Header title="Background Color" /><input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: "100%", height: 50, borderRadius: 8 }} /><div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>{COLOR_PRESETS.map(c => <div key={c} onClick={() => setBgColor(c)} style={{ width: 30, height: 30, borderRadius: 15, background: c, cursor: "pointer", border: "2px solid #fff", boxShadow: "0 0 0 1px #ddd" }} />)}</div></div>
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
        <div style={{ position: "fixed", right: 12, bottom: 75, zIndex: 50, display: "flex", flexDirection: "column", gap: 8 }}><button onClick={() => setZoom(z => Math.min(2, +(z+0.1).toFixed(1)))} style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FiZoomIn /></button><button onClick={() => setZoom(z => Math.max(0.2, +(z-0.1).toFixed(1)))} style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><FiZoomOut /></button><div style={{ width: 40, height: 40, borderRadius: 40, background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{Math.round(zoom*100)}%</div></div>
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
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", height: 50, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", flexShrink: 0 }}><div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${ACCENT},#ec4899)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>C</div><input value={designTitle} onChange={e => setDesignTitle(e.target.value)} style={{ border: "1px solid #eee", borderRadius: 8, padding: "4px 12px", fontSize: 13, width: 200 }} /><div style={{ width: 1, height: 26, background: "#e5e7eb" }} /><button onClick={undo} disabled={hIdx <= 0} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 13 }}>↩ Undo</button><button onClick={redo} disabled={hIdx >= history.length - 1} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #eee", background: "#fff", cursor: "pointer", fontSize: 13 }}>↪ Redo</button><div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}><button onClick={() => setZoom(z => Math.max(0.2, +(z-0.1).toFixed(1)))} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18 }}><FiZoomOut /></button><span style={{ fontSize: 12, minWidth: 42, textAlign: "center", fontWeight: 600 }}>{Math.round(zoom*100)}%</span><button onClick={() => setZoom(z => Math.min(2, +(z+0.1).toFixed(1)))} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18 }}><FiZoomIn /></button><div style={{ width: 1, height: 26, background: "#e5e7eb" }} /><button onClick={exportPNG} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 13 }}>Export PNG</button><button onClick={saveDesignToServer} style={{ padding: "5px 14px", borderRadius: 6, background: "#10b981", color: "#fff", border: "none", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600 }}><FiSave size={14} /> Save</button></div></div>
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
    const gradientStyle = el.useGradient && el.gradientColors && el.gradientColors.length >= 2
      ? { background: el.gradientType === "linear" 
          ? `linear-gradient(135deg, ${el.gradientColors.join(", ")})` 
          : `radial-gradient(circle, ${el.gradientColors.join(", ")})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text" }
      : { color: el.color };
    
    const style = { ...base, ...gradientStyle, fontSize: el.fontSize * zoom, fontFamily: el.fontFamily, fontWeight: el.bold ? 700 : 400, fontStyle: el.italic ? "italic" : "normal", textDecoration: el.underline ? "underline" : "none", textAlign: el.align || "left", whiteSpace: "pre-wrap", lineHeight: el.lineHeight || 1.3, letterSpacing: `${el.letterSpacing || 0}px`, background: el.textBackground && el.textBackground !== "transparent" ? el.textBackground : "transparent", textShadow: el.textShadow && el.textShadow !== "none" ? el.textShadow : "none", WebkitTextStroke: textOutlineStyle !== "none" ? textOutlineStyle : undefined, WebkitTextStrokeWidth: textOutlineStyle !== "none" ? `${el.outlineWidth * zoom}px` : undefined, WebkitTextStrokeColor: textOutlineStyle !== "none" ? el.outlineColor : undefined, display: "flex", alignItems: "center", justifyContent: el.align === "center" ? "center" : el.align === "right" ? "flex-end" : "flex-start", borderRadius: 4, padding: "2px 4px" };
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
    return (<svg className={getAnimClass()} style={{ ...base, pointerEvents: "auto", cursor: "move", filter: blurStyle, boxShadow: shadowStyle }} viewBox={`0 0 ${w} ${h}`} overflow="visible">{el.shape === "rect" && <rect x={sw/2} y={sw/2} width={w-sw} height={h-sw} rx={el.borderRadius ? el.borderRadius * zoom : 0} fill={el.fill === "transparent" ? "none" : el.fill} stroke={el.stroke} strokeWidth={sw} />}{el.shape === "circle" && <ellipse cx={w/2} cy={h/2} rx={w/2-sw/2} ry={h/2-sw/2} fill={el.fill === "transparent" ? "none" : el.fill} stroke={el.stroke} strokeWidth={sw} />}</svg>);
  }
  return null;
}