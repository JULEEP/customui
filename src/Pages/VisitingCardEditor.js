import { useState } from "react";

const TextLayer = ({ x, y }) => {
  const [value, setValue] = useState("");

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setValue(e.currentTarget.textContent)}
      style={{ top: y, left: x }}
      className="absolute min-w-[100px] cursor-text outline-none"
    />
  );
};

export default function VisitingCardImageEditor() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="relative w-[900px]">

        {/* IMAGE */}
        <img
          src="https://www.serveprint.in/wp-content/uploads/2023/10/Untitled-design-2023-10-10T165253.297.png"
          className="w-full select-none"
          draggable={false}
        />

        {/* EXACT POSITIONS – EMPTY, USER TYPES */}
        <TextLayer x={130} y={150} />   {/* LOGO NAME */}
        <TextLayer x={130} y={190} />   {/* TAGLINE */}

        <TextLayer x={560} y={90} />    {/* YOUR NAME */}
        <TextLayer x={560} y={125} />   {/* DESIGNATION */}

        <TextLayer x={520} y={180} />   {/* ADDRESS */}
        <TextLayer x={560} y={215} />   {/* PHONE */}
        <TextLayer x={560} y={250} />   {/* EMAIL */}
        <TextLayer x={560} y={285} />   {/* WEBSITE */}
      </div>
    </div>
  );
}
