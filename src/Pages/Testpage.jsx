import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Testpage = () => {


    

     const stageRef = useRef(null);
  const pointsRef = useRef([]);
  const shapeRef = useRef(null);

  useEffect(() => {
    const updateShape = () => {
      const [p1, p2, p3, p4] = pointsRef.current.map((el) => {
        const rect = el.getBoundingClientRect();
        const stageRect = stageRef.current.getBoundingClientRect();
        return {
          x: rect.left - stageRect.left + rect.width / 2,
          y: rect.top - stageRect.top + rect.height / 2,
        };
      });

      // Update polygon dynamically
      const path = `M${p1.x},${p1.y} L${p2.x},${p2.y} L${p3.x},${p3.y} L${p4.x},${p4.y} Z`;
      shapeRef.current.setAttribute("d", path);
    };

    // Create draggable points
    pointsRef.current.forEach((point) => {
      Draggable.create(point, {
        type: "x,y",
        bounds: stageRef.current,
        onDrag: updateShape,
        onPress: updateShape,
        onRelease: updateShape,
      });
    });

    updateShape(); // Initial draw
  }, []);


    return (
        <>
            <section className='w-full h-full min-h-screen bg-[#000000c9]'>
                 <div
      ref={stageRef}
      style={{
        width: "100%",
        height: "450px",
        position: "relative",
        background: "#f1f5f9",
        border: "2px dashed #94a3b8",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* SVG Shape */}
      <svg
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      >
        <path
          ref={shapeRef}
          fill="url(#gradient)"
          stroke="#334155"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Draggable Corners */}
      {[
        { top: "50px", left: "50px" },
        { top: "50px", right: "50px" },
        { bottom: "50px", right: "50px" },
        { bottom: "50px", left: "50px" },
      ].map((pos, i) => (
        <div
          key={i}
          ref={(el) => (pointsRef.current[i] = el)}
          style={{
            width: "18px",
            height: "18px",
            background: "#fff",
            border: "2px solid #1e40af",
            borderRadius: "50%",
            position: "absolute",
            cursor: "grab",
            touchAction: "none",
            ...pos,
          }}
        ></div>
      ))}
    </div>
               

            </section>
        </>
    )
}

export default Testpage
