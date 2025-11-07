import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const ShapeEditor = () => {
  const stageRef = useRef(null);
  const shapeRef = useRef(null);
  const pointRefs = useRef([]);
  const edgeRefs = useRef([]);
  const [points, setPoints] = useState([
    { x: 150, y: 100 },
    { x: 350, y: 100 },
    { x: 350, y: 250 },
    { x: 150, y: 250 },
  ]);

  // === Draw shape dynamically ===
  const drawShape = () => {
    const stageRect = stageRef.current.getBoundingClientRect();

    const newPoints = pointRefs.current.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left - stageRect.left + rect.width / 2,
        y: rect.top - stageRect.top + rect.height / 2,
      };
    });

    const path =
      newPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
      " Z";

    shapeRef.current.setAttribute("d", path);

    // Update edge midpoints
    edgeRefs.current.forEach((edge, i) => {
      const p1 = newPoints[i];
      const p2 = newPoints[(i + 1) % newPoints.length];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      gsap.set(edge, { x: midX - 10, y: midY - 10 });
    });
  };

  // === Initialize Draggable points + edges ===
  useEffect(() => {
    if (!stageRef.current) return;

    // Clean up old draggables
    gsap.utils.toArray([...pointRefs.current, ...edgeRefs.current]).forEach(
      (el) => Draggable.get(el)?.kill()
    );

    // --- Draggable corners ---
    pointRefs.current.forEach((el) => {
      Draggable.create(el, {
        type: "x,y",
        bounds: stageRef.current,
        onDrag: drawShape,
        onPress: drawShape,
        onRelease: drawShape,
      });
    });

    // --- Draggable edges ---
    edgeRefs.current.forEach((edge, i) => {
      Draggable.create(edge, {
        type: "x,y",
        bounds: stageRef.current,
        onPress() {
          this.startX = this.x;
          this.startY = this.y;
        },
        onDrag() {
          const dx = this.x - this.startX;
          const dy = this.y - this.startY;
          this.startX = this.x;
          this.startY = this.y;

          // move both connected points
          const el1 = pointRefs.current[i];
          const el2 = pointRefs.current[(i + 1) % pointRefs.current.length];
          gsap.set([el1, el2], {
            x: `+=${dx}`,
            y: `+=${dy}`,
          });

          drawShape();
        },
      });
    });

    drawShape();
  }, [points.length]);

  // === Add or remove corners ===
  const addPoint = () => {
    const last = points[points.length - 1];
    setPoints([...points, { x: last.x + 50, y: last.y + 30 }]);
  };

  const removePoint = () => {
    if (points.length > 3) setPoints(points.slice(0, -1));
  };

  return (
    <div
      ref={stageRef}
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        background: "#f1f5f9",
        border: "2px dashed #94a3b8",
        borderRadius: "12px",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      {/* SVG Shape */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path
          ref={shapeRef}
          fill="url(#grad)"
          stroke="#334155"
          strokeWidth="2"
        />
      </svg>

      {/* Draggable Corners */}
      {points.map((p, i) => (
        <div
          key={`point-${i}`}
          ref={(el) => (pointRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: p.y - 9,
            left: p.x - 9,
            width: "18px",
            height: "18px",
            background: "#fff",
            border: "2px solid #1e3a8a",
            borderRadius: "50%",
            cursor: "grab",
            touchAction: "none",
            transform: "translate(0, 0)",
            zIndex: 5,
          }}
        ></div>
      ))}

      {/* Draggable Edges (line midpoints) */}
      {points.map((_, i) => (
        <div
          key={`edge-${i}`}
          ref={(el) => (edgeRefs.current[i] = el)}
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            background: "rgba(59,130,246,0.3)",
            border: "2px solid #2563eb",
            borderRadius: "4px",
            cursor: "move",
            touchAction: "none",
            transform: "translate(0,0)",
            zIndex: 3,
          }}
        ></div>
      ))}

      {/* Control Buttons */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={addPoint}
          style={{
            padding: "8px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ➕ Add Point
        </button>
        <button
          onClick={removePoint}
          style={{
            padding: "8px 16px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ➖ Remove Point
        </button>
      </div>
    </div>
  );
};

export default ShapeEditor;
