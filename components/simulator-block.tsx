"use client";

import { Box, ChevronLeft, ChevronRight, Cuboid, Radio } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Reveal } from "./reveal";

function RobotShape({ wireframe = false }: { wireframe?: boolean }) {
  return <svg viewBox="0 0 420 220" role="img" aria-label={wireframe ? "Robot digital twin wireframe" : "Physical mobile robot illustration"}>
    <path d="M86 105 139 67h151l48 39-19 70H105Z" className={wireframe ? "sim-wire" : "sim-solid"} />
    <path d="M118 101h187l-13 43H130Z" className={wireframe ? "sim-wire" : "sim-panel"} />
    <rect x="164" y="43" width="92" height="30" rx="7" className={wireframe ? "sim-wire" : "sim-solid"} />
    <ellipse cx="210" cy="43" rx="43" ry="9" className={wireframe ? "sim-wire" : "sim-lidar"} />
    <circle cx="131" cy="174" r="30" className={wireframe ? "sim-wire" : "sim-wheel"} /><circle cx="293" cy="174" r="30" className={wireframe ? "sim-wire" : "sim-wheel"} />
  </svg>;
}

export function SimulatorBlock() {
  const split = useMotionValue(50);
  const leftWidth = useTransform(split, value => `${value}%`);

  return (
    <section id="simulator" className="section-shell scroll-mt-20 py-24 sm:py-32" aria-labelledby="sim-title">
      <Reveal>
        <div className="section-heading text-center"><p className="kicker"><span>//</span> DIGITAL_TWIN_PIPELINE</p><h2 id="sim-title" className="mx-auto">Test in Gazebo. Deploy to Reality.</h2><p className="section-copy mx-auto">Every leased robot comes with pre-calibrated URDF files and simulator environments.</p></div>
        <div className="sim-compare mt-12">
          <div className="sim-side sim-real"><div className="sim-meta right"><Radio /> PHYSICAL HARDWARE</div><RobotShape /></div>
          <motion.div className="sim-side sim-digital" style={{ width: leftWidth }}><div className="sim-meta"><Cuboid /> DIGITAL TWIN · GAZEBO/RVIZ</div><RobotShape wireframe /></motion.div>
          <motion.button
            type="button"
            aria-label="Drag to compare digital twin and physical hardware"
            className="sim-handle"
            drag="x"
            dragConstraints={{ left: -180, right: 180 }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(_, info) => split.set(Math.max(16, Math.min(84, 50 + info.offset.x / 5)))}
          >
            <ChevronLeft /><ChevronRight />
          </motion.button>
          <div className="sim-status"><Box /> urdf_checksum: <b>matched</b><span /> calibration: <b>synced</b></div>
        </div>
      </Reveal>
    </section>
  );
}